# 🚀 Railway Deployment Guide

Diese Anleitung beschreibt das Deployment des Claude Discord Bot Systems auf Railway.

## 📋 Voraussetzungen

1. **GitHub Account** (oder andere Git-Plattform)
2. **Railway Account** (railway.app)
3. **Discord Bot Token** (von Discord Developer Portal)
4. **Anthropic API Key** (von Anthropic)

## 🔧 Setup-Schritte

### 1. GitHub Repository erstellen

```bash
cd C:\Users\msmsm\.local\bin\claude-discord-bot
git init
git add .
git commit -m "Initial commit: Claude Discord Bot with Railway deployment"
git branch -M main
git remote add origin https://github.com/your-username/claude-discord-bot.git
git push -u origin main
```

### 2. Railway Project erstellen

1. Auf [railway.app](https://railway.app) anmelden
2. Ein Projekt erstellen und das GitHub-Repository verbinden
3. Zwei Services aus demselben Repository anlegen
4. Beim Backend-Service unter Settings als Root Directory `/backend` setzen
5. Beim Discord-Bot-Service als Root Directory `/discord-bot` setzen

### 3. Environment Variables konfigurieren

In Railway Project Settings → Variables folgende Werte setzen:

#### **Backend Service Environment:**
```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
PORT=3000
```

#### **Discord Bot Service Environment:**
```
DISCORD_TOKEN=your_discord_bot_token_here
BACKEND_URL=https://your-backend-service.railway.app
ALLOWED_CHANNEL_ID=your_channel_id_here
```

**Wichtig**: Ersetze `your-backend-service` mit dem tatsächlichen Namen deines Backend-Services auf Railway.

### 4. Services starten

1. Railway startet automatisch beide Services nach dem ersten Deployment
2. Du kannst die Logs in Railway überwachen
3. Prüfe ob beide Services korrekt laufen

## 🌐 Service URLs

Nach erfolgreichem Deployment:

- **Backend URL**: `https://your-backend-service.railway.app`
- **Health Check**: `https://your-backend-service.railway.app/health`
- **API Endpoint**: `https://your-backend-service.railway.app/api/chat`

## 🔍 Troubleshooting

### Backend startet nicht
1. Prüfe die Logs in Railway
2. Stelle sicher, dass `ANTHROPIC_API_KEY` korrekt gesetzt ist
3. Prüfe ob Port 3000 korrekt exponiert wird

### Discord Bot startet nicht
1. Prüfe ob `DISCORD_TOKEN` korrekt ist
2. Prüfe ob `BACKEND_URL` die korrekte Railway URL ist
3. Prüfe ob der Bot in Discord berechtigt ist

### Bot kann nicht mit Backend kommunizieren
1. Prüfe ob beide Services auf Railway laufen
2. Prüfe ob `BACKEND_URL` mit der tatsächlichen Backend-URL übereinstimmt
3. Teste die Backend-URL direkt mit einem Browser oder curl:
   ```bash
   curl https://your-backend-service.railway.app/health
   ```

## 📈 Monitoring

Railway bietet:
- Live Logs für beide Services
- Resource Monitoring (CPU, Memory)
- Automatic Scaling
- Domain Management

## 🔄 Updates deployen

```bash
# Lokale Änderungen
git add .
git commit -m "Update description"
git push

# Railway deployt automatisch neue Versionen
```

## 📝 Wichtige Notizen

1. **Backend URL**: Der Discord Bot benötigt die öffentliche URL des Backends
2. **Channel Restriction**: Nur der Channel mit der `ALLOWED_CHANNEL_ID` kann mit Claude interagieren
3. **API Limits**: Beachte die Anthropic API Limits und Pricing
4. **Security**: Stelle sicher, dass keine Secrets in GitHub commits landen

## 🆘 Support

Bei Problemen:
1. Prüfe die Railway Logs
2. Stelle sicher, dass alle Environment Variables korrekt gesetzt sind
3. Teste die Services lokal bevor du auf Railway deployst
