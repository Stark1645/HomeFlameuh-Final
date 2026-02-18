
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-between w-14 h-8 px-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all hover:scale-105 active:scale-95 overflow-hidden group shadow-inner"
      aria-label="Toggle Theme"
    >
      <div 
        className={`z-10 w-6 h-6 rounded-full shadow-md transform transition-all duration-500 flex items-center justify-center ${
          theme === 'dark' ? 'translate-x-6 bg-slate-900' : 'translate-x-0 bg-white'
        }`}
      >
        {theme === 'dark' ? (
          <i className="fas fa-moon text-blue-400 text-xs"></i>
        ) : (
          <i className="fas fa-sun text-orange-500 text-xs"></i>
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-around text-[10px] opacity-40 pointer-events-none px-1">
        <i className={`fas fa-sun transition-opacity ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}></i>
        <i className={`fas fa-moon transition-opacity ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}></i>
      </div>
    </button>
  );
};

export default ThemeToggle;
