# 🚀 START HERE - Run HomeFlame in 3 Steps

## Step 1: Run Setup Checker (RECOMMENDED)

Double-click: **`check-setup.bat`**

This will:
- Check if Node.js is installed
- Install all dependencies automatically
- Create .env files with test database
- Tell you if anything is missing

---

## Step 2: Start Backend

Open Command Prompt/Terminal:

```bash
cd api
npm start
```

**Wait for:** `✅ MongoDB Connected` and `🚀 Server running on port 5000`

**Keep this window open!**

---

## Step 3: Start Frontend

Open a NEW Command Prompt/Terminal:

```bash
npm run dev
```

**Wait for:** `Local: http://localhost:5173`

**Open browser:** http://localhost:5173

---

## ✅ You're Done!

The app should now be running. You can:
1. Click "Join HomeFlame" to register
2. Or use test credentials (see QUICK_FIX.md)

---

## ❌ Having Issues?

1. **Read:** `QUICK_FIX.md` - Common errors and solutions
2. **Or tell me:**
   - What error message you see
   - Which step failed
   - Screenshot if possible

---

## 📁 Important Files

- `check-setup.bat` - Automatic setup checker (RUN THIS FIRST!)
- `QUICK_FIX.md` - Troubleshooting guide
- `DEPLOYMENT_GUIDE.md` - Full documentation
- `API_DOCUMENTATION.md` - API reference

---

## 🔧 Manual Setup (if check-setup.bat doesn't work)

### Backend:
```bash
cd api
npm install
copy .env.example .env
npm start
```

### Frontend:
```bash
npm install
echo VITE_API_URL=http://localhost:5000/api > .env.local
npm run dev
```

---

Need help? Tell me what's not working! 🙋‍♂️
