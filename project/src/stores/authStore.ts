import { create } from 'zustand';
import { supabase, User } from '../lib/supabase';

interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: false,
  error: null,
  initialized: false,

  initialize: async () => {
    set({ loading: true });
    try {
      // Get session data
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Get user profile data
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('auth_id', session.user.id)
          .single();
          
        set({ 
          session, 
          user: userData as User,
          initialized: true,
          loading: false 
        });
      } else {
        set({ 
          session: null, 
          user: null,
          initialized: true,
          loading: false 
        });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ 
        error: 'Failed to initialize authentication',
        initialized: true,
        loading: false 
      });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === 'Invalid login credentials') {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        }
        throw error;
      }

      if (data.session) {
        // Get user profile data
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('auth_id', data.session.user.id)
          .single();
          
        if (userError) {
          throw new Error('Failed to fetch user profile. Please contact support.');
        }

        if (!userData) {
          throw new Error('User profile not found. Please contact support.');
        }

        set({ 
          session: data.session, 
          user: userData as User,
          loading: false,
          error: null 
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      set({ 
        error: error.message || 'Failed to login. Please try again later.',
        loading: false 
      });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await supabase.auth.signOut();
      set({ 
        user: null, 
        session: null, 
        loading: false,
        error: null 
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      set({ 
        error: error.message || 'Failed to logout',
        loading: false 
      });
    }
  },
}));