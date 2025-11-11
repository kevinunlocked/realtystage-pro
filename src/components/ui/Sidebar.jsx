import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: 'LayoutDashboard',
      description: 'Overview and quick actions'
    },
    { 
      label: 'Asset Library', 
      path: '/asset-library', 
      icon: 'FolderOpen',
      description: 'Manage property media files'
    },
    { 
      label: 'AI Staging Studio', 
      path: '/ai-staging-studio', 
      icon: 'Wand2',
      description: 'Transform empty rooms'
    },
    { 
      label: 'Video Generator', 
      path: '/video-generator', 
      icon: 'Video',
      description: 'Create property videos'
    },
    { 
      label: 'Social Media Scheduler', 
      path: '/social-media-scheduler', 
      icon: 'Calendar',
      description: 'Schedule and manage posts'
    },
    { 
      label: 'Analytics Dashboard', 
      path: '/analytics-dashboard', 
      icon: 'BarChart3',
      description: 'Performance insights'
    },
  ];

  const isActivePath = (path) => location?.pathname === path;
  const shouldShowExpanded = !isCollapsed || isHovered;

  return (
    <aside 
      className={`fixed left-0 top-0 z-40 h-screen bg-white border-r border-border shadow-elevation-1 transition-layout ${
        shouldShowExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg flex-shrink-0">
              <Icon name="Home" size={20} color="white" />
            </div>
            {shouldShowExpanded && (
              <div className="flex flex-col min-w-0">
                <span className="text-lg font-semibold text-foreground truncate">RealtyStage</span>
                <span className="text-xs text-muted-foreground font-medium">Pro</span>
              </div>
            )}
          </Link>
          
          {shouldShowExpanded && onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="flex-shrink-0"
            >
              <Icon name="PanelLeftClose" size={16} />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`group flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-elevation-1'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={!shouldShowExpanded ? item?.label : ''}
            >
              <Icon 
                name={item?.icon} 
                size={18} 
                className="flex-shrink-0"
              />
              {shouldShowExpanded && (
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="truncate">{item?.label}</span>
                  <span className={`text-xs truncate ${
                    isActivePath(item?.path) 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground/70'
                  }`}>
                    {item?.description}
                  </span>
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start ${shouldShowExpanded ? 'px-3' : 'px-0 justify-center'}`}
            title={!shouldShowExpanded ? 'Settings' : ''}
          >
            <Icon name="Settings" size={18} className="flex-shrink-0" />
            {shouldShowExpanded && <span className="ml-3">Settings</span>}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start ${shouldShowExpanded ? 'px-3' : 'px-0 justify-center'}`}
            title={!shouldShowExpanded ? 'Help & Support' : ''}
          >
            <Icon name="HelpCircle" size={18} className="flex-shrink-0" />
            {shouldShowExpanded && <span className="ml-3">Help & Support</span>}
          </Button>

          {/* User Profile */}
          <div className={`flex items-center space-x-3 p-3 rounded-lg bg-muted ${
            shouldShowExpanded ? '' : 'justify-center'
          }`}>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={16} color="white" />
            </div>
            {shouldShowExpanded && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-medium text-foreground truncate">John Agent</span>
                <span className="text-xs text-muted-foreground truncate">Premium Plan</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;