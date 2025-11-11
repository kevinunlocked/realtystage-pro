import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const AssetPreview = ({ asset, isOpen, onClose, onAction }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !asset) return null;

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
  { id: 'details', label: 'Details', icon: 'Info' },
  { id: 'versions', label: 'Versions', icon: 'History' },
  { id: 'activity', label: 'Activity', icon: 'Activity' }];


  const versions = [
  {
    id: 1,
    version: '1.0',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    user: 'Sarah Johnson',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19c152708-1762274558818.png",
    userAvatarAlt: 'Professional headshot of woman with brown hair in business attire',
    changes: 'Original upload'
  },
  {
    id: 2,
    version: '1.1',
    date: new Date(Date.now() - 12 * 60 * 60 * 1000),
    user: 'Mike Chen',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116b22d4e-1762273809021.png",
    userAvatarAlt: 'Professional headshot of Asian man with glasses in navy suit',
    changes: 'Color correction and brightness adjustment'
  }];


  const activities = [
  {
    id: 1,
    action: 'Downloaded',
    user: 'Emily Rodriguez',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1beb9fc75-1762273370028.png",
    userAvatarAlt: 'Professional headshot of Hispanic woman with long dark hair',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 2,
    action: 'Shared with team',
    user: 'David Park',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16684e6bf-1762273392866.png",
    userAvatarAlt: 'Professional headshot of man with beard in casual shirt',
    date: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: 3,
    action: 'Added tags',
    user: 'Sarah Johnson',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19c152708-1762274558818.png",
    userAvatarAlt: 'Professional headshot of woman with brown hair in business attire',
    date: new Date(Date.now() - 6 * 60 * 60 * 1000)
  }];


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-6xl max-h-[90vh] bg-white rounded-lg shadow-elevation-2 flex overflow-hidden">
        {/* Preview Area */}
        <div className="flex-1 bg-muted flex items-center justify-center p-8">
          {asset?.type === 'image' ?
          <Image
            src={asset?.url}
            alt={asset?.alt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-elevation-1" /> :

          asset?.type === 'video' ?
          <video
            src={asset?.url}
            controls
            className="max-w-full max-h-full rounded-lg shadow-elevation-1">

              Your browser does not support the video tag.
            </video> :

          <div className="flex flex-col items-center space-y-4 text-muted-foreground">
              <Icon name="FileText" size={64} />
              <p className="text-lg font-medium">Document Preview</p>
              <p className="text-sm">Click download to view this file</p>
            </div>
          }
        </div>

        {/* Sidebar */}
        <div className="w-96 border-l border-border flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-foreground truncate">{asset?.name}</h2>
                <p className="text-sm text-muted-foreground">{asset?.property}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2 mt-4">
              <Button size="sm" onClick={() => onAction('download', asset?.id)}>
                <Icon name="Download" size={16} />
                <span className="ml-2">Download</span>
              </Button>
              <Button variant="outline" size="sm" onClick={() => onAction('share', asset?.id)}>
                <Icon name="Share2" size={16} />
              </Button>
              <Button variant="outline" size="sm" onClick={() => onAction('edit', asset?.id)}>
                <Icon name="Edit" size={16} />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            {tabs?.map((tab) =>
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-smooth ${
              activeTab === tab?.id ?
              'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground'}`
              }>

                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            )}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'details' &&
            <div className="space-y-6">
                {/* File Information */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">File Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="text-foreground capitalize">{asset?.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="text-foreground">{formatFileSize(asset?.size)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Uploaded:</span>
                      <span className="text-foreground">{formatDate(asset?.uploadDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Modified:</span>
                      <span className="text-foreground">{formatDate(asset?.modifiedDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {asset?.tags?.map((tag) =>
                  <span key={tag} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        {tag}
                      </span>
                  )}
                  </div>
                </div>

                {/* Metadata */}
                {asset?.metadata &&
              <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Metadata</h3>
                    <div className="space-y-2 text-sm">
                      {Object.entries(asset?.metadata)?.map(([key, value]) =>
                  <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground capitalize">{key?.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="text-foreground">{value}</span>
                        </div>
                  )}
                    </div>
                  </div>
              }
              </div>
            }

            {activeTab === 'versions' &&
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Version History</h3>
                {versions?.map((version) =>
              <div key={version?.id} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">v{version?.version}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(version?.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Image
                    src={version?.userAvatar}
                    alt={version?.userAvatarAlt}
                    className="w-6 h-6 rounded-full" />

                      <span className="text-sm text-muted-foreground">{version?.user}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{version?.changes}</p>
                  </div>
              )}
              </div>
            }

            {activeTab === 'activity' &&
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
                {activities?.map((activity) =>
              <div key={activity?.id} className="flex items-start space-x-3">
                    <Image
                  src={activity?.userAvatar}
                  alt={activity?.userAvatarAlt}
                  className="w-8 h-8 rounded-full flex-shrink-0" />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity?.user}</span> {activity?.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatDate(activity?.date)}</p>
                    </div>
                  </div>
              )}
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

};

export default AssetPreview;