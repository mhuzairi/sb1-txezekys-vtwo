import React from 'react';
import { Milestone, TrendingUp, DollarSign, Target, Calendar } from 'lucide-react';

export function Roadmap() {
  const milestones = [
    {
      phase: 'Beta Launch',
      period: 'Month 1-3',
      title: 'Beta launch and onboarding of initial corporate clients',
      tasks: [
        'Platform development and testing',
        'Initial corporate client acquisition',
        'User feedback collection and implementation',
        'Core feature refinement'
      ]
    },
    {
      phase: 'Full Launch',
      period: 'Month 4-6',
      title: 'Full launch and aggressive marketing',
      tasks: [
        'Marketing campaign rollout',
        'Job seeker acquisition strategy',
        'Employer partnership program',
        'Platform optimization'
      ]
    },
    {
      phase: 'Expansion',
      period: 'Month 7-9',
      title: 'Expansion of partnerships',
      tasks: [
        'Resume builder integrations',
        'Job board partnerships',
        'API development',
        'Affiliate program launch'
      ]
    },
    {
      phase: 'Monetization',
      period: 'Month 10-12',
      title: 'Introduction of premium features',
      tasks: [
        'Premium employer features',
        'Job seeker premium plans',
        'Advanced analytics tools',
        'Enterprise solutions'
      ]
    }
  ];

  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Target className="text-red-600 h-8 w-8" />
          <h1 className="text-3xl font-bold text-white">Project Roadmap</h1>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="text-red-600 h-6 w-6" />
              <h2 className="text-xl font-bold text-white">Current Burn Rate</h2>
            </div>
            <p className="text-3xl font-bold text-white mb-2">$9K</p>
            <p className="text-gray-400">Monthly operational costs</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Development</span>
                <span className="text-white">60%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Infrastructure</span>
                <span className="text-white">25%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Marketing</span>
                <span className="text-white">15%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="text-red-600 h-6 w-6" />
              <h2 className="text-xl font-bold text-white">Current Runway</h2>
            </div>
            <p className="text-3xl font-bold text-white mb-2">0 Months</p>
            <p className="text-gray-400">Based on $1K current budget</p>
            <div className="mt-4">
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: '8.3%' }} />
              </div>
              <p className="text-sm text-gray-400 mt-2">$1K remaining of $12K needed</p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-red-600 h-6 w-6" />
              <h2 className="text-xl font-bold text-white">Path to Profitability</h2>
            </div>
            <p className="text-3xl font-bold text-white mb-2">12 Months</p>
            <p className="text-gray-400">Projected timeline to break-even</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Corporate Clients</span>
                <span className="text-white">40%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Premium Users</span>
                <span className="text-white">35%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Partnerships</span>
                <span className="text-white">25%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-8">Development Milestones</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <Milestone className="h-5 w-5 text-white" />
                    </div>
                    {index !== milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-800 mt-2" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-800 rounded-lg p-6">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="text-red-600 font-bold">{milestone.phase}</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-400">{milestone.period}</span>
                      </div>
                      <h3 className="text-white font-bold mb-4">{milestone.title}</h3>
                      <ul className="space-y-2">
                        {milestone.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center gap-2 text-gray-300">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Projections */}
        <div className="mt-12 bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Revenue Strategy</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Key Revenue Streams</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Corporate Subscriptions</h4>
                  <p className="text-gray-400">Premium features for employers including advanced search, unlimited job postings, and analytics</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Job Seeker Premium</h4>
                  <p className="text-gray-400">Enhanced profile visibility, priority applications, and career development tools</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Partnership Revenue</h4>
                  <p className="text-gray-400">Revenue sharing from resume builder integrations and job board partnerships</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Enterprise Solutions</h4>
                  <p className="text-gray-400">Custom solutions for large organizations including ATS integration and branded portals</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Financial Controls</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  Monthly budget reviews and optimization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  KPI-driven decision making
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  Regular performance metrics analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  Lean operational structure
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}