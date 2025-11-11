import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const ScheduledPostsList = ({ posts, onEditPost, onDeletePost, onDuplicatePost }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'failed', label: 'Failed' }
  ];

  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'snapchat', label: 'Snapchat' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Schedule Date' },
    { value: 'platform', label: 'Platform' },
    { value: 'status', label: 'Status' },
    { value: 'engagement', label: 'Engagement' }
  ];

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'text-primary bg-primary/10';
      case 'published':
        return 'text-success bg-success/10';
      case 'draft':
        return 'text-muted-foreground bg-muted';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled':
        return 'Clock';
      case 'published':
        return 'CheckCircle';
      case 'draft':
        return 'FileText';
      case 'failed':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const filteredPosts = posts?.filter(post => {
      if (filterStatus !== 'all' && post?.status !== filterStatus) return false;
      if (filterPlatform !== 'all' && !post?.platforms?.includes(filterPlatform)) return false;
      return true;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.scheduledDate) - new Date(b.scheduledDate);
        case 'platform':
          return (a?.platforms?.[0] || '')?.localeCompare(b?.platforms?.[0] || '');
        case 'status':
          return a?.status?.localeCompare(b?.status);
        default:
          return 0;
      }
    });

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  return (
    <div className="bg-white border border-border rounded-lg shadow-elevation-1">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Scheduled Posts</h2>
        <div className="flex items-center space-x-2">
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            className="w-32"
          />
          <Select
            options={platformOptions}
            value={filterPlatform}
            onChange={setFilterPlatform}
            className="w-32"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            className="w-32"
          />
        </div>
      </div>
      {/* Posts List */}
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {filteredPosts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No posts found</h3>
            <p className="text-muted-foreground">
              {filterStatus !== 'all' || filterPlatform !== 'all' 
                ? 'Try adjusting your filters' :'Create your first scheduled post to get started'
              }
            </p>
          </div>
        ) : (
          filteredPosts?.map((post) => (
            <div key={post?.id} className="p-4 hover:bg-muted/30 transition-smooth">
              <div className="flex items-start space-x-4">
                {/* Media Thumbnail */}
                <div className="flex-shrink-0">
                  {post?.thumbnail ? (
                    <Image
                      src={post?.thumbnail}
                      alt={post?.thumbnailAlt || `Thumbnail for ${post?.title} social media post`}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name="Image" size={24} className="text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Post Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-medium text-foreground truncate pr-2">
                      {post?.title}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post?.status)}`}>
                        <Icon name={getStatusIcon(post?.status)} size={12} className="mr-1" />
                        {post?.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post?.caption}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {/* Platforms */}
                      <div className="flex items-center space-x-1">
                        {post?.platforms?.map((platform) => (
                          <div
                            key={platform}
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${platformColors?.[platform]}`}
                            title={platform}
                          >
                            <Icon 
                              name={platformIcons?.[platform]} 
                              size={12} 
                              color="white" 
                            />
                          </div>
                        ))}
                      </div>

                      {/* Schedule Info */}
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Icon name="Clock" size={12} className="mr-1" />
                        {formatDate(post?.scheduledDate)}
                      </div>

                      {/* Engagement Stats */}
                      {post?.status === 'published' && post?.engagement && (
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Icon name="Heart" size={12} className="mr-1" />
                            {post?.engagement?.likes}
                          </div>
                          <div className="flex items-center">
                            <Icon name="MessageCircle" size={12} className="mr-1" />
                            {post?.engagement?.comments}
                          </div>
                          <div className="flex items-center">
                            <Icon name="Share" size={12} className="mr-1" />
                            {post?.engagement?.shares}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditPost?.(post)}
                        className="p-1"
                      >
                        <Icon name="Edit2" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDuplicatePost?.(post)}
                        className="p-1"
                      >
                        <Icon name="Copy" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeletePost?.(post?.id)}
                        className="p-1 text-error hover:text-error"
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Footer */}
      {filteredPosts?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filteredPosts?.length} posts</span>
            <div className="flex items-center space-x-4">
              <span>
                {filteredPosts?.filter(p => p?.status === 'scheduled')?.length} scheduled
              </span>
              <span>
                {filteredPosts?.filter(p => p?.status === 'published')?.length} published
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduledPostsList;