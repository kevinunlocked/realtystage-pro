import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendAnalysis = () => {
  const [selectedTrend, setSelectedTrend] = useState('market');

  const marketTrends = [
    { month: 'May 2024', listings: 145, avgPrice: 485000, daysOnMarket: 28, inventory: 2.1 },
    { month: 'Jun 2024', listings: 167, avgPrice: 492000, daysOnMarket: 25, inventory: 1.9 },
    { month: 'Jul 2024', listings: 189, avgPrice: 498000, daysOnMarket: 22, inventory: 1.7 },
    { month: 'Aug 2024', listings: 156, avgPrice: 505000, daysOnMarket: 19, inventory: 1.5 },
    { month: 'Sep 2024', listings: 134, avgPrice: 512000, daysOnMarket: 21, inventory: 1.6 },
    { month: 'Oct 2024', listings: 178, avgPrice: 518000, daysOnMarket: 24, inventory: 1.8 },
    { month: 'Nov 2024', listings: 201, avgPrice: 525000, daysOnMarket: 26, inventory: 2.0 }
  ];

  const seasonalPatterns = [
    { month: 'Jan', engagement: 65, listings: 45, stagingDemand: 30 },
    { month: 'Feb', engagement: 72, listings: 52, stagingDemand: 35 },
    { month: 'Mar', engagement: 85, listings: 78, stagingDemand: 65 },
    { month: 'Apr', engagement: 92, listings: 89, stagingDemand: 78 },
    { month: 'May', engagement: 98, listings: 95, stagingDemand: 85 },
    { month: 'Jun', engagement: 100, listings: 100, stagingDemand: 90 },
    { month: 'Jul', engagement: 95, listings: 92, stagingDemand: 82 },
    { month: 'Aug', engagement: 88, listings: 85, stagingDemand: 75 },
    { month: 'Sep', engagement: 90, listings: 88, stagingDemand: 80 },
    { month: 'Oct', engagement: 82, listings: 75, stagingDemand: 70 },
    { month: 'Nov', engagement: 75, listings: 65, stagingDemand: 55 },
    { month: 'Dec', engagement: 68, listings: 48, stagingDemand: 40 }
  ];

  const competitiveInsights = [
    {
      competitor: "Elite Realty Group",
      marketShare: 18.5,
      avgEngagement: 7.2,
      postFrequency: 12,
      stagingUsage: 85,
      trend: "up"
    },
    {
      competitor: "Premium Properties",
      marketShare: 15.2,
      avgEngagement: 6.8,
      postFrequency: 8,
      stagingUsage: 72,
      trend: "down"
    },
    {
      competitor: "Modern Homes Co",
      marketShare: 12.8,
      avgEngagement: 8.1,
      postFrequency: 15,
      stagingUsage: 91,
      trend: "up"
    },
    {
      competitor: "Your Agency",
      marketShare: 14.3,
      avgEngagement: 8.7,
      postFrequency: 18,
      stagingUsage: 94,
      trend: "up"
    }
  ];

  const aiInsights = [
    {
      id: 1,
      type: "opportunity",
      title: "Peak Season Approaching",
      description: "Historical data shows 35% increase in engagement during March-June. Consider increasing content production by 40%.",
      confidence: 92,
      impact: "High",
      icon: "TrendingUp"
    },
    {
      id: 2,
      type: "warning",
      title: "Competitive Pressure",
      description: "Modern Homes Co has increased their staging usage by 23% this quarter, potentially impacting your market position.",
      confidence: 87,
      impact: "Medium",
      icon: "AlertTriangle"
    },
    {
      id: 3,
      type: "insight",
      title: "Content Optimization",
      description: "Video content performs 3.2x better on weekends. Shift 60% of video posts to Friday-Sunday for maximum impact.",
      confidence: 95,
      impact: "High",
      icon: "Lightbulb"
    },
    {
      id: 4,
      type: "recommendation",
      title: "Staging Style Trend",
      description: "Minimalist staging shows 28% higher engagement than luxury styles in your target demographic.",
      confidence: 89,
      impact: "Medium",
      icon: "Target"
    }
  ];

  const trendTypes = [
    { id: 'market', label: 'Market Trends', icon: 'TrendingUp' },
    { id: 'seasonal', label: 'Seasonal Patterns', icon: 'Calendar' },
    { id: 'competitive', label: 'Competitive Analysis', icon: 'Users' }
  ];

  const getInsightIcon = (type) => {
    switch (type) {
      case 'opportunity': return 'TrendingUp';
      case 'warning': return 'AlertTriangle';
      case 'insight': return 'Lightbulb';
      case 'recommendation': return 'Target';
      default: return 'Info';
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'opportunity': return 'text-success';
      case 'warning': return 'text-warning';
      case 'insight': return 'text-primary';
      case 'recommendation': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getInsightBg = (type) => {
    switch (type) {
      case 'opportunity': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'insight': return 'bg-primary/10';
      case 'recommendation': return 'bg-accent/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Trend Analysis Charts */}
      <div className="bg-white border border-border rounded-lg shadow-elevation-1">
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Market Trend Analysis</h2>
            <div className="flex items-center space-x-2">
              {trendTypes?.map((type) => (
                <Button
                  key={type?.id}
                  variant={selectedTrend === type?.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTrend(type?.id)}
                  iconName={type?.icon}
                  iconPosition="left"
                >
                  {type?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          {selectedTrend === 'market' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-foreground mb-2">Market Performance Indicators</h3>
                <p className="text-sm text-muted-foreground">
                  Track key market metrics to identify opportunities and adjust your marketing strategy accordingly.
                </p>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={marketTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#64748B"
                    fontSize={12}
                    tickFormatter={(value) => value?.split(' ')?.[0]}
                  />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value, name) => {
                      if (name === 'avgPrice') return [`$${value?.toLocaleString()}`, 'Average Price'];
                      if (name === 'listings') return [value, 'New Listings'];
                      if (name === 'daysOnMarket') return [`${value} days`, 'Days on Market'];
                      if (name === 'inventory') return [`${value} months`, 'Inventory Level'];
                      return [value, name];
                    }}
                  />
                  <Area type="monotone" dataKey="listings" stackId="1" stroke="#2563EB" fill="#2563EB" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="daysOnMarket" stackId="2" stroke="#059669" fill="#059669" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {selectedTrend === 'seasonal' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-foreground mb-2">Seasonal Performance Patterns</h3>
                <p className="text-sm text-muted-foreground">
                  Understand seasonal trends to optimize your content calendar and resource allocation.
                </p>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={seasonalPatterns}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value, name) => {
                      const labels = {
                        engagement: 'Social Engagement',
                        listings: 'Listing Activity',
                        stagingDemand: 'Staging Demand'
                      };
                      return [`${value}%`, labels?.[name] || name];
                    }}
                  />
                  <Line type="monotone" dataKey="engagement" stroke="#2563EB" strokeWidth={3} dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }} />
                  <Line type="monotone" dataKey="listings" stroke="#059669" strokeWidth={3} dot={{ fill: '#059669', strokeWidth: 2, r: 4 }} />
                  <Line type="monotone" dataKey="stagingDemand" stroke="#D97706" strokeWidth={3} dot={{ fill: '#D97706', strokeWidth: 2, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Social Engagement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Listing Activity</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span className="text-muted-foreground">Staging Demand</span>
                </div>
              </div>
            </div>
          )}

          {selectedTrend === 'competitive' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-foreground mb-2">Competitive Landscape</h3>
                <p className="text-sm text-muted-foreground">
                  Compare your performance against key competitors in your market area.
                </p>
              </div>
              <div className="space-y-4">
                {competitiveInsights?.map((competitor, index) => (
                  <div key={index} className={`p-4 border border-border rounded-lg ${
                    competitor?.competitor === 'Your Agency' ? 'bg-primary/5 border-primary/20' : ''
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h4 className={`font-medium ${
                          competitor?.competitor === 'Your Agency' ? 'text-primary' : 'text-foreground'
                        }`}>
                          {competitor?.competitor}
                        </h4>
                        {competitor?.competitor === 'Your Agency' && (
                          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <div className={`flex items-center space-x-1 text-sm font-medium ${
                        competitor?.trend === 'up' ? 'text-success' : 'text-error'
                      }`}>
                        <Icon 
                          name={competitor?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                          size={16} 
                        />
                        <span>{competitor?.marketShare}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Engagement</p>
                        <p className="font-medium text-foreground">{competitor?.avgEngagement}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Posts/Week</p>
                        <p className="font-medium text-foreground">{competitor?.postFrequency}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Staging Usage</p>
                        <p className="font-medium text-foreground">{competitor?.stagingUsage}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Market Share</p>
                        <p className="font-medium text-foreground">{competitor?.marketShare}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* AI-Powered Insights */}
      <div className="bg-white border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Bot" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">AI-Powered Insights</h2>
              <p className="text-sm text-muted-foreground">Strategic recommendations based on market analysis</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh Insights
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiInsights?.map((insight) => (
            <div key={insight?.id} className={`p-4 border border-border rounded-lg ${getInsightBg(insight?.type)}`}>
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg ${getInsightBg(insight?.type)} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={getInsightIcon(insight?.type)} size={20} className={getInsightColor(insight?.type)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">{insight?.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        insight?.impact === 'High' ? 'bg-error/10 text-error' :
                        insight?.impact === 'Medium'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                      }`}>
                        {insight?.impact}
                      </span>
                      <span className="text-xs text-muted-foreground">{insight?.confidence}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysis;