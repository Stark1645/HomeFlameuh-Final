
import React, { useEffect, useState } from 'react';
import { ChefProfile } from '../types';
import { apiService } from '../services/apiService';
import { smartSearchChefs } from '../services/geminiService';

interface BrowseChefsProps {
  onSelectChef: (chef: ChefProfile) => void;
}

const BrowseChefs: React.FC<BrowseChefsProps> = ({ onSelectChef }) => {
  const [chefs, setChefs] = useState<ChefProfile[]>([]);
  const [filteredChefs, setFilteredChefs] = useState<ChefProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const res = await apiService.chefs.getAll();
        setChefs(res.data);
        setFilteredChefs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChefs();
  }, []);

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredChefs(chefs);
      return;
    }
    setIsAiSearching(true);
    const matchedIds = await smartSearchChefs(searchQuery, chefs);
    if (matchedIds.length === 0) {
      setFilteredChefs([]);
    } else {
      setFilteredChefs(chefs.filter(c => matchedIds.includes(c.id)));
    }
    setIsAiSearching(false);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Explore Neighborhood Chefs</h1>
          <p className="text-slate-500 mt-2 text-lg">Find the perfect homemade meal prepared with love.</p>
        </div>
        
        <form onSubmit={handleAiSearch} className="w-full md:w-1/2 lg:w-1/3 relative group">
          <input 
            type="text" 
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 bg-white focus:border-orange-500 transition-all outline-none shadow-sm group-hover:shadow-md"
            placeholder="AI Search: 'Spicy Italian' or 'Vegan Comfort'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500">
            {isAiSearching ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-sparkles"></i>}
          </div>
          <button type="submit" className="hidden">Search</button>
        </form>
      </div>

      {filteredChefs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChefs.map((chef) => (
            <div 
              key={chef.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
              onClick={() => onSelectChef(chef)}
            >
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={`https://picsum.photos/600/400?sig=${chef.id}&food=kitchen`} 
                  alt={chef.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {chef.verified && (
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center shadow-lg">
                      <i className="fas fa-check-circle mr-1"></i> VERIFIED
                    </span>
                  )}
                  <span className="bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
                    <i className="fas fa-star text-orange-400 mr-1"></i> {chef.rating}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{chef.name}</h3>
                  <span className="text-xs font-semibold bg-orange-50 text-orange-700 px-3 py-1 rounded-full uppercase tracking-wider">{chef.cuisineSpecialty}</span>
                </div>
                <p className="text-slate-600 text-sm line-clamp-2 mb-6 h-10 leading-relaxed">
                  {chef.bio}
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                  <div className="flex items-center text-xs text-slate-500">
                    <i className="fas fa-map-marker-alt mr-2 text-orange-500"></i>
                    Nearby (2.4 km)
                  </div>
                  <button className="text-orange-600 font-bold text-sm flex items-center group-hover:underline">
                    Explore Kitchen <i className="fas fa-arrow-right ml-2 text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200">
           <i className="fas fa-search text-slate-200 text-6xl mb-6"></i>
           <h3 className="text-2xl font-bold text-slate-900 mb-2">No chefs found</h3>
           <p className="text-slate-500">Try a different search term or browse all chefs.</p>
           <button onClick={() => { setSearchQuery(''); setFilteredChefs(chefs); }} className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Show All Chefs</button>
        </div>
      )}
    </div>
  );
};

export default BrowseChefs;
