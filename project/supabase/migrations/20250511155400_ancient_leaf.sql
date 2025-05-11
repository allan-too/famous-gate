/*
  # Initial Schema for Famous Gate Hotel Management System

  1. New Tables
    - `roles`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
    - `users`
      - `id` (uuid, primary key)
      - `auth_id` (uuid, references auth.users)
      - `name` (text)
      - `email` (text, unique)
      - `role_id` (uuid, references roles)
      - `property_id` (uuid, optional)
      - `status` (text)
      - `created_at` (timestamp)
    - `properties`
      - `id` (uuid, primary key)
      - `name` (text)
      - `location` (text)
      - `address` (text)
      - `phone` (text)
      - `email` (text)
      - `rooms_count` (integer)
      - `created_at` (timestamp)
    - `rooms`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `room_number` (text)
      - `type` (text)
      - `capacity` (integer)
      - `rate` (numeric)
      - `status` (text)
      - `amenities` (text[])
      - `created_at` (timestamp)
    - `guests`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `id_type` (text)
      - `id_number` (text)
      - `nationality` (text)
      - `address` (text)
      - `created_at` (timestamp)
    - `bookings`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `room_id` (uuid, references rooms)
      - `guest_id` (uuid, references guests)
      - `check_in` (date)
      - `check_out` (date)
      - `status` (text)
      - `payment_status` (text)
      - `total_amount` (numeric)
      - `created_at` (timestamp)
    - `products`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `name` (text)
      - `category` (text)
      - `price` (numeric)
      - `cost` (numeric)
      - `stock` (integer)
      - `unit` (text)
      - `created_at` (timestamp)
    - `sales`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `booking_id` (uuid, references bookings, optional)
      - `guest_id` (uuid, references guests, optional)
      - `total` (numeric)
      - `payment_method` (text)
      - `status` (text)
      - `created_at` (timestamp)
    - `sale_items`
      - `id` (uuid, primary key)
      - `sale_id` (uuid, references sales)
      - `product_id` (uuid, references products)
      - `quantity` (numeric)
      - `price` (numeric)
      - `subtotal` (numeric)
    - `expenses`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `category` (text)
      - `amount` (numeric)
      - `description` (text)
      - `date` (date)
      - `payment_method` (text)
      - `reference` (text)
      - `receipt_url` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users based on their roles
*/

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create users table (extending auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid REFERENCES auth.users,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role_id uuid REFERENCES roles,
  property_id uuid,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  address text,
  phone text,
  email text,
  rooms_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties NOT NULL,
  room_number text NOT NULL,
  type text NOT NULL,
  capacity integer DEFAULT 2,
  rate numeric NOT NULL,
  status text DEFAULT 'available',
  amenities text[],
  created_at timestamptz DEFAULT now(),
  UNIQUE(property_id, room_number)
);

-- Create guests table
CREATE TABLE IF NOT EXISTS guests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  id_type text,
  id_number text,
  nationality text,
  address text,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties NOT NULL,
  room_id uuid REFERENCES rooms NOT NULL,
  guest_id uuid REFERENCES guests NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  status text DEFAULT 'confirmed',
  payment_status text DEFAULT 'pending',
  total_amount numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL,
  cost numeric NOT NULL,
  stock integer DEFAULT 0,
  unit text DEFAULT 'unit',
  created_at timestamptz DEFAULT now()
);

-- Create sales table
CREATE TABLE IF NOT EXISTS sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties NOT NULL,
  booking_id uuid REFERENCES bookings,
  guest_id uuid REFERENCES guests,
  total numeric NOT NULL,
  payment_method text NOT NULL,
  status text DEFAULT 'completed',
  created_at timestamptz DEFAULT now()
);

-- Create sale_items table
CREATE TABLE IF NOT EXISTS sale_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id uuid REFERENCES sales NOT NULL,
  product_id uuid REFERENCES products NOT NULL,
  quantity numeric NOT NULL,
  price numeric NOT NULL,
  subtotal numeric NOT NULL
);

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties NOT NULL,
  category text NOT NULL,
  amount numeric NOT NULL,
  description text,
  date date NOT NULL,
  payment_method text NOT NULL,
  reference text,
  receipt_url text,
  created_at timestamptz DEFAULT now()
);

-- Update the foreign key in users table
ALTER TABLE users ADD CONSTRAINT users_property_id_fkey FOREIGN KEY (property_id) REFERENCES properties (id);

-- Enable Row Level Security
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Create policies for each table
-- For roles table: only admins can manage roles
CREATE POLICY "Admins can manage roles" ON roles
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.auth_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM roles
      WHERE roles.id = users.role_id
      AND roles.name = 'admin'
    )
  ));

-- For users table: admins can manage all users, users can read their own data
CREATE POLICY "Admins can manage all users" ON users
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users u
    JOIN roles r ON r.id = u.role_id
    WHERE u.auth_id = auth.uid()
    AND r.name = 'admin'
  ));

CREATE POLICY "Users can read own data" ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_id);

-- For properties table: admins can manage all properties, managers and staff can read their assigned property
CREATE POLICY "Admins can manage all properties" ON properties
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users u
    JOIN roles r ON r.id = u.role_id
    WHERE u.auth_id = auth.uid()
    AND r.name = 'admin'
  ));

CREATE POLICY "Managers and staff can read their assigned property" ON properties
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.auth_id = auth.uid()
    AND users.property_id = properties.id
  ));

-- For rooms table: similar pattern as properties
CREATE POLICY "Admins can manage all rooms" ON rooms
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users u
    JOIN roles r ON r.id = u.role_id
    WHERE u.auth_id = auth.uid()
    AND r.name = 'admin'
  ));

CREATE POLICY "Managers and staff can read their property rooms" ON rooms
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.auth_id = auth.uid()
    AND users.property_id = rooms.property_id
  ));

-- Create initial roles
INSERT INTO roles (name, description) VALUES
  ('admin', 'Administrator with full access'),
  ('manager', 'Property manager with access to operational functions'),
  ('staff', 'Front desk and service staff with limited access')
ON CONFLICT (name) DO NOTHING;

-- Create sample properties
INSERT INTO properties (name, location, address, phone, email, rooms_count) VALUES
  ('Famous Gate Kericho', 'Kericho', '123 Kericho Road', '+254722111222', 'kericho@famousgatehotel.com', 30),
  ('Famous Gate Bomet', 'Bomet', '456 Bomet Avenue', '+254722333444', 'bomet@famousgatehotel.com', 20)
ON CONFLICT DO NOTHING;