import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, ChevronDown, ChevronUp, TrendingUp, Users, Eye, Star, Activity } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Section {
  id: 'experience' | 'education' | 'skills';
  expanded: boolean;
}

const profileViewsData = [
  { name: 'Mon', views: 45 },
  { name: 'Tue', views: 52 },
  { name: 'Wed', views: 49 },
  { name: 'Thu', views: 63 },
  { name: 'Fri', views: 58 },
  { name: 'Sat', views: 48 },
  { name: 'Sun', views: 51 }
];

const skillsDistribution = [
  { name: 'Technical', value: 65 },
  { name: 'Soft Skills', value: 25 },
  { name: 'Leadership', value: 10 }
];

const COLORS = ['#ef4444', '#3b82f6', '#10b981'];

const cvAnalytics = {
  score: 85,
  views: 1234,
  downloads: 56,
  matches: 23
};

const jobMatchData = [
  { name: 'Senior Dev', matches: 15 },
  { name: 'Tech Lead', matches: 8 },
  { name: 'Architect', matches: 12 },
  { name: 'Manager', matches: 6 }
];

export function Dashboard() {
  const [sections, setSections] = useState<Section[]>([
    { id: 'experience', expanded: false },
    { id: 'education', expanded: false },
    { id: 'skills', expanded: false }
  ]);

  const toggleSection = (sectionId: Section['id']) => {
    setSections(prev => prev.map(section => ({
      ...section,
      expanded: section.id === sectionId ? !section.expanded : section.expanded
    })));
  };

  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <div className="flex items-center gap-2 bg-gray-900 rounded-lg p-2">
            <span className="text-gray-400">Last updated:</span>
            <span className="text-white">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Star className="h-5 w-5 text-red-600" />
              <h3 className="text-white font-semibold">CV Score</h3>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-white">{cvAnalytics.score}%</div>
              <div className="text-green-500 flex items-center">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+5%</span>
              </div>
            </div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full mt-3">
              <div 
                className="bg-red-600 h-1.5 rounded-full"
                style={{ width: `${cvAnalytics.score}%` }}
              />
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="h-5 w-5 text-red-600" />
              <h3 className="text-white font-semibold">Profile Views</h3>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-white">{cvAnalytics.views}</div>
              <div className="text-green-500 flex items-center">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+12%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="h-5 w-5 text-red-600" />
              <h3 className="text-white font-semibold">Job Matches</h3>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-white">{cvAnalytics.matches}</div>
              <div className="text-green-500 flex items-center">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+3</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-red-600" />
              <h3 className="text-white font-semibold">CV Downloads</h3>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-white">{cvAnalytics.downloads}</div>
              <div className="text-green-500 flex items-center">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Profile Views Chart */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Profile Views (Last 7 Days)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profileViewsData}>
                  <defs>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#ef4444" 
                    fillOpacity={1} 
                    fill="url(#viewsGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Job Matches Chart */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Job Role Matches</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobMatchData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="matches" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skills Distribution */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Skills Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillsDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {skillsDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                {skillsDistribution.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-gray-400">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Completion Checklist */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Profile Completion</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Basic Information</span>
                  <span className="text-green-500">100%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Experience</span>
                  <span className="text-red-600">80%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Skills</span>
                  <span className="text-blue-500">90%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Portfolio</span>
                  <span className="text-yellow-500">60%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6 mb-8">
          {/* Work Experience Section */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('experience')}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-800 transition-colors"
            >
            <div className="flex items-center gap-4 mb-4">
              <Briefcase className="text-red-600 h-6 w-6" />
              <h2 className="text-xl font-semibold text-white">Work Experience</h2>
            </div>
              {sections.find(s => s.id === 'experience')?.expanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {sections.find(s => s.id === 'experience')?.expanded && (
              <div className="p-6 pt-0 border-t border-gray-800">
                <div className="space-y-6">
                  <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-white font-semibold">Senior Full Stack Developer</h3>
                    <p className="text-red-600">TechCorp Inc.</p>
                    <p className="text-gray-400 text-sm">Jan 2020 - Present</p>
                    <ul className="mt-2 text-gray-300 space-y-1">
                      <li>• Led development of microservices architecture</li>
                      <li>• Managed team of 5 developers</li>
                      <li>• Improved system performance by 40%</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-white font-semibold">Full Stack Developer</h3>
                    <p className="text-red-600">InnovateTech Solutions</p>
                    <p className="text-gray-400 text-sm">Jun 2018 - Dec 2019</p>
                    <ul className="mt-2 text-gray-300 space-y-1">
                      <li>• Developed and maintained client applications</li>
                      <li>• Implemented CI/CD pipeline</li>
                      <li>• Reduced deployment time by 60%</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Education Section */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('education')}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-800 transition-colors"
            >
            <div className="flex items-center gap-4 mb-4">
              <GraduationCap className="text-red-600 h-6 w-6" />
              <h2 className="text-xl font-semibold text-white">Education</h2>
            </div>
              {sections.find(s => s.id === 'education')?.expanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {sections.find(s => s.id === 'education')?.expanded && (
              <div className="p-6 pt-0 border-t border-gray-800">
                <div className="space-y-6">
                  <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-white font-semibold">Master of Computer Science</h3>
                    <p className="text-red-600">Stanford University</p>
                    <p className="text-gray-400 text-sm">2016 - 2018</p>
                    <p className="mt-2 text-gray-300">Specialization in Artificial Intelligence and Machine Learning</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-white font-semibold">Bachelor of Science in Computer Science</h3>
                    <p className="text-red-600">MIT</p>
                    <p className="text-gray-400 text-sm">2012 - 2016</p>
                    <p className="mt-2 text-gray-300">Minor in Mathematics</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Skills Section */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('skills')}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-800 transition-colors"
            >
            <div className="flex items-center gap-4 mb-4">
              <Award className="text-red-600 h-6 w-6" />
              <h2 className="text-xl font-semibold text-white">Skills</h2>
            </div>
              {sections.find(s => s.id === 'skills')?.expanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {sections.find(s => s.id === 'skills')?.expanded && (
              <div className="p-6 pt-0 border-t border-gray-800">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-3">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'MongoDB'].map((skill) => (
                        <span
                          key={skill}
                          className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-3">Soft Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Team Leadership', 'Project Management', 'Communication', 'Problem Solving', 'Agile Methodology'].map((skill) => (
                        <span
                          key={skill}
                          className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-3">Certifications</h3>
                    <div className="space-y-2">
                      <div className="bg-gray-800 p-3 rounded">
                        <p className="text-white">AWS Certified Solutions Architect</p>
                        <p className="text-gray-400 text-sm">Issued by Amazon Web Services</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <p className="text-white">Google Cloud Professional Developer</p>
                        <p className="text-gray-400 text-sm">Issued by Google</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Profile Completion</h2>
          <div className="w-full bg-gray-800 rounded-full h-2.5">
            <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
          </div>
          <p className="text-gray-400 mt-2">Your profile is 70% complete</p>
        </div>
      </div>
    </div>
  );
}