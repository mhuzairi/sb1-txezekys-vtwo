import React, { useState } from 'react';
import { Search as SearchIcon, Filter, MapPin, Briefcase, Heart, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Talent {
  id: number;
  name: string;
  role: string;
  location: string;
  experience: string;
  rating: number;
  reviews: number;
  views: number;
  likes: number;
  skills: string[];
  image: string;
  wishlisted?: boolean;
  liked?: boolean;
}

export function SearchTalent() {
  const [talents, setTalents] = useState<Talent[]>([
    {
      id: 1,
      name: 'Sarah Wilson',
      role: 'Senior Full Stack Developer',
      location: 'San Francisco, CA',
      experience: '8+ years',
      rating: 4.8,
      reviews: 56,
      views: 1234,
      likes: 342,
      skills: ['React', 'Node.js', 'TypeScript'],
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'James Chen',
      role: 'DevOps Engineer',
      location: 'Seattle, WA',
      experience: '5+ years',
      rating: 4.7,
      reviews: 42,
      views: 987,
      likes: 156,
      skills: ['AWS', 'Docker', 'Kubernetes'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      name: 'Alex Thompson',
      role: 'Machine Learning Engineer',
      location: 'Boston, MA',
      experience: '7+ years',
      rating: 4.9,
      reviews: 48,
      views: 1567,
      likes: 423,
      skills: ['Python', 'TensorFlow', 'Deep Learning'],
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80'
    },
    {
      id: 5,
      name: 'Maria Garcia',
      role: 'Mobile Developer',
      location: 'Austin, TX',
      experience: '4+ years',
      rating: 4.6,
      reviews: 31,
      views: 892,
      likes: 167,
      skills: ['React Native', 'iOS', 'Android'],
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80'
    },
    {
      id: 6,
      name: 'David Kim',
      role: 'Cloud Architect',
      location: 'Seattle, WA',
      experience: '9+ years',
      rating: 4.9,
      reviews: 67,
      views: 2134,
      likes: 589,
      skills: ['AWS', 'Azure', 'Kubernetes'],
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80'
    }
    ,{
      id: 3,
      name: 'Emma Davis',
      role: 'UI/UX Designer',
      location: 'New York, NY',
      experience: '6+ years',
      rating: 4.9,
      reviews: 38,
      views: 856,
      likes: 278,
      skills: ['Figma', 'UI Design', 'User Research'],
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
    }
  ]);
  const [sortBy, setSortBy] = useState('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const [selectedFilters, setSelectedFilters] = useState({
    experience: '',
    location: '',
    skills: [] as string[]
  });
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = () => {
    setShowFilters(!showFilters);
  };
  
  const sortTalents = (talents: Talent[]) => {
    return [...talents].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'views':
          return b.views - a.views;
        case 'likes':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });
  };

  const handleLike = (id: number) => {
    setTalents(prev => prev.map(talent => {
      if (talent.id === id) {
        return {
          ...talent,
          liked: !talent.liked,
          likes: talent.liked ? talent.likes - 1 : talent.likes + 1
        };
      }
      return talent;
    }));
  };

  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Search Talent</h1>
          <button
            onClick={toggleFilter}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              showFilters ? 'bg-red-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="bg-gray-900 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Experience</label>
                <select
                  value={selectedFilters.experience}
                  onChange={(e) => setSelectedFilters({ ...selectedFilters, experience: e.target.value })}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="">Any Experience</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Location</label>
                <select
                  value={selectedFilters.location}
                  onChange={(e) => setSelectedFilters({ ...selectedFilters, location: e.target.value })}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="">Any Location</option>
                  <option value="sf">San Francisco</option>
                  <option value="ny">New York</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="rating">Rating</option>
                  <option value="experience">Experience</option>
                  <option value="views">Most Viewed</option>
                  <option value="likes">Most Liked</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Availability</label>
                <select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="all">All</option>
                  <option value="available">Available Now</option>
                  <option value="next-month">Available Next Month</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Skills</label>
                <input
                  type="text"
                  placeholder="e.g., React, Node.js"
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search talents..."
              className="w-full bg-gray-900 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-900 rounded-lg p-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-800' : ''}`}
              >
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-1.5 h-1.5 bg-current rounded" />
                  <div className="w-1.5 h-1.5 bg-current rounded" />
                  <div className="w-1.5 h-1.5 bg-current rounded" />
                  <div className="w-1.5 h-1.5 bg-current rounded" />
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-800' : ''}`}
              >
                <div className="space-y-1">
                  <div className="w-6 h-1.5 bg-current rounded" />
                  <div className="w-6 h-1.5 bg-current rounded" />
                  <div className="w-6 h-1.5 bg-current rounded" />
                </div>
              </button>
            </div>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
            Search
          </button>
        </div>
        
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {sortTalents(talents).map((talent) => (
            <div
              key={talent.id}
              className="bg-gray-900 rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={talent.image}
                    alt={talent.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{talent.name}</h3>
                    <p className="text-red-600">{talent.role}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{talent.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Briefcase className="h-4 w-4" />
                    <span>{talent.experience}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{talent.rating} ({talent.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{talent.views}</span>
                      <Heart className="h-4 w-4 ml-2" />
                      <span>{talent.likes}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {talent.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Link
                    to={`/talent/${talent.id}`}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded transition-colors text-center"
                  >
                    View Profile
                  </Link>
                  <button 
                    onClick={() => handleLike(talent.id)}
                    className={`p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors ${
                      talent.liked ? 'text-red-600' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Heart className="h-5 w-5" />
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