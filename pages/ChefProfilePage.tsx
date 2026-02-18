
import React, { useEffect, useState } from 'react';
import { ChefProfile, Dish, User, ApiResponse } from '../types';
import { mockApi } from '../services/mockApi';
import { getMealRecommendation } from '../services/geminiService';

interface ChefProfilePageProps {
  chef: ChefProfile;
  user: User | null;
  onOrderComplete: (orderId: number) => void;
  onNavigate: (page: string) => void;
}

const ChefProfilePage: React.FC<ChefProfilePageProps> = ({ chef, user, onOrderComplete, onNavigate }) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await mockApi.dishes.getByChefId(chef.userId);
        setDishes(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  }, [chef]);

  const handlePlaceOrder = async (dish: Dish) => {
    if (!user) {
      alert("Please login to place an order");
      onNavigate('login');
      return;
    }
    setOrdering(true);
    try {
      const res = await mockApi.orders.create({
        userId: user.id,
        chefId: chef.userId,
        chefName: chef.name,
        totalAmount: dish.price,
      });
      alert(`Order for ${dish.name} placed successfully!`);
      onOrderComplete(res.data.id);
    } catch (err) {
      alert("Failed to place order");
    } finally {
      setOrdering(false);
    }
  };

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput) return;
    setIsAiLoading(true);
    const suggestion = await getMealRecommendation(aiInput, dishes);
    setAiSuggestion(suggestion);
    setIsAiLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Chef Header */}
      <div className="bg-white rounded-3xl p-8 mb-12 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-100 flex-shrink-0">
          <img src={`https://picsum.photos/200/200?sig=${chef.id}`} alt={chef.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
            <h1 className="text-4xl font-extrabold text-slate-900">{chef.name}</h1>
            <div className="flex justify-center gap-2">
               <span className="bg-orange-100 text-orange-700 text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider">{chef.cuisineSpecialty}</span>
               {chef.verified && <span className="bg-blue-50 text-blue-600 text-sm font-bold px-3 py-1 rounded-full"><i className="fas fa-check-circle mr-1"></i> Verified Kitchen</span>}
            </div>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl leading-relaxed mb-6">
            {chef.bio}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-8 border-t border-slate-100 pt-6">
            <div className="text-center md:text-left">
              <span className="block text-2xl font-bold text-slate-900">{chef.rating} <i className="fas fa-star text-orange-400 text-lg"></i></span>
              <span className="text-sm text-slate-500">Public Rating</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block text-2xl font-bold text-slate-900">{chef.hygieneRating} / 5</span>
              <span className="text-sm text-slate-500">Hygiene Score</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block text-2xl font-bold text-slate-900">45 mins</span>
              <span className="text-sm text-slate-500">Avg. Delivery</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Chef's Special Menu</h2>
          {loading ? (
            <div className="animate-pulse flex flex-col space-y-4">
              <div className="h-24 bg-slate-100 rounded-2xl"></div>
              <div className="h-24 bg-slate-100 rounded-2xl"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {dishes.map(dish => (
                <div key={dish.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex gap-6 hover:shadow-md transition-all group">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={`https://picsum.photos/200/200?sig=${dish.id}&food=dish`} alt={dish.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{dish.name}</h3>
                      <span className="text-lg font-bold text-orange-600">${dish.price.toFixed(2)}</span>
                    </div>
                    <p className="text-slate-500 text-sm mt-1 mb-3 line-clamp-2">{dish.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 italic">Ingredients: {dish.ingredients}</span>
                      <button 
                        disabled={ordering || !dish.available}
                        onClick={() => handlePlaceOrder(dish)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                          dish.available 
                            ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-100 active:scale-95' 
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {dish.available ? (ordering ? 'Placing...' : 'Order Now') : 'Sold Out'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Assistant Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-orange-50 rounded-3xl p-8 border border-orange-100 sticky top-24">
            <div className="flex items-center gap-3 mb-6">
               <div className="bg-orange-600 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <i className="fas fa-sparkles text-lg"></i>
               </div>
               <h3 className="text-xl font-bold text-slate-900">AI Menu Concierge</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">Can't decide? Tell our AI assistant what you're in the mood for!</p>
            <form onSubmit={handleAiAsk} className="space-y-4">
              <textarea 
                className="w-full bg-white border border-orange-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                rows={3}
                placeholder="e.g. 'I want something spicy and high in protein'"
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
              />
              <button 
                type="submit"
                disabled={isAiLoading || !aiInput}
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                {isAiLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Get Recommendation'}
              </button>
            </form>

            {aiSuggestion && (
              <div className="mt-8 p-4 bg-white rounded-2xl border border-orange-100 animate-fade-in">
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{aiSuggestion}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefProfilePage;
