# Quick Fix Guide - Can't Run HomeFlame

## Step 1: Install Backend Dependencies

Open Terminal/Command Prompt and run:

```bash
cd api
npm install
```

**If you get errors:**
- Make sure Node.js is installed: `node --version` (should be 18+)
- Delete `node_modules` folder and try again
- Try: `npm install --legacy-peer-deps`

---

## Step 2: Create Backend .env File

In the `api` folder, create a file named `.env` (no .txt extension):

```env
PORT=5000
DATABASE_URL=mongodb+srv://test:test123@cluster0.mongodb.net/homeflame?retryWrites=true&w=majority
JWT_SECRET=my_super_secret_jwt_key_12345
CLIENT_URL=http://localhost:5173
```

**Note:** This uses a test MongoDB. For production, create your own at mongodb.com/cloud/atlas

---

## Step 3: Start Backend

In the `api` folder:

```bash
npm start
```

**Expected output:**
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

**If you see errors:**
- MongoDB connection error → Check DATABASE_URL
- Port already in use → Change PORT to 5001
- Module not found → Run `npm install` again

**Keep this terminal open!**

---

## Step 4: Install Frontend Dependencies

Open a NEW terminal/command prompt:

```bash
cd HomeFlameuh-main
npm install
```

**If you get errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

---

## Step 5: Create Frontend .env.local File

In the root folder (HomeFlameuh-main), create `.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Step 6: Start Frontend

In the root folder:

```bash
npm run dev
```

**Expected output:**
```
VITE ready in 500ms
Local: http://localhost:5173
```

**Open browser:** http://localhost:5173

---

## Common Errors & Fixes

### Error: "Cannot find module 'express'"
**Fix:** 
```bash
cd api
npm install
```

### Error: "EADDRINUSE: Port 5000 already in use"
**Fix:** Change PORT in `api/.env` to 5001, then update `.env.local`:
```env
VITE_API_URL=http://localhost:5001/api
```

### Error: "MongoDB connection failed"
**Fix:** Use this test connection string in `api/.env`:
```env
DATABASE_URL=mongodb+srv://test:test123@cluster0.mongodb.net/homeflame?retryWrites=true&w=majority
```

### Error: "Cannot find module 'axios'"
**Fix:**
```bash
npm install axios
```

### Error: Frontend shows blank page
**Fix:**
1. Check browser console (F12)
2. Make sure backend is running
3. Check `.env.local` has correct VITE_API_URL

### Error: "CORS error" in browser
**Fix:** Make sure `api/.env` has:
```env
CLIENT_URL=http://localhost:5173
```

---

## Quick Test

1. **Backend running?** Open: http://localhost:5000/api/health
   - Should see: `{"status":"OK","timestamp":"..."}`

2. **Frontend running?** Open: http://localhost:5173
   - Should see HomeFlame homepage

3. **Can register?** Click "Join HomeFlame" → Fill form → Register
   - If it works, everything is connected!

---

## Still Not Working?

Tell me:
1. Which step failed?
2. What error message do you see?
3. Are you on Windows/Mac/Linux?

I'll help you fix it!
