import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const AssetSelector = ({ selectedAssets, onAssetSelect, onAssetRemove }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [draggedAsset, setDraggedAsset] = useState(null);

  const mockAssets = [
  {
    id: 1,
    name: 'exterior-front.jpg',
    url: "https://images.unsplash.com/photo-1662543469405-276fd25d6995",
    alt: 'Modern luxury home exterior with large windows and contemporary architecture',
    type: 'image',
    category: 'exterior',
    size: '2.4 MB',
    dimensions: '1920x1080',
    uploadDate: '2025-11-08'
  },
  {
    id: 2,
    name: 'living-room-staged.jpg',
    url: "https://images.unsplash.com/photo-1704040686428-7534b262d0d8",
    alt: 'Spacious living room with modern furniture and floor-to-ceiling windows',
    type: 'image',
    category: 'interior',
    size: '3.1 MB',
    dimensions: '1920x1080',
    uploadDate: '2025-11-08'
  },
  {
    id: 3,
    name: 'kitchen-modern.jpg',
    url: "https://images.unsplash.com/photo-1722604817803-4c88edef9bc0",
    alt: 'Gourmet kitchen with white cabinets, marble countertops and stainless steel appliances',
    type: 'image',
    category: 'interior',
    size: '2.8 MB',
    dimensions: '1920x1080',
    uploadDate: '2025-11-07'
  },
  {
    id: 4,
    name: 'master-bedroom.jpg',
    url: "https://images.unsplash.com/photo-1733431770399-1c90263e81e4",
    alt: 'Elegant master bedroom with king bed, neutral colors and large windows',
    type: 'image',
    category: 'interior',
    size: '2.2 MB',
    dimensions: '1920x1080',
    uploadDate: '2025-11-07'
  },
  {
    id: 5,
    name: 'bathroom-luxury.jpg',
    url: "https://images.unsplash.com/photo-1700074817197-9e3c5e1b8c32",
    alt: 'Luxury bathroom with marble tiles, freestanding tub and modern fixtures',
    type: 'image',
    category: 'interior',
    size: '2.6 MB',
    dimensions: '1920x1080',
    uploadDate: '2025-11-06'
  },
  {
    id: 6,
    name: 'backyard-pool.jpg',
    url: "https://images.unsplash.com/photo-1602774895672-b553538bceb9",
    alt: 'Beautiful backyard with swimming pool, patio furniture and landscaping',
    type: 'image',
    category: 'exterior',
    size: '3.5 MB',
    dimensions: '1920x1080',
    uploadDate: '2025-11-06'
  },
  {
    id: 7,
    name: 'dining-room.jpg',
    url: "https://images.unsplash.com/photo-1432300286723-188fc351affa",
    alt: 'Formal dining room with wooden table, elegant chairs and chandelier',
    type: 'image',
    category: 'interior',
    size: '2.1 MB',
    dimensions: '1920x1080',
    uploadDate: '2025-11-05'
  },
  {
    id: 8,
    name: 'home-office.jpg',
    url: "https://images.unsplash.com/photo-1603533842514-20a43accb5ec",
    alt: 'Modern home office with desk, ergonomic chair and built-in shelving',
    type: 'image',
    category: 'interior',
    size: '1.9 MB',
    dimensions: '1920x1080',
    uploadDate: '2025-11-05'
  }];


  const categories = [
  { value: 'all', label: 'All Assets' },
  { value: 'exterior', label: 'Exterior' },
  { value: 'interior', label: 'Interior' },
  { value: 'amenities', label: 'Amenities' }];


  const filteredAssets = mockAssets?.filter((asset) => {
    const matchesSearch = asset?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || asset?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragStart = (e, asset) => {
    setDraggedAsset(asset);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setDraggedAsset(null);
  };

  const isAssetSelected = (assetId) => {
    return selectedAssets?.some((asset) => asset?.id === assetId);
  };

  return (
    <div className="bg-white border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Asset Library</h3>
          <Button variant="outline" size="sm">
            <Icon name="Upload" size={16} />
            <span className="ml-2">Upload</span>
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)} />

          </div>
          <div className="flex items-center space-x-2">
            {categories?.map((category) =>
            <Button
              key={category?.value}
              variant={selectedCategory === category?.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category?.value)}>

                {category?.label}
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Asset Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
          {filteredAssets?.map((asset) =>
          <div
            key={asset?.id}
            className={`group relative border-2 rounded-lg overflow-hidden cursor-pointer transition-smooth ${
            isAssetSelected(asset?.id) ?
            'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'}`
            }
            draggable
            onDragStart={(e) => handleDragStart(e, asset)}
            onDragEnd={handleDragEnd}
            onClick={() => onAssetSelect(asset)}>

              {/* Asset Preview */}
              <div className="aspect-video bg-muted">
                <Image
                src={asset?.url}
                alt={asset?.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />

              </div>

              {/* Asset Info */}
              <div className="p-2">
                <h4 className="text-xs font-medium text-foreground truncate">
                  {asset?.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {asset?.dimensions} • {asset?.size}
                </p>
              </div>

              {/* Selection Indicator */}
              {isAssetSelected(asset?.id) &&
            <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} />
                  </div>
                </div>
            }

              {/* Drag Indicator */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-smooth">
                <div className="w-6 h-6 bg-black/60 text-white rounded flex items-center justify-center">
                  <Icon name="Move" size={12} />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center space-x-2">
                <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e?.stopPropagation();
                  onAssetSelect(asset);
                }}>

                  <Icon name="Plus" size={16} />
                </Button>
                <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e?.stopPropagation();
                  // Preview functionality
                }}>

                  <Icon name="Eye" size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>

        {filteredAssets?.length === 0 &&
        <div className="text-center py-12">
            <Icon name="Image" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No assets found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or upload new assets
            </p>
            <Button>
              <Icon name="Upload" size={16} />
              <span className="ml-2">Upload Assets</span>
            </Button>
          </div>
        }
      </div>
      {/* Selected Assets Summary */}
      {selectedAssets?.length > 0 &&
      <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {selectedAssets?.length} asset{selectedAssets?.length !== 1 ? 's' : ''} selected
            </span>
            <Button
            variant="ghost"
            size="sm"
            onClick={() => selectedAssets?.forEach((asset) => onAssetRemove(asset?.id))}>

              Clear All
            </Button>
          </div>
        </div>
      }
    </div>);

};

export default AssetSelector;