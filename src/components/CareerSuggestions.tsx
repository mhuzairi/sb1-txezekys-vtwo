import React from 'react';
import type { CareerSuggestion } from '../types';

const suggestions: CareerSuggestion[] = [
  {
    id: '1',
    title: 'Full Stack Development',
    type: 'course',
    provider: 'Coursera',
    description: 'Master modern web development with this comprehensive course',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
    url: '#'
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    type: 'certification',
    provider: 'Udemy',
    description: 'Learn the basics of data science and analytics',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    url: '#'
  },
  {
    id: '3',
    title: 'Project Management',
    type: 'certification',
    provider: 'LinkedIn Learning',
    description: 'Get certified in modern project management methodologies',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
    url: '#'
  }
];

export function CareerSuggestions() {
  return (
    <section className="bg-black py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-3xl font-bold mb-8">Recommended for You</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id}
              className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img 
                src={suggestion.imageUrl} 
                alt={suggestion.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-red-600 text-sm font-medium">
                  {suggestion.type.toUpperCase()} • {suggestion.provider}
                </span>
                <h3 className="text-white text-xl font-bold mt-2 mb-3">
                  {suggestion.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {suggestion.description}
                </p>
                <a 
                  href={suggestion.url}
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}