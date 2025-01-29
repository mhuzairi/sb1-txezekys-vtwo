import React from 'react';
import { Video, Calendar, Users } from 'lucide-react';

const webinars = [
  {
    id: 1,
    title: 'Future of AI in Tech Industry',
    speaker: 'Dr. Sarah Johnson',
    date: '2024-04-15T18:00:00Z',
    attendees: 156,
    description: 'Explore how AI is transforming the technology industry and what it means for your career.'
  },
  {
    id: 2,
    title: 'Mastering Technical Interviews',
    speaker: 'Mark Thompson',
    date: '2024-04-18T17:00:00Z',
    attendees: 234,
    description: 'Learn proven strategies to ace your technical interviews at top tech companies.'
  },
  {
    id: 3,
    title: 'Building Scalable Systems',
    speaker: 'Alex Chen',
    date: '2024-04-20T19:00:00Z',
    attendees: 189,
    description: 'Deep dive into architecture patterns for building highly scalable applications.'
  }
];

export function Webinars() {
  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Video className="text-red-600 h-8 w-8" />
          <h1 className="text-3xl font-bold text-white">Upcoming Webinars</h1>
        </div>

        <div className="space-y-6">
          {webinars.map((webinar) => (
            <div key={webinar.id} className="bg-gray-900 rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{webinar.title}</h3>
                  <p className="text-gray-400 mb-4">{webinar.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-red-600" />
                      <span className="text-gray-300">
                        {new Date(webinar.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-red-600" />
                      <span className="text-gray-300">{webinar.attendees} registered</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-start md:items-end gap-4">
                  <div className="text-right">
                    <p className="text-white font-medium">Presented by</p>
                    <p className="text-red-600">{webinar.speaker}</p>
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors">
                    Register Now
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