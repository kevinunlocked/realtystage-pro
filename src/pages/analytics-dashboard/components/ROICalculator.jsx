import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ROICalculator = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const roiMetrics = {
    month: {
      investment: 2450,
      revenue: 12890,
      roi: 426,
      leads: 89,
      conversions: 12,
      avgDealValue: 285000,
      costPerLead: 27.53,
      conversionRate: 13.5
    },
    quarter: {
      investment: 7200,
      revenue: 45600,
      roi: 533,
      leads: 267,
      conversions: 38,
      avgDealValue: 295000,
      costPerLead: 26.97,
      conversionRate: 14.2
    },
    year: {
      investment: 28800,
      revenue: 189400,
      roi: 558,
      leads: 1024,
      conversions: 156,
      avgDealValue: 298000,
      costPerLead: 28.13,
      conversionRate: 15.2
    }
  };

  const leadSources = [
    {
      source: "Social Media Posts",
      leads: 45,
      percentage: 51,
      cost: 890,
      conversions: 7,
      color: "bg-primary"
    },
    {
      source: "AI-Generated Videos",
      leads: 28,
      percentage: 31,
      cost: 650,
      conversions: 3,
      color: "bg-accent"
    },
    {
      source: "Staged Property Photos",
      leads: 16,
      percentage: 18,
      cost: 910,
      conversions: 2,
      color: "bg-success"
    }
  ];

  const conversionFunnel = [
    { stage: "Impressions", count: 127543, percentage: 100, color: "bg-muted" },
    { stage: "Clicks", count: 8945, percentage: 7.0, color: "bg-primary/20" },
    { stage: "Leads", count: 89, percentage: 1.0, color: "bg-primary/60" },
    { stage: "Qualified", count: 34, percentage: 0.38, color: "bg-primary/80" },
    { stage: "Conversions", count: 12, percentage: 0.13, color: "bg-primary" }
  ];

  const currentMetrics = roiMetrics?.[selectedPeriod];

  const periods = [
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' }
  ];

  return (
    <div className="space-y-6">
      {/* ROI Overview */}
      <div className="bg-white border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">ROI Analysis</h2>
          <div className="flex items-center space-x-2">
            {periods?.map((period) => (
              <Button
                key={period?.id}
                variant={selectedPeriod === period?.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period?.id)}
              >
                {period?.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="text-center p-4 border border-border rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="DollarSign" size={24} className="text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">
              ${currentMetrics?.investment?.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Investment</p>
          </div>

          <div className="text-center p-4 border border-border rounded-lg">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="TrendingUp" size={24} className="text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">
              ${currentMetrics?.revenue?.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Revenue Generated</p>
          </div>

          <div className="text-center p-4 border border-border rounded-lg">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Target" size={24} className="text-warning" />
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">
              {currentMetrics?.roi}%
            </p>
            <p className="text-sm text-muted-foreground">ROI</p>
          </div>

          <div className="text-center p-4 border border-border rounded-lg">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Users" size={24} className="text-accent" />
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">
              {currentMetrics?.conversions}
            </p>
            <p className="text-sm text-muted-foreground">Conversions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calculator" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Cost Per Lead</span>
            </div>
            <p className="text-xl font-bold text-foreground">${currentMetrics?.costPerLead}</p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Percent" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Conversion Rate</span>
            </div>
            <p className="text-xl font-bold text-foreground">{currentMetrics?.conversionRate}%</p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Home" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Avg Deal Value</span>
            </div>
            <p className="text-xl font-bold text-foreground">${currentMetrics?.avgDealValue?.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Attribution */}
        <div className="bg-white border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Lead Attribution</h2>
            <Icon name="PieChart" size={20} className="text-primary" />
          </div>
          <div className="space-y-4">
            {leadSources?.map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{source?.source}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{source?.leads} leads</span>
                    <span className="text-sm font-medium text-foreground">{source?.conversions} sales</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${source?.color}`}
                      style={{ width: `${source?.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground w-12 text-right">
                    {source?.percentage}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Cost: ${source?.cost} • CPL: ${(source?.cost / source?.leads)?.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Conversion Funnel</h2>
            <Icon name="Filter" size={20} className="text-primary" />
          </div>
          <div className="space-y-4">
            {conversionFunnel?.map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{stage?.stage}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-foreground">
                      {stage?.count?.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({stage?.percentage}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${stage?.color} transition-smooth`}
                    style={{ width: `${Math.max(stage?.percentage * 10, 5)}%` }}
                  />
                </div>
                {index < conversionFunnel?.length - 1 && (
                  <div className="flex justify-center mt-2">
                    <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-success/10 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">
                Overall conversion rate: {((conversionFunnel?.[4]?.count / conversionFunnel?.[0]?.count) * 100)?.toFixed(3)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;