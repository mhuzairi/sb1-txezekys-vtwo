import React from 'react';
import { BookOpen, Star, Clock } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    description: 'Master modern web development with React, Node.js, and more',
    duration: '12 weeks',
    rating: 4.8,
    students: 1234,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Data Science Fundamentals',
    description: 'Learn Python, statistics, and machine learning basics',
    duration: '8 weeks',
    rating: 4.7,
    students: 987,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Cloud Architecture',
    description: 'Master AWS, Azure, and cloud infrastructure',
    duration: '10 weeks',
    rating: 4.9,
    students: 756,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80'
  }
];

export function OnlineCourses() {
  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="text-red-600 h-8 w-8" />
          <h1 className="text-3xl font-bold text-white">Online Courses</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-gray-900 rounded-lg overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${course.image})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-gray-400 mb-4">{course.description}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-400">{course.rating}</span>
                  </div>
                  <span className="text-gray-400">{course.students} students</span>
                </div>

                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}