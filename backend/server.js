require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Anthropic } = require('@anthropic-ai/sdk');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Claude API client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// In-memory conversation store
const conversations = new Map();

// Health check endpoint for Railway
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'claude-discord-backend'
    });
});

// Main chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, conversationId, image } = req.body;

        if (!message || !conversationId) {
            return res.status(400).json({
                error: 'Missing required fields: message and conversationId are required'
            });
        }

        // Get or create conversation history
        if (!conversations.has(conversationId)) {
            conversations.set(conversationId, []);
        }
        const conversationHistory = conversations.get(conversationId);

        // Add user message to history
        conversationHistory.push({
            role: 'user',
            content: message
        });

        // Prepare messages for Claude API
        const messages = conversationHistory.map(msg => ({
            role: msg.role,
            content: msg.content
        }));

        // Call Claude API
        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4096,
            messages: messages,
            temperature: 0.7,
        });

        // Extract response text
        const aiResponse = response.content[0].text;

        // Add assistant response to history
        conversationHistory.push({
            role: 'assistant',
            content: aiResponse
        });

        // Limit conversation history to last 20 messages
        if (conversationHistory.length > 20) {
            conversations.set(conversationId, conversationHistory.slice(-20));
        }

        res.json({
            response: aiResponse,
            conversationId: conversationId,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Claude API error:', error);

        let errorMessage = 'Internal server error';
        let statusCode = 500;

        if (error instanceof Anthropic.APIError) {
            errorMessage = `Claude API error: ${error.message}`;
            statusCode = error.status || 500;
        } else if (error.message.includes('API key')) {
            errorMessage = 'Invalid or missing API key';
            statusCode = 401;
        }

        res.status(statusCode).json({
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Clean up old conversations periodically (every hour)
setInterval(() => {
    const now = Date.now();
    const cutoff = now - (60 * 60 * 1000); // 1 hour
    // In a production setup, you would clean up old conversations here
    // For now, we'll just log the cleanup
    console.log(`Periodic conversation cleanup - ${conversations.size} active conversations`);
}, 60 * 60 * 1000);

// Start server
app.listen(port, () => {
    console.log(`Claude Discord Backend running on port ${port}`);
    console.log(`Health check: http://localhost:${port}/health`);
    console.log(`API endpoint: http://localhost:${port}/api/chat`);
    
    if (process.env.PUBLIC_URL) {
        console.log(`Public URL: ${process.env.PUBLIC_URL}`);
    }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    process.exit(0);
});
