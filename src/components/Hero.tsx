import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
      </div>
      
      <div className="relative flex-1 flex flex-col">
        <div className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-20 flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Where Talent Meets <br />
            <span className="text-red-600">Opportunity</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
            Unlock your career potential. Connect with top employers, showcase your skills, and take control of your professional journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/upload-cv"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-medium transition-colors text-center"
            >
              Upload Your CV
            </Link>
            <Link
              to="/search-talent"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded font-medium transition-colors text-center"
            >
              Search Talent
            </Link>
          </div>
        </div>

        {/* New AI Builder Feature Section */}
        <div className="relative bg-black/80 backdrop-blur-sm py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Bot className="h-8 w-8 text-red-600" />
                  <Sparkles className="h-6 w-6 text-red-600 animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Introducing AI CV Builder
                </h2>
                <p className="text-gray-300 mb-6">
                  Create a professional CV in minutes with our new AI-powered builder. Get personalized suggestions, instant feedback, and optimize your CV for maximum impact.
                </p>
                <Link
                  to="/career-tools"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-medium transition-colors"
                >
                  <Bot className="h-5 w-5" />
                  Try AI Builder Now
                </Link>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-900/50 backdrop-blur p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Smart Content Analysis</h3>
                  <p className="text-gray-300">Our AI analyzes your experience and suggests the best way to present your skills.</p>
                </div>
                <div className="bg-gray-900/50 backdrop-blur p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Real-time Optimization</h3>
                  <p className="text-gray-300">Get instant feedback and suggestions to improve your CV's impact.</p>
                </div>
                <div className="bg-gray-900/50 backdrop-blur p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">ATS-Friendly Format</h3>
                  <p className="text-gray-300">Ensure your CV passes Applicant Tracking Systems with optimized formatting.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}