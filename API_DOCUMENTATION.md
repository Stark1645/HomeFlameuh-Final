# HomeFlame API Documentation

Base URL: `http://localhost:5000/api` (local) or `https://your-backend.onrender.com/api` (production)

## Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Auth Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER",
  "address": "123 Main St",
  "phone": "555-1234",
  "cuisineSpecialty": "Italian",  // Required if role is CHEF
  "bio": "Passionate chef"         // Optional for CHEF
}
```

**Response:**
```json
{
  "timestamp": "2025-01-15T10:30:00.000Z",
  "status": 201,
  "message": "Registration successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "address": "123 Main St",
      "phone": "555-1234"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Same as register

---

## User Endpoints (Protected)

### Get Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

### Update Profile
```http
PATCH /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "address": "456 New St",
  "phone": "555-5678"
}
```

---

## Chef Endpoints

### Get All Chefs
```http
GET /api/chefs
```

**Response:**
```json
{
  "timestamp": "2025-01-15T10:30:00.000Z",
  "status": 200,
  "message": "Success",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439012",
      "name": "Chef Maria",
      "cuisineSpecialty": "Italian",
      "bio": "Authentic Italian recipes",
      "hygieneRating": 5.0,
      "verified": true,
      "rating": 4.8
    }
  ]
}
```

### Get Chef by ID
```http
GET /api/chefs/:id
```

### Verify Chef (ADMIN only)
```http
PATCH /api/chefs/:id/verify
Authorization: Bearer <admin_token>
```

### Get Chef Analytics (CHEF only)
```http
GET /api/chefs/analytics/me
Authorization: Bearer <chef_token>
```

**Response:**
```json
{
  "timestamp": "2025-01-15T10:30:00.000Z",
  "status": 200,
  "message": "Success",
  "data": {
    "totalOrders": 45,
    "totalRevenue": 1250.50,
    "averageRating": 4.8,
    "monthlyRevenue": [450, 600, 800, 1200, 950, 1250.50]
  }
}
```

---

## Dish Endpoints

### Get Dishes by Chef
```http
GET /api/dishes/chef/:chefId
```

### Add Dish (CHEF only)
```http
POST /api/dishes
Authorization: Bearer <chef_token>
Content-Type: application/json

{
  "name": "Margherita Pizza",
  "description": "Classic Italian pizza",
  "price": 15.99,
  "ingredients": "Tomato, Mozzarella, Basil",
  "available": true
}
```

### Update Dish (CHEF only)
```http
PATCH /api/dishes/:id
Authorization: Bearer <chef_token>
Content-Type: application/json

{
  "price": 16.99,
  "available": false
}
```

### Delete Dish (CHEF only)
```http
DELETE /api/dishes/:id
Authorization: Bearer <chef_token>
```

---

## Order Endpoints

### Create Order (USER only)
```http
POST /api/orders
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "chefId": "507f1f77bcf86cd799439011",
  "chefName": "Chef Maria",
  "totalAmount": 25.50,
  "items": [
    {
      "dishId": "507f1f77bcf86cd799439012",
      "dishName": "Margherita Pizza",
      "quantity": 1,
      "price": 15.99
    }
  ]
}
```

### Get User Orders (USER only)
```http
GET /api/orders/user
Authorization: Bearer <user_token>
```

### Get Chef Orders (CHEF only)
```http
GET /api/orders/chef
Authorization: Bearer <chef_token>
```

### Get Order by ID
```http
GET /api/orders/:id
Authorization: Bearer <token>
```

### Update Order Status (CHEF only)
```http
PATCH /api/orders/:id/status
Authorization: Bearer <chef_token>
Content-Type: application/json

{
  "status": "ACCEPTED"
}
```

**Valid Status Values:**
- `PLACED`
- `ACCEPTED`
- `REJECTED`
- `COOKING`
- `ONTHEWAY`
- `DELIVERED`
- `PREPARING`
- `OUT_FOR_DELIVERY`
- `CANCELLED`

---

## Contact Endpoints

### Send Contact Message
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I have a question about..."
}
```

### Get Contact Messages (ADMIN only)
```http
GET /api/contact
Authorization: Bearer <admin_token>
```

---

## Subscription Endpoints

### Get User Subscriptions
```http
GET /api/subscriptions
Authorization: Bearer <user_token>
```

### Create Subscription (USER only)
```http
POST /api/subscriptions
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "chefId": "507f1f77bcf86cd799439011",
  "chefName": "Chef Maria",
  "planType": "MONTHLY"
}
```

**Valid Plan Types:**
- `WEEKLY`
- `MONTHLY`

---

## Admin Endpoints

### Get Admin Report (ADMIN only)
```http
GET /api/admin/report
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "timestamp": "2025-01-15T10:30:00.000Z",
  "status": 200,
  "message": "Success",
  "data": {
    "totalUsers": 150,
    "totalChefs": 25,
    "totalOrders": 450,
    "totalRevenue": 12500.75
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding in production.

## CORS

Backend accepts requests from CLIENT_URL specified in environment variables.

## Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```
