import React, { useState } from 'react';
import { Menu, Search as SearchIcon, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';

export function Navbar() {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/career-tools', label: 'Career Tools' },
    { path: '/search-talent', label: 'Search Talent' },
    { path: '/faq', label: 'FAQ' },
 //   { path: '/profile', label: 'Profile' }
  ];

  return (
    <>
      <nav className="fixed top-0 w-full bg-black/95 z-50 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
              >
                <Menu className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
              </button>
              <Link to="/" className="flex items-center gap-2">
                <span className="text-red-600 font-bold text-2xl">TalentsIn.me</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/search">
              <SearchIcon className="h-5 w-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
            </Link>
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-gray-300 hover:text-white">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">Profile</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-2 invisible group-hover:visible">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/95 z-50">
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <Link to="/" className="text-red-600 font-bold text-2xl">
                  TalentsIn.me
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-gray-300 hover:text-white text-lg py-2 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {user && (
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-300 hover:text-white text-lg py-2 transition-colors"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}