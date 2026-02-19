import axios from 'axios';
import { ApiResponse, User, ChefProfile, Dish, Order, OrderStatus, ContactMessage, Subscription, ChefAnalytics, AdminReport } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('hf_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const apiService = {
  auth: {
    login: async (email: string, password: string): Promise<ApiResponse<{user: User, token: string}>> => {
      const { data } = await api.post('/auth/login', { email, password });
      return data;
    },
    register: async (userData: any): Promise<ApiResponse<{user: User, token: string}>> => {
      const { data } = await api.post('/auth/register', userData);
      return data;
    }
  },
  users: {
    updateProfile: async (profileData: Partial<User>): Promise<ApiResponse<User>> => {
      const { data } = await api.patch('/users/profile', profileData);
      return data;
    },
    getProfile: async (): Promise<ApiResponse<User>> => {
      const { data } = await api.get('/users/profile');
      return data;
    }
  },
  chefs: {
    getAll: async (): Promise<ApiResponse<ChefProfile[]>> => {
      const { data } = await api.get('/chefs');
      return data;
    },
    getAllForAdmin: async (): Promise<ApiResponse<ChefProfile[]>> => {
      const { data } = await api.get('/chefs/all/admin');
      return data;
    },
    getById: async (id: number): Promise<ApiResponse<ChefProfile>> => {
      const { data } = await api.get(`/chefs/${id}`);
      return data;
    },
    verify: async (chefId: number): Promise<ApiResponse<void>> => {
      const { data } = await api.patch(`/chefs/${chefId}/verify`);
      return data;
    },
    getAnalytics: async (): Promise<ApiResponse<ChefAnalytics>> => {
      const { data } = await api.get('/chefs/analytics/me');
      return data;
    }
  },
  dishes: {
    getByChefId: async (chefId: number): Promise<ApiResponse<Dish[]>> => {
      const { data } = await api.get(`/dishes/chef/${chefId}`);
      return data;
    },
    getAllForAdmin: async (): Promise<ApiResponse<Dish[]>> => {
      const { data } = await api.get('/dishes/all/admin');
      return data;
    },
    add: async (dish: Partial<Dish>): Promise<ApiResponse<Dish>> => {
      const { data } = await api.post('/dishes', dish);
      return data;
    },
    update: async (id: number, dish: Partial<Dish>): Promise<ApiResponse<Dish>> => {
      const { data } = await api.patch(`/dishes/${id}`, dish);
      return data;
    },
    approve: async (id: number): Promise<ApiResponse<Dish>> => {
      const { data } = await api.patch(`/dishes/${id}/approve`);
      return data;
    },
    delete: async (id: number): Promise<ApiResponse<void>> => {
      const { data } = await api.delete(`/dishes/${id}`);
      return data;
    }
  },
  orders: {
    getById: async (orderId: number): Promise<ApiResponse<Order>> => {
      const { data } = await api.get(`/orders/${orderId}`);
      return data;
    },
    getByUserId: async (): Promise<ApiResponse<Order[]>> => {
      const { data } = await api.get('/orders/user');
      return data;
    },
    getByChefId: async (): Promise<ApiResponse<Order[]>> => {
      const { data } = await api.get('/orders/chef');
      return data;
    },
    create: async (order: Partial<Order>): Promise<ApiResponse<Order>> => {
      const { data } = await api.post('/orders', order);
      return data;
    },
    updateStatus: async (orderId: number, status: OrderStatus): Promise<ApiResponse<void>> => {
      const { data } = await api.patch(`/orders/${orderId}/status`, { status });
      return data;
    }
  },
  contact: {
    send: async (msg: ContactMessage): Promise<ApiResponse<void>> => {
      const { data } = await api.post('/contact', msg);
      return data;
    },
    getMessages: async (): Promise<ApiResponse<ContactMessage[]>> => {
      const { data } = await api.get('/contact');
      return data;
    }
  },
  subscriptions: {
    getByUserId: async (): Promise<ApiResponse<Subscription[]>> => {
      const { data } = await api.get('/subscriptions');
      return data;
    },
    subscribe: async (sub: Partial<Subscription>): Promise<ApiResponse<Subscription>> => {
      const { data } = await api.post('/subscriptions', sub);
      return data;
    }
  },
  admin: {
    getReport: async (): Promise<ApiResponse<AdminReport>> => {
      const { data } = await api.get('/admin/report');
      return data;
    }
  }
};
