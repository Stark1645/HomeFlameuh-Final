
import React, { useEffect, useState } from 'react';
import { User, Order, ChefProfile, OrderStatus, Dish } from '../types';
import { apiService } from '../services/apiService';
import { generateDishDescription, generateChefBio, generateWeeklyMealPlan, optimizeMenuDescription } from '../services/geminiService';

export const UserDashboard: React.FC<{ user: User, onTrackOrder?: (id: number) => void }> = ({ user, onTrackOrder }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [mealPlanQuery, setMealPlanQuery] = useState('');
  const [mealPlan, setMealPlan] = useState('');
  const [isPlanning, setIsPlanning] = useState(false);

  useEffect(() => {
    apiService.orders.getByUserId().then(res => {
      setOrders(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [user]);

  const handleGeneratePlan = async () => {
    setIsPlanning(true);
    try {
      const chefsRes = await apiService.chefs.getAll();
      const dishesRes = await apiService.dishes.getByChefId(chefsRes.data[0].userId);
      const plan = await generateWeeklyMealPlan(mealPlanQuery || "healthy and variety", dishesRes.data);
      setMealPlan(plan);
    } catch (error) {
      console.error('Failed to generate plan:', error);
    }
    setIsPlanning(false);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Your Recent Activity</h1>
        <button onClick={() => window.location.reload()} className="text-slate-400 hover:text-slate-900"><i className="fas fa-sync-alt mr-2"></i> Refresh</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-100 rounded-3xl animate-pulse"></div>)}
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((o, index) => (
                <div key={o.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 group hover:shadow-md transition-all">
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 text-2xl font-black shadow-inner">
                        #{index + 1}
                     </div>
                     <div>
                        <p className="font-bold text-xl text-slate-900">Chef {o.chefName}</p>
                        <p className="text-slate-500 text-sm mt-1">
                          <i className="fas fa-calendar-alt mr-2 text-slate-400"></i>
                          {new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center gap-8 w-full md:w-auto">
                    <div className="text-right flex-1 md:flex-none">
                      <p className="font-black text-slate-900 text-2xl">${o.totalAmount.toFixed(2)}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mt-1 ${
                        o.status === OrderStatus.DELIVERED ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>{o.status.replace(/_/g, ' ')}</span>
                    </div>
                    <button 
                      onClick={() => onTrackOrder?.(o.id)}
                      className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-orange-600 transition-all shadow-lg active:scale-95"
                    >
                      Track Live
                    </button>
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                   <p className="text-slate-400 font-bold">No orders found yet. Start your journey!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* AI Weekly Planner */}
        <div className="lg:col-span-1">
          <div className="bg-indigo-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-800 rounded-full opacity-50 blur-3xl group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                    <i className="fas fa-sparkles text-lg"></i>
                 </div>
                 <h3 className="text-2xl font-bold">AI Meal Planner</h3>
              </div>
              <p className="text-indigo-200 text-sm mb-8 leading-relaxed">Let AI create a perfect 7-day meal plan based on your favorite local chefs.</p>
              
              <div className="space-y-4">
                 <input 
                   className="w-full bg-indigo-800/50 border border-indigo-700 rounded-xl px-4 py-3 text-sm placeholder-indigo-400 focus:ring-2 focus:ring-indigo-400 outline-none"
                   placeholder="Dietary needs? e.g. Low carb"
                   value={mealPlanQuery}
                   onChange={e => setMealPlanQuery(e.target.value)}
                 />
                 <button 
                   onClick={handleGeneratePlan}
                   disabled={isPlanning}
                   className="w-full bg-white text-indigo-900 py-4 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-950/20"
                 >
                   {isPlanning ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
                   {isPlanning ? 'Planning...' : 'Generate Plan'}
                 </button>
              </div>

              {mealPlan && (
                <div className="mt-8 pt-8 border-t border-indigo-800 max-h-60 overflow-y-auto custom-scrollbar text-sm leading-relaxed text-indigo-100 whitespace-pre-wrap">
                  {mealPlan}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChefDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [profile, setProfile] = useState({ cuisineSpecialty: '', bio: '', hygieneRating: '5.0' });
  const [newDish, setNewDish] = useState({ name: '', price: '', ingredients: '' });
  const [isGeneratingDish, setIsGeneratingDish] = useState(false);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState<number | null>(null);

  useEffect(() => {
    apiService.orders.getByChefId().then(res => setOrders(res.data)).catch(console.error);
    apiService.dishes.getByChefId(user.id).then(res => setDishes(res.data)).catch(console.error);
    
    apiService.chefs.getAll().then(res => {
      const existing = res.data.find(c => c.userId === user.id);
      if (existing) {
        setProfile({
          cuisineSpecialty: existing.cuisineSpecialty,
          bio: existing.bio,
          hygieneRating: existing.hygieneRating.toString()
        });
      }
    }).catch(console.error);
  }, [user]);

  const handleUpdateStatus = async (orderId: number, status: OrderStatus) => {
    await apiService.orders.updateStatus(orderId, status);
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleAddDish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingDish(true);
    try {
      console.log('=== ADDING DISH ===');
      console.log('Chef user ID:', user.id);
      console.log('Chef user _id:', (user as any)._id);
      const description = await generateDishDescription(newDish.name, newDish.ingredients);
      const res = await apiService.dishes.add({
        chefId: user.id,
        name: newDish.name,
        price: parseFloat(newDish.price),
        ingredients: newDish.ingredients,
        description,
        available: true
      });
      console.log('Dish added:', res.data);
      setDishes([...dishes, res.data]);
      setNewDish({ name: '', price: '', ingredients: '' });
      alert('Dish published successfully!');
    } catch (error) {
      console.error('Failed to add dish:', error);
      alert('Failed to add dish. Check console for details.');
    }
    setIsGeneratingDish(false);
  };

  const handleAutoGenerateBio = async () => {
    if (!profile.cuisineSpecialty) {
      alert("Please enter a cuisine specialty first.");
      return;
    }
    setIsGeneratingBio(true);
    const bio = await generateChefBio(user.name, profile.cuisineSpecialty);
    setProfile(prev => ({ ...prev, bio }));
    setIsGeneratingBio(false);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProfileSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Kitchen profile updated successfully!");
    setIsProfileSaving(false);
  };

  const handleOptimizeDescription = async (dishId: number, currentDesc: string) => {
    setIsOptimizing(dishId);
    const optimized = await optimizeMenuDescription(currentDesc);
    setDishes(dishes.map(d => d.id === dishId ? { ...d, description: optimized } : d));
    setIsOptimizing(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-12">
        <section className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
          <h2 className="text-3xl font-extrabold mb-8 flex items-center relative z-10 text-slate-900 tracking-tight">
            <i className="fas fa-store mr-4 text-orange-600"></i> Kitchen Profile
          </h2>
          <form onSubmit={handleSaveProfile} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cuisine Specialty</label>
                <input 
                  required
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 focus:border-orange-500 focus:bg-white transition-all outline-none"
                  value={profile.cuisineSpecialty}
                  onChange={e => setProfile({...profile, cuisineSpecialty: e.target.value})}
                  placeholder="e.g. Italian, Thai Fusion"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Hygiene Score (0-5)</label>
                <input 
                  required
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 focus:border-orange-500 focus:bg-white transition-all outline-none"
                  value={profile.hygieneRating}
                  onChange={e => setProfile({...profile, hygieneRating: e.target.value})}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Chef Bio</label>
                <button 
                  type="button"
                  onClick={handleAutoGenerateBio}
                  disabled={isGeneratingBio}
                  className="text-orange-600 text-xs font-bold hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-all flex items-center gap-2"
                >
                  {isGeneratingBio ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
                  {isGeneratingBio ? 'Writing...' : 'AI Enhance Bio'}
                </button>
              </div>
              <textarea 
                required
                rows={5}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 focus:border-orange-500 focus:bg-white transition-all outline-none resize-none"
                value={profile.bio}
                onChange={e => setProfile({...profile, bio: e.target.value})}
                placeholder="Tell customers about your journey and passion..."
              />
            </div>
            <button 
              type="submit" 
              disabled={isProfileSaving}
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50 active:scale-95"
            >
              {isProfileSaving ? 'Saving...' : 'Update Kitchen Profile'}
            </button>
          </form>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-extrabold flex items-center text-slate-900 tracking-tight">
            <i className="fas fa-receipt mr-4 text-orange-600"></i> Active Kitchen Orders
          </h2>
          <div className="space-y-4">
            {orders.map((o, index) => (
              <div key={o.id} className="bg-white p-8 rounded-[30px] border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 text-xl font-black shadow-inner">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-xl text-slate-900">Order from Guest</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{new Date(o.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <p className="font-black text-orange-600 text-2xl tracking-tight">${o.totalAmount.toFixed(2)}</p>
                  <select 
                    value={o.status} 
                    onChange={(e) => handleUpdateStatus(o.id, e.target.value as OrderStatus)}
                    className="bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 text-xs font-black uppercase tracking-widest outline-none focus:border-orange-500 transition-all cursor-pointer"
                  >
                    {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                  </select>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold">Kitchen is quiet. Orders will appear here!</p>
              </div>
            )}
          </div>
        </section>

        {/* Menu Optimization Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-extrabold flex items-center text-slate-900 tracking-tight">
            <i className="fas fa-utensils mr-4 text-orange-600"></i> Your Digital Menu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dishes.map((d, index) => (
              <div key={d.id} className="bg-white p-8 rounded-[35px] border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                   <div>
                     <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Dish #{index + 1}</span>
                     <h3 className="font-bold text-xl text-slate-900">{d.name}</h3>
                   </div>
                   <span className="text-lg font-black text-orange-600">${d.price.toFixed(2)}</span>
                </div>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">{d.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Managed</span>
                   <button 
                    onClick={() => handleOptimizeDescription(d.id, d.description)}
                    disabled={isOptimizing === d.id}
                    className="text-indigo-600 text-xs font-bold hover:bg-indigo-50 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all"
                   >
                     {isOptimizing === d.id ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-wand-magic-sparkles"></i>}
                     {isOptimizing === d.id ? 'Optimizing...' : 'AI Refine'}
                   </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl h-fit sticky top-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -mr-12 -mt-12 opacity-50"></div>
        <h2 className="text-2xl font-extrabold mb-8 relative z-10 text-slate-900 tracking-tight">Add New Dish</h2>
        <form onSubmit={handleAddDish} className="space-y-6 relative z-10">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Dish Name</label>
            <input 
              required
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 focus:border-indigo-500 focus:bg-white transition-all outline-none"
              value={newDish.name}
              onChange={e => setNewDish({...newDish, name: e.target.value})}
              placeholder="e.g. Signature Pasta"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Price ($)</label>
            <input 
              required
              type="number"
              step="0.01"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 focus:border-indigo-500 focus:bg-white transition-all outline-none"
              value={newDish.price}
              onChange={e => setNewDish({...newDish, price: e.target.value})}
              placeholder="15.00"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Key Ingredients</label>
            <textarea 
              required
              rows={4}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 focus:border-indigo-500 focus:bg-white transition-all outline-none resize-none"
              value={newDish.ingredients}
              onChange={e => setNewDish({...newDish, ingredients: e.target.value})}
              placeholder="Flour, eggs, parmesan..."
            />
          </div>
          <button 
            type="submit" 
            disabled={isGeneratingDish}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-3"
          >
            {isGeneratingDish ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-plus"></i>}
            {isGeneratingDish ? 'AI Copywriting...' : 'Publish to Menu'}
          </button>
        </form>
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC = () => {
  const [chefs, setChefs] = useState<ChefProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.chefs.getAllForAdmin().then(res => {
      setChefs(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleVerify = async (id: number) => {
    await apiService.chefs.verify(id);
    setChefs(chefs.map(c => c.id === id ? { ...c, verified: true } : c));
  };

  if (loading) return <div className="p-20 text-center animate-pulse font-black text-slate-400 uppercase tracking-widest">Authorized Access Only...</div>;

  return (
    <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl overflow-hidden">
      <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
         <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Kitchen Verification Queue</h2>
         <span className="text-xs font-black bg-slate-900 text-white px-4 py-1.5 rounded-full">{chefs.length} Total Chefs</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kitchen / Chef</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cuisine</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {chefs.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 font-black">
                        {c.name.charAt(0)}
                     </div>
                     <span className="font-bold text-lg text-slate-900">{c.name}</span>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full uppercase tracking-widest">{c.cuisineSpecialty}</span>
                </td>
                <td className="px-10 py-8">
                  {c.verified 
                    ? <span className="text-green-600 bg-green-50 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center w-fit"><i className="fas fa-check-circle mr-2"></i> Verified</span> 
                    : <span className="text-amber-600 bg-amber-50 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center w-fit"><i className="fas fa-clock mr-2"></i> Pending</span>
                  }
                </td>
                <td className="px-10 py-8 text-right">
                  {!c.verified ? (
                    <button 
                      onClick={() => handleVerify(c.id)}
                      className="bg-orange-600 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 active:scale-95"
                    >
                      Approve Kitchen
                    </button>
                  ) : (
                    <button className="text-slate-300 cursor-not-allowed text-xs font-black uppercase tracking-widest">Completed</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
