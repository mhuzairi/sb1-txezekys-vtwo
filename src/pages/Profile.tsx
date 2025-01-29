import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CVDisplay } from '../components/cv/CVDisplay';
import { useCV } from '../contexts/CVContext';

export default function Profile() {
  const navigate = useNavigate();
  const { cvs, loading, error, fetchUserCVs, setPrimaryCV, deleteCV } = useCV();

  useEffect(() => {
    fetchUserCVs();
  }, [fetchUserCVs]);

  const handleCreateCV = () => {
    navigate('/cv-builder');
  };

  const handleEditCV = (cvId: string) => {
    navigate(`/cv-builder?id=${cvId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <button
          onClick={handleCreateCV}
          className="btn btn-primary"
        >
          Create New CV
        </button>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <p>{error}</p>
        </div>
      )}

      {cvs.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No CVs Found</h3>
          <p className="text-gray-500 mb-4">Create your first CV to get started</p>
          <button
            onClick={handleCreateCV}
            className="btn btn-primary"
          >
            Create CV
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {cvs.map((cv) => (
            <div key={cv.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {cv.is_primary && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                      Primary CV
                    </span>
                  )}
                  <span className="text-gray-500 text-sm">
                    Last updated: {new Date(cv.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {!cv.is_primary && (
                    <button
                      onClick={() => setPrimaryCV(cv.id)}
                      className="btn btn-sm btn-outline"
                    >
                      Set as Primary
                    </button>
                  )}
                  <button
                    onClick={() => handleEditCV(cv.id)}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </button>
                  {!cv.is_primary && (
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this CV?')) {
                          deleteCV(cv.id);
                        }
                      }}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <CVDisplay cv={cv.cv_data} onEdit={() => handleEditCV(cv.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}