# Claude Discord Bot & Backend

Ein vollständiges Claude AI Discord Bot System mit separatem Backend für Railway Deployment.

## 📁 Projektstruktur

```
claude-discord-bot/
├── backend/                    # Claude Web Interface Backend
│   ├── server.js              # Express Server
│   ├── package.json
│   └── .env.example
├── discord-bot/               # Discord Bot
│   ├── bot.js
│   ├── mods/
│   ├── Classes/
│   ├── Handlers/
│   ├── BotData/
│   ├── package.json
│   └── .env.example
├── .gitignore
├── README.md
├── railway.json
├── .env.example
└── package.json               # Monorepo Workspace
```

## 🚀 Railway Deployment

Dieses Projekt ist für Railway Deployment mit zwei separaten Services konfiguriert:

### Services:
1. **Backend Service**: Claude API Interface
2. **Discord Bot Service**: Discord Bot Integration

### Deployment Steps:

1. **Repository auf GitHub pushen**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/claude-discord-bot.git
   git push -u origin main
   ```

2. **Auf Railway deployen**
   - Auf railway.app anmelden
   - Zwei Services aus demselben GitHub-Repository erstellen
   - Beim Backend-Service als Root Directory `/backend` setzen
   - Beim Bot-Service als Root Directory `/discord-bot` setzen

3. **Environment Variables setzen**
   - In Railway Project Settings:
     ```
     # Backend Service
     ANTHROPIC_API_KEY=your_key_here
     PORT=3000
     
     # Discord Bot Service  
     DISCORD_TOKEN=your_bot_token_here
     BACKEND_URL=https://your-backend-service.railway.app
     ALLOWED_CHANNEL_ID=your_channel_id_here
     ```

## 🔧 Lokale Entwicklung

### Voraussetzungen
- Node.js 16+ und npm
- Discord Bot Token
- Anthropic API Key

### Installation
```bash
# Repository klonen
git clone https://github.com/your-username/claude-discord-bot.git
cd claude-discord-bot

# Alle Dependencies installieren
npm run install:all

# Environment Variables setzen
cp .env.example .env
# .env Datei mit deinen Werten bearbeiten
```

### Entwicklung starten
```bash
# Backend starten (Port 3000)
npm run dev:backend

# Discord Bot starten (in separatem Terminal)
npm run dev:bot
```

## 🌐 Backend API

Der Backend-Server bietet folgende Endpoints:

- `POST /api/chat` - Claude Chat Integration
- `GET /health` - Health Check für Railway

### Beispiel Request:
```json
{
  "message": "Hallo Claude!",
  "conversationId": "unique_conversation_id",
  "image": null
}
```

## 🤖 Discord Bot

Der Bot verfügt über:
- Claude AI Integration via Mod-System
- Channel-Restriktionen (nur bestimmte Channels)
- Error Handling
- Timeout Management (60 Sekunden)

### Bot Commands:
Der Bot reagiert auf Commands basierend auf der `prefix` Einstellung (derzeit: `&`), zum Beispiel `&claude Hallo`.

## 🔐 Environment Variables

### Backend (.env):
```
ANTHROPIC_API_KEY=your_anthropic_api_key
PORT=3000
PUBLIC_URL=https://your-backend-service.railway.app
```

### Discord Bot (.env):
```
DISCORD_TOKEN=your_discord_bot_token
BACKEND_URL=https://your-backend-service.railway.app
ALLOWED_CHANNEL_ID=discord_channel_id
```

## 🛠️ Fehlerbehebung

### Bot verbindet nicht mit Backend
1. Prüfe ob `BACKEND_URL` korrekt gesetzt ist
2. Prüfe ob Backend auf Railway läuft (`/health` endpoint)
3. Prüfe die Railway Logs

### Claude API Fehler
1. Prüfe ob `ANTHROPIC_API_KEY` korrekt ist
2. Prüfe API Limits und Quotas

## 📄 Lizenz

MIT
