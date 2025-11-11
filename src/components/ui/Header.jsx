import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Asset Library', path: '/asset-library', icon: 'FolderOpen' },
    { label: 'AI Staging', path: '/ai-staging-studio', icon: 'Wand2' },
    { label: 'Video Generator', path: '/video-generator', icon: 'Video' },
  ];

  const secondaryNavItems = [
    { label: 'Social Media', path: '/social-media-scheduler', icon: 'Calendar' },
    { label: 'Analytics', path: '/analytics-dashboard', icon: 'BarChart3' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Home" size={20} color="white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground">RealtyStage</span>
            <span className="text-xs text-muted-foreground font-medium">Pro</span>
          </div>
        </Link>

        {/* Primary Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {primaryNavItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className="flex items-center space-x-2"
            >
              <Icon name="MoreHorizontal" size={16} />
              <span>More</span>
            </Button>

            {isMoreMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-elevation-2 py-1 z-50">
                {secondaryNavItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMoreMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-2 text-sm transition-smooth ${
                      isActivePath(item?.path)
                        ? 'bg-accent text-accent-foreground'
                        : 'text-popover-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
        >
          <Icon name="Menu" size={20} />
        </Button>

        {/* User Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            <Icon name="Bell" size={18} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={18} />
          </Button>
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <Icon name="User" size={16} color="var(--color-muted-foreground)" />
          </div>
        </div>
      </div>
      {/* Mobile Navigation Dropdown */}
      {isMoreMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border shadow-elevation-1">
          <nav className="px-4 py-2 space-y-1">
            {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMoreMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;