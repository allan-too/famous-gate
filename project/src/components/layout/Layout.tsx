import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          <Sidebar className="hidden md:block w-64 flex-shrink-0" />
          <main className="flex-1 py-6 px-4 sm:px-6 md:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;