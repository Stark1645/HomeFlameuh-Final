
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
import AdminDishApproval from './pages/AdminDishApproval';
import OrderTracking from './pages/OrderTracking';
import Profile from './pages/Profile';
import { UserDashboard, ChefDashboard, AdminDashboard } from './pages/DashboardPages';
import { apiService } from './services/apiService';
import { User, Role, ChefProfile } from './types';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedChef, setSelectedChef] = useState<ChefProfile | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<number | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER' as 'USER' | 'CHEF' | 'ADMIN',
    cuisineSpecialty: '',
    bio: ''
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('hf_user');
    const token = localStorage.getItem('hf_token');
    if (savedUser && token) setUser(JSON.parse(savedUser));
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiService.auth.register(registerData);
      setUser(res.data.user);
      localStorage.setItem('hf_user', JSON.stringify(res.data.user));
      localStorage.setItem('hf_token', res.data.token);
      setCurrentPage('home');
      setRegisterData({ name: '', email: '', password: '', role: 'USER', cuisineSpecialty: '', bio: '' });
      alert('Account created successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiService.auth.login(loginEmail, loginPassword);
      setUser(res.data.user);
      localStorage.setItem('hf_user', JSON.stringify(res.data.user));
      localStorage.setItem('hf_token', res.data.token);
      setCurrentPage('home');
      setLoginEmail('');
      setLoginPassword('');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hf_user');
    localStorage.removeItem('hf_token');
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
      case 'admin-dishes': return user ? <AdminDishApproval /> : <Home onNavigate={setCurrentPage} />;
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
              <button onClick={() => setCurrentPage('admin-dishes')} className="text-slate-500 hover:text-slate-900 transition-colors">Dish Approvals</button>
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
                <p className="text-xs font-bold text-orange-700 uppercase tracking-widest mb-2">Demo Login</p>
                <div className="space-y-1 text-xs text-slate-600">
                  <p><strong>Email:</strong> demo@user.com</p>
                  <p><strong>Password:</strong> password123</p>
                </div>
                <p className="mt-3 text-[10px] text-orange-400 italic">Use these credentials or register new account</p>
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
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                  <input 
                    type="password" 
                    required 
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none bg-slate-50 text-slate-900"
                    placeholder="Enter password"
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
          <div className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4 text-center">Create Your Account</h1>
            <p className="text-lg text-slate-500 mb-8 text-center">Join HomeFlame and start your culinary journey</p>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setRegisterData({...registerData, role: 'USER'})}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all text-sm ${
                    registerData.role === 'USER' 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <i className="fas fa-utensils mr-2"></i> User
                </button>
                <button
                  onClick={() => setRegisterData({...registerData, role: 'CHEF'})}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all text-sm ${
                    registerData.role === 'CHEF' 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <i className="fas fa-hat-chef mr-2"></i> Chef
                </button>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={registerData.name}
                    onChange={e => setRegisterData({...registerData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={registerData.email}
                    onChange={e => setRegisterData({...registerData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={registerData.password}
                    onChange={e => setRegisterData({...registerData, password: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Minimum 6 characters"
                    minLength={6}
                  />
                </div>

                {registerData.role === 'CHEF' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Cuisine Specialty</label>
                      <input
                        type="text"
                        required
                        value={registerData.cuisineSpecialty}
                        onChange={e => setRegisterData({...registerData, cuisineSpecialty: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="e.g., Italian, Indian, Mexican"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Bio (Optional)</label>
                      <textarea
                        value={registerData.bio}
                        onChange={e => setRegisterData({...registerData, bio: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="Tell us about your cooking passion..."
                        rows={3}
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg disabled:opacity-50"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <p className="text-center text-sm text-slate-500 mt-6">
                Already have an account?{' '}
                <button onClick={() => setCurrentPage('login')} className="text-orange-600 font-bold hover:underline">
                  Sign In
                </button>
              </p>
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
