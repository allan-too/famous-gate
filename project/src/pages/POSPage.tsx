import React, { useState } from 'react';
import { Box, Coffee, CreditCard, DollarSign, Plus, Search, ShoppingCart, Trash2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

// Mock data
const products = [
  { id: '1', name: 'Coffee', category: 'Beverages', price: 150, image: 'coffee.jpg' },
  { id: '2', name: 'Tea', category: 'Beverages', price: 100, image: 'tea.jpg' },
  { id: '3', name: 'Sandwich', category: 'Food', price: 350, image: 'sandwich.jpg' },
  { id: '4', name: 'Chicken Burger', category: 'Food', price: 450, image: 'burger.jpg' },
  { id: '5', name: 'Fries', category: 'Food', price: 200, image: 'fries.jpg' },
  { id: '6', name: 'Salad', category: 'Food', price: 300, image: 'salad.jpg' },
  { id: '7', name: 'Soda', category: 'Beverages', price: 120, image: 'soda.jpg' },
  { id: '8', name: 'Water', category: 'Beverages', price: 80, image: 'water.jpg' },
  { id: '9', name: 'Pizza Slice', category: 'Food', price: 400, image: 'pizza.jpg' },
  { id: '10', name: 'Cake Slice', category: 'Desserts', price: 250, image: 'cake.jpg' },
  { id: '11', name: 'Ice Cream', category: 'Desserts', price: 200, image: 'ice-cream.jpg' },
  { id: '12', name: 'Fruit Juice', category: 'Beverages', price: 180, image: 'juice.jpg' },
];

const rooms = [
  { number: '101', guest: 'John Doe' },
  { number: '102', guest: 'Jane Smith' },
  { number: '201', guest: 'Robert Johnson' },
  { number: '202', guest: 'Emily Davis' },
  { number: '301', guest: 'Michael Brown' },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const POSPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');

  const filteredProducts = products.filter(product => {
    return (
      (activeCategory === 'all' || product.category === activeCategory) &&
      (searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { id: product.id, name: product.name, price: product.price, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity }
        : item
    ));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  const processPayment = () => {
    alert(`Processing payment of KES ${getTotal()} via ${paymentMethod}${selectedRoom ? ` charged to Room ${selectedRoom}` : ''}`);
    clearCart();
  };

  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'beverages':
        return <Coffee size={16} />;
      case 'food':
        return <Box size={16} />;
      case 'desserts':
        return <Coffee size={16} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Point of Sale</h1>
          <p className="text-gray-600">Process orders and payments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={18} />}
                className="flex-1"
              />
            </div>

            <div className="flex overflow-x-auto pb-2 mb-4 space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center
                    ${activeCategory === category 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  `}
                  onClick={() => setActiveCategory(category)}
                >
                  {category !== 'all' && getCategoryIcon(category)}
                  <span className={category !== 'all' ? 'ml-1' : ''}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => addToCart(product)}
                >
                  <div className="h-24 bg-gray-100 rounded-md mb-2 flex items-center justify-center text-gray-400">
                    <Coffee size={32} />
                  </div>
                  <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="text-gray-600 text-sm">KES {product.price}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card title="Current Order" className="sticky top-4">
            {cart.length === 0 ? (
              <div className="text-center py-6">
                <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-500">Your cart is empty</p>
                <p className="text-sm text-gray-400">Click on items to add them to your order</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <ul className="divide-y divide-gray-200">
                    {cart.map(item => (
                      <li key={item.id} className="py-3 flex justify-between">
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-gray-900">KES {item.price * item.quantity}</p>
                          </div>
                          <div className="flex items-center mt-1">
                            <button
                              className="p-1 text-gray-500 hover:text-gray-700"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="mx-2 text-gray-700">{item.quantity}</span>
                            <button
                              className="p-1 text-gray-500 hover:text-gray-700"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                            <button
                              className="ml-auto p-1 text-gray-500 hover:text-red-600"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">KES {getTotal()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax (16%)</span>
                    <span className="font-medium">KES {Math.round(getTotal() * 0.16)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mb-4">
                    <span>Total</span>
                    <span>KES {getTotal() + Math.round(getTotal() * 0.16)}</span>
                  </div>

                  <div className="space-y-4 mb-4">
                    <Select
                      label="Charge to Room"
                      options={[
                        { value: '', label: 'Select Room (Optional)' },
                        ...rooms.map(room => ({ 
                          value: room.number, 
                          label: `Room ${room.number} - ${room.guest}` 
                        }))
                      ]}
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          className={`flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium ${
                            paymentMethod === 'cash' 
                              ? 'bg-primary-50 border-primary-500 text-primary-700' 
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => setPaymentMethod('cash')}
                        >
                          <DollarSign size={16} className="mr-1" />
                          Cash
                        </button>
                        <button 
                          className={`flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium ${
                            paymentMethod === 'card' 
                              ? 'bg-primary-50 border-primary-500 text-primary-700' 
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => setPaymentMethod('card')}
                        >
                          <CreditCard size={16} className="mr-1" />
                          Card
                        </button>
                        <button 
                          className={`flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium ${
                            paymentMethod === 'mpesa' 
                              ? 'bg-primary-50 border-primary-500 text-primary-700' 
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => setPaymentMethod('mpesa')}
                        >
                          <span className="mr-1 font-bold">M</span>
                          M-Pesa
                        </button>
                        <button 
                          className={`flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium ${
                            paymentMethod === 'room' 
                              ? 'bg-primary-50 border-primary-500 text-primary-700' 
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                          disabled={!selectedRoom}
                          onClick={() => {
                            if (selectedRoom) setPaymentMethod('room');
                          }}
                        >
                          <Box size={16} className="mr-1" />
                          Room
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={clearCart}
                    >
                      Clear
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={processPayment}
                    >
                      Pay Now
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default POSPage;