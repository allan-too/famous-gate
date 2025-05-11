import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Calendar, CreditCard, Hotel, Menu, User, X } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { usePropertyStore } from '../../stores/propertyStore';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { properties, currentProperty, setCurrentProperty } = usePropertyStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Hotel className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-primary-900">Famous Gate</span>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a 
                href="#" 
                onClick={() => navigate('/dashboard')}
                className="border-primary-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </a>
              <a 
                href="#" 
                onClick={() => navigate('/bookings')}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Bookings
              </a>
              <a 
                href="#" 
                onClick={() => navigate('/pos')}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                POS
              </a>
              <a 
                href="#" 
                onClick={() => navigate('/inventory')}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Inventory
              </a>
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {properties.length > 0 && (
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={currentProperty?.id || ''}
                  onChange={(e) => {
                    const property = properties.find(p => p.id === e.target.value);
                    if (property) setCurrentProperty(property);
                  }}
                >
                  {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="relative">
              <button
                className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                id="user-menu"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-800">
                  <User className="h-5 w-5" />
                </div>
              </button>
            </div>
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#"
              onClick={() => {
                navigate('/dashboard');
                setMobileMenuOpen(false);
              }}
              className="bg-primary-50 border-primary-500 text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              onClick={() => {
                navigate('/bookings');
                setMobileMenuOpen(false);
              }}
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Bookings
            </a>
            <a
              href="#"
              onClick={() => {
                navigate('/pos');
                setMobileMenuOpen(false);
              }}
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              POS
            </a>
            <a
              href="#"
              onClick={() => {
                navigate('/inventory');
                setMobileMenuOpen(false);
              }}
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Inventory
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800">
                  <User className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name || 'User'}</div>
                <div className="text-sm font-medium text-gray-500">{user?.email || ''}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <a
                href="#"
                onClick={handleLogout}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;