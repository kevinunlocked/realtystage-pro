import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AIAssistant from '../../components/ui/AIAssistant';
import UploadProgress from '../../components/ui/UploadProgress';
import NotificationCenter from '../../components/ui/NotificationCenter';
import ContentCalendar from './components/ContentCalendar';
import ContentCreationPanel from './components/ContentCreationPanel';
import ScheduledPostsLists from './components/ScheduledPostsLists';
import AnalyticsOverview from './components/AnalyticsOverview';
import BulkSchedulingTools from './components/BulkScheduling';
import ApprovalWorkflow from './components/ApprovalWorkflow';

const SocialMediaScheduler = () => {
  const [activeView, setActiveView] = useState('calendar');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [scheduledPosts, setScheduledPosts] = useState([
  {
    id: 1,
    title: 'Luxury Downtown Condo Tour',
    caption: '🏢 Step into luxury at this stunning downtown condo! Floor-to-ceiling windows, premium finishes, and breathtaking city views await. Open House this weekend!',
    hashtags: '#LuxuryLiving #DowntownCondo #OpenHouse #CityViews #ModernLiving #RealEstate #DreamHome',
    platforms: ['instagram', 'facebook'],
    scheduledDate: new Date(2024, 10, 12, 14, 0),
    status: 'scheduled',
    thumbnail: "https://images.unsplash.com/photo-1586129006413-0fb04715aef4",
    thumbnailAlt: 'Modern luxury condo interior with floor-to-ceiling windows and city skyline view',
    engagement: { likes: 1089, comments: 45, shares: 23 }
  },
  {
    id: 2,
    title: 'Before & After Staging Magic',
    caption: 'The power of professional staging! 🪄 Watch this empty space transform into a buyer\'s dream. Our staging team works magic to help properties sell faster and for top dollar.',
    hashtags: '#Staging #BeforeAndAfter #RealEstateMarketing #PropertyTransformation #HomeSelling',
    platforms: ['tiktok', 'instagram'],
    scheduledDate: new Date(2024, 10, 13, 9, 0),
    status: 'scheduled',
    thumbnail: "https://images.unsplash.com/photo-1721274503100-29fa72a4b4ec",
    thumbnailAlt: 'Split screen showing empty room transformation to beautifully staged living space with modern furniture'
  },
  {
    id: 3,
    title: 'Dream Kitchen Features',
    caption: '👨‍🍳 This kitchen is a chef\'s paradise! Custom cabinetry, quartz countertops, and top-of-the-line appliances make this the heart of the home. Schedule your private showing today!',
    hashtags: '#DreamKitchen #ModernHome #ChefKitchen #CustomCabinetry #LuxuryAppliances #RealEstate',
    platforms: ['facebook', 'instagram'],
    scheduledDate: new Date(2024, 10, 14, 18, 0),
    status: 'published',
    thumbnail: "https://images.unsplash.com/photo-1722604817803-4c88edef9bc0",
    thumbnailAlt: 'Modern kitchen with white cabinets, marble countertops and stainless steel appliances',
    engagement: { likes: 756, comments: 32, shares: 18 }
  },
  {
    id: 4,
    title: 'Neighborhood Spotlight',
    caption: '🏘️ Discover why families love this vibrant neighborhood! Top-rated schools, beautiful parks, and convenient shopping all within walking distance. Your perfect community awaits!',
    hashtags: '#NeighborhoodSpotlight #FamilyFriendly #TopSchools #CommunityLiving #WalkableNeighborhood',
    platforms: ['facebook'],
    scheduledDate: new Date(2024, 10, 15, 12, 0),
    status: 'scheduled',
    thumbnail: "https://images.unsplash.com/photo-1621548187927-e949fcc8a8a4",
    thumbnailAlt: 'Beautiful suburban neighborhood with tree-lined streets and well-maintained homes'
  },
  {
    id: 5,
    title: 'Market Update Q4 2024',
    caption: '📊 Q4 Market Update: Home prices up 3.2% YoY, inventory stabilizing, and great opportunities emerging in suburban markets. Ready to make your move? Let\'s discuss your goals!',
    hashtags: '#MarketUpdate #RealEstateData #Q4Trends #BuyersMarket #PropertyInvestment',
    platforms: ['instagram', 'facebook'],
    scheduledDate: new Date(2024, 10, 16, 15, 0),
    status: 'draft',
    thumbnail: "https://images.unsplash.com/photo-1649003515353-c58a239cf662",
    thumbnailAlt: 'Professional chart and graphs showing real estate market data and trends on computer screen'
  }]
  );

  const viewOptions = [
  { id: 'calendar', label: 'Calendar View', icon: 'Calendar' },
  { id: 'list', label: 'Posts List', icon: 'List' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
  { id: 'bulk', label: 'Bulk Tools', icon: 'Layers' },
  { id: 'approval', label: 'Approval', icon: 'CheckSquare' }];


  const handleCreatePost = (newPost) => {
    setScheduledPosts((prev) => [...prev, { ...newPost, id: Date.now() }]);
  };

  const handleEditPost = (post) => {
    console.log('Edit post:', post);
  };

  const handleDeletePost = (postId) => {
    setScheduledPosts((prev) => prev?.filter((post) => post?.id !== postId));
  };

  const handleDuplicatePost = (post) => {
    const duplicatedPost = {
      ...post,
      id: Date.now(),
      title: `${post?.title} (Copy)`,
      scheduledDate: new Date(post.scheduledDate.getTime() + 24 * 60 * 60 * 1000),
      status: 'draft'
    };
    setScheduledPosts((prev) => [...prev, duplicatedPost]);
  };

  const handlePostClick = (post) => {
    console.log('Post clicked:', post);
  };

  const handleDateClick = (date) => {
    console.log('Date clicked:', date);
  };

  const handleSelectFromLibrary = () => {
    console.log('Select from asset library');
  };

  const handleBulkSchedule = (bulkData) => {
    console.log('Bulk schedule:', bulkData);
  };

  const handleImportCampaign = () => {
    console.log('Import campaign');
  };

  const handleViewFullAnalytics = () => {
    console.log('View full analytics');
  };

  const handleApprovePost = (postId) => {
    console.log('Approve post:', postId);
  };

  const handleRejectPost = (postId) => {
    console.log('Reject post:', postId);
  };

  const handleRequestRevision = (postId, comment) => {
    console.log('Request revision:', postId, comment);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Content */}
      <main className={`pt-16 transition-layout ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Social Media Scheduler</h1>
              <p className="text-muted-foreground mt-1">
                Automate content distribution across all your social platforms
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <NotificationCenter />
              <Button variant="outline">
                <Icon name="Settings" size={16} />
                <span className="ml-2">Platform Settings</span>
              </Button>
              <Button>
                <Icon name="Plus" size={16} />
                <span className="ml-2">Create Post</span>
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-border rounded-lg p-4 shadow-elevation-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Posts Scheduled</p>
                  <p className="text-xl font-bold text-foreground">
                    {scheduledPosts?.filter((p) => p?.status === 'scheduled')?.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-border rounded-lg p-4 shadow-elevation-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Send" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Published Today</p>
                  <p className="text-xl font-bold text-foreground">8</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-border rounded-lg p-4 shadow-elevation-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Engagement</p>
                  <p className="text-xl font-bold text-foreground">6.8%</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-border rounded-lg p-4 shadow-elevation-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                  <p className="text-xl font-bold text-foreground">3</p>
                </div>
              </div>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {viewOptions?.map((option) =>
              <Button
                key={option?.id}
                variant={activeView === option?.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView(option?.id)}>

                  <Icon name={option?.icon} size={16} />
                  <span className="ml-2 hidden sm:inline">{option?.label}</span>
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="Filter" size={16} />
                <span className="ml-2">Filter</span>
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} />
                <span className="ml-2">Export</span>
              </Button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Primary Content */}
            <div className="lg:col-span-2 space-y-6">
              {activeView === 'calendar' &&
              <ContentCalendar
                posts={scheduledPosts}
                onPostClick={handlePostClick}
                onDateClick={handleDateClick} />

              }

              {activeView === 'list' &&
              <ScheduledPostsLists
                posts={scheduledPosts}
                onEditPost={handleEditPost}
                onDeletePost={handleDeletePost}
                onDuplicatePost={handleDuplicatePost} />

              }

              {activeView === 'analytics' &&
              <AnalyticsOverview
                onViewFullAnalytics={handleViewFullAnalytics} />

              }

              {activeView === 'bulk' &&
              <BulkSchedulingTools
                onBulkSchedule={handleBulkSchedule}
                onImportCampaign={handleImportCampaign} />

              }

              {activeView === 'approval' &&
              <ApprovalWorkflow
                onApprovePost={handleApprovePost}
                onRejectPost={handleRejectPost}
                onRequestRevision={handleRequestRevision} />

              }
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              <ContentCreationPanel
                onCreatePost={handleCreatePost}
                onSelectFromLibrary={handleSelectFromLibrary} />


              {/* Platform Status */}
              <div className="bg-white border border-border rounded-lg p-4 shadow-elevation-1">
                <h3 className="text-sm font-medium text-foreground mb-3">Platform Status</h3>
                <div className="space-y-3">
                  {[
                  { name: 'Instagram', status: 'connected', posts: 12, icon: 'Instagram', color: 'text-pink-500' },
                  { name: 'Facebook', status: 'connected', posts: 8, icon: 'Facebook', color: 'text-blue-600' },
                  { name: 'TikTok', status: 'connected', posts: 5, icon: 'Music', color: 'text-black' },
                  { name: 'Snapchat', status: 'disconnected', posts: 0, icon: 'Camera', color: 'text-yellow-500' }]?.
                  map((platform) =>
                  <div key={platform?.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon name={platform?.icon} size={16} className={platform?.color} />
                        <span className="text-sm text-foreground">{platform?.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {platform?.posts} posts
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                      platform?.status === 'connected' ? 'bg-success' : 'bg-error'}`
                      } />
                      </div>
                    </div>
                  )}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <Icon name="Settings" size={16} />
                  <span className="ml-2">Manage Connections</span>
                </Button>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-border rounded-lg p-4 shadow-elevation-1">
                <h3 className="text-sm font-medium text-foreground mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                  { action: 'Post published', item: 'Luxury Downtown Condo', time: '2 hours ago', icon: 'Send', color: 'text-success' },
                  { action: 'Post scheduled', item: 'Kitchen Features', time: '4 hours ago', icon: 'Calendar', color: 'text-primary' },
                  { action: 'Post approved', item: 'Market Update', time: '6 hours ago', icon: 'CheckCircle', color: 'text-success' },
                  { action: 'Revision requested', item: 'Staging Video', time: '1 day ago', icon: 'Edit', color: 'text-warning' }]?.
                  map((activity, index) =>
                  <div key={index} className="flex items-start space-x-3">
                      <Icon name={activity?.icon} size={14} className={`mt-0.5 ${activity?.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{activity?.action}</span>
                          <span className="text-muted-foreground"> - {activity?.item}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity?.time}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-border rounded-lg p-4 shadow-elevation-1">
                <h3 className="text-sm font-medium text-foreground mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Link to="/asset-library">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Icon name="FolderOpen" size={16} />
                      <span className="ml-2">Browse Asset Library</span>
                    </Button>
                  </Link>
                  <Link to="/video-generator">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Icon name="Video" size={16} />
                      <span className="ml-2">Create Video Content</span>
                    </Button>
                  </Link>
                  <Link to="/analytics-dashboard">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Icon name="BarChart3" size={16} />
                      <span className="ml-2">View Full Analytics</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Floating Components */}
      <AIAssistant />
      <UploadProgress />
    </div>);

};

export default SocialMediaScheduler;