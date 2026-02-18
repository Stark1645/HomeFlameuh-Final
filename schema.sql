
-- HomeFlame Database Schema
CREATE DATABASE IF NOT EXISTS homeflame_db;
USE homeflame_db;

-- User Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'CHEF', 'ADMIN') NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chef Profile Table
CREATE TABLE chef_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE,
    cuisine_specialty VARCHAR(255),
    bio TEXT,
    hygiene_rating DECIMAL(3, 2) DEFAULT 0.0,
    verified BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3, 2) DEFAULT 0.0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Dish Table
CREATE TABLE dishes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    chef_id BIGINT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    ingredients TEXT,
    available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (chef_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order Table
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    chef_id BIGINT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('PLACED', 'ACCEPTED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED') DEFAULT 'PLACED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (chef_id) REFERENCES users(id)
);

-- Order Item Table
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT,
    dish_id BIGINT,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (dish_id) REFERENCES dishes(id)
);
