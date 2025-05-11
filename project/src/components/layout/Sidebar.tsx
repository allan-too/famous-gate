import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  CalendarDays, 
  ClipboardList, 
  Coffee, 
  CreditCard, 
  Home, 
  Settings, 
  ShoppingCart, 
  Users 
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();

  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager' || isAdmin;

  const menuItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/dashboard', access: true },
    { name: 'Bookings', icon: <CalendarDays size={20} />, path: '/bookings', access: true },
    { name: 'Rooms', icon: <ClipboardList size={20} />, path: '/rooms', access: true },
    { name: 'POS', icon: <Coffee size={20} />, path: '/pos', access: true },
    { name: 'Inventory', icon: <ShoppingCart size={20} />, path: '/inventory', access: isManager },
    { name: 'Guests', icon: <Users size={20} />, path: '/guests', access: true },
    { name: 'Payments', icon: <CreditCard size={20} />, path: '/payments', access: isManager },
    { name: 'Reports', icon: <BarChart3 size={20} />, path: '/reports', access: isManager },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings', access: isAdmin },
  ];

  return (
    <div className={`py-4 ${className}`}>
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {menuItems.filter(item => item.access).map((item) => (
            <a
              key={item.name}
              href="#"
              onClick={() => navigate(item.path)}
              className={`
                group flex items-center px-2 py-2 text-sm font-medium rounded-md
                ${location.pathname === item.path 
                  ? 'bg-primary-100 text-primary-900' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <span className={`
                mr-3 
                ${location.pathname === item.path 
                  ? 'text-primary-500' 
                  : 'text-gray-400 group-hover:text-gray-500'}
              `}>
                {item.icon}
              </span>
              {item.name}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;