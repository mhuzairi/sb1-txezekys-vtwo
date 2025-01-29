import React from 'react';
import { Users, MessageSquare, Globe2, Building2 } from 'lucide-react';

const professionals = [
  {
    id: 1,
    name: 'Emma Watson',
    role: 'Senior Software Engineer',
    company: 'Google',
    location: 'San Francisco, CA',
    connections: 500,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Product Manager',
    company: 'Microsoft',
    location: 'Seattle, WA',
    connections: 350,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Sarah Miller',
    role: 'Tech Lead',
    company: 'Apple',
    location: 'Cupertino, CA',
    connections: 420,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
  }
];

export function Networking() {
  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Users className="text-red-600 h-8 w-8" />
          <h1 className="text-3xl font-bold text-white">Professional Network</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionals.map((professional) => (
            <div key={professional.id} className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{professional.name}</h3>
                    <p className="text-red-600">{professional.role}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Building2 className="h-4 w-4" />
                    <span>{professional.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Globe2 className="h-4 w-4" />
                    <span>{professional.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{professional.connections}+ connections</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors">
                    Connect
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}