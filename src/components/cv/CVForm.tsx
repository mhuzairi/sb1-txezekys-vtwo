import React, { useState } from 'react';
import { CVData, Education, Experience, Project, Certification } from '../../types/cv';
import { useCV } from '../../contexts/CVContext';

interface CVFormProps {
  initialData?: CVData;
  cvId?: string;
  onSuccess?: () => void;
}

const emptyCV: CVData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: []
};

export const CVForm: React.FC<CVFormProps> = ({
  initialData = emptyCV,
  cvId,
  onSuccess
}) => {
  const [formData, setFormData] = useState<CVData>(initialData);
  const [title, setTitle] = useState(cvId ? 'Edit CV' : 'New CV');
  const [loading, setLoading] = useState(false);
  const { createCV, updateCV } = useCV();

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  const handleEducationChange = (index: number, data: Education) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => i === index ? data : edu)
    }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleExperienceChange = (index: number, data: Experience) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => i === index ? data : exp)
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleSkillsChange = (skills: string[]) => {
    setFormData(prev => ({
      ...prev,
      skills
    }));
  };

  const handleProjectChange = (index: number, data: Project) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => i === index ? data : proj)
    }));
  };

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const handleCertificationChange = (index: number, data: Certification) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => i === index ? data : cert)
    }));
  };

  const removeCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (cvId) {
        await updateCV(cvId, { cv_data: formData });
      } else {
        await createCV({
          title,
          cv_data: formData,
          is_primary: false // User can set primary later
        });
      }
      onSuccess?.();
    } catch (error) {
      console.error('Failed to save CV:', error);
      // TODO: Add error toast notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title */}
      <div className="bg-white p-6 rounded-lg shadow">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="CV Title"
          className="input input-bordered w-full text-xl font-semibold"
          required
        />
      </div>

      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.personalInfo.name}
            onChange={handlePersonalInfoChange}
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.personalInfo.email}
            onChange={handlePersonalInfoChange}
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.personalInfo.phone}
            onChange={handlePersonalInfoChange}
            placeholder="Phone"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="location"
            value={formData.personalInfo.location}
            onChange={handlePersonalInfoChange}
            placeholder="Location"
            className="input input-bordered w-full"
          />
          <textarea
            name="summary"
            value={formData.personalInfo.summary}
            onChange={handlePersonalInfoChange}
            placeholder="Professional Summary"
            className="textarea textarea-bordered w-full md:col-span-2"
            rows={4}
          />
        </div>
      </div>

      {/* Education Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="mb-4 p-4 border rounded relative">
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="btn btn-circle btn-xs absolute top-2 right-2"
            >
              ×
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, { ...edu, institution: e.target.value })}
                placeholder="Institution"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, { ...edu, degree: e.target.value })}
                placeholder="Degree"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                value={edu.field}
                onChange={(e) => handleEducationChange(index, { ...edu, field: e.target.value })}
                placeholder="Field of Study"
                className="input input-bordered w-full"
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={edu.startDate}
                  onChange={(e) => handleEducationChange(index, { ...edu, startDate: e.target.value })}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="date"
                  value={edu.endDate}
                  onChange={(e) => handleEducationChange(index, { ...edu, endDate: e.target.value })}
                  className="input input-bordered w-full"
                />
              </div>
              <textarea
                value={edu.description}
                onChange={(e) => handleEducationChange(index, { ...edu, description: e.target.value })}
                placeholder="Description"
                className="textarea textarea-bordered w-full md:col-span-2"
                rows={3}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData(prev => ({
            ...prev,
            education: [...prev.education, { institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' }]
          }))}
          className="btn btn-outline btn-sm"
        >
          Add Education
        </button>
      </div>

      {/* Experience Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index} className="mb-4 p-4 border rounded relative">
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="btn btn-circle btn-xs absolute top-2 right-2"
            >
              ×
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, { ...exp, company: e.target.value })}
                placeholder="Company"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleExperienceChange(index, { ...exp, position: e.target.value })}
                placeholder="Position"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                value={exp.location}
                onChange={(e) => handleExperienceChange(index, { ...exp, location: e.target.value })}
                placeholder="Location"
                className="input input-bordered w-full"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(index, { ...exp, startDate: e.target.value })}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(index, { ...exp, endDate: e.target.value })}
                  className="input input-bordered w-full"
                />
              </div>
              <textarea
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, { ...exp, description: e.target.value })}
                placeholder="Description"
                className="textarea textarea-bordered w-full md:col-span-2"
                rows={3}
                required
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Key Achievements</label>
                <textarea
                  value={exp.highlights.join('\n')}
                  onChange={(e) => handleExperienceChange(index, {
                    ...exp,
                    highlights: e.target.value.split('\n').filter(h => h.trim())
                  })}
                  placeholder="Enter each achievement on a new line"
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData(prev => ({
            ...prev,
            experience: [...prev.experience, {
              company: '',
              position: '',
              location: '',
              startDate: '',
              endDate: '',
              description: '',
              highlights: []
            }]
          }))}
          className="btn btn-outline btn-sm"
        >
          Add Experience
        </button>
      </div>

      {/* Skills Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Skills</h3>
        <textarea
          value={formData.skills.join(', ')}
          onChange={(e) => handleSkillsChange(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          placeholder="Enter skills separated by commas"
          className="textarea textarea-bordered w-full"
          rows={3}
        />
      </div>

      {/* Projects Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Projects</h3>
        {formData.projects.map((project, index) => (
          <div key={index} className="mb-4 p-4 border rounded relative">
            <button
              type="button"
              onClick={() => removeProject(index)}
              className="btn btn-circle btn-xs absolute top-2 right-2"
            >
              ×
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={project.name}
                onChange={(e) => handleProjectChange(index, { ...project, name: e.target.value })}
                placeholder="Project Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="url"
                value={project.url || ''}
                onChange={(e) => handleProjectChange(index, { ...project, url: e.target.value })}
                placeholder="Project URL"
                className="input input-bordered w-full"
              />
              <div className="grid grid-cols-2 gap-2 md:col-span-2">
                <input
                  type="date"
                  value={project.startDate}
                  onChange={(e) => handleProjectChange(index, { ...project, startDate: e.target.value })}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="date"
                  value={project.endDate}
                  onChange={(e) => handleProjectChange(index, { ...project, endDate: e.target.value })}
                  className="input input-bordered w-full"
                />
              </div>
              <textarea
                value={project.description}
                onChange={(e) => handleProjectChange(index, { ...project, description: e.target.value })}
                placeholder="Project Description"
                className="textarea textarea-bordered w-full md:col-span-2"
                rows={3}
                required
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Key Features/Achievements</label>
                <textarea
                  value={project.highlights.join('\n')}
                  onChange={(e) => handleProjectChange(index, {
                    ...project,
                    highlights: e.target.value.split('\n').filter(h => h.trim())
                  })}
                  placeholder="Enter each feature/achievement on a new line"
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData(prev => ({
            ...prev,
            projects: [...prev.projects, {
              name: '',
              description: '',
              startDate: '',
              endDate: '',
              highlights: []
            }]
          }))}
          className="btn btn-outline btn-sm"
        >
          Add Project
        </button>
      </div>

      {/* Certifications Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Certifications</h3>
        {formData.certifications.map((cert, index) => (
          <div key={index} className="mb-4 p-4 border rounded relative">
            <button
              type="button"
              onClick={() => removeCertification(index)}
              className="btn btn-circle btn-xs absolute top-2 right-2"
            >
              ×
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={cert.name}
                onChange={(e) => handleCertificationChange(index, { ...cert, name: e.target.value })}
                placeholder="Certification Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => handleCertificationChange(index, { ...cert, issuer: e.target.value })}
                placeholder="Issuing Organization"
                className="input input-bordered w-full"
                required
              />
              <input
                type="date"
                value={cert.date}
                onChange={(e) => handleCertificationChange(index, { ...cert, date: e.target.value })}
                className="input input-bordered w-full"
                required
              />
              <input
                type="url"
                value={cert.url || ''}
                onChange={(e) => handleCertificationChange(index, { ...cert, url: e.target.value })}
                placeholder="Certification URL"
                className="input input-bordered w-full"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData(prev => ({
            ...prev,
            certifications: [...prev.certifications, {
              name: '',
              issuer: '',
              date: '',
              url: ''
            }]
          }))}
          className="btn btn-outline btn-sm"
        >
          Add Certification
        </button>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : (cvId ? 'Update CV' : 'Create CV')}
        </button>
      </div>
    </form>
  );
};
