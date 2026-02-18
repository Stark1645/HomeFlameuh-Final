
import { Role, OrderStatus, User, ChefProfile, Dish, Order, ApiResponse, ContactMessage, Subscription, SubscriptionPlan, ChefAnalytics, AdminReport } from '../types';

// Mock DB State
const MOCK_USERS: User[] = [
  { id: 1, name: 'John Admin', email: 'admin@homeflame.com', role: Role.ADMIN },
  { id: 2, name: 'Chef Maria', email: 'maria@chef.com', role: Role.CHEF, address: '123 Kitchen Lane', phone: '123-456-7890' },
  { id: 3, name: 'Chef Robert', email: 'robert@chef.com', role: Role.CHEF, address: '456 Gourmet Road' },
  { id: 4, name: 'Alice Customer', email: 'alice@user.com', role: Role.USER, address: '789 Home Street', phone: '987-654-3210' },
];

const MOCK_CHEF_PROFILES: ChefProfile[] = [
  { id: 1, userId: 2, name: 'Chef Maria', cuisineSpecialty: 'Italian', bio: 'Authentic pasta recipes passed down generations.', hygieneRating: 5.0, verified: true, rating: 4.8 },
  { id: 2, userId: 3, name: 'Chef Robert', cuisineSpecialty: 'Modern Indian', bio: 'Fusion flavors with farm-fresh spices.', hygieneRating: 4.5, verified: false, rating: 4.2 },
];

const MOCK_DISHES: Dish[] = [
  { id: 1, chefId: 2, name: 'Classic Lasagna', description: 'Layers of rich meat sauce and creamy béchamel.', price: 18.5, ingredients: 'Pasta, Beef, Cheese, Tomato', available: true },
  { id: 2, chefId: 2, name: 'Tiramisu', description: 'Homemade coffee-soaked dessert.', price: 8.0, ingredients: 'Coffee, Mascarpone, Cocoa', available: true },
  { id: 3, chefId: 3, name: 'Butter Chicken', description: 'Tender chicken in a velvety tomato gravy.', price: 15.0, ingredients: 'Chicken, Butter, Spices', available: true },
];

let MOCK_ORDERS: Order[] = [
  { id: 1, userId: 4, chefId: 2, chefName: 'Chef Maria', totalAmount: 26.5, status: OrderStatus.DELIVERED, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 2, userId: 4, chefId: 2, chefName: 'Chef Maria', totalAmount: 18.5, status: OrderStatus.PREPARING, createdAt: new Date().toISOString() },
];

let MOCK_MESSAGES: ContactMessage[] = [];
let MOCK_SUBSCRIPTIONS: Subscription[] = [
  { id: 1, userId: 4, chefId: 2, chefName: 'Chef Maria', planType: SubscriptionPlan.MONTHLY, startDate: new Date().toISOString(), active: true }
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const mockApi = {
  auth: {
    login: async (email: string): Promise<ApiResponse<{user: User, token: string}>> => {
      await delay(800);
      const user = MOCK_USERS.find(u => u.email === email);
      if (!user) throw new Error("User not found");
      return { timestamp: new Date().toISOString(), status: 200, message: "Login successful", data: { user, token: 'mock-jwt-token' } };
    }
  },
  users: {
    updateProfile: async (id: number, data: Partial<User>): Promise<ApiResponse<User>> => {
      await delay(500);
      const userIdx = MOCK_USERS.findIndex(u => u.id === id);
      if (userIdx !== -1) {
        MOCK_USERS[userIdx] = { ...MOCK_USERS[userIdx], ...data };
        return { timestamp: new Date().toISOString(), status: 200, message: "Profile updated", data: MOCK_USERS[userIdx] };
      }
      throw new Error("User not found");
    }
  },
  chefs: {
    getAll: async (): Promise<ApiResponse<ChefProfile[]>> => {
      await delay(500);
      return { timestamp: new Date().toISOString(), status: 200, message: "Success", data: MOCK_CHEF_PROFILES };
    },
    getById: async (id: number): Promise<ApiResponse<ChefProfile>> => {
      await delay(500);
      const chef = MOCK_CHEF_PROFILES.find(c => c.id === id);
      if (!chef) throw new Error("Chef not found");
      return { timestamp: new Date().toISOString(), status: 200, message: "Success", data: chef };
    },
    verify: async (chefId: number): Promise<ApiResponse<void>> => {
      const chef = MOCK_CHEF_PROFILES.find(c => c.id === chefId);
      if (chef) chef.verified = true;
      return { timestamp: new Date().toISOString(), status: 200, message: "Chef verified", data: undefined };
    },
    getAnalytics: async (chefId: number): Promise<ApiResponse<ChefAnalytics>> => {
      await delay(600);
      const orders = MOCK_ORDERS.filter(o => o.chefId === chefId);
      const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
      return {
        timestamp: new Date().toISOString(),
        status: 200,
        message: "Success",
        data: {
          totalOrders: orders.length,
          totalRevenue: totalRevenue,
          averageRating: 4.8,
          monthlyRevenue: [450, 600, 800, 1200, 950, totalRevenue]
        }
      };
    }
  },
  dishes: {
    getByChefId: async (chefId: number): Promise<ApiResponse<Dish[]>> => {
      await delay(500);
      return { timestamp: new Date().toISOString(), status: 200, message: "Success", data: MOCK_DISHES.filter(d => d.chefId === chefId) };
    },
    add: async (dish: Partial<Dish>): Promise<ApiResponse<Dish>> => {
      const newDish = { ...dish, id: MOCK_DISHES.length + 1 } as Dish;
      MOCK_DISHES.push(newDish);
      return { timestamp: new Date().toISOString(), status: 201, message: "Dish added", data: newDish };
    }
  },
  orders: {
    getById: async (orderId: number): Promise<ApiResponse<Order>> => {
      await delay(400);
      const order = MOCK_ORDERS.find(o => o.id === orderId);
      if (!order) throw new Error("Order not found");
      return { timestamp: new Date().toISOString(), status: 200, message: "Success", data: order };
    },
    getByUserId: async (userId: number): Promise<ApiResponse<Order[]>> => {
      await delay(500);
      return { timestamp: new Date().toISOString(), status: 200, message: "Success", data: MOCK_ORDERS.filter(o => o.userId === userId) };
    },
    getByChefId: async (chefId: number): Promise<ApiResponse<Order[]>> => {
      await delay(500);
      return { timestamp: new Date().toISOString(), status: 200, message: "Success", data: MOCK_ORDERS.filter(o => o.chefId === chefId) };
    },
    create: async (order: Partial<Order>): Promise<ApiResponse<Order>> => {
      const newOrder = { ...order, id: MOCK_ORDERS.length + 1, createdAt: new Date().toISOString(), status: OrderStatus.PLACED } as Order;
      MOCK_ORDERS.push(newOrder);
      return { timestamp: new Date().toISOString(), status: 201, message: "Order placed", data: newOrder };
    },
    updateStatus: async (orderId: number, status: OrderStatus): Promise<ApiResponse<void>> => {
      const order = MOCK_ORDERS.find(o => o.id === orderId);
      if (order) order.status = status;
      return { timestamp: new Date().toISOString(), status: 200, message: "Status updated", data: undefined };
    }
  },
  contact: {
    send: async (msg: ContactMessage): Promise<ApiResponse<void>> => {
      await delay(500);
      MOCK_MESSAGES.push({ ...msg, id: MOCK_MESSAGES.length + 1, createdAt: new Date().toISOString() });
      return { timestamp: new Date().toISOString(), status: 200, message: "Message sent", data: undefined };
    },
    getMessages: async (): Promise<ApiResponse<ContactMessage[]>> => {
      return { timestamp: new Date().toISOString(), status: 200, message: "Success", data: MOCK_MESSAGES };
    }
  },
  subscriptions: {
    getByUserId: async (userId: number): Promise<ApiResponse<Subscription[]>> => {
      await delay(400);
      return { timestamp: new Date().toISOString(), status: 200, message: "Success", data: MOCK_SUBSCRIPTIONS.filter(s => s.userId === userId) };
    },
    subscribe: async (sub: Partial<Subscription>): Promise<ApiResponse<Subscription>> => {
      await delay(600);
      const newSub = { ...sub, id: MOCK_SUBSCRIPTIONS.length + 1, startDate: new Date().toISOString(), active: true } as Subscription;
      MOCK_SUBSCRIPTIONS.push(newSub);
      return { timestamp: new Date().toISOString(), status: 201, message: "Subscribed", data: newSub };
    }
  },
  admin: {
    getReport: async (): Promise<ApiResponse<AdminReport>> => {
      await delay(800);
      return {
        timestamp: new Date().toISOString(),
        status: 200,
        message: "Success",
        data: {
          totalUsers: MOCK_USERS.length,
          totalChefs: MOCK_CHEF_PROFILES.length,
          totalOrders: MOCK_ORDERS.length,
          totalRevenue: MOCK_ORDERS.reduce((a, b) => a + b.totalAmount, 0)
        }
      };
    }
  }
};
