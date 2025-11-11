import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TemplateLibrary = ({ selectedTemplate, onTemplateSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const videoTemplates = [
  {
    id: 1,
    name: 'Property Showcase',
    description: 'Professional property tour with smooth transitions',
    platform: 'youtube',
    aspectRatio: '16:9',
    duration: '60-90s',
    thumbnail: "https://images.unsplash.com/photo-1662543469405-276fd25d6995",
    thumbnailAlt: 'Modern home exterior showcasing property tour template style',
    features: ['Smooth transitions', 'Text overlays', 'Background music'],
    category: 'professional'
  },
  {
    id: 2,
    name: 'Instagram Reel',
    description: 'Quick property highlights for social media',
    platform: 'instagram',
    aspectRatio: '9:16',
    duration: '15-30s',
    thumbnail: "https://images.unsplash.com/photo-1726270021286-bef67a75ab73",
    thumbnailAlt: 'Vertical format living room perfect for Instagram reel template',
    features: ['Vertical format', 'Quick cuts', 'Trending music'],
    category: 'social'
  },
  {
    id: 3,
    name: 'TikTok Tour',
    description: 'Engaging short-form property content',
    platform: 'tiktok',
    aspectRatio: '9:16',
    duration: '15-60s',
    thumbnail: "https://images.unsplash.com/photo-1602675458450-be9f13c88cba",
    thumbnailAlt: 'Modern kitchen setup ideal for TikTok tour template format',
    features: ['Dynamic transitions', 'Text animations', 'Trending effects'],
    category: 'social'
  },
  {
    id: 4,
    name: 'Facebook Listing',
    description: 'Comprehensive property overview for Facebook',
    platform: 'facebook',
    aspectRatio: '16:9',
    duration: '30-60s',
    thumbnail: "https://images.unsplash.com/photo-1722605919224-4570866f452f",
    thumbnailAlt: 'Elegant bedroom showcasing Facebook listing template style',
    features: ['Detailed descriptions', 'Contact info', 'Call-to-action'],
    category: 'marketing'
  },
  {
    id: 5,
    name: 'YouTube Shorts',
    description: 'Quick property highlights for YouTube',
    platform: 'youtube',
    aspectRatio: '9:16',
    duration: '15-60s',
    thumbnail: "https://images.unsplash.com/photo-1723180890185-383b0c72a96a",
    thumbnailAlt: 'Luxury bathroom perfect for YouTube shorts template format',
    features: ['Vertical format', 'Engaging hooks', 'Subscribe prompts'],
    category: 'social'
  },
  {
    id: 6,
    name: 'Virtual Tour',
    description: 'Immersive walkthrough experience',
    platform: 'youtube',
    aspectRatio: '16:9',
    duration: '2-5min',
    thumbnail: "https://images.unsplash.com/photo-1678837894702-00c80fc923a2",
    thumbnailAlt: 'Backyard pool area showcasing virtual tour template capabilities',
    features: ['Room-by-room flow', 'Detailed narration', 'Property details'],
    category: 'professional'
  }];


  const platforms = [
  { value: 'all', label: 'All Platforms', icon: 'Globe' },
  { value: 'youtube', label: 'YouTube', icon: 'Play' },
  { value: 'instagram', label: 'Instagram', icon: 'Instagram' },
  { value: 'tiktok', label: 'TikTok', icon: 'Music' },
  { value: 'facebook', label: 'Facebook', icon: 'Facebook' }];


  const filteredTemplates = videoTemplates?.filter((template) => {
    const matchesSearch = template?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    template?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || template?.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'youtube':return 'Play';
      case 'instagram':return 'Instagram';
      case 'tiktok':return 'Music';
      case 'facebook':return 'Facebook';
      default:return 'Video';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'youtube':return 'text-red-600';
      case 'instagram':return 'text-pink-600';
      case 'tiktok':return 'text-black';
      case 'facebook':return 'text-blue-600';
      default:return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-white border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Video Templates</h3>
        
        {/* Search */}
        <div className="mb-4">
          <Input
            type="search"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)} />

        </div>

        {/* Platform Filter */}
        <div className="flex flex-wrap gap-2">
          {platforms?.map((platform) =>
          <Button
            key={platform?.value}
            variant={selectedPlatform === platform?.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPlatform(platform?.value)}>

              <Icon name={platform?.icon} size={14} />
              <span className="ml-2">{platform?.label}</span>
            </Button>
          )}
        </div>
      </div>
      {/* Template Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {filteredTemplates?.map((template) =>
          <div
            key={template?.id}
            className={`group border-2 rounded-lg overflow-hidden cursor-pointer transition-smooth ${
            selectedTemplate?.id === template?.id ?
            'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground hover:shadow-elevation-1'}`
            }
            onClick={() => onTemplateSelect(template)}>

              {/* Template Preview */}
              <div className="relative aspect-video bg-muted">
                <img
                src={template?.thumbnail}
                alt={template?.thumbnailAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />

                
                {/* Platform Badge */}
                <div className="absolute top-2 left-2">
                  <div className="flex items-center space-x-1 bg-white/90 text-black px-2 py-1 rounded text-xs font-medium">
                    <Icon name={getPlatformIcon(template?.platform)} size={12} className={getPlatformColor(template?.platform)} />
                    <span className="capitalize">{template?.platform}</span>
                  </div>
                </div>

                {/* Aspect Ratio Badge */}
                <div className="absolute top-2 right-2">
                  <span className="bg-black/60 text-white px-2 py-1 rounded text-xs">
                    {template?.aspectRatio}
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth bg-black/20">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Icon name="Play" size={20} className="text-black ml-1" />
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedTemplate?.id === template?.id &&
              <div className="absolute bottom-2 right-2">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} />
                    </div>
                  </div>
              }
              </div>

              {/* Template Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{template?.name}</h4>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {template?.duration}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {template?.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {template?.features?.map((feature, index) =>
                <span
                  key={index}
                  className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">

                      {feature}
                    </span>
                )}
                </div>
              </div>
            </div>
          )}
        </div>

        {filteredTemplates?.length === 0 &&
        <div className="text-center py-12">
            <Icon name="Video" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or platform filter
            </p>
          </div>
        }
      </div>
      {/* Selected Template Info */}
      {selectedTemplate &&
      <div className="p-4 border-t border-border bg-primary/5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{selectedTemplate?.name}</h4>
              <p className="text-sm text-muted-foreground">
                {selectedTemplate?.aspectRatio} • {selectedTemplate?.duration} • {selectedTemplate?.platform}
              </p>
            </div>
            <Button size="sm">
              <Icon name="Settings" size={14} />
              <span className="ml-2">Customize</span>
            </Button>
          </div>
        </div>
      }
    </div>);

};

export default TemplateLibrary;