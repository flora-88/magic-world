import React from 'react';

export const ParchmentContainer: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-[#f3e5ab] text-amber-900 border-4 border-double border-amber-700 rounded-lg shadow-2xl p-6 relative overflow-hidden ${className}`}>
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>
    <div className="relative z-10">{children}</div>
  </div>
);

export const GoldButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = '', ...props }) => (
  <button 
    className={`bg-gradient-to-b from-amber-600 to-amber-800 text-amber-100 border border-amber-400 px-6 py-2 rounded shadow hover:from-amber-500 hover:to-amber-700 active:scale-95 transition-all title-font tracking-wide ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    className="bg-[#fdf6e3] border-b-2 border-amber-800 text-amber-900 px-4 py-2 w-full focus:outline-none focus:border-amber-600 placeholder-amber-900/50"
    {...props}
  />
);

export const Badge: React.FC<{ children: React.ReactNode, color?: string }> = ({ children, color = 'bg-red-800' }) => (
  <span className={`${color} text-white text-xs px-2 py-1 rounded-full border border-gold-400 shadow-sm`}>
    {children}
  </span>
);