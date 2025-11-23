import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, LogOut, Coffee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import { useStore } from '../context/StoreContext';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { lowStockCount } = useStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navClass = (path: string) => `
    flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
    ${isActive(path) 
      ? 'bg-[#00695C] text-white shadow-md' 
      : 'text-gray-300 hover:bg-[#00695C]/50 hover:text-white'}
  `;

  return (
    <div className="h-screen w-64 bg-[#004D40] text-white flex flex-col fixed left-0 top-0 z-20 shadow-xl">
      <div className="p-6 flex items-center gap-3 border-b border-[#00695C]">
        <div className="p-2 bg-white rounded-lg">
            <Coffee className="h-6 w-6 text-[#004D40]" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-wide">LuminaPOS</h1>
          <p className="text-xs text-gray-300">Enterprise Edition</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {user?.role === Role.ADMIN && (
          <Link to="/dashboard" className={navClass('/dashboard')}>
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
        )}

        <Link to="/pos" className={navClass('/pos')}>
          <ShoppingCart className="h-5 w-5" />
          Point of Sale
        </Link>

        {user?.role === Role.ADMIN && (
          <Link to="/inventory" className={navClass('/inventory')}>
            <div className="relative">
               <Package className="h-5 w-5" />
               {lowStockCount > 0 && (
                 <span className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center animate-pulse">
                   {lowStockCount}
                 </span>
               )}
            </div>
            Inventory
          </Link>
        )}
      </nav>

      <div className="p-4 border-t border-[#00695C]">
        <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-8 w-8 rounded-full bg-[#4CAF50] flex items-center justify-center text-xs font-bold">
                {user?.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.role}</p>
            </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-[#00332a] hover:bg-[#E53935] py-2 rounded-lg text-sm transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
};