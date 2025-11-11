import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import Image from '../AppImage';

const BrandAssetSelector = ({ isOpen, onClose, onSelect }) => {
  const [activeTab, setActiveTab] = useState('logos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const brandAssets = {
    logos: [
      {
        id: 1,
        name: 'Primary Logo - Dark',
        url: '/assets/brand/logo-dark.svg',
        category: 'primary',
        size: '2048x512px'
      },
      {
        id: 2,
        name: 'Primary Logo - Light',
        url: '/assets/brand/logo-light.svg',
        category: 'primary',
        size: '2048x512px'
      },
      {
        id: 3,
        name: 'Icon Only - Dark',
        url: '/assets/brand/icon-dark.svg',
        category: 'icon',
        size: '512x512px'
      },
      {
        id: 4,
        name: 'Icon Only - Light',
        url: '/assets/brand/icon-light.svg',
        category: 'icon',
        size: '512x512px'
      }
    ],
    templates: [
      {
        id: 5,
        name: 'Property Listing Template',
        url: '/assets/templates/property-listing.jpg',
        category: 'social',
        size: '1080x1080px'
      },
      {
        id: 6,
        name: 'Open House Announcement',
        url: '/assets/templates/open-house.jpg',
        category: 'social',
        size: '1080x1350px'
      },
      {
        id: 7,
        name: 'Just Listed Story',
        url: '/assets/templates/just-listed-story.jpg',
        category: 'story',
        size: '1080x1920px'
      },
      {
        id: 8,
        name: 'Market Update Template',
        url: '/assets/templates/market-update.jpg',
        category: 'business',
        size: '1200x630px'
      }
    ],
    colors: [
      {
        id: 9,
        name: 'Primary Blue',
        value: '#2563EB',
        category: 'primary',
        usage: 'Main brand color'
      },
      {
        id: 10,
        name: 'Secondary Slate',
        value: '#64748B',
        category: 'secondary',
        usage: 'Supporting text and UI'
      },
      {
        id: 11,
        name: 'Accent Sky',
        value: '#0EA5E9',
        category: 'accent',
        usage: 'Interactive elements'
      },
      {
        id: 12,
        name: 'Success Green',
        value: '#059669',
        category: 'status',
        usage: 'Success states'
      }
    ]
  };

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'primary', label: 'Primary' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'icon', label: 'Icons' },
    { value: 'social', label: 'Social Media' },
    { value: 'story', label: 'Stories' },
    { value: 'business', label: 'Business' },
    { value: 'accent', label: 'Accent' },
    { value: 'status', label: 'Status' }
  ];

  const tabs = [
    { id: 'logos', label: 'Logos', icon: 'Image' },
    { id: 'templates', label: 'Templates', icon: 'Layout' },
    { id: 'colors', label: 'Colors', icon: 'Palette' }
  ];

  const filteredAssets = brandAssets?.[activeTab]?.filter(asset => {
    const matchesSearch = asset?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || asset?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const handleAssetSelect = (asset) => {
    onSelect?.(asset);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-elevation-2 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Palette" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Brand Asset Library</h2>
              <p className="text-sm text-muted-foreground">Select logos, templates, and brand colors</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-smooth ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full"
              />
            </div>
            <div className="w-48">
              <Select
                options={categoryOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Filter by category"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'colors' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredAssets?.map((color) => (
                <div
                  key={color?.id}
                  onClick={() => handleAssetSelect(color)}
                  className="p-4 border border-border rounded-lg cursor-pointer hover:shadow-elevation-1 transition-smooth"
                >
                  <div
                    className="w-full h-16 rounded-md mb-3 border border-border"
                    style={{ backgroundColor: color?.value }}
                  />
                  <h3 className="font-medium text-foreground text-sm">{color?.name}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{color?.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{color?.usage}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAssets?.map((asset) => (
                <div
                  key={asset?.id}
                  onClick={() => handleAssetSelect(asset)}
                  className="group border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-elevation-1 transition-smooth"
                >
                  <div className="aspect-square bg-muted flex items-center justify-center p-4">
                    <Image
                      src={asset?.url}
                      alt={asset?.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-smooth"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-foreground text-sm truncate">{asset?.name}</h3>
                    <p className="text-xs text-muted-foreground">{asset?.size}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      {asset?.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredAssets?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No assets found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredAssets?.length} {activeTab} available
            </p>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button>
                <Icon name="Upload" size={16} />
                <span className="ml-2">Upload New Asset</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandAssetSelector;