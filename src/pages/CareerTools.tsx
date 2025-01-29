import React from 'react';
import { BookOpen, Video, Users, MessageSquare, FileText, Sparkles, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CareerTools() {
  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Career Development Tools</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <BookOpen className="text-red-600 h-6 w-6" />
              <h2 className="text-xl font-semibold text-white">Online Courses</h2>
            </div>
            <p className="text-gray-400 mb-4">Access curated courses to enhance your skills.</p>
            <Link to="/courses" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors">
              Browse Courses
            </Link>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <FileText className="text-red-600 h-6 w-6" />
              <h2 className="text-xl font-semibold text-white">CV Tools</h2>
            </div>
            <p className="text-gray-400 mb-4">Create professional CVs with our AI-powered builder.</p>
            <Link to="/cv-builder" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors">
              Create CV
            </Link>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <Video className="text-red-600 h-6 w-6" />
              <h2 className="text-xl font-semibold text-white">Webinars</h2>
            </div>
            <p className="text-gray-400 mb-4">Join live sessions with industry experts.</p>
            <Link to="/webinars" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors">
              View Schedule
            </Link>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <Users className="text-red-600 h-6 w-6" />
              <h2 className="text-xl font-semibold text-white">Networking</h2>
            </div>
            <p className="text-gray-400 mb-4">Connect with professionals in your field.</p>
            <Link to="/networking" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors">
              Find Connections
            </Link>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <MessageSquare className="text-red-600 h-6 w-6" />
              <h2 className="text-xl font-semibold text-white">Career Coaching</h2>
            </div>
            <p className="text-gray-400 mb-4">Get personalized guidance from career experts.</p>
            <Link to="/career-coaching" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors">
              Book Session
            </Link>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <Sparkles className="text-red-600 h-6 w-6" />
              <h2 className="text-xl font-semibold text-white">AI Enhancement</h2>
            </div>
            <p className="text-gray-400 mb-4">Get AI-powered suggestions to improve your CV.</p>
            <Link to="/ai-enhancement" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors">
              Enhance CV
            </Link>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <Bot className="text-red-600 h-6 w-6" />
              <h2 className="text-xl font-semibold text-white">AI Recommendations</h2>
            </div>
            <p className="text-gray-400 mb-4">Receive personalized career path suggestions.</p>
            <Link to="/ai-recommendations" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors">
              Get Insights
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}