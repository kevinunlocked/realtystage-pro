import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AssetUtilization = () => {
  const topAssets = [
  {
    id: 1,
    name: "modern-kitchen-01.jpg",
    type: "image",
    usage: 47,
    image: "https://images.unsplash.com/photo-1604943963840-a18fe96a6322",
    alt: "Modern white kitchen with marble countertops and pendant lighting",
    campaigns: 12,
    lastUsed: "2024-11-09"
  },
  {
    id: 2,
    name: "luxury-living-room.jpg",
    type: "image",
    usage: 38,
    image: "https://images.unsplash.com/photo-1604227048600-bd9b235a9019",
    alt: "Luxury living room with velvet sofa and gold accent decor",
    campaigns: 9,
    lastUsed: "2024-11-08"
  },
  {
    id: 3,
    name: "property-tour-template.mp4",
    type: "video",
    usage: 34,
    image: "https://images.unsplash.com/photo-1724861661161-e341051aee60",
    alt: "Modern home interior with open floor plan and natural lighting",
    campaigns: 8,
    lastUsed: "2024-11-07"
  },
  {
    id: 4,
    name: "minimalist-bedroom.jpg",
    type: "image",
    usage: 29,
    image: "https://images.unsplash.com/photo-1669014386196-334283cc2c4a",
    alt: "Minimalist bedroom with white bedding and wooden furniture",
    campaigns: 7,
    lastUsed: "2024-11-06"
  },
  {
    id: 5,
    name: "open-house-template.jpg",
    type: "template",
    usage: 25,
    image: "https://images.unsplash.com/photo-1682977782499-04e7f7aab46e",
    alt: "Elegant home exterior with manicured landscaping and welcoming entrance",
    campaigns: 6,
    lastUsed: "2024-11-05"
  }];


  const stagingStyles = [
  {
    style: "Modern",
    usage: 156,
    percentage: 42,
    color: "bg-primary",
    projects: 89,
    avgRating: 4.8
  },
  {
    style: "Minimalist",
    usage: 124,
    percentage: 33,
    color: "bg-accent",
    projects: 67,
    avgRating: 4.6
  },
  {
    style: "Luxury",
    usage: 89,
    percentage: 24,
    color: "bg-success",
    projects: 45,
    avgRating: 4.9
  },
  {
    style: "Rustic",
    usage: 67,
    percentage: 18,
    color: "bg-warning",
    projects: 34,
    avgRating: 4.4
  }];


  const videoTemplates = [
  {
    name: "Property Walkthrough",
    usage: 89,
    duration: "60s",
    format: "Square (1:1)",
    platforms: ["Instagram", "Facebook"]
  },
  {
    name: "Listing Highlight",
    usage: 67,
    duration: "30s",
    format: "Vertical (9:16)",
    platforms: ["TikTok", "Instagram Stories"]
  },
  {
    name: "Market Update",
    usage: 45,
    duration: "90s",
    format: "Landscape (16:9)",
    platforms: ["Facebook", "YouTube"]
  },
  {
    name: "Agent Introduction",
    usage: 34,
    duration: "45s",
    format: "Square (1:1)",
    platforms: ["LinkedIn", "Facebook"]
  }];


  const getTypeIcon = (type) => {
    switch (type) {
      case 'image':return 'Image';
      case 'video':return 'Video';
      case 'template':return 'Layout';
      default:return 'File';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'image':return 'text-accent';
      case 'video':return 'text-warning';
      case 'template':return 'text-primary';
      default:return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Performing Assets */}
      <div className="bg-white border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Most Used Assets</h2>
          <Icon name="TrendingUp" size={20} className="text-success" />
        </div>
        <div className="space-y-4">
          {topAssets?.map((asset) =>
          <div key={asset?.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:shadow-elevation-1 transition-smooth">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                src={asset?.image}
                alt={asset?.alt}
                className="w-full h-full object-cover" />

              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon
                  name={getTypeIcon(asset?.type)}
                  size={16}
                  className={getTypeColor(asset?.type)} />

                  <h3 className="font-medium text-foreground truncate">{asset?.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Used in {asset?.campaigns} campaigns • Last used {new Date(asset.lastUsed)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-foreground">{asset?.usage}</p>
                <p className="text-xs text-muted-foreground">times used</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staging Style Performance */}
        <div className="bg-white border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Staging Style Performance</h2>
            <Icon name="Wand2" size={20} className="text-primary" />
          </div>
          <div className="space-y-4">
            {stagingStyles?.map((style, index) =>
            <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{style?.style}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{style?.projects} projects</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span className="text-xs text-muted-foreground">{style?.avgRating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                    className={`h-2 rounded-full ${style?.color}`}
                    style={{ width: `${style?.percentage}%` }} />

                  </div>
                  <span className="text-sm font-medium text-foreground w-12 text-right">
                    {style?.usage}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Template Usage */}
        <div className="bg-white border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Video Template Usage</h2>
            <Icon name="Video" size={20} className="text-warning" />
          </div>
          <div className="space-y-4">
            {videoTemplates?.map((template, index) =>
            <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-foreground">{template?.name}</h3>
                  <span className="text-lg font-semibold text-foreground">{template?.usage}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>{template?.duration} • {template?.format}</span>
                  <span>uses</span>
                </div>
                <div className="flex items-center space-x-2">
                  {template?.platforms?.map((platform, platformIndex) =>
                <span
                  key={platformIndex}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">

                      {platform}
                    </span>
                )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

};

export default AssetUtilization;