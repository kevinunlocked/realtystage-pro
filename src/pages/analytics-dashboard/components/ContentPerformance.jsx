import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ContentPerformance = () => {
  const [activeTab, setActiveTab] = useState('top-posts');

  const topPosts = [
  {
    id: 1,
    title: "Modern Kitchen Staging Transformation",
    platform: "Instagram",
    image: "https://images.unsplash.com/photo-1613545564267-b80e188a1541",
    alt: "Modern white kitchen with marble countertops and stainless steel appliances",
    engagement: 2847,
    reach: 12450,
    likes: 1923,
    comments: 156,
    shares: 89,
    date: "2024-11-08"
  },
  {
    id: 2,
    title: "Luxury Living Room Before & After",
    platform: "TikTok",
    image: "https://images.unsplash.com/photo-1591208854190-d08149f6ecd7",
    alt: "Elegant living room with beige sofa, gold accents, and large windows",
    engagement: 4521,
    reach: 18900,
    likes: 3456,
    comments: 234,
    shares: 178,
    date: "2024-11-07"
  },
  {
    id: 3,
    title: "Quick Property Walkthrough - Downtown Condo",
    platform: "Facebook",
    image: "https://images.unsplash.com/photo-1728803843776-f45f82e7d3ce",
    alt: "Modern downtown condo interior with city skyline view through floor-to-ceiling windows",
    engagement: 1892,
    reach: 8750,
    likes: 1234,
    comments: 98,
    shares: 67,
    date: "2024-11-06"
  },
  {
    id: 4,
    title: "Minimalist Bedroom Staging Tips",
    platform: "Instagram",
    image: "https://images.unsplash.com/photo-1722650362298-ccc101f2270e",
    alt: "Clean minimalist bedroom with white bedding, wooden nightstand, and natural lighting",
    engagement: 1654,
    reach: 7890,
    likes: 1123,
    comments: 87,
    shares: 45,
    date: "2024-11-05"
  }];


  const optimalTimes = [
  { day: "Monday", time: "10:00 AM", engagement: "8.2%", platform: "Instagram" },
  { day: "Tuesday", time: "2:00 PM", engagement: "9.1%", platform: "Facebook" },
  { day: "Wednesday", time: "6:00 PM", engagement: "12.4%", platform: "TikTok" },
  { day: "Thursday", time: "11:00 AM", engagement: "7.8%", platform: "Instagram" },
  { day: "Friday", time: "4:00 PM", engagement: "10.3%", platform: "Facebook" },
  { day: "Saturday", time: "9:00 AM", engagement: "11.7%", platform: "TikTok" },
  { day: "Sunday", time: "7:00 PM", engagement: "9.8%", platform: "Snapchat" }];


  const audienceInsights = [
  {
    metric: "Age Groups",
    data: [
    { label: "25-34", value: 35, color: "bg-primary" },
    { label: "35-44", value: 28, color: "bg-accent" },
    { label: "45-54", value: 22, color: "bg-success" },
    { label: "55+", value: 15, color: "bg-warning" }]

  },
  {
    metric: "Interests",
    data: [
    { label: "Home Design", value: 42, color: "bg-primary" },
    { label: "Real Estate", value: 38, color: "bg-accent" },
    { label: "Interior Decor", value: 31, color: "bg-success" },
    { label: "Investment", value: 24, color: "bg-warning" }]

  }];


  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Instagram':return 'Instagram';
      case 'Facebook':return 'Facebook';
      case 'TikTok':return 'Music';
      case 'Snapchat':return 'Camera';
      default:return 'Share2';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Instagram':return 'text-pink-500';
      case 'Facebook':return 'text-blue-600';
      case 'TikTok':return 'text-black';
      case 'Snapchat':return 'text-yellow-500';
      default:return 'text-muted-foreground';
    }
  };

  const tabs = [
  { id: 'top-posts', label: 'Top Posts', icon: 'TrendingUp' },
  { id: 'optimal-times', label: 'Optimal Times', icon: 'Clock' },
  { id: 'audience', label: 'Audience Insights', icon: 'Users' }];


  return (
    <div className="bg-white border border-border rounded-lg shadow-elevation-1">
      <div className="border-b border-border">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-semibold text-foreground">Content Performance Analysis</h2>
          <Button variant="outline" size="sm" iconName="Download">
            Export Report
          </Button>
        </div>
        <div className="flex border-b border-border">
          {tabs?.map((tab) =>
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-smooth ${
            activeTab === tab?.id ?
            'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'}`
            }>

              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          )}
        </div>
      </div>
      <div className="p-6">
        {activeTab === 'top-posts' &&
        <div className="space-y-4">
            {topPosts?.map((post) =>
          <div key={post?.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:shadow-elevation-1 transition-smooth">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                src={post?.image}
                alt={post?.alt}
                className="w-full h-full object-cover" />

                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-foreground truncate">{post?.title}</h3>
                    <Icon
                  name={getPlatformIcon(post?.platform)}
                  size={16}
                  className={getPlatformColor(post?.platform)} />

                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {new Date(post.date)?.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="Eye" size={14} />
                      <span>{post?.reach?.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Heart" size={14} />
                      <span>{post?.likes?.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={14} />
                      <span>{post?.comments}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Share2" size={14} />
                      <span>{post?.shares}</span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-foreground">{post?.engagement?.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Engagement</p>
                </div>
              </div>
          )}
          </div>
        }

        {activeTab === 'optimal-times' &&
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {optimalTimes?.map((time, index) =>
            <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">{time?.day}</h3>
                    <Icon
                  name={getPlatformIcon(time?.platform)}
                  size={16}
                  className={getPlatformColor(time?.platform)} />

                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">{time?.time}</p>
                  <p className="text-sm text-muted-foreground">
                    {time?.engagement} avg engagement on {time?.platform}
                  </p>
                </div>
            )}
            </div>
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Lightbulb" size={20} className="text-warning mt-1" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Recommendation</h4>
                  <p className="text-sm text-muted-foreground">
                    Schedule your property reveals and staging content on Wednesday evenings for TikTok to maximize engagement. 
                    Tuesday afternoons work best for Facebook property listings and market updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        }

        {activeTab === 'audience' &&
        <div className="space-y-6">
            {audienceInsights?.map((insight, index) =>
          <div key={index}>
                <h3 className="font-medium text-foreground mb-4">{insight?.metric}</h3>
                <div className="space-y-3">
                  {insight?.data?.map((item, itemIndex) =>
              <div key={itemIndex} className="flex items-center space-x-3">
                      <div className="w-24 text-sm text-muted-foreground">{item?.label}</div>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                    className={`h-2 rounded-full ${item?.color}`}
                    style={{ width: `${item?.value}%` }} />

                      </div>
                      <div className="w-12 text-sm font-medium text-foreground text-right">
                        {item?.value}%
                      </div>
                    </div>
              )}
                </div>
              </div>
          )}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Target" size={20} className="text-primary mt-1" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Audience Insights</h4>
                  <p className="text-sm text-muted-foreground">
                    Your primary audience consists of millennials (25-34) interested in home design and real estate investment. 
                    Focus on modern staging styles and investment property content to maximize engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

};

export default ContentPerformance;