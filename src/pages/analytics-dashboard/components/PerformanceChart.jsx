import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

import Button from '../../../components/ui/Button';

const PerformanceChart = () => {
  const [activeChart, setActiveChart] = useState('engagement');

  const engagementData = [
    { date: '2024-10-01', instagram: 4200, facebook: 3100, tiktok: 5600, snapchat: 2800 },
    { date: '2024-10-08', instagram: 4800, facebook: 3400, tiktok: 6200, snapchat: 3100 },
    { date: '2024-10-15', instagram: 5200, facebook: 3800, tiktok: 6800, snapchat: 3400 },
    { date: '2024-10-22', instagram: 4900, facebook: 3600, tiktok: 6400, snapchat: 3200 },
    { date: '2024-10-29', instagram: 5600, facebook: 4100, tiktok: 7200, snapchat: 3700 },
    { date: '2024-11-05', instagram: 6100, facebook: 4500, tiktok: 7800, snapchat: 4000 }
  ];

  const videoPerformanceData = [
    { month: 'Jun', views: 12400, completions: 8900, shares: 340 },
    { month: 'Jul', views: 15600, completions: 11200, shares: 420 },
    { month: 'Aug', views: 18900, completions: 13800, shares: 580 },
    { month: 'Sep', views: 22100, completions: 16400, shares: 720 },
    { month: 'Oct', views: 28700, completions: 21200, shares: 890 },
    { month: 'Nov', views: 31200, completions: 23800, shares: 1020 }
  ];

  const stagingSuccessData = [
    { name: 'Modern', value: 35, color: '#2563EB' },
    { name: 'Minimalist', value: 28, color: '#0EA5E9' },
    { name: 'Luxury', value: 22, color: '#059669' },
    { name: 'Rustic', value: 15, color: '#D97706' }
  ];

  const chartTypes = [
    { id: 'engagement', label: 'Social Engagement', icon: 'Heart' },
    { id: 'video', label: 'Video Performance', icon: 'Play' },
    { id: 'staging', label: 'Staging Success', icon: 'Wand2' }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'engagement':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748B"
                fontSize={12}
                tickFormatter={(value) => new Date(value)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                labelFormatter={(value) => new Date(value)?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              />
              <Line type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={3} dot={{ fill: '#E4405F', strokeWidth: 2, r: 4 }} />
              <Line type="monotone" dataKey="facebook" stroke="#1877F2" strokeWidth={3} dot={{ fill: '#1877F2', strokeWidth: 2, r: 4 }} />
              <Line type="monotone" dataKey="tiktok" stroke="#000000" strokeWidth={3} dot={{ fill: '#000000', strokeWidth: 2, r: 4 }} />
              <Line type="monotone" dataKey="snapchat" stroke="#FFFC00" strokeWidth={3} dot={{ fill: '#FFFC00', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'video':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={videoPerformanceData}>
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
              />
              <Bar dataKey="views" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completions" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="shares" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'staging':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={stagingSuccessData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {stagingSuccessData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}%`, 'Success Rate']}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Performance Analytics</h2>
        <div className="flex items-center space-x-2">
          {chartTypes?.map((type) => (
            <Button
              key={type?.id}
              variant={activeChart === type?.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveChart(type?.id)}
              iconName={type?.icon}
              iconPosition="left"
            >
              {type?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        {activeChart === 'engagement' && (
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#E4405F] rounded-full"></div>
              <span className="text-muted-foreground">Instagram</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#1877F2] rounded-full"></div>
              <span className="text-muted-foreground">Facebook</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-black rounded-full"></div>
              <span className="text-muted-foreground">TikTok</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#FFFC00] rounded-full border border-gray-300"></div>
              <span className="text-muted-foreground">Snapchat</span>
            </div>
          </div>
        )}
        {activeChart === 'video' && (
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Views</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-muted-foreground">Completions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">Shares</span>
            </div>
          </div>
        )}
        {activeChart === 'staging' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {stagingSuccessData?.map((item) => (
              <div key={item?.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item?.color }}></div>
                <span className="text-muted-foreground">{item?.name} ({item?.value}%)</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {renderChart()}
    </div>
  );
};

export default PerformanceChart;