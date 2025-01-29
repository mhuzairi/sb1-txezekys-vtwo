import React, { useState } from 'react';
import { Sparkles, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface Enhancement {
  type: 'strength' | 'improvement';
  text: string;
}

const mockEnhancements: Enhancement[] = [
  { type: 'strength', text: 'Strong technical skills presentation' },
  { type: 'strength', text: 'Clear project achievements' },
  { type: 'strength', text: 'Well-structured experience section' },
  { type: 'improvement', text: 'Add more quantifiable results' },
  { type: 'improvement', text: 'Include relevant certifications' },
  { type: 'improvement', text: 'Expand on leadership experiences' }
];

export function AIEnhancement() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [enhancements, setEnhancements] = useState<Enhancement[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      // Simulate analysis
      setAnalyzing(true);
      setTimeout(() => {
        setEnhancements(mockEnhancements);
        setAnalyzing(false);
      }, 2000);
    }
  };

  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="text-red-600 h-8 w-8" />
          <h1 className="text-3xl font-bold text-white">AI CV Enhancement</h1>
        </div>

        <div className="bg-gray-900 rounded-lg p-8">
          {!file ? (
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Upload your CV</h2>
              <p className="text-gray-400 mb-4">Let our AI analyze and enhance your CV</p>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                id="cv-upload"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="cv-upload"
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded cursor-pointer transition-colors"
              >
                Select File
              </label>
              <p className="text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <FileText className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="text-white">{file.name}</p>
                  <p className="text-gray-400 text-sm">
                    Uploaded {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              {analyzing ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                  <p className="text-gray-400">Analyzing your CV...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="text-green-500 h-5 w-5" />
                      Strengths
                    </h3>
                    <div className="space-y-3">
                      {enhancements
                        .filter(e => e.type === 'strength')
                        .map((enhancement, index) => (
                          <div
                            key={index}
                            className="bg-gray-800 p-4 rounded flex items-start gap-3"
                          >
                            <CheckCircle className="text-green-500 h-5 w-5 mt-0.5" />
                            <p className="text-gray-300">{enhancement.text}</p>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <AlertCircle className="text-yellow-500 h-5 w-5" />
                      Suggested Improvements
                    </h3>
                    <div className="space-y-3">
                      {enhancements
                        .filter(e => e.type === 'improvement')
                        .map((enhancement, index) => (
                          <div
                            key={index}
                            className="bg-gray-800 p-4 rounded flex items-start gap-3"
                          >
                            <AlertCircle className="text-yellow-500 h-5 w-5 mt-0.5" />
                            <p className="text-gray-300">{enhancement.text}</p>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-6">
                    <button
                      onClick={() => {
                        setFile(null);
                        setEnhancements([]);
                      }}
                      className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
                    >
                      Upload New CV
                    </button>
                    <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors">
                      Download Enhanced CV
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}