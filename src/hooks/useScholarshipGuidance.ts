import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { explainableAIAssistant, type UserProfile, type AIResponse } from '@/services/explainableAI';
import { toast } from 'sonner';

interface ScholarshipQuery {
  queryText: string;
  queryLanguage: string;
  userProfile?: UserProfile;
}

interface SavedQuery {
  id: string;
  query_text: string;
  query_language: string;
  user_profile: any;
  ai_response: any;
  eligible_schemes: any;
  created_at: string;
}

export function useScholarshipGuidance() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  // Process scholarship query
  const processQuery = useCallback(async (
    queryText: string,
    userProfile: UserProfile,
    language: string
  ): Promise<AIResponse | null> => {
    if (!queryText.trim()) {
      setError('Please enter a query');
      toast.error('Please enter a query');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      // Get AI response
      const aiResponse = explainableAIAssistant(queryText, userProfile);
      setResponse(aiResponse);

      // Save to Supabase
      await saveQuery({
        queryText,
        queryLanguage: language,
        userProfile,
      }, aiResponse);

      return aiResponse;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to process query';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Save query to Supabase
  const saveQuery = async (
    query: ScholarshipQuery,
    aiResponse: AIResponse
  ): Promise<void> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error: insertError } = await supabase
        .from('scholarship_queries')
        .insert({
          user_id: user?.id,
          query_text: query.queryText,
          query_language: query.queryLanguage,
          user_profile: query.userProfile as any,
          ai_response: aiResponse as any,
          eligible_schemes: aiResponse.eligibleSchemes.map(s => ({
            id: s.scheme.id,
            name: s.scheme.name,
            confidence: s.confidence,
          })) as any,
        });

      if (insertError) {
        console.error('Failed to save query:', insertError);
        // Don't throw - saving is optional
      }
    } catch (err) {
      console.error('Error saving query:', err);
      // Don't throw - saving is optional
    }
  };

  // Voice input using Web Speech API
  const startVoiceInput = useCallback((
    onResult: (text: string) => void,
    language: string = 'en-IN'
  ) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Voice input not supported in this browser');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = language;
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        toast.info('Listening... Speak now');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        toast.success('Voice captured');
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          toast.error('Microphone access denied. Please enable it in browser settings.');
        } else if (event.error === 'no-speech') {
          toast.error('No speech detected. Please try again.');
        } else {
          toast.error(`Voice input error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
      toast.error('Failed to start voice input');
    }
  }, []);

  // Stop voice input
  const stopVoiceInput = useCallback(() => {
    setIsListening(false);
  }, []);

  // Get user's query history
  const getQueryHistory = useCallback(async (): Promise<SavedQuery[]> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return [];
      }

      const { data, error } = await supabase
        .from('scholarship_queries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      return data || [];
    } catch (err) {
      console.error('Failed to fetch query history:', err);
      return [];
    }
  }, []);

  // Clear current response
  const clearResponse = useCallback(() => {
    setResponse(null);
    setError(null);
  }, []);

  return {
    loading,
    response,
    error,
    isListening,
    processQuery,
    startVoiceInput,
    stopVoiceInput,
    getQueryHistory,
    clearResponse,
  };
}
