# 🚀 Production Deployment Checklist

## ✅ Backend (Render Web Service)

### Environment Variables (CRITICAL)
```
PORT=5000
DATABASE_URL=mongodb+srv://homeflame:homeflame123@homeflame.002q1eh.mongodb.net/homeflame
JWT_SECRET=homeflame_super_secret_jwt_key_2024_production
CLIENT_URL=https://homeflameuh-final-1.onrender.com
NODE_ENV=production
```

### Settings
- **Root Directory**: `api`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Auto-Deploy**: Yes

### Test Backend
Visit: `https://homeflameuh-backend.onrender.com/`
Should return: `{"message":"HomeFlame API Running","timestamp":"..."}`

---

## ✅ Frontend (Render Static Site)

### Environment Variables (CRITICAL)
```
VITE_API_URL=https://homeflameuh-backend.onrender.com/api
VITE_GEMINI_API_KEY=AIzaSyDrqoOm5plmj24o2QB99ajuezigdWNgaEY
```

### Settings
- **Root Directory**: (leave empty)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Auto-Deploy**: Yes

---

## 🔍 Testing Login

### Open Browser Console
1. Go to: `https://homeflameuh-final-1.onrender.com`
2. Open DevTools (F12)
3. Go to Console tab
4. Try login

### Expected Console Output
```
🔗 API Base URL: https://homeflameuh-backend.onrender.com/api
📤 API Request: POST /auth/login
✅ API Response: /auth/login 200
```

### If Login Fails
Check console for:
- ❌ CORS error → Backend CLIENT_URL wrong
- ❌ 404 error → Backend not deployed
- ❌ 500 error → Database connection issue
- ❌ Network error → Backend URL wrong

---

## 🔧 Common Issues

### Issue: CORS Error
**Fix**: Update backend `CLIENT_URL` to exact frontend URL

### Issue: 401 Unauthorized
**Fix**: Check JWT_SECRET is set in backend

### Issue: 500 Internal Server Error
**Fix**: Check DATABASE_URL is correct in backend

### Issue: Network Error
**Fix**: Verify backend is running at correct URL

---

## 📝 Admin Account

After backend deploys, create admin:
```bash
cd api
node createAdmin.js
```

**Credentials:**
- Email: `admin@homeflame.com`
- Password: `admin123`

---

## ✨ Final Verification

- [ ] Backend root route works
- [ ] Frontend loads
- [ ] Login works
- [ ] Registration works
- [ ] JWT token saved in localStorage
- [ ] API calls include Authorization header
- [ ] CORS allows frontend domain
- [ ] Database connected
- [ ] Admin account created

---

## 🎯 URLs

- **Frontend**: https://homeflameuh-final-1.onrender.com
- **Backend**: https://homeflameuh-backend.onrender.com
- **Backend API**: https://homeflameuh-backend.onrender.com/api
- **Health Check**: https://homeflameuh-backend.onrender.com/api/health

---

**All set! Deploy and test!** 🔥
