import React, { useEffect } from 'react';
import { BarChart3, Calendar, CreditCard, Users } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import OccupancyChart from '../components/dashboard/OccupancyChart';
import { usePropertyStore } from '../stores/propertyStore';
import { useBookingStore } from '../stores/bookingStore';
import Card from '../components/ui/Card';

// Mock data for demo purposes
const occupancyData = [
  { date: 'Jan 1', occupancy: 65 },
  { date: 'Jan 2', occupancy: 70 },
  { date: 'Jan 3', occupancy: 72 },
  { date: 'Jan 4', occupancy: 80 },
  { date: 'Jan 5', occupancy: 85 },
  { date: 'Jan 6', occupancy: 75 },
  { date: 'Jan 7', occupancy: 68 },
];

const recentBookings = [
  { id: '1', guest: 'John Doe', checkin: '2025-01-15', checkout: '2025-01-18', room: '101', status: 'confirmed' },
  { id: '2', guest: 'Jane Smith', checkin: '2025-01-16', checkout: '2025-01-20', room: '205', status: 'checked_in' },
  { id: '3', guest: 'Robert Johnson', checkin: '2025-01-17', checkout: '2025-01-19', room: '310', status: 'cancelled' },
];

const DashboardPage: React.FC = () => {
  const { properties, currentProperty, fetchProperties } = usePropertyStore();
  const { bookings, fetchBookings } = useBookingStore();

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    if (currentProperty) {
      fetchBookings(currentProperty.id);
    }
  }, [currentProperty, fetchBookings]);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your hotel performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Occupancy Rate"
          value="82%"
          icon={<BarChart3 size={24} />}
          change={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Revenue"
          value="KES 425,200"
          icon={<CreditCard size={24} />}
          change={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Bookings"
          value="38"
          icon={<Calendar size={24} />}
          change={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="Guests"
          value="52"
          icon={<Users size={24} />}
          change={{ value: 8, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <OccupancyChart data={occupancyData} className="lg:col-span-2" />
        
        <Card title="Recent Bookings">
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <li key={booking.id} className="py-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {booking.guest}
                      </p>
                      <p className="text-sm text-gray-500">
                        Room {booking.room} ({booking.checkin} to {booking.checkout})
                      </p>
                    </div>
                    <div>
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : ''}
                        ${booking.status === 'checked_in' ? 'bg-green-100 text-green-800' : ''}
                        ${booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {booking.status === 'confirmed' ? 'Confirmed' : ''}
                        {booking.status === 'checked_in' ? 'Checked In' : ''}
                        {booking.status === 'cancelled' ? 'Cancelled' : ''}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all bookings
            </a>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Room Status Overview">
          <div className="space-y-2">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Total Rooms</span>
              <span className="font-medium">50</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-100">
              <span className="text-gray-600">Occupied</span>
              <span className="font-medium">32</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-100">
              <span className="text-gray-600">Available</span>
              <span className="font-medium">15</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-100">
              <span className="text-gray-600">Maintenance</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-100">
              <span className="text-gray-600">Cleaning</span>
              <span className="font-medium">0</span>
            </div>
          </div>
        </Card>

        <Card title="Recent Transactions">
          <ul className="divide-y divide-gray-200">
            <li className="py-3">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Room 205 - Dinner</p>
                  <p className="text-xs text-gray-500">Jan 16, 2025 - 8:32 PM</p>
                </div>
                <div className="text-sm font-medium">KES 2,500</div>
              </div>
            </li>
            <li className="py-3">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Room 101 - Bar Service</p>
                  <p className="text-xs text-gray-500">Jan 16, 2025 - 7:15 PM</p>
                </div>
                <div className="text-sm font-medium">KES 1,200</div>
              </div>
            </li>
            <li className="py-3">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Room 310 - Check-in Payment</p>
                  <p className="text-xs text-gray-500">Jan 16, 2025 - 2:00 PM</p>
                </div>
                <div className="text-sm font-medium">KES 15,000</div>
              </div>
            </li>
          </ul>
          <div className="mt-4">
            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all transactions
            </a>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardPage;