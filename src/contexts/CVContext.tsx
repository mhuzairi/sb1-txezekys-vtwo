import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { CV, CVContextType } from '../types/cv';
import { useAuth } from './AuthContext';

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cvs, setCVs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCVs();
    } else {
      setCVs([]);
      setLoading(false);
    }
  }, [user]);

  const fetchCVs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cvs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCVs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch CVs'));
    } finally {
      setLoading(false);
    }
  };

  const createCV = async (cv: Omit<CV, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('cvs')
        .insert([{ ...cv, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to create CV');

      setCVs(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create CV');
    }
  };

  const updateCV = async (id: string, cv: Partial<CV>) => {
    try {
      const { data, error } = await supabase
        .from('cvs')
        .update(cv)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to update CV');

      setCVs(prev => prev.map(c => c.id === id ? data : c));
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update CV');
    }
  };

  const deleteCV = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cvs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCVs(prev => prev.filter(cv => cv.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete CV');
    }
  };

  const setPrimaryCV = async (id: string) => {
    try {
      // The trigger will handle setting other CVs to non-primary
      const { data, error } = await supabase
        .from('cvs')
        .update({ is_primary: true })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to set primary CV');

      setCVs(prev => prev.map(cv => ({
        ...cv,
        is_primary: cv.id === id
      })));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to set primary CV');
    }
  };

  const getCVById = (id: string) => {
    return cvs.find(cv => cv.id === id);
  };

  const value: CVContextType = {
    cvs,
    loading,
    error,
    createCV,
    updateCV,
    deleteCV,
    setPrimaryCV,
    getCVById,
  };

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
}

export function useCV() {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
}
