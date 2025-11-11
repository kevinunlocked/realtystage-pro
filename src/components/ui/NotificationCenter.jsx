import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Video Generation Complete',
      message: 'Your property tour video for 123 Oak Street is ready for review.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      actionUrl: '/video-generator'
    },
    {
      id: 2,
      type: 'info',
      title: 'AI Staging Suggestion',
      message: 'New staging recommendations available for your living room project.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      actionUrl: '/ai-staging-studio'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Social Media Post Scheduled',
      message: 'Your Instagram post is scheduled for 2:00 PM today. Review before publishing.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true,
      actionUrl: '/social-media-scheduler'
    },
    {
      id: 4,
      type: 'info',
      title: 'Analytics Report Ready',
      message: 'Weekly performance report is available with new insights.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      actionUrl: '/analytics-dashboard'
    },
    {
      id: 5,
      type: 'success',
      title: 'Asset Upload Complete',
      message: '12 new property photos have been added to your library.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      actionUrl: '/asset-library'
    }
  ]);

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'warning':
        return <Icon name="AlertTriangle" size={16} className="text-warning" />;
      case 'error':
        return <Icon name="AlertCircle" size={16} className="text-error" />;
      case 'info':
      default:
        return <Icon name="Info" size={16} className="text-primary" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev?.map(notification =>
      notification?.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev?.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev?.filter(notification => notification?.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Icon name="Bell" size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>
      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-2 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications?.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Bell" size={32} className="mx-auto text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications?.map((notification) => (
                  <div
                    key={notification?.id}
                    className={`p-4 hover:bg-muted/50 transition-smooth ${
                      !notification?.read ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification?.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-medium ${
                              !notification?.read ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {notification?.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {notification?.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {formatTimestamp(notification?.timestamp)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1 ml-2">
                            {!notification?.read && (
                              <button
                                onClick={() => markAsRead(notification?.id)}
                                className="w-2 h-2 bg-primary rounded-full"
                                title="Mark as read"
                              />
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification?.id)}
                              className="p-1 opacity-0 group-hover:opacity-100 transition-smooth"
                            >
                              <Icon name="X" size={12} />
                            </Button>
                          </div>
                        </div>
                        {notification?.actionUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              markAsRead(notification?.id);
                              setIsOpen(false);
                              // Navigate to actionUrl
                            }}
                            className="mt-2 text-xs text-primary hover:text-primary/80"
                          >
                            View Details
                            <Icon name="ArrowRight" size={12} className="ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications?.length > 0 && (
            <div className="p-4 border-t border-border bg-muted/30">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-primary hover:text-primary/80"
                >
                  View all notifications
                  <Icon name="ArrowRight" size={12} className="ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;