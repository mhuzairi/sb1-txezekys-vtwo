import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

export function Search() {
  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for jobs, companies, or skills..."
              className="w-full bg-gray-900 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
            Search
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample job cards */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">Senior Developer</h3>
              <p className="text-red-600 mb-2">TechCorp Inc.</p>
              <p className="text-gray-400 mb-4">Full-time • Remote • $120k - $150k</p>
              <p className="text-gray-300 mb-4">
                We're looking for an experienced developer to join our team...
              </p>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}