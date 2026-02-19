# HomeFlame - Cloud Kitchen Platform

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## 🔥 Full-Stack Production Application

HomeFlame connects home chefs with customers seeking authentic, home-cooked meals. Built with modern technologies and production-ready architecture.

### Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite
- Tailwind CSS
- Axios for API calls
- Chart.js for analytics
- Google Gemini AI integration

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt password hashing
- Role-based access control

**Deployment:**
- Backend: Render Web Service
- Frontend: Render Static Site
- Database: MongoDB Atlas

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Git

### Local Development

**1. Clone repository**
```bash
git clone <your-repo-url>
cd HomeFlameuh-main
```

**2. Setup Backend**
```bash
cd api
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm start
```

**3. Setup Frontend**
```bash
cd ..
npm install
cp .env.example .env.local
# Edit .env.local with backend URL
npm run dev
```

**4. Open browser**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 📚 Documentation

- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[API Documentation](API_DOCUMENTATION.md)** - All API endpoints
- **[Backend README](api/README.md)** - Backend setup

---

## ✨ Features

### User Features
- Browse local home chefs
- View chef profiles and menus
- Place orders
- Track order status in real-time
- Subscribe to weekly/monthly meal plans
- AI-powered meal recommendations

### Chef Features
- Manage kitchen profile
- Add/edit menu items
- Receive and manage orders
- Update order status
- View analytics and revenue
- AI-generated dish descriptions

### Admin Features
- Verify chef accounts
- View platform statistics
- Monitor all orders
- Access contact messages

### Mobile Responsive
- Hamburger menu navigation
- Sidebar drawer on mobile
- Touch-friendly interface
- Mobile-first design

---

## 🔐 Authentication & Security

- JWT token-based authentication
- Secure password hashing with bcrypt
- Role-based access control (USER, CHEF, ADMIN)
- Protected API routes
- CORS configuration
- Environment variable protection

---

## 🗄️ Database Schema

### User
- name, email, password (hashed)
- role (USER | CHEF | ADMIN)
- address, phone

### ChefProfile
- userId (ref User)
- cuisineSpecialty, bio
- hygieneRating, rating
- verified status

### Dish
- chefId (ref User)
- name, description, price
- ingredients, availability

### Order
- userId, chefId
- totalAmount, status
- items array
- timestamps

### Subscription
- userId, chefId
- planType (WEEKLY | MONTHLY)
- active status

### ContactMessage
- name, email, message
- timestamp

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Users (Protected)
- `GET /api/users/profile` - Get profile
- `PATCH /api/users/profile` - Update profile

### Chefs
- `GET /api/chefs` - List all chefs
- `GET /api/chefs/:id` - Get chef details
- `PATCH /api/chefs/:id/verify` - Verify chef (Admin)
- `GET /api/chefs/analytics/me` - Chef analytics (Chef)

### Dishes
- `GET /api/dishes/chef/:chefId` - Get chef's dishes
- `POST /api/dishes` - Add dish (Chef)
- `PATCH /api/dishes/:id` - Update dish (Chef)
- `DELETE /api/dishes/:id` - Delete dish (Chef)

### Orders
- `POST /api/orders` - Create order (User)
- `GET /api/orders/user` - User's orders (User)
- `GET /api/orders/chef` - Chef's orders (Chef)
- `GET /api/orders/:id` - Order details
- `PATCH /api/orders/:id/status` - Update status (Chef)

### Other
- `POST /api/contact` - Send message
- `GET /api/subscriptions` - User subscriptions
- `POST /api/subscriptions` - Create subscription
- `GET /api/admin/report` - Admin report (Admin)

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for details.

---

## 🎨 UI/UX Features

- Modern, clean design with Tailwind CSS
- Smooth animations and transitions
- Responsive grid layouts
- Interactive charts for analytics
- AI-powered features with visual feedback
- Toast notifications
- Loading states
- Error handling

---

## 🤖 AI Integration

- Smart chef search
- Meal recommendations
- Dish description generation
- Chef bio enhancement
- Menu optimization
- Weekly meal planning
- Order status commentary

---

## 📦 Deployment

### Backend (Render Web Service)
1. Push to GitHub
2. Create Render Web Service
3. Set root directory: `api`
4. Add environment variables
5. Deploy

### Frontend (Render Static Site)
1. Create Render Static Site
2. Build command: `npm install && npm run build`
3. Publish directory: `dist`
4. Add `VITE_API_URL` environment variable
5. Deploy

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 🧪 Testing

Create test accounts:

**Admin:**
```json
{
  "email": "admin@homeflame.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

**Chef:**
```json
{
  "email": "chef@homeflame.com",
  "password": "chef123",
  "role": "CHEF"
}
```

**User:**
```json
{
  "email": "user@homeflame.com",
  "password": "user123",
  "role": "USER"
}
```

---

## 🛠️ Development

### Backend Development
```bash
cd api
npm run dev  # Auto-restart on changes
```

### Frontend Development
```bash
npm run dev  # Hot reload enabled
```

### Build for Production
```bash
npm run build
```

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
DATABASE_URL=mongodb+srv://...
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
VITE_GEMINI_API_KEY=your_gemini_key
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

---

## 📄 License

MIT License - Feel free to use for your projects!

---

## 🆘 Support

For issues:
1. Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
2. Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
3. Check deployment logs
4. Verify environment variables

---

## 🎯 Project Status

✅ Full-stack implementation complete
✅ Authentication & authorization
✅ Role-based access control
✅ Mobile responsive design
✅ Production-ready architecture
✅ Deployment documentation
✅ API documentation

---

Built with ❤️ for connecting home chefs with food lovers
