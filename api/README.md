# HomeFlame Backend API

Node.js + Express + MongoDB backend for HomeFlame cloud kitchen platform.

## Quick Start

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string and JWT secret
```

3. **Run server**
```bash
npm start
```

Server runs on port specified in `.env` (default: 5000)

## Environment Variables

Required variables in `.env`:

```env
PORT=5000
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/homeflame
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
```

## API Routes

All routes are prefixed with `/api`

- `/api/auth` - Authentication (register, login)
- `/api/users` - User management
- `/api/chefs` - Chef profiles
- `/api/dishes` - Menu items
- `/api/orders` - Order management
- `/api/contact` - Contact messages
- `/api/subscriptions` - Meal subscriptions
- `/api/admin` - Admin reports

See `API_DOCUMENTATION.md` for detailed endpoint documentation.

## Database Models

- **User** - User accounts with roles (USER, CHEF, ADMIN)
- **ChefProfile** - Chef-specific information
- **Dish** - Menu items
- **Order** - Customer orders
- **ContactMessage** - Contact form submissions
- **Subscription** - Meal plan subscriptions

## Authentication

Uses JWT tokens. Include in requests:
```
Authorization: Bearer <token>
```

## Deployment

Designed for Render Web Service deployment. See `DEPLOYMENT_GUIDE.md`.
