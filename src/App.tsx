import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Search } from './pages/Search';
import { CareerTools } from './pages/CareerTools';
import { OnlineCourses } from './pages/OnlineCourses';
import { Webinars } from './pages/Webinars';
import { CVBuilder } from './pages/CVBuilder';
import { Networking } from './pages/Networking';
import { CareerCoaching } from './pages/CareerCoaching';
import { AIEnhancement } from './pages/AIEnhancement';
import { AIRecommendations } from './pages/AIRecommendations';
import { UploadCV } from './pages/UploadCV';
import { SearchTalent } from './pages/SearchTalent';
import { TalentProfile } from './pages/TalentProfile';
import { Profile } from './pages/Profile';
import { FAQ } from './pages/FAQ';
import { Roadmap } from './pages/Roadmap';
import { Footer } from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/career-tools" element={<CareerTools />} />
            <Route path="/courses" element={<OnlineCourses />} />
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/cv-builder" element={<CVBuilder />} />
            <Route path="/networking" element={<Networking />} />
            <Route path="/career-coaching" element={<CareerCoaching />} />
            <Route path="/ai-enhancement" element={<AIEnhancement />} />
            <Route path="/ai-recommendations" element={<AIRecommendations />} />
            <Route path="/upload-cv" element={<UploadCV />} />
            <Route path="/search-talent" element={<SearchTalent />} />
            <Route path="/talent/:id" element={<TalentProfile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/roadmap" element={<Roadmap />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;