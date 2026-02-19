
import React, { useEffect, useState } from 'react';
import { Order, OrderStatus } from '../types';
import { apiService } from '../services/apiService';
import { getOrderStatusCommentary } from '../services/geminiService';

interface OrderTrackingProps {
  orderId: number;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiComment, setAiComment] = useState('');

  const statuses = [
    { key: OrderStatus.PLACED, icon: 'fa-shopping-basket', label: 'Order Placed' },
    { key: OrderStatus.ACCEPTED, icon: 'fa-check-circle', label: 'Accepted' },
    { key: OrderStatus.PREPARING, icon: 'fa-hat-chef', label: 'Cooking' },
    { key: OrderStatus.OUT_FOR_DELIVERY, icon: 'fa-motorcycle', label: 'On the Way' },
    { key: OrderStatus.DELIVERED, icon: 'fa-house-chimney', label: 'Delivered' },
  ];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await apiService.orders.getById(orderId);
        setOrder(res.data);
        const comment = await getOrderStatusCommentary(res.data.status, res.data.chefName);
        setAiComment(comment);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 animate-pulse">
      <i className="fas fa-search-location text-orange-600 text-5xl mb-6"></i>
      <p className="text-xl font-bold text-slate-400">Locating your kitchen courier...</p>
    </div>
  );

  if (!order) return <div className="p-20 text-center text-slate-500 font-bold">Order not found.</div>;

  const currentIdx = statuses.findIndex(s => s.key === order.status);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <i className="fas fa-fire text-8xl text-orange-600"></i>
        </div>
        
        <div className="flex justify-between items-start mb-12 relative z-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Track Order #{order.id}</h1>
            <p className="text-slate-500 flex items-center gap-2 mt-1">
               <i className="fas fa-store text-orange-500"></i> {order.chefName}'s Kitchen
            </p>
          </div>
          <div className="bg-orange-50 text-orange-700 px-6 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm">
            {order.status.replace(/_/g, ' ')}
          </div>
        </div>

        {/* AI Commentary Box */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-12 flex items-center gap-4">
           <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-orange-600 shadow-sm border border-orange-50">
              <i className="fas fa-sparkles"></i>
           </div>
           <p className="text-slate-700 font-medium italic">
             "{aiComment || "Your chef is diligently working on your order."}"
           </p>
        </div>

        {/* Status Timeline */}
        <div className="relative pb-10">
          <div className="absolute top-6 left-6 w-[calc(100%-48px)] h-1 bg-slate-100 z-0"></div>
          <div 
            className="absolute top-6 left-6 h-1 bg-orange-600 z-0 transition-all duration-1000"
            style={{ width: `${(currentIdx / (statuses.length - 1)) * 100}%` }}
          ></div>

          <div className="relative z-10 flex justify-between">
            {statuses.map((s, i) => {
              const isPast = i <= currentIdx;
              const isCurrent = i === currentIdx;
              return (
                <div key={s.key} className="flex flex-col items-center group">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all ${
                      isPast 
                        ? 'bg-orange-600 border-orange-100 text-white shadow-lg' 
                        : 'bg-white border-slate-100 text-slate-200'
                    } ${isCurrent ? 'scale-125 ring-8 ring-orange-50 shadow-orange-200' : ''}`}
                  >
                    <i className={`fas ${s.icon} ${isCurrent ? 'animate-bounce' : ''}`}></i>
                  </div>
                  <span className={`text-[10px] font-bold uppercase mt-6 tracking-tighter ${isPast ? 'text-orange-600' : 'text-slate-300'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
           <span className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
              <span className="text-slate-500 font-medium">Grand Total</span>
              <span className="text-2xl font-black text-slate-900 tracking-tight">${order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex gap-4 mt-6">
               <button className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">
                  Contact Chef
               </button>
               <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 shadow-lg transition-all">
                  View Receipt
               </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
