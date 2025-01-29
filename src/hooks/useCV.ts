import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function useCV() {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadCV = async (file: File) => {
    if (!user) throw new Error('User must be authenticated');
    
    try {
      setUploading(true);
      setError(null);

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('cvs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('cvs')
        .getPublicUrl(filePath);

      // Save CV record in the database
      const { error: dbError } = await supabase
        .from('cvs')
        .insert({
          user_id: user.id,
          title: file.name,
          file_url: publicUrl,
          file_type: file.type,
          status: 'active',
          ai_score: null,
          ai_feedback: null
        });

      if (dbError) throw dbError;

      // Simulate AI analysis (in a real app, you'd call an AI service)
      await analyzeCV(publicUrl);

      return publicUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading CV');
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const getUserCVs = async () => {
    if (!user) throw new Error('User must be authenticated');

    const { data, error } = await supabase
      .from('cvs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  };

  const deleteCV = async (id: string) => {
    if (!user) throw new Error('User must be authenticated');

    const { error } = await supabase
      .from('cvs')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
  };

  // Simulate AI analysis (in a real app, this would call an AI service)
  const analyzeCV = async (fileUrl: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockFeedback = {
      score: Math.floor(Math.random() * 41) + 60, // Score between 60-100
      feedback: {
        strengths: [
          "Clear professional experience section",
          "Good use of action verbs",
          "Relevant skills highlighted"
        ],
        improvements: [
          "Add more quantifiable achievements",
          "Include relevant certifications",
          "Optimize keywords for ATS systems"
        ],
        keywords: [
          "leadership",
          "project management",
          "team collaboration"
        ]
      }
    };

    // Update the CV record with AI feedback
    await supabase
      .from('cvs')
      .update({
        ai_score: mockFeedback.score,
        ai_feedback: mockFeedback.feedback
      })
      .eq('file_url', fileUrl);

    return mockFeedback;
  };

  return {
    uploadCV,
    getUserCVs,
    deleteCV,
    uploading,
    error
  };
}