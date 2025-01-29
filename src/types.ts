export interface User {
  id: string;
  name: string;
  email: string;
  role: 'jobseeker' | 'employer';
  profileComplete: boolean;
}

export interface Profile {
  userId: string;
  fullName: string;
  location: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  cvUrl?: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationYear: number;
}

export interface CareerSuggestion {
  id: string;
  title: string;
  type: 'course' | 'certification';
  provider: string;
  description: string;
  imageUrl: string;
  url: string;
}