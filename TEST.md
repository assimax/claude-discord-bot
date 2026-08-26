# Claude Discord Bot Test Script

Dieses Script prüft ob alle notwendigen Dateien vorhanden sind.

## Prüfung der Repository-Struktur

```bash
# 1. Prüfe ob alle Hauptverzeichnisse existieren
echo "Prüfe Verzeichnisstruktur..."
ls -la

# 2. Prüfe Backend-Struktur
echo "Prüfe Backend-Struktur..."
cd backend && ls -la && cd ..

# 3. Prüfe Discord Bot Struktur
echo "Prüfe Discord Bot Struktur..."
cd discord-bot && ls -la && cd ..

# 4. Prüfe ob alle notwendigen Dateien existieren
echo "Prüfe notwendige Dateien..."
if [ -f "README.md" ] && [ -f ".gitignore" ] && [ -f ".env.example" ] && [ -f "package.json" ]; then
    echo "✓ Root Dateien vorhanden"
else
    echo "✗ Fehlende Dateien im Root"
fi

if [ -f "backend/package.json" ] && [ -f "backend/server.js" ] && [ -f "backend/.env.example" ]; then
    echo "✓ Backend Dateien vorhanden"
else
    echo "✗ Fehlende Dateien im Backend"
fi

if [ -f "discord-bot/package.json" ] && [ -f "discord-bot/bot.js" ] && [ -f "discord-bot/.env.example" ]; then
    echo "✓ Discord Bot Dateien vorhanden"
else
    echo "✗ Fehlende Dateien im Discord Bot"
fi

# 5. Prüfe ob der Claude Mod angepasst wurde
echo "Prüfe Claude AI Mod..."
if grep -q "BACKEND_URL" discord-bot/mods/claude-ai-mod.js; then
    echo "✓ Claude Mod verwendet BACKEND_URL Environment Variable"
else
    echo "✗ Claude Mod nicht angepasst für Environment Variables"
fi

if grep -q "localhost:3000" discord-bot/mods/claude-ai-mod.js; then
    echo "✗ ACHTUNG: Claude Mod verwendet immer noch localhost:3000"
else
    echo "✓ Claude Mod verwendet keine hardcoded localhost URL"
fi

# 6. Prüfe ob Discord Token aus Environment Variable gelesen wird
echo "Prüfe Discord Bot Token Handling..."
if grep -q "process.env.DISCORD_TOKEN" discord-bot/bot.js; then
    echo "✓ Bot liest Token aus Environment Variable"
else
    echo "✗ Bot liest Token nicht aus Environment Variable"
fi
```

## Lokaler Test

```bash
# 1. Environment Variables setzen
cp .env.example .env
# Bearbeite .env mit deinen Werten

# 2. Dependencies installieren
npm run install:all

# 3. Backend starten (in Terminal 1)
npm run dev:backend

# 4. Discord Bot starten (in Terminal 2)
npm run dev:bot
```

## Railway Deployment Test

1. Repository auf GitHub pushen
2. Auf Railway neue Services erstellen
3. Environment Variables in Railway setzen
4. Prüfe ob beide Services erfolgreich starten
5. Teste die Backend URL: `https://your-service.railway.app/health`
6. Prüfe ob der Bot online kommt

## Fehlermeldungen und Lösungen

### "DISCORD_TOKEN environment variable is not set!"
- Lösung: Stelle sicher, dass DISCORD_TOKEN in Railway/Environment Variables gesetzt ist

### "BACKEND_URL environment variable is not set!"
- Lösung: Stelle sicher, dass BACKEND_URL in Railway/Environment Variables gesetzt ist

### Claude Backend nicht erreichbar
- Lösung: Prüfe ob der Backend Service auf Railway läuft
- Lösung: Teste die Health Check URL

### Bot kann sich nicht mit Discord verbinden
- Lösung: Prüfe den Discord Bot Token
- Lösung: Stelle sicher, dass der Bot in Discord berechtigt ist
