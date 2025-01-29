import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'General',
    question: 'What is TalentsIn.me?',
    answer: 'TalentsIn.me is a professional networking platform that connects talented individuals with career opportunities. We provide tools for career development, job searching, and professional networking.'
  },
  {
    category: 'General',
    question: 'Is it free to use TalentsIn.me?',
    answer: 'Basic features are free for all users. Premium features are available through our subscription plans.'
  },
  {
    category: 'Account',
    question: 'How do I create an account?',
    answer: 'Click the "Sign In" button in the top right corner and select "Create Account". Fill in your email and password to get started.'
  },
  {
    category: 'Account',
    question: 'Can I delete my account?',
    answer: 'Yes, you can delete your account from your profile settings. Note that this action is permanent and cannot be undone.'
  },
  {
    category: 'Features',
    question: 'What is the AI CV Builder?',
    answer: 'The AI CV Builder is our advanced tool that helps you create professional CVs using artificial intelligence. It provides personalized suggestions and optimizes your CV for maximum impact.'
  },
  {
    category: 'Features',
    question: 'How does the talent search work?',
    answer: 'Our talent search uses advanced filters and AI matching to help employers find the right candidates. You can search by skills, location, experience level, and more.'
  },
  {
    category: 'Career Tools',
    question: 'What career development tools do you offer?',
    answer: 'We offer various tools including AI CV Builder, career coaching, online courses, webinars, and networking events to help advance your career.'
  },
  {
    category: 'Career Tools',
    question: 'How do I book a career coaching session?',
    answer: 'Navigate to the Career Coaching section, browse available coaches, and click "Book Session" to schedule a time that works for you.'
  },
  {
    category: 'Privacy',
    question: 'How is my data protected?',
    answer: 'We use industry-standard encryption and security measures to protect your data. Read our Privacy Policy for detailed information.'
  },
  {
    category: 'Privacy',
    question: 'Who can see my profile?',
    answer: 'You can control your profile visibility in your privacy settings. By default, only registered users can view your full profile.'
  }
  ,{
    category: 'Privacy',
    question: 'Do you have Project Roadmap?',
    answer: 'You can view the roadmap '
  }
];

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...new Set(faqs.map(faq => faq.category))];

  const toggleQuestion = (question: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(question)) {
      newExpanded.delete(question);
    } else {
      newExpanded.add(question);
    }
    setExpandedQuestions(newExpanded);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="text-red-600 h-8 w-8" />
          <h1 className="text-3xl font-bold text-white">Frequently Asked Questions</h1>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full capitalize transition-colors ${
                activeCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.question}
              className="bg-gray-900 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(faq.question)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-800 transition-colors"
              >
                <span className="text-white font-medium">{faq.question}</span>
                {expandedQuestions.has(faq.question) ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {expandedQuestions.has(faq.question) && (
                <div className="p-4 pt-0">
                  <p className="text-gray-400">
                    {faq.question === 'Do you have Project Roadmap?' ? (
                      <>
                        {faq.answer}
                        <Link to="/roadmap" className="text-red-600 hover:text-red-500">
                          here
                        </Link>
                        .
                      </>
                    ) : (
                      faq.answer
                    )}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-gray-900 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Still have questions?</h2>
          <p className="text-gray-400 mb-4">
            Can't find the answer you're looking for? Please contact our support team.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors">
            Contact Support
          </button>
          
        </div>
      </div>
    </div>
  );
}