# HomeFlame Backend - Spring Boot Setup

## Prerequisites
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

## Setup Instructions

### 1. Configure MySQL Database
Ensure MySQL is running and update credentials in `src/main/resources/application.properties` if needed:
```properties
spring.datasource.username=root
spring.datasource.password=root
```

The database `homeflame` will be created automatically.

### 2. Install Dependencies
```bash
cd backend
mvn clean install
```

### 3. Run the Application
```bash
mvn spring-boot:run
```

Backend will start at: **http://localhost:8080**

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact/admin/messages` - Get all messages

### Subscriptions
- `POST /api/subscriptions` - Create subscription
- `GET /api/subscriptions/user/{userId}` - Get user subscriptions
- `GET /api/subscriptions/chef/{chefId}` - Get chef subscriptions

### Analytics
- `GET /api/chef/analytics/{chefId}` - Get chef analytics
- `GET /api/admin/reports/summary` - Get admin summary

## CORS Configuration
Backend accepts requests from: **http://localhost:3000**

## Project Structure
```
backend/
├── pom.xml
├── src/main/
│   ├── java/com/homeflame/
│   │   ├── HomeFlameApplication.java
│   │   ├── config/
│   │   │   ├── CorsConfig.java
│   │   │   └── SecurityConfig.java
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── repository/
│   │   └── service/
│   └── resources/
│       └── application.properties
```

## Notes
- All existing Java files remain unchanged
- Security is configured to permit all requests for testing
- JPA will auto-create database tables on startup
