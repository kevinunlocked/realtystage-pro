import React from 'react';
import Icon from '../../../components/AppIcon';

const PlatformAnalytics = () => {
  const platforms = [
    {
      id: 1,
      name: "Instagram",
      icon: "Instagram",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      followers: "12.4K",
      reach: "45.2K",
      engagement: "8.7%",
      posts: 156,
      topPost: "Modern kitchen staging reveal",
      topPostEngagement: "2.1K",
      growth: "+12.5%"
    },
    {
      id: 2,
      name: "Facebook",
      icon: "Facebook",
      color: "bg-[#1877F2]",
      followers: "8.9K",
      reach: "32.1K",
      engagement: "6.2%",
      posts: 89,
      topPost: "Luxury home virtual tour",
      topPostEngagement: "1.8K",
      growth: "+8.3%"
    },
    {
      id: 3,
      name: "TikTok",
      icon: "Music",
      color: "bg-black",
      followers: "18.7K",
      reach: "78.5K",
      engagement: "12.4%",
      posts: 67,
      topPost: "Before & after staging transformation",
      topPostEngagement: "4.2K",
      growth: "+28.7%"
    },
    {
      id: 4,
      name: "Snapchat",
      icon: "Camera",
      color: "bg-[#FFFC00]",
      followers: "5.2K",
      reach: "18.9K",
      engagement: "9.1%",
      posts: 34,
      topPost: "Quick property walkthrough",
      topPostEngagement: "890",
      growth: "+15.2%"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {platforms?.map((platform) => (
        <div key={platform?.id} className="bg-white border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-lg ${platform?.color} flex items-center justify-center`}>
                <Icon 
                  name={platform?.icon} 
                  size={24} 
                  color={platform?.name === 'Snapchat' ? '#000000' : '#FFFFFF'} 
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{platform?.name}</h3>
                <p className="text-sm text-muted-foreground">{platform?.followers} followers</p>
              </div>
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              platform?.growth?.startsWith('+') ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={platform?.growth?.startsWith('+') ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{platform?.growth}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{platform?.reach}</p>
              <p className="text-xs text-muted-foreground">Reach</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{platform?.engagement}</p>
              <p className="text-xs text-muted-foreground">Engagement</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{platform?.posts}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground mb-1">Top Performing Post</p>
                <p className="text-sm text-muted-foreground truncate">{platform?.topPost}</p>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm font-semibold text-foreground">{platform?.topPostEngagement}</p>
                <p className="text-xs text-muted-foreground">engagements</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlatformAnalytics;