import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Loader2, Download, X, Check, FileText } from 'lucide-react';
import { useCV } from '../hooks/useCV';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  type: 'user' | 'ai';
  content: string;
}

interface GeneratedCV {
  content: string;
  pdfUrl: string;
  data: {
    experience: string[];
    education: string[];
    skills: string[];
  };
}

export function AICVBuilder({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content: 'Hello! I\'m your AI CV assistant. I\'ll help you create a professional CV. Let\'s start with your most recent job role.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedCV, setGeneratedCV] = useState<GeneratedCV | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { uploadCV } = useCV();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length === 1) {
      setProgress(0);
    }
  }, [messages]);

  const updateProgress = (messageCount: number) => {
    const progressSteps = {
      1: 20,
      2: 40,
      3: 60,
      4: 80,
      5: 100
    };
    setProgress(progressSteps[messageCount] || progress);
  };

  const generatePDF = async (content: string) => {
    const blob = new Blob([content], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  };

  const updateUserProfile = async (cvData: GeneratedCV['data']) => {
    if (!user) return;

    try {
      // First, check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const profileData = {
        user_id: user.id,
        experience: cvData.experience,
        education: cvData.education,
        skills: cvData.skills,
        updated_at: new Date().toISOString()
      };

      if (existingProfile) {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Insert new profile
        const { error } = await supabase
          .from('profiles')
          .insert([{ ...profileData, created_at: new Date().toISOString() }]);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const handleAcceptCV = async () => {
    if (!generatedCV) return;

    try {
      setIsSaving(true);

      // Convert the PDF URL to a File object
      const response = await fetch(generatedCV.pdfUrl);
      const blob = await response.blob();
      const file = new File([blob], 'AI_Generated_CV.pdf', { type: 'application/pdf' });

      // Upload CV
      await uploadCV(file);
      
      // Update user profile with CV data
      await updateUserProfile(generatedCV.data);
      
      // Show success message
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'Your CV has been successfully saved and your profile has been updated!'
      }]);

      // Close the modal after a short delay
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error saving CV:', error);
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'There was an error saving your CV. Please try again.'
      }]);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setInput('');
    setIsLoading(true);

    const messageCount = messages.filter(m => m.type === 'user').length + 1;
    updateProgress(messageCount);

    setTimeout(async () => {
      const aiResponses: { [key: number]: string } = {
        1: "Great! Now, could you tell me about your educational background?",
        2: "Excellent. What are your key technical skills and competencies?",
        3: "Thanks! Any certifications or notable achievements you'd like to include?",
        4: "Perfect! I'm generating your CV now...",
        5: "I've created your CV! Here's a preview of what I've included. Would you like to review it?"
      };

      const response = aiResponses[messageCount] || "Is there anything specific you'd like to modify in your CV?";
      
      if (messageCount === 5) {
        const cvData = {
          experience: [
            'Senior Developer at TechCorp',
            'Led team of 5 developers',
            'Increased performance by 40%'
          ],
          education: [
            'Computer Science Degree',
            'Technical certifications'
          ],
          skills: [
            'React',
            'Node.js',
            'TypeScript',
            'Team Leadership',
            'Project Management'
          ]
        };

        const cvContent = `
# Professional CV

## Professional Experience
${cvData.experience.map(exp => `- ${exp}`).join('\n')}

## Education
${cvData.education.map(edu => `- ${edu}`).join('\n')}

## Skills
${cvData.skills.map(skill => `- ${skill}`).join('\n')}

## Achievements
- Successfully delivered 10+ major projects
- Mentored junior developers
- Implemented CI/CD pipeline
`;
        const pdfUrl = await generatePDF(cvContent);
        setGeneratedCV({ content: cvContent, pdfUrl, data: cvData });
        setShowPreview(true);
      }

      setMessages(prev => [...prev, { type: 'ai', content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-4xl my-4 md:my-8 flex flex-col relative max-h-[95vh] md:max-h-[85vh]">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800">
          <div 
            className="h-full bg-red-600 transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="p-3 md:p-4 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-gray-900 z-10">
          <div className="flex items-center gap-2">
            <Bot className="text-red-600 h-5 w-5" />
            <h2 className="text-white font-bold">AI CV Builder</h2>
            <span className="text-gray-400 text-sm">{progress}% Complete</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 flex min-h-0">
          {/* Chat Section */}
          <div className={`flex-1 flex flex-col ${showPreview ? 'border-r border-gray-800' : ''}`}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 custom-scrollbar">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-300'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <Loader2 className="h-5 w-5 animate-spin text-red-600" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 md:p-4 border-t border-gray-800 sticky bottom-0 bg-gray-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* CV Preview Section */}
          {showPreview && generatedCV && !isMobile && (
            <div className="hidden md:flex w-1/2 flex-col min-h-0">
              <div className="p-3 md:p-4 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  CV Preview
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-3 md:p-4 custom-scrollbar">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                    {generatedCV.content}
                  </pre>
                </div>
              </div>
              <div className="p-3 md:p-4 border-t border-gray-800 flex justify-between sticky bottom-0 bg-gray-900">
                <a
                  href={generatedCV.pdfUrl}
                  download="AI_Generated_CV.pdf"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Download className="h-5 w-5" />
                  Download PDF
                </a>
                <button
                  onClick={handleAcceptCV}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Check className="h-5 w-5" />
                  )}
                  {isSaving ? 'Saving...' : 'Accept & Save'}
                </button>
              </div>
            </div>
          )}
          
          {/* Mobile CV Preview Modal */}
          {showPreview && generatedCV && isMobile && (
            <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
              <div className="p-3 border-b border-gray-800 flex items-center justify-between bg-gray-900">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  CV Preview
                </h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                    {generatedCV.content}
                  </pre>
                </div>
              </div>
              <div className="p-3 border-t border-gray-800 flex flex-col gap-2 bg-gray-900">
                <a
                  href={generatedCV.pdfUrl}
                  download="AI_Generated_CV.pdf"
                  className="flex items-center justify-center gap-2 text-gray-300 hover:text-white transition-colors bg-gray-800 p-2 rounded"
                >
                  <Download className="h-5 w-5" />
                  Download PDF
                </a>
                <button
                  onClick={handleAcceptCV}
                  disabled={isSaving}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Check className="h-5 w-5" />
                  )}
                  {isSaving ? 'Saving...' : 'Accept & Save'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}