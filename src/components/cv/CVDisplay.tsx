import React from 'react';
import { CV } from '../../types/cv';

interface CVDisplayProps {
  cv: CV;
  onEdit?: () => void;
  onSetPrimary?: () => void;
  onDelete?: () => void;
}

export const CVDisplay: React.FC<CVDisplayProps> = ({ cv, onEdit, onSetPrimary, onDelete }) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Header with Actions */}
      <div className="p-4 border-b bg-gray-50 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{cv.title}</h2>
            <p className="text-sm text-gray-500">
              Created {new Date(cv.created_at || '').toLocaleDateString()}
              {cv.is_primary && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Primary CV
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            {!cv.is_primary && onSetPrimary && (
              <button
                onClick={onSetPrimary}
                className="btn btn-outline btn-sm"
                title="Set as primary CV"
              >
                Set Primary
              </button>
            )}
            {onEdit && (
              <button
                onClick={onEdit}
                className="btn btn-outline btn-sm"
                title="Edit CV"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="btn btn-outline btn-error btn-sm"
                title="Delete CV"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{cv.cv_data.personalInfo.name}</h2>
            <p className="text-gray-600 mt-1">{cv.cv_data.personalInfo.location}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {cv.cv_data.personalInfo.email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Phone:</span> {cv.cv_data.personalInfo.phone}
          </p>
        </div>
        {cv.cv_data.personalInfo.summary && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Professional Summary</h3>
            <p className="text-gray-700 whitespace-pre-line">{cv.cv_data.personalInfo.summary}</p>
          </div>
        )}
      </div>

      {/* Experience */}
      {cv.cv_data.experience.length > 0 && (
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4">Experience</h3>
          <div className="space-y-6">
            {cv.cv_data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-900">{exp.position}</h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">
                  {exp.company} • {exp.location}
                </p>
                <p className="text-gray-700 mt-2 whitespace-pre-line">{exp.description}</p>
                {exp.highlights.length > 0 && (
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-700">{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {cv.cv_data.education.length > 0 && (
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4">Education</h3>
          <div className="space-y-4">
            {cv.cv_data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-900">{edu.degree} in {edu.field}</h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-gray-600">{edu.institution}</p>
                {edu.description && (
                  <p className="text-gray-700 mt-2 whitespace-pre-line">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {cv.cv_data.skills.length > 0 && (
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {cv.cv_data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {cv.cv_data.projects.length > 0 && (
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4">Projects</h3>
          <div className="space-y-6">
            {cv.cv_data.projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </span>
                </div>
                <p className="text-gray-700 mt-2 whitespace-pre-line">{project.description}</p>
                {project.highlights.length > 0 && (
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-700">{highlight}</li>
                    ))}
                  </ul>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {cv.cv_data.certifications.length > 0 && (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Certifications</h3>
          <div className="space-y-4">
            {cv.cv_data.certifications.map((cert, index) => (
              <div key={index}>
                <h4 className="font-medium text-gray-900">{cert.name}</h4>
                <p className="text-gray-600">
                  {cert.issuer} - {formatDate(cert.date)}
                </p>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm mt-1 inline-block"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
