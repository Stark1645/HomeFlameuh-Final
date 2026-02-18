
import React, { useState } from 'react';
import { getMealRecommendation } from '../services/geminiService';
import { mockApi } from '../services/mockApi';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [moodInput, setMoodInput] = useState('');
  const [moodLoading, setMoodLoading] = useState(false);
  const [moodResult, setMoodResult] = useState('');

  const handleMoodAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moodInput.trim()) return;
    setMoodLoading(true);
    try {
      // Fetch some global dishes for context
      const chefs = await mockApi.chefs.getAll();
      const dishes = await mockApi.dishes.getByChefId(chefs.data[0].userId);
      const rec = await getMealRecommendation(`User is feeling: ${moodInput}`, dishes.data);
      setMoodResult(rec);
    } catch (err) {
      setMoodResult("How about some Classic Lasagna? It's comfort in every bite.");
    } finally {
      setMoodLoading(false);
    }
  };

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-24 pb-32 lg:pt-40 lg:pb-56">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative">
              <span className="inline-flex items-center px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase bg-orange-100 text-orange-700 mb-8 animate-bounce">
                🚀 Now serving in 50+ Cities
              </span>
              <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] mb-10 tracking-tighter">
                Tastes Like <span className="text-orange-600">Home</span>, <br/>
                Made by <span className="text-indigo-600 italic">Chefs</span>.
              </h1>
              <p className="text-xl text-slate-500 mb-12 max-w-xl leading-relaxed font-medium">
                Connect with the best independent home chefs in your neighborhood. Discover authentic family recipes delivered right to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={() => onNavigate('chefs')}
                  className="bg-slate-900 hover:bg-orange-600 text-white px-10 py-5 rounded-[20px] font-black text-lg shadow-2xl transition-all transform hover:-translate-y-2 active:scale-95"
                >
                  Browse Kitchens
                </button>
                <button 
                  onClick={() => onNavigate('register')}
                  className="bg-white border-4 border-slate-100 hover:border-indigo-600 text-slate-900 px-10 py-5 rounded-[20px] font-black text-lg transition-all hover:shadow-xl active:scale-95"
                >
                  Become a Chef
                </button>
              </div>
            </div>
            <div className="mt-20 lg:mt-0 relative">
              <div className="relative z-10 aspect-square rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] bg-orange-50 transform rotate-3 hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Delicious homemade food" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-16 -left-16 bg-white p-10 rounded-[40px] shadow-2xl max-w-sm -rotate-6 border border-slate-100 z-20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" alt="user" />
                    ))}
                  </div>
                  <span className="text-sm font-black text-slate-900 uppercase tracking-widest">500+ Verified Chefs</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed italic">"The lasagna from Chef Maria's kitchen was better than most restaurants!"</p>
              </div>
              
              {/* Decorative blobs */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-60 z-0"></div>
              <div className="absolute -bottom-20 right-20 w-48 h-48 bg-indigo-100 rounded-full blur-3xl opacity-60 z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="bg-indigo-900 rounded-[60px] p-12 lg:p-24 relative overflow-hidden text-center text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-800 rounded-full -mr-48 -mt-48 opacity-40 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-800 rounded-full -ml-32 -mb-32 opacity-40 blur-3xl"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
               <div className="bg-indigo-500 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <i className="fas fa-sparkles text-3xl"></i>
               </div>
               <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tight">"What should I <br/> eat today?"</h2>
               <p className="text-indigo-200 text-xl mb-12 font-medium">Tell us your mood, craving, or dietary goal and our Gemini AI will find your perfect chef match.</p>
               
               <form onSubmit={handleMoodAsk} className="flex flex-col sm:flex-row gap-4 mb-10">
                  <input 
                    className="flex-1 bg-indigo-800 border-2 border-indigo-700 rounded-2xl px-8 py-5 text-lg font-medium placeholder-indigo-400 focus:border-white focus:bg-indigo-800 outline-none transition-all"
                    placeholder="e.g. 'I want something spicy and low calorie'"
                    value={moodInput}
                    onChange={e => setMoodInput(e.target.value)}
                  />
                  <button 
                    disabled={moodLoading || !moodInput}
                    className="bg-white text-indigo-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-orange-100 hover:text-orange-900 transition-all shadow-xl active:scale-95 disabled:opacity-50"
                  >
                    {moodLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Ask Gemini'}
                  </button>
               </form>

               {moodResult && (
                 <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[35px] p-10 text-left animate-fade-in shadow-inner">
                    <p className="text-2xl font-bold mb-4 text-orange-400"><i className="fas fa-magic mr-3"></i>Gemini Suggests:</p>
                    <p className="text-xl leading-relaxed text-indigo-50 mb-8">{moodResult}</p>
                    <button onClick={() => onNavigate('chefs')} className="bg-white text-indigo-900 px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-orange-50 transition-colors shadow-lg">View Kitchen Menu</button>
                 </div>
               )}
            </div>
         </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">Why HomeFlame?</h2>
          <p className="mt-6 text-slate-500 text-xl max-w-2xl mx-auto font-medium">Elevating the home-cooking experience with quality, hygiene, and heart.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { icon: 'fa-utensils', title: 'Authentic Recipes', desc: 'Dishes made from age-old family recipes that you won\'t find in commercial restaurants.', color: 'orange' },
            { icon: 'fa-shield-heart', title: 'Hygiene Certified', desc: 'Every kitchen undergoes rigorous quality and hygiene checks to ensure safe, healthy meals.', color: 'indigo' },
            { icon: 'fa-truck-fast', title: 'On-Demand Delivery', desc: 'Fast and reliable delivery from the local chef directly to your kitchen table.', color: 'slate' }
          ].map((item, idx) => (
            <div key={idx} className="group relative">
               <div className="bg-white p-12 rounded-[50px] shadow-sm border-2 border-slate-50 hover:border-slate-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 relative z-10 h-full flex flex-col items-center text-center">
                  <div className={`w-20 h-20 bg-${item.color}-50 text-${item.color}-600 rounded-[30px] flex items-center justify-center mb-10 group-hover:bg-${item.color}-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-12`}>
                    <i className={`fas ${item.icon} text-3xl`}></i>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 text-lg leading-relaxed font-medium">{item.desc}</p>
               </div>
               <div className={`absolute -bottom-4 -right-4 w-full h-full bg-${item.color}-100 rounded-[50px] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
