
export enum Role {
  USER = 'USER',
  CHEF = 'CHEF',
  ADMIN = 'ADMIN'
}

export enum OrderStatus {
  PLACED = 'PLACED',
  ACCEPTED = 'ACCEPTED',
  PREPARING = 'PREPARING',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum SubscriptionPlan {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY'
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  address?: string;
}

export interface ChefProfile {
  id: number;
  userId: number;
  name: string;
  cuisineSpecialty: string;
  bio: string;
  hygieneRating: number;
  verified: boolean;
  rating: number;
}

export interface Dish {
  id: number;
  chefId: number;
  name: string;
  description: string;
  price: number;
  ingredients: string;
  available: boolean;
}

export interface OrderItem {
  id: number;
  dishId: number;
  dishName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  chefId: number;
  chefName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  items?: OrderItem[];
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

export interface Subscription {
  id: number;
  userId: number;
  chefId: number;
  chefName: string;
  planType: SubscriptionPlan;
  startDate: string;
  active: boolean;
}

export interface ChefAnalytics {
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
  monthlyRevenue: number[];
}

export interface AdminReport {
  totalUsers: number;
  totalChefs: number;
  totalOrders: number;
  totalRevenue: number;
}

export interface ApiResponse<T> {
  timestamp: string;
  status: number;
  message: string;
  data: T;
}
