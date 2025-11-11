import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, trend, trendValue, icon, color, route, description }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <Link 
      to={route}
      className="block bg-white border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-smooth group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
              <Icon name={icon} size={20} color="white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
              <p className="text-2xl font-bold text-foreground">{value}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{description}</p>
          <div className="flex items-center space-x-2">
            <Icon name={getTrendIcon()} size={14} className={getTrendColor()} />
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {trendValue}
            </span>
            <span className="text-xs text-muted-foreground">vs last week</span>
          </div>
        </div>
        <Icon 
          name="ArrowRight" 
          size={16} 
          className="text-muted-foreground group-hover:text-primary transition-smooth" 
        />
      </div>
    </Link>
  );
};

export default MetricCard;