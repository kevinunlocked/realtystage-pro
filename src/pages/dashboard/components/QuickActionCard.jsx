import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, color, route, buttonText }) => {
  return (
    <div className="bg-white border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon name={icon} size={24} className="text-white" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      
      <Link to={route}>
        <Button className="w-full" size="sm">
          {buttonText || 'Get Started'}
        </Button>
      </Link>
    </div>
  );
};

export default QuickActionCard;

