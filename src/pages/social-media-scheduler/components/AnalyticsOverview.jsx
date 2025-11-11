import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Image from '../../../components/AppImage';


const AnalyticsOverview = ({ onViewFullAnalytics }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('engagement');

  const timeRangeOptions = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 3 Months' },
  { value: '1y', label: 'Last Year' }];


  const metricOptions = [
  { value: 'engagement', label: 'Engagement Rate' },
  { value: 'reach', label: 'Reach' },
  { value: 'impressions', label: 'Impressions' },
  { value: 'clicks', label: 'Link Clicks' }];


  const engagementData = [
  { day: 'Mon', instagram: 4.2, facebook: 3.1, tiktok: 8.5, snapchat: 2.8 },
  { day: 'Tue', instagram: 3.8, facebook: 2.9, tiktok: 7.2, snapchat: 3.2 },
  { day: 'Wed', instagram: 5.1, facebook: 3.8, tiktok: 9.1, snapchat: 2.5 },
  { day: 'Thu', instagram: 4.7, facebook: 3.5, tiktok: 8.8, snapchat: 3.0 },
  { day: 'Fri', instagram: 6.2, facebook: 4.2, tiktok: 12.3, snapchat: 4.1 },
  { day: 'Sat', instagram: 7.8, facebook: 5.1, tiktok: 15.2, snapchat: 5.8 },
  { day: 'Sun', instagram: 6.9, facebook: 4.8, tiktok: 13.7, snapchat: 4.9 }];


  const platformDistribution = [
  { name: 'Instagram', value: 35, color: '#E1306C' },
  { name: 'Facebook', value: 28, color: '#1877F2' },
  { name: 'TikTok', value: 25, color: '#000000' },
  { name: 'Snapchat', value: 12, color: '#FFFC00' }];


  const topPerformingPosts = [
  {
    id: 1,
    title: 'Luxury Downtown Condo Tour',
    platform: 'instagram',
    engagement: 8.7,
    reach: 12500,
    likes: 1089,
    thumbnail: "https://images.unsplash.com/photo-1650355265079-9dad4fa101e6",
    thumbnailAlt: 'Modern luxury condo interior with floor-to-ceiling windows and city view'
  },
  {
    id: 2,
    title: 'Before & After Staging Magic',
    platform: 'tiktok',
    engagement: 15.2,
    reach: 8900,
    likes: 1354,
    thumbnail: "https://images.unsplash.com/photo-1721274503100-29fa72a4b4ec",
    thumbnailAlt: 'Split screen showing empty room transformation to beautifully staged living space'
  },
  {
    id: 3,
    title: 'Dream Home Kitchen Features',
    platform: 'facebook',
    engagement: 4.8,
    reach: 15600,
    likes: 749,
    thumbnail: "https://images.unsplash.com/photo-1722604817803-4c88edef9bc0",
    thumbnailAlt: 'Modern kitchen with white cabinets, marble countertops and stainless steel appliances'
  }];


  const keyMetrics = [
  {
    label: 'Total Reach',
    value: '47.2K',
    change: '+12.5%',
    trend: 'up',
    icon: 'Users'
  },
  {
    label: 'Engagement Rate',
    value: '6.8%',
    change: '+2.1%',
    trend: 'up',
    icon: 'Heart'
  },
  {
    label: 'Posts Published',
    value: '24',
    change: '+4',
    trend: 'up',
    icon: 'Send'
  },
  {
    label: 'New Followers',
    value: '312',
    change: '+18.7%',
    trend: 'up',
    icon: 'UserPlus'
  }];


  const platformColors = {
    instagram: '#E1306C',
    facebook: '#1877F2',
    tiktok: '#000000',
    snapchat: '#FFFC00'
  };

  const platformIcons = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    tiktok: 'Music',
    snapchat: 'Camera'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Analytics Overview</h2>
        <div className="flex items-center space-x-2">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-32" />

          <Button variant="outline" onClick={onViewFullAnalytics}>
            <Icon name="BarChart3" size={16} />
            <span className="ml-2">Full Analytics</span>
          </Button>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics?.map((metric, index) =>
        <div key={index} className="bg-white border border-border rounded-lg p-4 shadow-elevation-1">
            <div className="flex items-center justify-between mb-2">
              <Icon name={metric?.icon} size={20} className="text-primary" />
              <span className={`text-xs font-medium ${
            metric?.trend === 'up' ? 'text-success' : 'text-error'}`
            }>
                {metric?.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{metric?.value}</p>
              <p className="text-sm text-muted-foreground">{metric?.label}</p>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Chart */}
        <div className="bg-white border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-foreground">Engagement by Platform</h3>
            <Select
              options={metricOptions}
              value={selectedMetric}
              onChange={setSelectedMetric}
              className="w-32" />

          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }} />

                <Bar dataKey="instagram" fill="#E1306C" radius={[2, 2, 0, 0]} />
                <Bar dataKey="facebook" fill="#1877F2" radius={[2, 2, 0, 0]} />
                <Bar dataKey="tiktok" fill="#000000" radius={[2, 2, 0, 0]} />
                <Bar dataKey="snapchat" fill="#FFFC00" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="bg-white border border-border rounded-lg p-4 shadow-elevation-1">
          <h3 className="text-sm font-medium text-foreground mb-4">Platform Distribution</h3>
          <div className="h-64 flex items-center">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value">

                    {platformDistribution?.map((entry, index) =>
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-2">
              {platformDistribution?.map((platform, index) =>
              <div key={index} className="flex items-center space-x-2">
                  <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: platform?.color }} />

                  <span className="text-sm text-foreground">{platform?.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{platform?.value}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Top Performing Posts */}
      <div className="bg-white border border-border rounded-lg shadow-elevation-1">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-sm font-medium text-foreground">Top Performing Posts</h3>
          <Button variant="ghost" size="sm">
            <span className="text-xs">View All</span>
            <Icon name="ArrowRight" size={12} className="ml-1" />
          </Button>
        </div>
        <div className="divide-y divide-border">
          {topPerformingPosts?.map((post) =>
          <div key={post?.id} className="p-4 hover:bg-muted/30 transition-smooth">
              <div className="flex items-center space-x-4">
                <Image
                src={post?.thumbnail}
                alt={post?.thumbnailAlt}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {post?.title}
                    </h4>
                    <div
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: platformColors?.[post?.platform] }}>

                      <Icon
                      name={platformIcons?.[post?.platform]}
                      size={10}
                      color="white" />

                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Engagement: {post?.engagement}%</span>
                    <span>Reach: {post?.reach?.toLocaleString()}</span>
                    <span>Likes: {post?.likes?.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-success">
                    +{post?.engagement}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    vs avg
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

};

export default AnalyticsOverview;