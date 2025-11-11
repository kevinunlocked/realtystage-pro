import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContentCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const scheduledPosts = [
  {
    id: 1,
    title: "Modern Kitchen Staging Reveal",
    platform: "Instagram",
    scheduledTime: "2025-11-11T14:00:00",
    status: "scheduled",
    thumbnail: "https://images.unsplash.com/photo-1613545564267-b80e188a1541",
    thumbnailAlt: "Modern white kitchen with marble countertops and stainless steel appliances",
    type: "image"
  },
  {
    id: 2,
    title: "Property Tour - 123 Oak Street",
    platform: "Facebook",
    scheduledTime: "2025-11-11T16:30:00",
    status: "scheduled",
    thumbnail: "https://images.unsplash.com/photo-1591208854190-d08149f6ecd7",
    thumbnailAlt: "Elegant living room with gray sectional sofa and large windows",
    type: "video"
  },
  {
    id: 3,
    title: "Market Update - November 2025",
    platform: "LinkedIn",
    scheduledTime: "2025-11-12T09:00:00",
    status: "draft",
    thumbnail: "https://images.unsplash.com/photo-1612010167102-d1e8f83833e1",
    thumbnailAlt: "Real estate market analysis charts and graphs on laptop screen",
    type: "carousel"
  },
  {
    id: 4,
    title: "Before & After Staging",
    platform: "TikTok",
    scheduledTime: "2025-11-12T18:00:00",
    status: "scheduled",
    thumbnail: "https://images.unsplash.com/photo-1705538851874-6dc8f97a3a41",
    thumbnailAlt: "Empty living room with hardwood floors before staging transformation",
    type: "video"
  },
  {
    id: 5,
    title: "Open House This Weekend",
    platform: "Instagram",
    scheduledTime: "2025-11-13T10:00:00",
    status: "scheduled",
    thumbnail: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef",
    thumbnailAlt: "Beautiful two-story house exterior with manicured lawn and front porch",
    type: "story"
  }];


  const getPlatformIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'instagram':return 'Instagram';
      case 'facebook':return 'Facebook';
      case 'linkedin':return 'Linkedin';
      case 'tiktok':return 'Music';
      default:return 'Share2';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':return 'bg-success text-success-foreground';
      case 'draft':return 'bg-warning text-warning-foreground';
      case 'published':return 'bg-primary text-primary-foreground';
      default:return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':return 'Video';
      case 'carousel':return 'Images';
      case 'story':return 'Smartphone';
      default:return 'Image';
    }
  };

  const formatScheduledTime = (timeString) => {
    const date = new Date(timeString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);

    const isToday = date?.toDateString() === today?.toDateString();
    const isTomorrow = date?.toDateString() === tomorrow?.toDateString();

    if (isToday) {
      return `Today at ${date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (isTomorrow) {
      return `Tomorrow at ${date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date?.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <div className="bg-white border border-border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Content Calendar</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <span className="text-sm text-muted-foreground px-3">This Week</span>
          <Button variant="ghost" size="sm">
            <Icon name="ChevronRight" size={16} />
          </Button>
          <Link to="/social-media-scheduler">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          {scheduledPosts?.map((post) =>
          <div
            key={post?.id}
            className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:shadow-elevation-1 transition-smooth">

              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                  <Image
                  src={post?.thumbnail}
                  alt={post?.thumbnailAlt}
                  className="w-full h-full object-cover" />

                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center">
                  <Icon name={getTypeIcon(post?.type)} size={12} className="text-muted-foreground" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate">{post?.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Icon name={getPlatformIcon(post?.platform)} size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{post?.platform}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {formatScheduledTime(post?.scheduledTime)}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post?.status)}`}>
                    {post?.status}
                  </span>
                </div>
              </div>

              <Button variant="ghost" size="sm">
                <Icon name="MoreHorizontal" size={16} />
              </Button>
            </div>
          )}
        </div>

        {scheduledPosts?.length === 0 &&
        <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No posts scheduled</h3>
            <p className="text-muted-foreground mb-4">Start scheduling your social media content</p>
            <Link to="/social-media-scheduler">
              <Button>
                <Icon name="Plus" size={16} />
                <span className="ml-2">Schedule Post</span>
              </Button>
            </Link>
          </div>
        }
      </div>
    </div>);

};

export default ContentCalendar;