
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import './styles/theme.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BrowseChefs from './pages/BrowseChefs';
import ChefProfilePage from './pages/ChefProfilePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Subscriptions from './pages/Subscriptions';
import ChefAnalytics from './pages/ChefAnalytics';
import AdminReports from './pages/AdminReports';
import OrderTracking from './pages/OrderTracking';
import Profile from './pages/Profile';
import { UserDashboard, ChefDashboard, AdminDashboard } from './pages/DashboardPages';
import { mockApi } from './services/mockApi';
import { User, Role, ChefProfile } from './types';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedChef, setSelectedChef] = useState<ChefProfile | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<number | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('hf_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await mockApi.auth.login(loginEmail);
      setUser(res.data.user);
      localStorage.setItem('hf_user', JSON.stringify(res.data.user));
      setCurrentPage('home');
      setLoginEmail('');
    } catch (err) {
      alert("Please use one of the provided demo emails.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hf_user');
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'chefs': return <BrowseChefs onSelectChef={(c) => { setSelectedChef(c); setCurrentPage('chef-detail'); }} />;
      case 'chef-detail': return selectedChef ? <ChefProfilePage chef={selectedChef} user={user} onOrderComplete={(id) => { setTrackingOrderId(id); setCurrentPage('track-order'); }} onNavigate={setCurrentPage} /> : null;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'profile': return user ? <Profile user={user} onUpdate={setUser} /> : <Home onNavigate={setCurrentPage} />;
      case 'subscriptions': return user ? <Subscriptions user={user} /> : <Home onNavigate={setCurrentPage} />;
      case 'chef-analytics': return user ? <ChefAnalytics user={user} /> : <Home onNavigate={setCurrentPage} />;
      case 'admin-reports': return user ? <AdminReports /> : <Home onNavigate={setCurrentPage} />;
      case 'track-order': return trackingOrderId ? <OrderTracking orderId={trackingOrderId} /> : <Home onNavigate={setCurrentPage} />;
      case 'user-dashboard': return user ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
           <div className="flex gap-4 mb-8">
              <button onClick={() => setCurrentPage('user-dashboard')} className="font-bold border-b-2 border-orange-600 pb-1">My Orders</button>
              <button onClick={() => setCurrentPage('subscriptions')} className="text-slate-500 hover:text-slate-900 transition-colors">Meal Plans</button>
              <button onClick={() => setCurrentPage('profile')} className="text-slate-500 hover:text-slate-900 transition-colors">Settings</button>
           </div>
           <UserDashboard user={user} onTrackOrder={(id) => { setTrackingOrderId(id); setCurrentPage('track-order'); }} />
        </div>
      ) : <Home onNavigate={setCurrentPage} />;
      case 'chef-dashboard': return user ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
           <div className="flex gap-4 mb-8">
              <button onClick={() => setCurrentPage('chef-dashboard')} className="font-bold border-b-2 border-orange-600 pb-1">Kitchen Manager</button>
              <button onClick={() => setCurrentPage('chef-analytics')} className="text-slate-500 hover:text-slate-900 transition-colors">Business Insights</button>
              <button onClick={() => setCurrentPage('profile')} className="text-slate-500 hover:text-slate-900 transition-colors">Kitchen Settings</button>
           </div>
           <ChefDashboard user={user} />
        </div>
      ) : <Home onNavigate={setCurrentPage} />;
      case 'admin-dashboard': return user ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
           <div className="flex gap-4 mb-8">
              <button onClick={() => setCurrentPage('admin-dashboard')} className="font-bold border-b-2 border-orange-600 pb-1">Verifications</button>
              <button onClick={() => setCurrentPage('admin-reports')} className="text-slate-500 hover:text-slate-900 transition-colors">Platform Reports</button>
           </div>
           <AdminDashboard />
        </div>
      ) : <Home onNavigate={setCurrentPage} />;
      case 'login': 
        return (
          <div className="max-w-md mx-auto py-24 px-4">
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-500 mb-8">Ready for some delicious home-cooked food?</p>
              
              <div className="mb-8 p-4 bg-orange-50 border border-orange-100 rounded-2xl">
                <p className="text-xs font-bold text-orange-700 uppercase tracking-widest mb-2">Demo Credentials</p>
                <div className="space-y-1">
                  <button onClick={() => setLoginEmail('alice@user.com')} className="block text-xs text-slate-600 hover:text-orange-600 transition-colors"><strong>Customer:</strong> alice@user.com</button>
                  <button onClick={() => setLoginEmail('maria@chef.com')} className="block text-xs text-slate-600 hover:text-orange-600 transition-colors"><strong>Chef:</strong> maria@chef.com</button>
                  <button onClick={() => setLoginEmail('admin@homeflame.com')} className="block text-xs text-slate-600 hover:text-orange-600 transition-colors"><strong>Admin:</strong> admin@homeflame.com</button>
                </div>
                <p className="mt-3 text-[10px] text-orange-400 italic">Click an email to auto-fill</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none bg-slate-50 text-slate-900"
                    placeholder="Enter email"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 active:scale-95 transition-all shadow-lg shadow-orange-100 disabled:opacity-50"
                >
                  {isLoading ? 'Checking...' : 'Sign In'}
                </button>
              </form>
            </div>
          </div>
        );
      case 'register':
        return (
          <div className="max-w-2xl mx-auto py-24 px-4 text-center">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Start Your HomeFlame Journey</h1>
            <p className="text-lg text-slate-500 mb-12">Whether you're here to cook or here to eat, you're welcome.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div onClick={() => setCurrentPage('login')} className="bg-white p-10 rounded-3xl border-2 border-slate-100 hover:border-orange-600 transition-all cursor-pointer group shadow-sm">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <i className="fas fa-hat-chef text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold mb-3">Join as Chef</h3>
                <p className="text-slate-500 mb-6">Share your passion and earn from your own kitchen.</p>
                <button className="text-orange-600 font-bold border-b-2 border-orange-600 pb-1">Sign Up as Chef</button>
              </div>
              <div onClick={() => setCurrentPage('login')} className="bg-white p-10 rounded-3xl border-2 border-slate-100 hover:border-orange-600 transition-all cursor-pointer group shadow-sm">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <i className="fas fa-utensils text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold mb-3">Join as User</h3>
                <p className="text-slate-500 mb-6">Browse unique cuisines and support local chefs.</p>
                <button className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1">Sign Up as User</button>
              </div>
            </div>
          </div>
        );
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} onNavigate={setCurrentPage} />
      <main className="flex-grow bg-slate-50">
        {renderPage()}
      </main>
      <footer className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="bg-orange-600 p-1.5 rounded-lg mr-2">
                  <i className="fas fa-fire text-white text-sm"></i>
                </div>
                <span className="text-xl font-extrabold text-orange-600">HomeFlame</span>
              </div>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">Connecting neighborhood home chefs with customers who appreciate authentic, fresh, and soulful meals.</p>
              <div className="flex space-x-4">
                <i className="fab fa-instagram text-slate-400 hover:text-orange-600 cursor-pointer transition-colors"></i>
                <i className="fab fa-twitter text-slate-400 hover:text-sky-500 cursor-pointer transition-colors"></i>
                <i className="fab fa-facebook text-slate-400 hover:text-blue-600 cursor-pointer transition-colors"></i>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><button onClick={() => setCurrentPage('chefs')} className="hover:text-orange-600 text-left">Browse Kitchens</button></li>
                <li><button onClick={() => setCurrentPage('register')} className="hover:text-orange-600 text-left">Become a Chef</button></li>
                <li><button onClick={() => setCurrentPage('subscriptions')} className="hover:text-orange-600 text-left">Meal Plans</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Company</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><button onClick={() => setCurrentPage('about')} className="hover:text-orange-600 text-left">Our Story</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-orange-600 text-left">Contact Support</button></li>
                <li><button onClick={() => setCurrentPage('about')} className="hover:text-orange-600 text-left">Trust & Safety</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Newsletter</h4>
              <p className="text-sm text-slate-500 mb-4">Get the latest chef highlights and weekly menus.</p>
              <div className="flex shadow-sm">
                 <input className="bg-slate-50 border border-slate-200 rounded-l-xl px-4 py-2 text-sm flex-1 outline-none" placeholder="Email" />
                 <button onClick={() => alert('Thanks for subscribing!')} className="bg-orange-600 text-white px-4 rounded-r-xl hover:bg-orange-700 transition-colors"><i className="fas fa-paper-plane text-xs"></i></button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs">© 2025 HomeFlame Cloud Kitchen Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
