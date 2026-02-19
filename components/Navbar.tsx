
import React, { useState } from 'react';
import { Role, User } from '../types';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
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

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-slate-600 hover:text-orange-600 p-2"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
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

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <div className="bg-orange-600 p-2 rounded-lg mr-2">
                    <i className="fas fa-fire text-white"></i>
                  </div>
                  <span className="text-xl font-extrabold text-orange-600">HomeFlame</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-600">
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              {user && (
                <div className="mb-6 p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                      <i className="fas fa-user"></i>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 uppercase font-bold">{user.role}</p>
                    </div>
                  </div>
                </div>
              )}

              <nav className="space-y-2">
                <button onClick={() => handleNavigate('home')} className="w-full text-left px-4 py-3 text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl font-semibold transition-colors">
                  <i className="fas fa-home mr-3 w-5"></i> Home
                </button>
                <button onClick={() => handleNavigate('chefs')} className="w-full text-left px-4 py-3 text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl font-semibold transition-colors">
                  <i className="fas fa-hat-chef mr-3 w-5"></i> Browse Chefs
                </button>
                <button onClick={() => handleNavigate('about')} className="w-full text-left px-4 py-3 text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl font-semibold transition-colors">
                  <i className="fas fa-info-circle mr-3 w-5"></i> About Us
                </button>
                <button onClick={() => handleNavigate('contact')} className="w-full text-left px-4 py-3 text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl font-semibold transition-colors">
                  <i className="fas fa-envelope mr-3 w-5"></i> Contact
                </button>

                {user && (
                  <>
                    <div className="border-t border-slate-200 my-4"></div>
                    {user.role === Role.USER && (
                      <>
                        <button onClick={() => handleNavigate('user-dashboard')} className="w-full text-left px-4 py-3 text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl font-semibold transition-colors">
                          <i className="fas fa-list-check mr-3 w-5"></i> My Orders
                        </button>
                        <button onClick={() => handleNavigate('subscriptions')} className="w-full text-left px-4 py-3 text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl font-semibold transition-colors">
                          <i className="fas fa-calendar-alt mr-3 w-5"></i> Meal Plans
                        </button>
                      </>
                    )}
                    {user.role === Role.CHEF && (
                      <>
                        <button onClick={() => handleNavigate('chef-dashboard')} className="w-full text-left px-4 py-3 text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl font-semibold transition-colors">
                          <i className="fas fa-utensils mr-3 w-5"></i> Kitchen
                        </button>
                        <button onClick={() => handleNavigate('chef-analytics')} className="w-full text-left px-4 py-3 text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl font-semibold transition-colors">
                          <i className="fas fa-chart-line mr-3 w-5"></i> Analytics
                        </button>
                      </>
                    )}
                    {user.role === Role.ADMIN && (
                      <>
                        <button onClick={() => handleNavigate('admin-dashboard')} className="w-full text-left px-4 py-3 text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl font-semibold transition-colors">
                          <i className="fas fa-shield-halved mr-3 w-5"></i> Admin
                        </button>
                        <button onClick={() => handleNavigate('admin-reports')} className="w-full text-left px-4 py-3 text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl font-semibold transition-colors">
                          <i className="fas fa-file-chart-column mr-3 w-5"></i> Reports
                        </button>
                      </>
                    )}
                    <button onClick={() => handleNavigate('profile')} className="w-full text-left px-4 py-3 text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl font-semibold transition-colors">
                      <i className="fas fa-user-circle mr-3 w-5"></i> Profile
                    </button>
                  </>
                )}
              </nav>

              <div className="mt-6">
                {user ? (
                  <button 
                    onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 rounded-xl font-bold transition-all"
                  >
                    <i className="fas fa-sign-out mr-2"></i> Sign Out
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleNavigate('login')}
                      className="w-full text-slate-600 hover:text-slate-900 px-4 py-3 font-bold border border-slate-200 rounded-xl transition-all"
                    >
                      Log In
                    </button>
                    <button 
                      onClick={() => handleNavigate('register')}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-xl font-bold shadow-lg transition-all"
                    >
                      Join HomeFlame
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
    </>
  );
};

export default Navbar;
