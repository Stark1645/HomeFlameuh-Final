
import React from 'react';
import { Role, User } from '../types';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-orange-600 p-2 rounded-lg mr-2 shadow-md shadow-orange-100">
              <i className="fas fa-fire text-white text-xl"></i>
            </div>
            <span className="text-2xl font-extrabold text-orange-600 tracking-tight hidden sm:block">HomeFlame</span>
          </div>

          {/* Main Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <button onClick={() => onNavigate('home')} className="text-slate-600 hover:text-orange-600 font-semibold text-sm transition-colors">Home</button>
            <button onClick={() => onNavigate('chefs')} className="text-slate-600 hover:text-orange-600 font-semibold text-sm transition-colors">Browse Chefs</button>
            <button onClick={() => onNavigate('about')} className="text-slate-600 hover:text-orange-600 font-semibold text-sm transition-colors">About Us</button>
            <button onClick={() => onNavigate('contact')} className="text-slate-600 hover:text-orange-600 font-semibold text-sm transition-colors">Contact</button>
            
            {/* Vertical Divider */}
            {user && <div className="h-6 w-px bg-slate-200 mx-2"></div>}

            {user && (
              <div className="flex items-center space-x-6">
                {user.role === Role.USER && (
                  <>
                    <button onClick={() => onNavigate('user-dashboard')} className="text-slate-600 hover:text-orange-600 font-semibold text-sm transition-colors flex items-center">
                      <i className="fas fa-list-check mr-2 text-xs"></i> My Orders
                    </button>
                    <button onClick={() => onNavigate('subscriptions')} className="text-slate-600 hover:text-orange-600 font-semibold text-sm transition-colors flex items-center">
                      <i className="fas fa-calendar-alt mr-2 text-xs"></i> Meal Plans
                    </button>
                  </>
                )}
                {user.role === Role.CHEF && (
                  <>
                    <button onClick={() => onNavigate('chef-dashboard')} className="text-slate-600 hover:text-orange-600 font-semibold text-sm transition-colors flex items-center">
                      <i className="fas fa-utensils mr-2 text-xs"></i> Kitchen
                    </button>
                    <button onClick={() => onNavigate('chef-analytics')} className="text-slate-600 hover:text-orange-600 font-semibold text-sm transition-colors flex items-center">
                      <i className="fas fa-chart-line mr-2 text-xs"></i> Analytics
                    </button>
                  </>
                )}
                {user.role === Role.ADMIN && (
                  <>
                    <button onClick={() => onNavigate('admin-dashboard')} className="text-slate-600 hover:text-orange-600 font-semibold text-sm transition-colors flex items-center">
                      <i className="fas fa-shield-halved mr-2 text-xs"></i> Admin
                    </button>
                    <button onClick={() => onNavigate('admin-reports')} className="text-slate-600 hover:text-orange-600 font-semibold text-sm transition-colors flex items-center">
                      <i className="fas fa-file-chart-column mr-2 text-xs"></i> Reports
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => onNavigate('profile')}
                  className="hidden md:flex flex-col items-end mr-2 group"
                >
                  <span className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{user.name}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{user.role}</span>
                </button>
                <div 
                  onClick={() => onNavigate('profile')}
                  className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 cursor-pointer hover:bg-orange-50 hover:text-orange-600 transition-all border border-slate-200"
                >
                  <i className="fas fa-user"></i>
                </div>
                <button 
                  onClick={onLogout}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => onNavigate('login')}
                  className="text-slate-600 hover:text-slate-900 px-4 py-2 font-bold text-sm transition-all"
                >
                  Log In
                </button>
                <button 
                  onClick={() => onNavigate('register')}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-orange-100 transition-all"
                >
                  Join HomeFlame
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
