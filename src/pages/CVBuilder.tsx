import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { AICVBuilder } from '../components/AICVBuilder';

interface CVFormData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  experience: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    graduationYear: string;
    field: string;
  }[];
  skills: string[];
}

export function CVBuilder() {
  const [showAIBuilder, setShowAIBuilder] = useState(false);
  const [cvData, setCvData] = useState<CVFormData>({
    personalInfo: { fullName: '', email: '', phone: '', location: '' },
    experience: [],
    education: [],
    skills: []
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  const addExperience = () => {
    setCvData({
      ...cvData,
      experience: [
        ...cvData.experience,
        { title: '', company: '', startDate: '', endDate: '', description: '' }
      ]
    });
  };

  const addEducation = () => {
    setCvData({
      ...cvData,
      education: [
        ...cvData.education,
        { degree: '', institution: '', graduationYear: '', field: '' }
      ]
    });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setCvData({ ...cvData, skills });
  };

  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900 rounded-lg p-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Build Your CV</h2>
              <button
                onClick={() => setShowAIBuilder(true)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
              >
                <Bot className="h-5 w-5" />
                Use AI Builder
              </button>
            </div>
            
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={cvData.personalInfo.fullName}
                      onChange={handlePersonalInfoChange}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={cvData.personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={cvData.personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={cvData.personalInfo.location}
                      onChange={handlePersonalInfoChange}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">Work Experience</h3>
                  <button
                    onClick={addExperience}
                    className="text-red-600 hover:text-red-500 transition-colors"
                  >
                    + Add Experience
                  </button>
                </div>
                {cvData.experience.map((exp, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Job Title</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => {
                            const newExp = [...cvData.experience];
                            newExp[index].title = e.target.value;
                            setCvData({ ...cvData, experience: newExp });
                          }}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const newExp = [...cvData.experience];
                            newExp[index].company = e.target.value;
                            setCvData({ ...cvData, experience: newExp });
                          }}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Start Date</label>
                        <input
                          type="date"
                          value={exp.startDate}
                          onChange={(e) => {
                            const newExp = [...cvData.experience];
                            newExp[index].startDate = e.target.value;
                            setCvData({ ...cvData, experience: newExp });
                          }}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">End Date</label>
                        <input
                          type="date"
                          value={exp.endDate}
                          onChange={(e) => {
                            const newExp = [...cvData.experience];
                            newExp[index].endDate = e.target.value;
                            setCvData({ ...cvData, experience: newExp });
                          }}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => {
                          const newExp = [...cvData.experience];
                          newExp[index].description = e.target.value;
                          setCvData({ ...cvData, experience: newExp });
                        }}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">Education</h3>
                  <button
                    onClick={addEducation}
                    className="text-red-600 hover:text-red-500 transition-colors"
                  >
                    + Add Education
                  </button>
                </div>
                {cvData.education.map((edu, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEdu = [...cvData.education];
                            newEdu[index].degree = e.target.value;
                            setCvData({ ...cvData, education: newEdu });
                          }}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Institution</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const newEdu = [...cvData.education];
                            newEdu[index].institution = e.target.value;
                            setCvData({ ...cvData, education: newEdu });
                          }}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Field of Study</label>
                        <input
                          type="text"
                          value={edu.field}
                          onChange={(e) => {
                            const newEdu = [...cvData.education];
                            newEdu[index].field = e.target.value;
                            setCvData({ ...cvData, education: newEdu });
                          }}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Graduation Year</label>
                        <input
                          type="text"
                          value={edu.graduationYear}
                          onChange={(e) => {
                            const newEdu = [...cvData.education];
                            newEdu[index].graduationYear = e.target.value;
                            setCvData({ ...cvData, education: newEdu });
                          }}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
                <div>
                  <label className="block text-gray-300 mb-2">
                    Enter your skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={cvData.skills.join(', ')}
                    onChange={handleSkillsChange}
                    placeholder="e.g., JavaScript, React, Node.js"
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    // Reset form
                    setCvData({
                      personalInfo: { fullName: '', email: '', phone: '', location: '' },
                      experience: [],
                      education: [],
                      skills: []
                    });
                  }}
                  className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => {
                    // Handle CV submission and AI analysis
                    console.log('CV Data:', cvData);
                    // You would typically send this to your backend
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors"
                >
                  Generate CV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAIBuilder && <AICVBuilder onClose={() => setShowAIBuilder(false)} />}
    </div>
  );
}