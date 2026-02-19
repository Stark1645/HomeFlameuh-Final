# HomeFlame - Full Stack Deployment Guide

## 🚀 Project Overview

HomeFlame is a full-stack cloud kitchen platform connecting home chefs with customers. Built with:
- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB + JWT Authentication
- **Deployment**: Render (Backend Web Service + Frontend Static Site)

---

## 📁 Project Structure

```
HomeFlameuh-main/
├── api/                    # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth & role middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── server.js         # Express server
│   ├── package.json
│   └── .env.example
│
├── src/                   # Frontend (React + Vite)
├── components/
├── pages/
├── services/
│   └── apiService.ts     # Axios API client
├── package.json
└── .env.local
```

---

## 🔧 Local Development Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- Git

### Backend Setup

1. **Navigate to API folder**
```bash
cd api
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables in .env**
```env
PORT=5000
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/homeflame?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this
CLIENT_URL=http://localhost:5173
```

5. **Start backend server**
```bash
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to root folder**
```bash
cd ..
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env.local file**
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Start frontend dev server**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 🗄️ Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get connection string and update `DATABASE_URL` in backend `.env`

### Seed Initial Data (Optional)

Create a seed script or use the register endpoint to create users:

**Admin User:**
```bash
POST /api/auth/register
{
  "name": "Admin User",
  "email": "admin@homeflame.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

**Chef User:**
```bash
POST /api/auth/register
{
  "name": "Chef Maria",
  "email": "maria@chef.com",
  "password": "chef123",
  "role": "CHEF",
  "cuisineSpecialty": "Italian",
  "bio": "Authentic Italian recipes"
}
```

**Regular User:**
```bash
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@user.com",
  "password": "user123",
  "role": "USER",
  "address": "123 Main St",
  "phone": "555-1234"
}
```

---

## 🌐 Deployment to Render

### Backend Deployment (Web Service)

1. **Push code to GitHub**
```bash
git add .
git commit -m "Full stack implementation"
git push origin main
```

2. **Create Render Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `homeflame-api`
     - **Root Directory**: `api`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

3. **Add Environment Variables**
   - `DATABASE_URL`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Strong random string (use password generator)
   - `CLIENT_URL`: `https://your-frontend-url.onrender.com`
   - `PORT`: Leave empty (Render auto-assigns)

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy the backend URL: `https://homeflame-api.onrender.com`

### Frontend Deployment (Static Site)

1. **Create Render Static Site**
   - Click "New +" → "Static Site"
   - Connect same GitHub repository
   - Configure:
     - **Name**: `homeflame-frontend`
     - **Root Directory**: Leave empty (root)
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`

2. **Add Environment Variable**
   - `VITE_API_URL`: `https://homeflame-api.onrender.com/api`

3. **Deploy**
   - Click "Create Static Site"
   - Wait for build and deployment
   - Your app will be live at: `https://homeflame-frontend.onrender.com`

4. **Update Backend CORS**
   - Go back to backend web service settings
   - Update `CLIENT_URL` to: `https://homeflame-frontend.onrender.com`
   - Redeploy backend

---

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users (Protected)
- `GET /api/users/profile` - Get current user profile
- `PATCH /api/users/profile` - Update profile

### Chefs
- `GET /api/chefs` - Get all chefs
- `GET /api/chefs/:id` - Get chef by ID
- `PATCH /api/chefs/:id/verify` - Verify chef (ADMIN only)
- `GET /api/chefs/analytics/me` - Get chef analytics (CHEF only)

### Dishes
- `GET /api/dishes/chef/:chefId` - Get dishes by chef
- `POST /api/dishes` - Add dish (CHEF only)
- `PATCH /api/dishes/:id` - Update dish (CHEF only)
- `DELETE /api/dishes/:id` - Delete dish (CHEF only)

### Orders
- `POST /api/orders` - Create order (USER only)
- `GET /api/orders/user` - Get user orders (USER only)
- `GET /api/orders/chef` - Get chef orders (CHEF only)
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id/status` - Update order status (CHEF only)

### Other
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get messages (ADMIN only)
- `GET /api/subscriptions` - Get user subscriptions
- `POST /api/subscriptions` - Create subscription (USER only)
- `GET /api/admin/report` - Get admin report (ADMIN only)

---

## 🧪 Testing

### Test Login Credentials

After seeding data, use these credentials:

**Admin:**
- Email: `admin@homeflame.com`
- Password: `admin123`

**Chef:**
- Email: `maria@chef.com`
- Password: `chef123`

**User:**
- Email: `john@user.com`
- Password: `user123`

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed:**
- Check DATABASE_URL is correct
- Verify IP whitelist in MongoDB Atlas
- Ensure network access is configured

**CORS Errors:**
- Verify CLIENT_URL matches frontend URL exactly
- Check backend is deployed and running

### Frontend Issues

**API Calls Failing:**
- Check VITE_API_URL is correct
- Verify backend is running
- Check browser console for errors

**Build Failures:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

---

## 📱 Mobile Responsive Features

- Hamburger menu on mobile screens
- Sidebar drawer navigation
- Touch-friendly buttons
- Responsive grid layouts
- Mobile-first design approach

---

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Protected API routes
- CORS configuration
- Environment variable protection

---

## 📈 Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Strong JWT_SECRET generated
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Render
- [ ] Environment variables configured
- [ ] CORS properly set up
- [ ] Test all user roles
- [ ] Mobile responsiveness verified
- [ ] API endpoints tested
- [ ] Error handling verified

---

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Render deployment logs
3. Check MongoDB Atlas connection
4. Verify environment variables

---

## 📝 License

MIT License - Feel free to use for your projects!
