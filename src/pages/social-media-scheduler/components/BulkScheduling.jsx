import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkSchedulingTools = ({ onBulkSchedule, onImportCampaign }) => {
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [bulkSettings, setBulkSettings] = useState({
    platforms: ['instagram'],
    startDate: '',
    frequency: 'daily',
    timeSlots: ['09:00', '15:00', '21:00'],
    caption: '',
    hashtags: '',
    autoOptimize: true
  });

  const mockAssets = [
  {
    id: 1,
    name: 'Modern Kitchen Showcase',
    type: 'image',
    thumbnail: "https://images.unsplash.com/photo-1722604817803-4c88edef9bc0",
    thumbnailAlt: 'Modern kitchen with white cabinets and marble countertops',
    size: '2.4 MB'
  },
  {
    id: 2,
    name: 'Living Room Staging',
    type: 'image',
    thumbnail: "https://images.unsplash.com/photo-1574288361556-95fbce97a8fb",
    thumbnailAlt: 'Beautifully staged living room with modern furniture and decor',
    size: '1.8 MB'
  },
  {
    id: 3,
    name: 'Property Tour Video',
    type: 'video',
    thumbnail: "https://images.unsplash.com/photo-1729152068947-008fd3d2ce24",
    thumbnailAlt: 'Luxury condo interior with floor-to-ceiling windows',
    size: '15.2 MB'
  },
  {
    id: 4,
    name: 'Bedroom Design',
    type: 'image',
    thumbnail: "https://images.unsplash.com/photo-1653204095671-3ed81a4bc561",
    thumbnailAlt: 'Elegant bedroom with neutral tones and natural lighting',
    size: '2.1 MB'
  },
  {
    id: 5,
    name: 'Bathroom Renovation',
    type: 'image',
    thumbnail: "https://images.unsplash.com/photo-1587527901949-ab0341697c1e",
    thumbnailAlt: 'Modern bathroom with marble tiles and glass shower',
    size: '1.9 MB'
  },
  {
    id: 6,
    name: 'Outdoor Space Tour',
    type: 'video',
    thumbnail: "https://images.unsplash.com/photo-1707382920038-93ee7f8db5d7",
    thumbnailAlt: 'Beautiful outdoor patio with modern furniture and landscaping',
    size: '22.8 MB'
  }];


  const platforms = [
  { id: 'instagram', name: 'Instagram', icon: 'Instagram' },
  { id: 'facebook', name: 'Facebook', icon: 'Facebook' },
  { id: 'tiktok', name: 'TikTok', icon: 'Music' },
  { id: 'snapchat', name: 'Snapchat', icon: 'Camera' }];


  const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'every2days', label: 'Every 2 Days' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'custom', label: 'Custom Schedule' }];


  const timeSlotOptions = [
  { value: '06:00', label: '6:00 AM - Early Birds' },
  { value: '09:00', label: '9:00 AM - Morning Peak' },
  { value: '12:00', label: '12:00 PM - Lunch Break' },
  { value: '15:00', label: '3:00 PM - Afternoon' },
  { value: '18:00', label: '6:00 PM - Evening Rush' },
  { value: '21:00', label: '9:00 PM - Prime Time' }];


  const handleAssetToggle = (assetId) => {
    setSelectedAssets((prev) =>
    prev?.includes(assetId) ?
    prev?.filter((id) => id !== assetId) :
    [...prev, assetId]
    );
  };

  const handleSelectAll = () => {
    setSelectedAssets(
      selectedAssets?.length === mockAssets?.length ?
      [] :
      mockAssets?.map((asset) => asset?.id)
    );
  };

  const handlePlatformToggle = (platformId) => {
    setBulkSettings((prev) => ({
      ...prev,
      platforms: prev?.platforms?.includes(platformId) ?
      prev?.platforms?.filter((id) => id !== platformId) :
      [...prev?.platforms, platformId]
    }));
  };

  const handleTimeSlotToggle = (timeSlot) => {
    setBulkSettings((prev) => ({
      ...prev,
      timeSlots: prev?.timeSlots?.includes(timeSlot) ?
      prev?.timeSlots?.filter((slot) => slot !== timeSlot) :
      [...prev?.timeSlots, timeSlot]
    }));
  };

  const handleBulkSchedule = () => {
    if (selectedAssets?.length === 0 || bulkSettings?.platforms?.length === 0) {
      return;
    }

    const bulkData = {
      assets: selectedAssets,
      settings: bulkSettings
    };

    onBulkSchedule?.(bulkData);
  };

  const getSchedulePreview = () => {
    if (!bulkSettings?.startDate || selectedAssets?.length === 0) return [];

    const startDate = new Date(bulkSettings.startDate);
    const preview = [];

    for (let i = 0; i < Math.min(selectedAssets?.length, 5); i++) {
      const postDate = new Date(startDate);

      switch (bulkSettings?.frequency) {
        case 'daily':
          postDate?.setDate(startDate?.getDate() + i);
          break;
        case 'every2days':
          postDate?.setDate(startDate?.getDate() + i * 2);
          break;
        case 'weekly':
          postDate?.setDate(startDate?.getDate() + i * 7);
          break;
        case 'biweekly':
          postDate?.setDate(startDate?.getDate() + i * 14);
          break;
      }

      preview?.push({
        date: postDate,
        asset: mockAssets?.find((a) => a?.id === selectedAssets?.[i]),
        timeSlot: bulkSettings?.timeSlots?.[i % bulkSettings?.timeSlots?.length]
      });
    }

    return preview;
  };

  return (
    <div className="bg-white border border-border rounded-lg shadow-elevation-1">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Bulk Scheduling Tools</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onImportCampaign}>
            <Icon name="Upload" size={16} />
            <span className="ml-2">Import Campaign</span>
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} />
            <span className="ml-2">Export Template</span>
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-6">
        {/* Asset Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">Select Assets</h3>
            <Button variant="ghost" size="sm" onClick={handleSelectAll}>
              {selectedAssets?.length === mockAssets?.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
            {mockAssets?.map((asset) =>
            <div
              key={asset?.id}
              onClick={() => handleAssetToggle(asset?.id)}
              className={`relative border rounded-lg overflow-hidden cursor-pointer transition-smooth ${
              selectedAssets?.includes(asset?.id) ?
              'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`
              }>

                <div className="aspect-square bg-muted flex items-center justify-center">
                  {asset?.type === 'video' ?
                <div className="relative w-full h-full">
                      <img
                    src={asset?.thumbnail}
                    alt={asset?.thumbnailAlt}
                    className="w-full h-full object-cover" />

                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Icon name="Play" size={24} color="white" />
                      </div>
                    </div> :

                <img
                  src={asset?.thumbnail}
                  alt={asset?.thumbnailAlt}
                  className="w-full h-full object-cover" />

                }
                </div>
                
                <div className="p-2">
                  <h4 className="text-xs font-medium text-foreground truncate">
                    {asset?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{asset?.size}</p>
                </div>
                
                {selectedAssets?.includes(asset?.id) &&
              <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
              }
              </div>
            )}
          </div>
        </div>

        {/* Bulk Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Scheduling Settings</h3>
            
            <Input
              label="Start Date"
              type="date"
              value={bulkSettings?.startDate}
              onChange={(e) => setBulkSettings((prev) => ({ ...prev, startDate: e?.target?.value }))} />

            
            <Select
              label="Frequency"
              options={frequencyOptions}
              value={bulkSettings?.frequency}
              onChange={(value) => setBulkSettings((prev) => ({ ...prev, frequency: value }))} />


            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Time Slots
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {timeSlotOptions?.map((option) =>
                <div
                  key={option?.value}
                  onClick={() => handleTimeSlotToggle(option?.value)}
                  className="flex items-center space-x-2 cursor-pointer">

                    <Checkbox
                    checked={bulkSettings?.timeSlots?.includes(option?.value)}
                    onChange={() => {}} />

                    <span className="text-sm text-foreground">{option?.label}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Platform & Content</h3>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Platforms
              </label>
              <div className="grid grid-cols-2 gap-2">
                {platforms?.map((platform) =>
                <div
                  key={platform?.id}
                  onClick={() => handlePlatformToggle(platform?.id)}
                  className={`flex items-center space-x-2 p-2 border rounded cursor-pointer transition-smooth ${
                  bulkSettings?.platforms?.includes(platform?.id) ?
                  'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`
                  }>

                    <Checkbox
                    checked={bulkSettings?.platforms?.includes(platform?.id)}
                    onChange={() => {}} />

                    <Icon name={platform?.icon} size={16} />
                    <span className="text-sm text-foreground">{platform?.name}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Default Caption Template
              </label>
              <textarea
                placeholder="Enter default caption template..."
                value={bulkSettings?.caption}
                onChange={(e) => setBulkSettings((prev) => ({ ...prev, caption: e?.target?.value }))}
                className="w-full h-20 px-3 py-2 border border-border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />

            </div>

            <Input
              label="Default Hashtags"
              type="text"
              placeholder="#RealEstate #DreamHome #JustListed"
              value={bulkSettings?.hashtags}
              onChange={(e) => setBulkSettings((prev) => ({ ...prev, hashtags: e?.target?.value }))} />


            <div className="flex items-center space-x-2">
              <Checkbox
                checked={bulkSettings?.autoOptimize}
                onChange={(e) => setBulkSettings((prev) => ({ ...prev, autoOptimize: e?.target?.checked }))} />

              <span className="text-sm text-foreground">Auto-optimize posting times</span>
            </div>
          </div>
        </div>

        {/* Schedule Preview */}
        {getSchedulePreview()?.length > 0 &&
        <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Schedule Preview</h3>
            <div className="bg-muted/30 border border-border rounded-lg p-4">
              <div className="space-y-2">
                {getSchedulePreview()?.map((item, index) =>
              <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      <span className="text-muted-foreground">
                        {item?.date?.toLocaleDateString()}
                      </span>
                      <span className="text-foreground font-medium">
                        {item?.asset?.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">{item?.timeSlot}</span>
                      <div className="flex space-x-1">
                        {bulkSettings?.platforms?.map((platform) =>
                    <div key={platform} className="w-4 h-4 bg-primary rounded-full" />
                    )}
                      </div>
                    </div>
                  </div>
              )}
                {selectedAssets?.length > 5 &&
              <div className="text-xs text-muted-foreground text-center pt-2">
                    +{selectedAssets?.length - 5} more posts will be scheduled
                  </div>
              }
              </div>
            </div>
          </div>
        }

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {selectedAssets?.length} assets selected • {bulkSettings?.platforms?.length} platforms
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Icon name="Save" size={16} />
              <span className="ml-2">Save Template</span>
            </Button>
            <Button onClick={handleBulkSchedule}>
              <Icon name="Calendar" size={16} />
              <span className="ml-2">Schedule All Posts</span>
            </Button>
          </div>
        </div>
      </div>
    </div>);

};

export default BulkSchedulingTools;