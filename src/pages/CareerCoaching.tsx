import React from 'react';
import { MessageSquare, Star, Clock, Calendar } from 'lucide-react';

const coaches = [
  {
    id: 1,
    name: 'Dr. Michael Brown',
    specialty: 'Tech Career Strategy',
    experience: '15+ years',
    rating: 4.9,
    reviews: 128,
    price: 150,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Lisa Anderson',
    specialty: 'Leadership Development',
    experience: '12+ years',
    rating: 4.8,
    reviews: 94,
    price: 130,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Robert Chen',
    specialty: 'Interview Preparation',
    experience: '10+ years',
    rating: 4.7,
    reviews: 156,
    price: 120,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
  }
];

export function CareerCoaching() {
  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare className="text-red-600 h-8 w-8" />
          <h1 className="text-3xl font-bold text-white">Career Coaching</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <div key={coach.id} className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{coach.name}</h3>
                    <p className="text-red-600">{coach.specialty}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">{coach.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-gray-400">{coach.rating} ({coach.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">1 hour session</span>
                      <span className="text-white font-bold">${coach.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>Next available: Tomorrow</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors">
                    Book Session
                  </button>
                  <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded transition-colors">
                    View Profile
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