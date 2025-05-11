import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Layout from '../components/layout/Layout';
import BookingCalendar from '../components/bookings/BookingCalendar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { usePropertyStore } from '../stores/propertyStore';
import { useBookingStore } from '../stores/bookingStore';
import { Booking } from '../lib/supabase';

const BookingsPage: React.FC = () => {
  const { properties, rooms, currentProperty, fetchProperties, fetchRooms } = usePropertyStore();
  const { bookings, fetchBookings } = useBookingStore();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    if (currentProperty) {
      fetchRooms(currentProperty.id);
      fetchBookings(currentProperty.id);
    }
  }, [currentProperty, fetchRooms, fetchBookings]);

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowBookingDetails(true);
  };

  const closeBookingDetails = () => {
    setShowBookingDetails(false);
  };

  // Mocked rooms data for demo
  const mockedRooms = [
    { id: '1', property_id: '1', room_number: '101', type: 'Standard', capacity: 2, rate: 5000, status: 'available', amenities: ['wifi', 'tv'] },
    { id: '2', property_id: '1', room_number: '102', type: 'Standard', capacity: 2, rate: 5000, status: 'occupied', amenities: ['wifi', 'tv'] },
    { id: '3', property_id: '1', room_number: '201', type: 'Deluxe', capacity: 3, rate: 7500, status: 'available', amenities: ['wifi', 'tv', 'minibar'] },
    { id: '4', property_id: '1', room_number: '202', type: 'Deluxe', capacity: 3, rate: 7500, status: 'maintenance', amenities: ['wifi', 'tv', 'minibar'] },
    { id: '5', property_id: '1', room_number: '301', type: 'Suite', capacity: 4, rate: 12000, status: 'available', amenities: ['wifi', 'tv', 'minibar', 'bathtub'] },
  ];

  // Mocked bookings data for demo
  const mockedBookings = [
    { 
      id: '1', 
      property_id: '1', 
      room_id: '2', 
      guest_id: '1', 
      check_in: '2025-01-15', 
      check_out: '2025-01-18', 
      status: 'confirmed', 
      payment_status: 'partial', 
      total_amount: 15000,
      created_at: '2025-01-10'
    },
    { 
      id: '2', 
      property_id: '1', 
      room_id: '3', 
      guest_id: '2', 
      check_in: '2025-01-20', 
      check_out: '2025-01-23', 
      status: 'confirmed', 
      payment_status: 'pending', 
      total_amount: 22500,
      created_at: '2025-01-12'
    },
    { 
      id: '3', 
      property_id: '1', 
      room_id: '5', 
      guest_id: '3', 
      check_in: '2025-01-17', 
      check_out: '2025-01-19', 
      status: 'cancelled', 
      payment_status: 'pending', 
      total_amount: 24000,
      created_at: '2025-01-13'
    },
  ];

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600">Manage your hotel bookings and reservations</p>
        </div>
        <Button icon={<Plus size={18} />}>New Booking</Button>
      </div>

      <BookingCalendar 
        rooms={mockedRooms} 
        bookings={mockedBookings} 
        onBookingClick={handleBookingClick} 
      />

      {showBookingDetails && selectedBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
              <button 
                className="text-gray-400 hover:text-gray-500" 
                onClick={closeBookingDetails}
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Booking ID</p>
                  <p className="font-medium">{selectedBooking.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${selectedBooking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : ''}
                    ${selectedBooking.status === 'checked_in' ? 'bg-green-100 text-green-800' : ''}
                    ${selectedBooking.status === 'checked_out' ? 'bg-gray-100 text-gray-800' : ''}
                    ${selectedBooking.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p className="font-medium">{selectedBooking.check_in}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p className="font-medium">{selectedBooking.check_out}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Room</p>
                  <p className="font-medium">
                    {mockedRooms.find(r => r.id === selectedBooking.room_id)?.room_number || 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Room Type</p>
                  <p className="font-medium">
                    {mockedRooms.find(r => r.id === selectedBooking.room_id)?.type || 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-medium">KES {selectedBooking.total_amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${selectedBooking.payment_status === 'paid' ? 'bg-green-100 text-green-800' : ''}
                    ${selectedBooking.payment_status === 'partial' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${selectedBooking.payment_status === 'pending' ? 'bg-gray-100 text-gray-800' : ''}
                  `}>
                    {selectedBooking.payment_status.charAt(0).toUpperCase() + selectedBooking.payment_status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Guest Information</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p><span className="text-gray-500">Name:</span> <span className="font-medium">John Doe</span></p>
                  <p><span className="text-gray-500">Email:</span> <span className="font-medium">john.doe@example.com</span></p>
                  <p><span className="text-gray-500">Phone:</span> <span className="font-medium">+254 722 123 456</span></p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              {selectedBooking.status === 'confirmed' && (
                <Button variant="success" size="sm">Check In</Button>
              )}
              {selectedBooking.status === 'checked_in' && (
                <Button variant="outline" size="sm">Check Out</Button>
              )}
              {(selectedBooking.status === 'confirmed' || selectedBooking.status === 'checked_in') && (
                <Button variant="danger" size="sm">Cancel</Button>
              )}
              <Button variant="outline" size="sm" onClick={closeBookingDetails}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BookingsPage;