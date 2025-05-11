import { create } from 'zustand';
import { supabase, Property, Room } from '../lib/supabase';

interface PropertyState {
  properties: Property[];
  currentProperty: Property | null;
  rooms: Room[];
  loading: boolean;
  error: string | null;
  fetchProperties: () => Promise<void>;
  fetchRooms: (propertyId: string) => Promise<void>;
  setCurrentProperty: (property: Property) => void;
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  currentProperty: null,
  rooms: [],
  loading: false,
  error: null,

  fetchProperties: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*');

      if (error) throw error;

      set({ 
        properties: data as Property[],
        loading: false,
        error: null 
      });

      // Set the first property as current if none is selected
      if (data.length > 0 && !get().currentProperty) {
        set({ currentProperty: data[0] as Property });
      }
    } catch (error: any) {
      console.error('Error fetching properties:', error);
      set({ 
        error: error.message || 'Failed to fetch properties',
        loading: false 
      });
    }
  },

  fetchRooms: async (propertyId) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('property_id', propertyId);

      if (error) throw error;

      set({ 
        rooms: data as Room[],
        loading: false,
        error: null 
      });
    } catch (error: any) {
      console.error('Error fetching rooms:', error);
      set({ 
        error: error.message || 'Failed to fetch rooms',
        loading: false 
      });
    }
  },

  setCurrentProperty: (property) => {
    set({ currentProperty: property });
    // Fetch rooms for the selected property
    get().fetchRooms(property.id);
  },
}));