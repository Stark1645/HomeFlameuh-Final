# QUICK FIX - Run These Commands

1. Stop the dev server (Ctrl+C)

2. Clear cache and reinstall:
```bash
npm install
```

3. Start fresh:
```bash
npm run dev
```

The issue was the importmap in index.html conflicting with package.json dependencies.
