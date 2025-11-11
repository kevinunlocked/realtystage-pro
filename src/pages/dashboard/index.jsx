import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AIAssistant from '../../components/ui/AIAssistant';
import UploadProgress from '../../components/ui/UploadProgress';
import NotificationCenter from '../../components/ui/NotificationCenter';
import MetricCard from './components/MetricCard';
import QuickActionCard from './components/QuickActionCard';
import ContentCalendar from './components/ContentCalendar';
import ActivityFeed from './components/ActivityFeed';
import ActiveProjects from './components/ActiveProjects';

const Dashboard = () => {
  const metrics = [
    {
      title: 'Posts Scheduled',
      value: '24',
      trend: 'up',
      trendValue: '+12%',
      icon: 'Calendar',
      color: 'bg-primary',
      route: '/social-media-scheduler',
      description: 'Social media posts ready to publish'
    },
    {
      title: 'Assets Uploaded',
      value: '156',
      trend: 'up',
      trendValue: '+8%',
      icon: 'Upload',
      color: 'bg-accent',
      route: '/asset-library',
      description: 'Property photos and videos in library'
    },
    {
      title: 'Videos Generated',
      value: '12',
      trend: 'up',
      trendValue: '+25%',
      icon: 'Video',
      color: 'bg-success',
      route: '/video-generator',
      description: 'AI-generated property tour videos'
    },
    {
      title: 'Staging Projects',
      value: '8',
      trend: 'down',
      trendValue: '-3%',
      icon: 'Wand2',
      color: 'bg-warning',
      route: '/ai-staging-studio',
      description: 'Completed AI staging transformations'
    }
  ];

  const quickActions = [
    {
      title: 'Upload Assets',
      description: 'Add new property photos, videos, and documents to your library',
      icon: 'Upload',
      color: 'bg-accent',
      route: '/asset-library',
      buttonText: 'Upload Files'
    },
    {
      title: 'Create Video',
      description: 'Generate professional property tour videos with AI assistance',
      icon: 'Video',
      color: 'bg-success',
      route: '/video-generator',
      buttonText: 'Start Creating'
    },
    {
      title: 'Schedule Post',
      description: 'Plan and schedule your social media content across platforms',
      icon: 'Calendar',
      color: 'bg-primary',
      route: '/social-media-scheduler',
      buttonText: 'Schedule Now'
    },
    {
      title: 'Stage Property',
      description: 'Transform empty rooms with AI-powered virtual staging',
      icon: 'Wand2',
      color: 'bg-warning',
      route: '/ai-staging-studio',
      buttonText: 'Start Staging'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - RealtyStage Pro</title>
        <meta name="description" content="Central command center for real estate marketing with AI-powered tools, asset management, and social media scheduling." />
      </Helmet>
      <div className="min-h-screen bg-muted/30">
        <Header />
        <Sidebar />
        
        <main className="lg:ml-64 pt-16">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, John! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your real estate marketing today.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics?.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Left Column - Content Calendar */}
              <div className="lg:col-span-2">
                <ContentCalendar />
              </div>

              {/* Right Column - Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white border border-border rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
                  <div className="space-y-4">
                    {quickActions?.map((action, index) => (
                      <QuickActionCard key={index} {...action} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Activity Feed */}
              <ActivityFeed />

              {/* Active Projects */}
              <ActiveProjects />
            </div>
          </div>
        </main>

        {/* Floating Components */}
        <AIAssistant />
        <UploadProgress />
        
        {/* Notification Center in Header */}
        <div className="fixed top-4 right-6 z-50 lg:hidden">
          <NotificationCenter />
        </div>
      </div>
    </>
  );
};

export default Dashboard;