import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageSquare, Share2, Eye, Star, MapPin, Briefcase, GraduationCap, Award, X } from 'lucide-react';

export function TalentProfile() {
  const { id } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [message, setMessage] = useState('');
  const [comment, setComment] = useState('');
  const [endorsements, setEndorsements] = useState<string[]>([]);
  const [showEndorseModal, setShowEndorseModal] = useState(false);
  const [endorsement, setEndorsement] = useState('');

  // Mock profile data (in a real app, fetch from API)
  const profile = {
    id,
    name: 'Sarah Wilson',
    role: 'Senior Full Stack Developer',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    views: 1234,
    rating: 4.8,
    reviews: 56,
    likes: 342,
    resumeUrl: 'https://example.com/resume.pdf',
    about: 'Passionate full-stack developer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture.',
    experience: [
      {
        role: 'Senior Developer',
        company: 'TechCorp',
        period: '2020 - Present',
        description: 'Led development of microservices architecture and managed team of 5 developers.'
      },
      {
        role: 'Full Stack Developer',
        company: 'InnovateTech',
        period: '2018 - 2020',
        description: 'Developed and maintained client applications using React and Node.js.'
      }
    ],
    education: [
      {
        degree: 'M.S. Computer Science',
        school: 'Stanford University',
        year: '2018'
      }
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'GraphQL'],
    comments: [
      {
        user: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
        text: 'Excellent developer, great communication skills!',
        date: '2 days ago'
      }
    ]
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // In a real app, send to API
    setMessage('');
    setShowMessageModal(false);
  };

  const handleEndorse = () => {
    if (!endorsement.trim()) return;
    setEndorsements([...endorsements, endorsement]);
    setEndorsement('');
    setShowEndorseModal(false);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${profile.name} - ${profile.role}`,
        text: `Check out ${profile.name}'s profile on TalentsIn.me`,
        url: window.location.href
      });
    } catch (err) {
      // Fallback to copy link
      navigator.clipboard.writeText(window.location.href);
      // Show success message
    }
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    // In a real app, send to API
    setComment('');
  };

  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-red-600 to-red-800"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-gray-900"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                <p className="text-red-600 text-lg">{profile.role}</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2 text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{profile.views} profile views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{profile.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{profile.rating} ({profile.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowMessageModal(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors"
                >
                  Contact
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 rounded transition-colors ${
                    isWishlisted ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-2 bg-gray-800 text-gray-400 hover:text-white rounded transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">About</h2>
              <p className="text-gray-300">{profile.about}</p>
            </div>

            {/* Experience */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-red-600" />
                Experience
              </h2>
              <div className="space-y-4">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-gray-800 pl-4">
                    <h3 className="text-white font-semibold">{exp.role}</h3>
                    <p className="text-red-600">{exp.company}</p>
                    <p className="text-gray-400 text-sm">{exp.period}</p>
                    <p className="text-gray-300 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-red-600" />
                Education
              </h2>
              <div className="space-y-4">
                {profile.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-gray-800 pl-4">
                    <h3 className="text-white font-semibold">{edu.degree}</h3>
                    <p className="text-red-600">{edu.school}</p>
                    <p className="text-gray-400">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Endorsements */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-red-600" />
                  Endorsements
                </h2>
                <button
                  onClick={() => setShowEndorseModal(true)}
                  className="text-red-600 hover:text-red-500"
                >
                  + Add Endorsement
                </button>
              </div>
              <div className="space-y-3">
                {endorsements.map((endorsement, index) => (
                  <div key={index} className="bg-gray-800 p-3 rounded">
                    <p className="text-gray-300">{endorsement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-red-600" />
                Comments
              </h2>
              <div className="space-y-4 mb-6">
                {profile.comments.map((comment, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={comment.avatar}
                      alt={comment.user}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{comment.user}</span>
                        <span className="text-gray-400 text-sm">{comment.date}</span>
                      </div>
                      <p className="text-gray-300">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <button
                  onClick={handleComment}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-red-600" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Contact</h2>
              <button
                onClick={() => setShowMessageModal(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors mb-3"
              >
                Send Message
              </button>
              <button
                onClick={() => setShowResumeModal(true)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded transition-colors"
              >
                View Resume
              </button>
            </div>
          </div>

          {/* Endorsement Modal */}
          {showEndorseModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-bold text-white mb-4">Add Endorsement</h3>
                <textarea
                  value={endorsement}
                  onChange={(e) => setEndorsement(e.target.value)}
                  placeholder="Write your endorsement..."
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
                  rows={4}
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowEndorseModal(false)}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEndorse}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Add Endorsement
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Send Message</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
              rows={4}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-4xl h-[80vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Resume</h3>
              <button
                onClick={() => setShowResumeModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="bg-white rounded h-[calc(100%-4rem)]">
              <iframe
                src={profile.resumeUrl}
                className="w-full h-full rounded"
                title="Resume"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}