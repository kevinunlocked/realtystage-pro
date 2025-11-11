import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsOverview = ({ dateRange }) => {
  const metrics = [
    {
      id: 1,
      title: "Total Reach",
      value: "127,543",
      change: "+12.5%",
      trend: "up",
      icon: "Eye",
      color: "text-primary"
    },
    {
      id: 2,
      title: "Engagement Rate",
      value: "8.7%",
      change: "+2.3%",
      trend: "up",
      icon: "Heart",
      color: "text-success"
    },
    {
      id: 3,
      title: "Video Views",
      value: "45,892",
      change: "+18.2%",
      trend: "up",
      icon: "Play",
      color: "text-accent"
    },
    {
      id: 4,
      title: "Lead Generation",
      value: "234",
      change: "-5.1%",
      trend: "down",
      icon: "Users",
      color: "text-warning"
    },
    {
      id: 5,
      title: "Staging Projects",
      value: "89",
      change: "+7.8%",
      trend: "up",
      icon: "Wand2",
      color: "text-primary"
    },
    {
      id: 6,
      title: "ROI",
      value: "324%",
      change: "+15.6%",
      trend: "up",
      icon: "TrendingUp",
      color: "text-success"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics?.map((metric) => (
        <div key={metric?.id} className="bg-white border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${metric?.color}`}>
              <Icon name={metric?.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              metric?.trend === 'up' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{metric?.change}</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{metric?.value}</h3>
            <p className="text-sm text-muted-foreground">{metric?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;