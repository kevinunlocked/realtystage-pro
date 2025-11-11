import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import AIAssistant from '../../components/ui/AIAssistant';
import UploadProgress from '../../components/ui/UploadProgress';
import NotificationCenter from '../../components/ui/NotificationCenter';

// Import all components
import MetricsOverview from './components/MetrixOverview';
import PerformanceChart from './components/PerformanceChart';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import ContentPerformance from './components/ContentPerformance';
import AssetUtilization from './components/AssetUtilization';
import ROICalculator from './components/ROICalculator';
import TrendAnalysis from './components/TrendAnalysis';
import FilterControls from './components/FilterControls';

const AnalyticsDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [dateRange, setDateRange] = useState('30days');
  const [filters, setFilters] = useState({});
  const [savedViews, setSavedViews] = useState([
    {
      id: 1,
      name: 'Q4 Performance Review',
      filters: { dateRange: '90days', platform: 'all', contentType: 'all' },
      createdAt: '2024-11-01'
    },
    {
      id: 2,
      name: 'Instagram Focus',
      filters: { dateRange: '30days', platform: 'instagram', contentType: 'photos' },
      createdAt: '2024-10-28'
    }
  ]);

  const navigationSections = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'platforms', label: 'Platforms', icon: 'Share2' },
    { id: 'content', label: 'Content', icon: 'FileText' },
    { id: 'assets', label: 'Assets', icon: 'FolderOpen' },
    { id: 'roi', label: 'ROI Analysis', icon: 'DollarSign' },
    { id: 'trends', label: 'Trends', icon: 'Activity' }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to data
  };

  const handleSaveView = (view) => {
    const newView = {
      ...view,
      id: savedViews?.length + 1
    };
    setSavedViews([...savedViews, newView]);
  };

  const handleLoadView = (viewId) => {
    const view = savedViews?.find(v => v?.id === parseInt(viewId));
    if (view) {
      setFilters(view?.filters);
    }
  };

  const exportReport = () => {
    // Export functionality
    console.log('Exporting analytics report...');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <MetricsOverview dateRange={dateRange} />;
      case 'performance':
        return <PerformanceChart />;
      case 'platforms':
        return <PerformanceAnalytics />;
      case 'content':
        return <ContentPerformance />;
      case 'assets':
        return <AssetUtilization />;
      case 'roi':
        return <ROICalculator />;
      case 'trends':
        return <TrendAnalysis />;
      default:
        return <MetricsOverview dateRange={dateRange} />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
                <p className="text-muted-foreground">
                  Comprehensive performance insights across all your marketing activities
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <NotificationCenter />
                <Button
                  variant="outline"
                  onClick={exportReport}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Report
                </Button>
                <Link to="/dashboard">
                  <Button variant="ghost" iconName="ArrowLeft" iconPosition="left">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="mb-8">
            <FilterControls
              onFiltersChange={handleFiltersChange}
              savedViews={savedViews}
              onSaveView={handleSaveView}
              onLoadView={handleLoadView}
            />
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="bg-white border border-border rounded-lg shadow-elevation-1 p-2">
              <div className="flex items-center space-x-1 overflow-x-auto">
                {navigationSections?.map((section) => (
                  <button
                    key={section?.id}
                    onClick={() => setActiveSection(section?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-smooth ${
                      activeSection === section?.id
                        ? 'bg-primary text-primary-foreground shadow-elevation-1'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={section?.icon} size={16} />
                    <span>{section?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {renderActiveSection()}
          </div>

          {/* Quick Actions */}
          <div className="mt-12 bg-white border border-border rounded-lg p-6 shadow-elevation-1">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/asset-library" className="block">
                <div className="p-4 border border-border rounded-lg hover:shadow-elevation-1 transition-smooth cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="FolderOpen" size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Asset Library</h3>
                      <p className="text-sm text-muted-foreground">Manage media files</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/ai-staging-studio" className="block">
                <div className="p-4 border border-border rounded-lg hover:shadow-elevation-1 transition-smooth cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Wand2" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">AI Staging</h3>
                      <p className="text-sm text-muted-foreground">Create staged content</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/video-generator" className="block">
                <div className="p-4 border border-border rounded-lg hover:shadow-elevation-1 transition-smooth cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Icon name="Video" size={20} className="text-warning" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Video Generator</h3>
                      <p className="text-sm text-muted-foreground">Create property videos</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/social-media-scheduler" className="block">
                <div className="p-4 border border-border rounded-lg hover:shadow-elevation-1 transition-smooth cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="Calendar" size={20} className="text-success" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Social Scheduler</h3>
                      <p className="text-sm text-muted-foreground">Schedule posts</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <AIAssistant />
      <UploadProgress />
    </div>
  );
};

export default AnalyticsDashboard;