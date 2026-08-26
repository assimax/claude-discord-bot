# GitHub Upload Anleitung für Claude Discord Bot

## 📋 Repository ist fertig vorbereitet

Das vollständige Repository liegt in:
`C:\Users\msmsm\.local\bin\claude-discord-bot`

## 🚀 Option 1: Git installieren und pushen (empfohlen)

### 1. Git installieren
- Download: https://git-scm.com/download/win
- Standard-Einstellungen wählen
- Nach Installation PowerShell/CMD neu starten

### 2. Repository pushen
```bash
# In PowerShell als Administrator:
cd "C:\Users\msmsm\.local\bin\claude-discord-bot"

# Git initialisieren
git init

# Alle Dateien hinzufügen
git add .

# Commit erstellen
git commit -m "Initial commit: Claude Discord Bot mit Railway Deployment"

# Branch umbenennen
git branch -M main

# GitHub Repository URL (ersetze DEIN-USERNAME):
git remote add origin https://github.com/DEIN-USERNAME/claude-discord-bot.git

# Auf GitHub pushen
git push -u origin main
```

## 🎯 Option 2: Manuell auf GitHub hochladen

### 1. GitHub Repository erstellen
1. Gehe zu https://github.com
2. Einloggen/Registrieren
3. Klicke auf "+" → "New repository"
4. Name: `claude-discord-bot`
5. **Wichtig**: NICHT "Initialize with README" auswählen
6. Auf "Create repository" klicken

### 2. Dateien hochladen
Auf der neuen Repository-Seite:
1. Suche nach "uploading an existing file"
2. Oder klicke direkt auf "upload files"
3. **Gehe zu diesem Ordner**: `C:\Users\msmsm\.local\bin\claude-discord-bot`
4. **Wähle ALLE Dateien und Ordner aus**:
   - `README.md`
   - `.gitignore`
   - `.env.example`
   - `package.json`
   - `railway.json`
   - `DEPLOYMENT.md`
   - `STRUCTURE_SUMMARY.md`
   - `TEST.md`
   - Den kompletten `backend/` Ordner
   - Den kompletten `discord-bot/` Ordner (außer node_modules)
5. Auf "Commit changes" klicken

## 📁 Wichtige Dateien im Repository

### Root Ebene:
- `README.md` - Hauptdokumentation
- `DEPLOYMENT.md` - Detaillierte Railway-Anleitung
- `.env.example` - Environment Variables Template
- `railway.json` - Railway Projekt-Konfiguration
- `package.json` - Monorepo Workspace

### Backend Service (`backend/`):
- `server.js` - Express Server mit Claude API
- `package.json` - Backend Dependencies
- `.env.example` - Backend Environment Variables
- `railway.toml` - Railway Service Config

### Discord Bot Service (`discord-bot/`):
- `bot.js` - Haupt-Bot Datei (angepasst für ENV-Variablen)
- `mods/claude-ai-mod.js` - Claude Mod mit BACKEND_URL Unterstützung
- `package.json` - Bot Dependencies
- `.env.example` - Bot Environment Variables
- `railway.toml` - Railway Service Config

## ✅ Was ist angepasst worden?

1. **Keine hardcoded localhost URLs mehr** - Stattdessen `process.env.BACKEND_URL`
2. **Discord Token aus Environment Variable** - Nicht mehr hardcoded
3. **Railway-ready** - Separate Service-Konfigurationen
4. **Vollständige Dokumentation** - Schritt-für-Schritt Anleitungen

## 🎯 Nach erfolgreichem GitHub Upload

### Railway Deployment:
1. Auf railway.app gehen
2. "New Project" → "Deploy from GitHub repo"
3. Repository `claude-discord-bot` auswählen
4. Railway erkennt automatisch zwei Services

### Environment Variables in Railway setzen:
```
# Backend Service:
ANTHROPIC_API_KEY=dein_anthropic_api_key
PORT=3000

# Discord Bot Service:
DISCORD_TOKEN=dein_discord_bot_token
BACKEND_URL=https://dein-backend-service.railway.app
ALLOWED_CHANNEL_ID=dein_discord_channel_id
```

## 🆘 Hilfe bei Problemen

### "Git is not recognized"
- Git installieren von https://git-scm.com/download/win
- Nach Installation PowerShell neu starten

### "Permission denied" bei git push
- GitHub Personal Access Token erstellen (Settings → Developer settings → Personal access tokens)
- Token mit repo-Berechtigungen erstellen
- Statt Passwort das Token verwenden

### Dateien zu groß für GitHub Web Upload
- Git installieren und per CLI pushen
- Oder große Dateien (node_modules) ausschließen

## 📞 Support

Bei weiteren Fragen:
1. Prüfe die `DEPLOYMENT.md` für detaillierte Railway-Schritte
2. Siehe `TEST.md` für Troubleshooting
3. Die `STRUCTURE_SUMMARY.md` zeigt alle Anpassungen

**Das Repository ist komplett fertig für Railway!** 🎉
