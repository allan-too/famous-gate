import { create } from 'zustand';
import { supabase, Booking, Guest } from '../lib/supabase';

interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  guests: Guest[];
  loading: boolean;
  error: string | null;
  fetchBookings: (propertyId: string) => Promise<void>;
  fetchBookingsByDateRange: (propertyId: string, startDate: string, endDate: string) => Promise<void>;
  fetchGuests: () => Promise<void>;
  createBooking: (booking: Partial<Booking>) => Promise<void>;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => Promise<void>;
  updatePaymentStatus: (bookingId: string, status: Booking['payment_status']) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  currentBooking: null,
  guests: [],
  loading: false,
  error: null,

  fetchBookings: async (propertyId) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('property_id', propertyId)
        .order('check_in', { ascending: true });

      if (error) throw error;

      set({ 
        bookings: data as Booking[],
        loading: false,
        error: null 
      });
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      set({ 
        error: error.message || 'Failed to fetch bookings',
        loading: false 
      });
    }
  },

  fetchBookingsByDateRange: async (propertyId, startDate, endDate) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('property_id', propertyId)
        .gte('check_in', startDate)
        .lte('check_out', endDate);

      if (error) throw error;

      set({ 
        bookings: data as Booking[],
        loading: false,
        error: null 
      });
    } catch (error: any) {
      console.error('Error fetching bookings by date range:', error);
      set({ 
        error: error.message || 'Failed to fetch bookings',
        loading: false 
      });
    }
  },

  fetchGuests: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('guests')
        .select('*');

      if (error) throw error;

      set({ 
        guests: data as Guest[],
        loading: false,
        error: null 
      });
    } catch (error: any) {
      console.error('Error fetching guests:', error);
      set({ 
        error: error.message || 'Failed to fetch guests',
        loading: false 
      });
    }
  },

  createBooking: async (booking) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([booking])
        .select();

      if (error) throw error;

      set((state) => ({ 
        bookings: [...state.bookings, data[0] as Booking],
        loading: false,
        error: null 
      }));
    } catch (error: any) {
      console.error('Error creating booking:', error);
      set({ 
        error: error.message || 'Failed to create booking',
        loading: false 
      });
    }
  },

  updateBookingStatus: async (bookingId, status) => {
    set({ loading: true });
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) throw error;

      set((state) => ({
        bookings: state.bookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status } 
            : booking
        ),
        loading: false,
        error: null
      }));
    } catch (error: any) {
      console.error('Error updating booking status:', error);
      set({ 
        error: error.message || 'Failed to update booking status',
        loading: false 
      });
    }
  },

  updatePaymentStatus: async (bookingId, payment_status) => {
    set({ loading: true });
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ payment_status })
        .eq('id', bookingId);

      if (error) throw error;

      set((state) => ({
        bookings: state.bookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, payment_status } 
            : booking
        ),
        loading: false,
        error: null
      }));
    } catch (error: any) {
      console.error('Error updating payment status:', error);
      set({ 
        error: error.message || 'Failed to update payment status',
        loading: false 
      });
    }
  }
}));