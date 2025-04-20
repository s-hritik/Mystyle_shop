import { supabase } from './supabase';
import { Database } from '../types/supabase';

type Tables = Database['public']['Tables'];
type Product = Tables['products']['Row'];
type Order = Tables['orders']['Row'];
type Review = Tables['reviews']['Row'];

export const api = {
  products: {
    async list() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          reviews (
            *,
            profiles (name)
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },

    async search(query: string) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async getByCategory(category: string) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  },

  orders: {
    async list() {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async create(order: Omit<Tables['orders']['Insert'], 'id' | 'created_at' | 'updated_at'>) {
      const { data, error } = await supabase
        .from('orders')
        .insert(order)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },

    async updateStatus(id: string, status: Order['status']) {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  },

  reviews: {
    async create(review: Omit<Tables['reviews']['Insert'], 'id' | 'created_at'>) {
      const { data, error } = await supabase
        .from('reviews')
        .insert(review)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async update(id: string, review: Partial<Tables['reviews']['Update']>) {
      const { data, error } = await supabase
        .from('reviews')
        .update(review)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    }
  },

  profiles: {
    async get() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    },

    async update(profile: Partial<Tables['profiles']['Update']>) {
      const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  }
};