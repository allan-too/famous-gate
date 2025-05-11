import { createClient } from '@supabase/supabase-js';

// In a real production environment, these would be set as environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'admin' | 'manager' | 'staff';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  property_id?: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  rooms_count: number;
}

export interface Room {
  id: string;
  property_id: string;
  room_number: string;
  type: string;
  capacity: number;
  rate: number;
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  amenities: string[];
}

export interface Booking {
  id: string;
  property_id: string;
  room_id: string;
  guest_id: string;
  check_in: string;
  check_out: string;
  status: 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
  payment_status: 'pending' | 'partial' | 'paid';
  total_amount: number;
  created_at: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  id_type: string;
  id_number: string;
  nationality: string;
  address: string;
}

export interface Product {
  id: string;
  property_id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  unit: string;
}

export interface Sale {
  id: string;
  property_id: string;
  booking_id?: string;
  guest_id?: string;
  items: SaleItem[];
  total: number;
  payment_method: 'cash' | 'card' | 'mpesa' | 'room_charge';
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
}

export interface SaleItem {
  product_id: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Expense {
  id: string;
  property_id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  payment_method: string;
  reference: string;
  receipt_url?: string;
}