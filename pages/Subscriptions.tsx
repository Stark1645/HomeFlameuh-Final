
import React, { useEffect, useState } from 'react';
import { User, Subscription, SubscriptionPlan, ChefProfile } from '../types';
import { apiService } from '../services/apiService';

interface SubscriptionsProps {
  user: User;
}

const Subscriptions: React.FC<SubscriptionsProps> = ({ user }) => {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [chefs, setChefs] = useState<ChefProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiService.subscriptions.getByUserId(),
      apiService.chefs.getAll()
    ]).then(([sRes, cRes]) => {
      setSubs(sRes.data);
      setChefs(cRes.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [user]);

  const handleSubscribe = async (chefId: number, chefName: string, plan: SubscriptionPlan) => {
    try {
      const res = await apiService.subscriptions.subscribe({
        chefId,
        chefName,
        planType: plan
      });
      setSubs([...subs, res.data]);
      alert("Successfully subscribed to weekly meal plan!");
    } catch (err) {
      alert("Subscription failed.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900">Your Meal Subscriptions</h1>
        <p className="text-slate-500 mt-2">Authentic home-cooked meals on a schedule.</p>
      </div>

      {/* Active Subscriptions */}
      <section className="mb-20">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <i className="fas fa-calendar-check text-orange-600 mr-3"></i> Active Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subs.map(s => (
            <div key={s.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Active</span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{s.planType} PLAN</p>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Chef {s.chefName}</h3>
              <p className="text-sm text-slate-500 mb-6">Started on {new Date(s.startDate).toLocaleDateString()}</p>
              <button className="w-full bg-slate-50 text-slate-500 py-3 rounded-xl font-bold text-sm group-hover:bg-red-50 group-hover:text-red-600 transition-all">
                Cancel Subscription
              </button>
            </div>
          ))}
          {subs.length === 0 && !loading && (
            <div className="col-span-full py-12 border-2 border-dashed border-slate-200 rounded-3xl text-center text-slate-400">
              No active subscriptions. Discover a chef below!
            </div>
          )}
        </div>
      </section>

      {/* Available Plans */}
      <section>
        <h2 className="text-xl font-bold mb-6">Available Meal Plans</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {chefs.map(chef => (
            <div key={chef.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col sm:flex-row">
              <div className="sm:w-1/3 h-48 sm:h-auto overflow-hidden">
                <img src={`https://picsum.photos/400/400?sig=${chef.id}`} className="w-full h-full object-cover" alt={chef.name} />
              </div>
              <div className="p-8 sm:w-2/3 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{chef.name}</h3>
                <p className="text-orange-600 text-sm font-bold mb-4">{chef.cuisineSpecialty} Specialty</p>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">{chef.bio}</p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleSubscribe(chef.userId, chef.name, SubscriptionPlan.WEEKLY)}
                    className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-xs hover:bg-orange-600 transition-all"
                  >
                    Weekly ($45)
                  </button>
                  <button 
                    onClick={() => handleSubscribe(chef.userId, chef.name, SubscriptionPlan.MONTHLY)}
                    className="flex-1 border-2 border-slate-200 text-slate-900 py-3 rounded-xl font-bold text-xs hover:border-orange-600 transition-all"
                  >
                    Monthly ($160)
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Subscriptions;
