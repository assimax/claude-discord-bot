const axios = require('axios');
require('dotenv').config();

module.exports = {
    name: "claude-ai-mod",
    isResponse: true,
    description: "Claude AI Integration",
    version: "1.0.0",
    author: "Claude AI",

    init: function (DBS) {
        console.log("Claude AI Mod loaded");
    },

    mod: async function (DBS, message, action, args, command, index) {
        try {
            // Channel ID und Backend URL aus Environment Variables
            const ALLOWED_CHANNEL_ID = process.env.ALLOWED_CHANNEL_ID;
            const BACKEND_URL = process.env.BACKEND_URL?.replace(/\/$/, '');

            if (!ALLOWED_CHANNEL_ID) {
                console.error("ALLOWED_CHANNEL_ID environment variable is not set!");
                DBS.callNextAction(command, message, args, index + 1);
                return;
            }

            if (message.channel.id !== ALLOWED_CHANNEL_ID) {
                // Nicht erlaubter Channel - ignorieren
                DBS.callNextAction(command, message, args, index + 1);
                return;
            }

            if (!BACKEND_URL) {
                console.error("BACKEND_URL environment variable is not set!");
                await message.channel.send("❌ Backend-Konfiguration fehlt. Bitte BACKEND_URL in den Environment Variables setzen.");
                DBS.callNextAction(command, message, args, index + 1);
                return;
            }

            const userMessage = args.join(' ') || action.content || '';

            if (!userMessage.trim()) {
                await message.channel.send("❌ Bitte gib eine Nachricht für Claude ein.");
                DBS.callNextAction(command, message, args, index + 1);
                return;
            }

            // Typing Indicator anzeigen
            await message.channel.sendTyping();

            // Anfrage an die Claude Backend API (Railway URL)
            const response = await axios.post(`${BACKEND_URL}/api/chat`, {
                message: userMessage,
                conversationId: `discord_${message.channel.id}_${message.author.id}`,
                image: null
            }, {
                timeout: 60000 // 60 Sekunden timeout
            });

            const aiResponse = response.data.response;

            // Discord hat ein 2000 Zeichen Limit pro Nachricht
            if (aiResponse.length > 2000) {
                const chunks = splitMessage(aiResponse);
                for (const chunk of chunks) {
                    await message.channel.send(chunk);
                }
            } else {
                await message.channel.send(aiResponse);
            }

        } catch (error) {
            console.error("Claude AI Mod Error:", error);

            let errorMessage = "❌ Fehler bei der Kommunikation mit Claude.";

            if (error.code === 'ECONNREFUSED') {
                errorMessage = `❌ Das Claude Backend ist nicht erreichbar. Bitte überprüfe die BACKEND_URL: ${process.env.BACKEND_URL}`;
            } else if (error.response?.data?.error) {
                errorMessage = `❌ API Fehler: ${error.response.data.error}`;
            } else if (error.message.includes('timeout')) {
                errorMessage = "❌ Timeout - Claude braucht zu lange zum Antworten. Versuche es erneut mit einer kürzeren Frage.";
            } else if (error.message.includes('ENOTFOUND')) {
                errorMessage = `❌ Backend-Domain konnte nicht aufgelöst werden: ${process.env.BACKEND_URL}`;
            }

            await message.channel.send(errorMessage);
        }

        // Nächste Action aufrufen falls vorhanden
        DBS.callNextAction(command, message, args, index + 1);
    }
};

// Hilfsfunktion um lange Nachrichten für Discord zu splitten
function splitMessage(text, maxLength = 2000) {
    const chunks = [];
    let currentChunk = '';

    const lines = text.split('\n');

    for (const line of lines) {
        if (currentChunk.length + line.length + 1 <= maxLength) {
            currentChunk += (currentChunk ? '\n' : '') + line;
        } else {
            if (currentChunk) chunks.push(currentChunk);
            if (line.length > maxLength) {
                // Line ist zu lang, muss geteilt werden
                const lineChunks = splitLongLine(line, maxLength);
                chunks.push(...lineChunks.slice(0, -1));
                currentChunk = lineChunks[lineChunks.length - 1] || '';
            } else {
                currentChunk = line;
            }
        }
    }

    if (currentChunk) chunks.push(currentChunk);
    return chunks;
}

function splitLongLine(line, maxLength) {
    const chunks = [];
    for (let i = 0; i < line.length; i += maxLength) {
        chunks.push(line.slice(i, i + maxLength));
    }
    return chunks;
}
