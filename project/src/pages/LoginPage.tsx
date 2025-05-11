import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hotel, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, user, loading, error, initialized, initialize } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    // Initialize auth
    if (!initialized) {
      initialize();
    }
    
    // If already logged in
    if (user) {
      navigate('/dashboard');
    }
  }, [user, initialize, initialized, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    
    if (!email) {
      setLocalError('Email is required');
      return;
    }
    
    if (!password) {
      setLocalError('Password is required');
      return;
    }
    
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Hotel className="h-16 w-16 text-primary-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Famous Gate Hotel
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
            />

            {(error || localError) && (
              <div className="bg-danger-50 border border-danger-300 text-danger-700 px-4 py-3 rounded relative flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error || localError}</span>
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={loading}
              >
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div className="text-sm text-gray-500 text-center mb-4">
                Please ensure you have set up the demo accounts in your Supabase Authentication settings
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@example.com');
                  setPassword('DemoPass123!');
                }}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Admin: admin@example.com
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('manager@example.com');
                  setPassword('DemoPass123!');
                }}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Manager: manager@example.com
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;