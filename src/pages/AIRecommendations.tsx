import React from 'react';
import { Bot, TrendingUp, Target, BookOpen } from 'lucide-react';

interface Recommendation {
  category: string;
  icon: React.ReactNode;
  items: {
    title: string;
    description: string;
    confidence: number;
  }[];
}

const recommendations: Recommendation[] = [
  {
    category: 'Career Paths',
    icon: <TrendingUp className="h-6 w-6 text-red-600" />,
    items: [
      {
        title: 'Senior Software Architect',
        description: 'Your strong technical background and leadership experience make you well-suited for an architectural role.',
        confidence: 92
      },
      {
        title: 'Technical Product Manager',
        description: 'Your combination of technical skills and project management experience could transition well into product management.',
        confidence: 85
      }
    ]
  },
  {
    category: 'Skill Development',
    icon: <Target className="h-6 w-6 text-red-600" />,
    items: [
      {
        title: 'Cloud Architecture',
        description: 'Growing demand for cloud expertise. Focus on AWS or Azure certification.',
        confidence: 88
      },
      {
        title: 'AI/ML Engineering',
        description: 'Your strong programming foundation can be leveraged to move into AI/ML development.',
        confidence: 78
      }
    ]
  },
  {
    category: 'Learning Opportunities',
    icon: <BookOpen className="h-6 w-6 text-red-600" />,
    items: [
      {
        title: 'System Design & Architecture',
        description: 'Advanced course in distributed systems and microservices architecture.',
        confidence: 95
      },
      {
        title: 'Leadership & Management',
        description: 'Technical team leadership certification to enhance your management skills.',
        confidence: 82
      }
    ]
  }
];

export function AIRecommendations() {
  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Bot className="text-red-600 h-8 w-8" />
          <h1 className="text-3xl font-bold text-white">AI Career Recommendations</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendations.map((category, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                {category.icon}
                <h2 className="text-xl font-semibold text-white">{category.category}</h2>
              </div>

              <div className="space-y-6">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium">{item.title}</h3>
                      <span className="text-sm">
                        <span className="text-red-600">{item.confidence}%</span>
                        <span className="text-gray-400"> match</span>
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-red-600 h-1.5 rounded-full"
                        style={{ width: `${item.confidence}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded transition-colors">
                View Detailed Analysis
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Personalized Action Plan</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg">
              <div className="w-8 h-8 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Complete Cloud Certification</h3>
                <p className="text-gray-400">Focus on AWS Solutions Architect certification within the next 3 months.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg">
              <div className="w-8 h-8 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Build Portfolio Projects</h3>
                <p className="text-gray-400">Create two showcase projects demonstrating architectural and leadership skills.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg">
              <div className="w-8 h-8 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Network Expansion</h3>
                <p className="text-gray-400">Connect with 5 senior architects or technical leaders in target companies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}