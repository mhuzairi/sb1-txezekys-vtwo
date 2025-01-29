import React, { useState } from 'react';
import { Mail, MapPin, Calendar, Briefcase, GraduationCap, Award, Sparkles, Bot, ChevronDown, ChevronUp, Upload } from 'lucide-react';

interface AIRecommendation {
  category: string;
  recommendations: string[];
}

export function Profile() {
  const [showAIInsights, setShowAIInsights] = useState(false);

  // Mock AI recommendations (in a real app, this would come from your backend)
  const aiRecommendations: AIRecommendation[] = [
    {
      category: 'Career Path',
      recommendations: [
        'Consider specializing in Cloud Architecture',
        'Explore leadership roles in Technical Project Management',
        'Focus on DevOps and Infrastructure as Code'
      ]
    },
    {
      category: 'Skill Development',
      recommendations: [
        'Learn Kubernetes for container orchestration',
        'Develop expertise in AWS or Azure cloud services',
        'Strengthen system design and architecture skills'
      ]
    },
    {
      category: 'Industry Trends',
      recommendations: [
        'Growing demand for AI/ML engineers',
        'Increased focus on cybersecurity expertise',
        'Rise of serverless architecture adoption'
      ]
    }
  ];

  // Mock CV enhancement suggestions
  const cvEnhancements = {
    strengths: [
      'Strong technical background in full-stack development',
      'Proven leadership experience',
      'Clear project achievements'
    ],
    improvements: [
      'Add more quantifiable metrics to achievements',
      'Include certifications section',
      'Expand on team leadership experiences'
    ],
    keywords: ['Full Stack', 'React', 'Node.js', 'AWS', 'Team Leadership', 'Agile']
  };

  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-red-600 to-red-800"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col items-center -mt-16">
              <div className="relative group">
                <div className="bg-gray-800 rounded-full p-1">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                    alt="Profile"
                    className="rounded-full h-32 w-32 object-cover"
                  />
                </div>
                <label
                  htmlFor="photo-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                >
                  <Upload className="h-8 w-8 text-white" />
                </label>
                <input
                  type="file"
                  id="photo-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Handle file upload here
                      console.log('Uploading file:', file);
                    }
                  }}
                />
              </div>
              <h1 className="text-2xl font-bold text-white mt-4">John Doe</h1>
              <p className="text-red-600">Senior Full Stack Developer</p>
              
              <div className="flex items-center gap-4 mt-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>john@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Insights Section */}
        <div className="mt-8">
          <button
            onClick={() => setShowAIInsights(!showAIInsights)}
            className="w-full flex items-center justify-between bg-gray-900 p-4 rounded-lg text-white hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Bot className="text-red-600 h-5 w-5" />
              <span className="font-bold">AI Career Insights</span>
            </div>
            {showAIInsights ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          
          {showAIInsights && (
            <div className="mt-4 space-y-6">
              {/* CV Enhancement */}
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-red-600 h-5 w-5" />
                  <h3 className="text-xl font-bold text-white">CV Enhancement</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-green-500 font-semibold mb-2">Strengths</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {cvEnhancements.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-yellow-500 font-semibold mb-2">Areas for Improvement</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {cvEnhancements.improvements.map((improvement, index) => (
                        <li key={index}>{improvement}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-blue-500 font-semibold mb-2">Key Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {cvEnhancements.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Career Recommendations */}
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="text-red-600 h-5 w-5" />
                  <h3 className="text-xl font-bold text-white">Career Recommendations</h3>
                </div>
                
                <div className="space-y-6">
                  {aiRecommendations.map((category, index) => (
                    <div key={index}>
                      <h4 className="text-red-600 font-semibold mb-2">{category.category}</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {category.recommendations.map((rec, recIndex) => (
                          <li key={recIndex}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="text-red-600 h-5 w-5" />
              <h2 className="text-xl font-bold text-white">Work Experience</h2>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="border-l-2 border-gray-800 pl-4 space-y-6">
                <div>
                  <h3 className="text-white font-semibold">Senior Developer</h3>
                  <p className="text-red-600">TechCorp Inc.</p>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>2020 - Present</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="text-red-600 h-5 w-5" />
              <h2 className="text-xl font-bold text-white">Education</h2>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="border-l-2 border-gray-800 pl-4">
                <h3 className="text-white font-semibold">Computer Science</h3>
                <p className="text-red-600">University of Technology</p>
                <p className="text-gray-400">2016 - 2020</p>
              </div>
            </div>
          </section>
          
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-red-600 h-5 w-5" />
              <h2 className="text-xl font-bold text-white">Skills</h2>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'].map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}