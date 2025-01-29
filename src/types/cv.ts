export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
}

export interface CV {
  id: string;
  user_id: string;
  title: string;
  cv_data: CVData;
  is_primary: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CVContextType {
  cvs: CV[];
  loading: boolean;
  error: Error | null;
  createCV: (cv: Omit<CV, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<CV>;
  updateCV: (id: string, cv: Partial<CV>) => Promise<CV>;
  deleteCV: (id: string) => Promise<void>;
  setPrimaryCV: (id: string) => Promise<void>;
  getCVById: (id: string) => CV | undefined;
}
