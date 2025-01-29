import React, { useState, useEffect } from 'react';
import { Upload, FileText, Trash2, AlertCircle, CheckCircle, Bot, Sparkles } from 'lucide-react';
import { useCV } from '../hooks/useCV';
import { useAuth } from '../contexts/AuthContext';
import { AICVBuilder } from '../components/AICVBuilder';

interface CV {
  id: string;
  title: string;
  file_url: string;
  created_at: string;
  ai_score: number | null;
  ai_feedback: {
    strengths: string[];
    improvements: string[];
    keywords: string[];
  } | null;
}

export function UploadCV() {
  const { user } = useAuth();
  const { uploadCV, getUserCVs, deleteCV, uploading, error } = useCV();
  const [showAIBuilder, setShowAIBuilder] = useState(false);
  const [cvs, setCVs] = useState<CV[]>([]);
  const [selectedCV, setSelectedCV] = useState<CV | null>(null);

  useEffect(() => {
    if (user) {
      loadCVs();
    }
  }, [user]);

  const loadCVs = async () => {
    try {
      const data = await getUserCVs();
      setCVs(data);
    } catch (err) {
      console.error('Error loading CVs:', err);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await uploadCV(file);
      await loadCVs();
    } catch (err) {
      console.error('Error uploading CV:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCV(id);
      await loadCVs();
      if (selectedCV?.id === id) {
        setSelectedCV(null);
      }
    } catch (err) {
      console.error('Error deleting CV:', err);
    }
  };

  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* AI CV Builder Hero Section */}
        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Bot className="h-8 w-8 text-red-600" />
                <Sparkles className="h-6 w-6 text-red-600 animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Create Your CV with AI
              </h2>
              <p className="text-gray-300 mb-6">
                Let our AI-powered builder create a professional CV for you in minutes. Get personalized suggestions, instant feedback, and optimize your CV for maximum impact.
              </p>
              <button
                onClick={() => setShowAIBuilder(true)}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-medium transition-colors"
              >
                <Bot className="h-5 w-5" />
                Start AI Builder
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-800/50 backdrop-blur p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Smart Content Analysis</h3>
                <p className="text-gray-300">Our AI analyzes your experience and suggests the best way to present your skills.</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Real-time Optimization</h3>
                <p className="text-gray-300">Get instant feedback and suggestions to improve your CV's impact.</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">ATS-Friendly Format</h3>
                <p className="text-gray-300">Ensure your CV passes Applicant Tracking Systems with optimized formatting.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-8">Upload Your CV</h1>
            
            <div className="bg-gray-900 rounded-lg p-8">
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">Drop your CV here</h2>
                <p className="text-gray-400 mb-4">or click to browse</p>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  id="cv-upload"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
                <label
                  htmlFor="cv-upload"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded cursor-pointer transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Select File'}
                </label>
                <p className="text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX</p>
              </div>
              
              {error && (
                <div className="mt-4 bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
                  {error}
                </div>
              )}
              
              <div className="mt-8">
                <h3 className="text-white font-semibold mb-4">Your CVs</h3>
                <div className="space-y-4">
                  {cvs.map((cv) => (
                    <div
                      key={cv.id}
                      className="flex items-center justify-between bg-gray-800 p-4 rounded hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => setSelectedCV(cv)}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="text-gray-400 h-5 w-5" />
                        <div>
                          <span className="text-gray-300 block">{cv.title}</span>
                          <span className="text-gray-500 text-sm">
                            {new Date(cv.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {cv.ai_score && (
                          <span className="text-gray-300">
                            Score: {cv.ai_score}
                          </span>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(cv.id);
                          }}
                          className="text-red-600 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {selectedCV && (
            <div className="bg-gray-900 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">AI Analysis</h2>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Overall Score</span>
                  <span className="text-2xl font-bold text-white">
                    {selectedCV.ai_score || 'Analyzing...'}
                  </span>
                </div>
                {selectedCV.ai_score && (
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full"
                      style={{ width: `${selectedCV.ai_score}%` }}
                    ></div>
                  </div>
                )}
              </div>

              {selectedCV.ai_feedback ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="text-green-500 h-5 w-5" />
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {selectedCV.ai_feedback.strengths.map((strength, index) => (
                        <li key={index} className="text-gray-300">
                          • {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="text-yellow-500 h-5 w-5" />
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {selectedCV.ai_feedback.improvements.map((improvement, index) => (
                        <li key={index} className="text-gray-300">
                          • {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      Key Skills Detected
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCV.ai_feedback.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
                  Analyzing your CV...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {showAIBuilder && <AICVBuilder onClose={() => setShowAIBuilder(false)} />}
    </div>
  );
}