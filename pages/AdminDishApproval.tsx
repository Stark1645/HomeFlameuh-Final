import React, { useEffect, useState } from 'react';
import { Dish } from '../types';
import { apiService } from '../services/apiService';

const AdminDishApproval: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.dishes.getAllForAdmin().then(res => {
      setDishes(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleApprove = async (id: number) => {
    await apiService.dishes.approve(id);
    setDishes(dishes.map(d => d.id === id ? { ...d, approved: true } : d));
  };

  if (loading) return <div className="p-20 text-center">Loading dishes...</div>;

  const pendingDishes = dishes.filter(d => !(d as any).approved);
  const approvedDishes = dishes.filter(d => (d as any).approved);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Dish Approval</h2>
      
      <div>
        <h3 className="text-xl font-bold mb-4 text-amber-600">Pending Approval ({pendingDishes.length})</h3>
        <div className="grid gap-4">
          {pendingDishes.map(d => (
            <div key={d.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-lg">{d.name}</h4>
                <p className="text-sm text-slate-500">${d.price} - {d.ingredients}</p>
                <p className="text-xs text-slate-400 mt-1">{d.description}</p>
              </div>
              <button
                onClick={() => handleApprove(d.id)}
                className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-700"
              >
                Approve Dish
              </button>
            </div>
          ))}
          {pendingDishes.length === 0 && (
            <p className="text-slate-400 text-center py-8">No pending dishes</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4 text-green-600">Approved Dishes ({approvedDishes.length})</h3>
        <div className="grid gap-4">
          {approvedDishes.map(d => (
            <div key={d.id} className="bg-white p-6 rounded-2xl border border-green-100">
              <h4 className="font-bold">{d.name}</h4>
              <p className="text-sm text-slate-500">${d.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDishApproval;
