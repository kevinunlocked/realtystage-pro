import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ContentCalendar = ({ posts, onPostClick, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, day

  const platformColors = {
    instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
    facebook: 'bg-blue-600',
    tiktok: 'bg-black',
    snapchat: 'bg-yellow-400'
  };

  const platformIcons = {
    instagram: 'Instagram',
    facebook: 'Facebook', 
    tiktok: 'Music',
    snapchat: 'Camera'
  };

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getPostsForDate = (date) => {
    if (!date) return [];
    const dateStr = date?.toDateString();
    return posts?.filter(post => post?.scheduledDate?.toDateString() === dateStr);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate?.setMonth(prev?.getMonth() + direction);
      return newDate;
    });
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white border border-border rounded-lg shadow-elevation-1">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-foreground">
            {monthNames?.[currentDate?.getMonth()]} {currentDate?.getFullYear()}
          </h2>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(-1)}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(1)}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {['month', 'week', 'day']?.map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode(mode)}
                className="capitalize"
              >
                {mode}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} />
            <span className="ml-2">Export</span>
          </Button>
        </div>
      </div>
      {/* Platform Legend */}
      <div className="flex items-center justify-between p-4 bg-muted/30 border-b border-border">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-foreground">Platforms:</span>
          {Object.entries(platformColors)?.map(([platform, colorClass]) => (
            <div key={platform} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${colorClass}`} />
              <span className="text-sm text-muted-foreground capitalize">{platform}</span>
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          {posts?.length} posts scheduled this month
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="p-4">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays?.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth(currentDate)?.map((date, index) => {
            const dayPosts = getPostsForDate(date);
            const hasContent = dayPosts?.length > 0;
            
            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border border-border rounded-lg cursor-pointer transition-smooth hover:bg-muted/50 ${
                  !date ? 'opacity-30 cursor-not-allowed' : ''
                } ${isToday(date) ? 'bg-primary/5 border-primary/30' : 'bg-white'}`}
                onClick={() => date && onDateClick?.(date)}
              >
                {date && (
                  <>
                    <div className={`text-sm font-medium mb-2 ${
                      isToday(date) ? 'text-primary' : 'text-foreground'
                    }`}>
                      {date?.getDate()}
                    </div>
                    
                    {hasContent && (
                      <div className="space-y-1">
                        {dayPosts?.slice(0, 3)?.map((post) => (
                          <div
                            key={post?.id}
                            onClick={(e) => {
                              e?.stopPropagation();
                              onPostClick?.(post);
                            }}
                            className="group relative"
                          >
                            <div className={`w-full h-6 rounded text-xs text-white flex items-center px-2 ${
                              platformColors?.[post?.platform]
                            } hover:opacity-80 transition-smooth`}>
                              <Icon 
                                name={platformIcons?.[post?.platform]} 
                                size={12} 
                                className="mr-1 flex-shrink-0" 
                              />
                              <span className="truncate">{post?.title}</span>
                            </div>
                            
                            {/* Hover Preview */}
                            <div className="absolute left-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth z-10">
                              <div className="flex items-start space-x-2">
                                {post?.thumbnail && (
                                  <Image
                                    src={post?.thumbnail}
                                    alt={post?.thumbnailAlt}
                                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-foreground truncate">
                                    {post?.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {post?.caption}
                                  </p>
                                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                                    <Icon name="Clock" size={10} className="mr-1" />
                                    {post?.scheduledDate?.toLocaleTimeString([], { 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {dayPosts?.length > 3 && (
                          <div className="text-xs text-muted-foreground text-center py-1">
                            +{dayPosts?.length - 3} more
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;