import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AIAssistant from '../../components/ui/AIAssistant';
import UploadProgress from '../../components/ui/UploadProgress';
import NotificationCenter from '../../components/ui/NotificationCenter';

// Component imports
import UploadZone from './components/UploadZone';
import FilterControls from './components/FilterControls';
import FolderNavigation from './components/FolderNavigation';
import AssetGrid from './components/AssetGrid';
import BulkActions from './components/BulkActions';
import AssetPreview from './components/AssetPreview';

const AssetLibrary = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    propertyType: 'all',
    fileFormat: 'all',
    dateRange: 'all',
    tag: 'all'
  });
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [previewAsset, setPreviewAsset] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Mock assets data
  const [assets] = useState([
  {
    id: 1,
    name: 'luxury-kitchen-main.jpg',
    type: 'image',
    size: 2457600,
    property: '123 Oak Street - Luxury Home',
    uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    modifiedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    thumbnail: "https://images.unsplash.com/photo-1722604817803-4c88edef9bc0",
    thumbnailAlt: 'Modern luxury kitchen with white cabinets, marble countertops, and stainless steel appliances',
    url: "https://images.unsplash.com/photo-1722604817803-4c88edef9bc0",
    alt: 'Modern luxury kitchen with white cabinets, marble countertops, and stainless steel appliances',
    tags: ['kitchen', 'luxury', 'modern', 'staged'],
    hasVersions: true,
    versionCount: 2,
    metadata: {
      camera: 'Canon EOS R5',
      lens: '24-70mm f/2.8',
      iso: 400,
      aperture: 'f/5.6',
      shutterSpeed: '1/60s'
    }
  },
  {
    id: 2,
    name: 'living-room-panorama.jpg',
    type: 'image',
    size: 3145728,
    property: '456 Pine Avenue - Modern Condo',
    uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    modifiedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    thumbnail: "https://images.unsplash.com/photo-1726471809232-12d0ace243a1",
    thumbnailAlt: 'Spacious modern living room with floor-to-ceiling windows and contemporary furniture',
    url: "https://images.unsplash.com/photo-1726471809232-12d0ace243a1",
    alt: 'Spacious modern living room with floor-to-ceiling windows and contemporary furniture',
    tags: ['living-room', 'modern', 'panorama', 'natural-light'],
    hasVersions: false,
    versionCount: 1,
    metadata: {
      camera: 'Sony A7R IV',
      lens: '16-35mm f/2.8',
      iso: 200,
      aperture: 'f/8',
      shutterSpeed: '1/125s'
    }
  },
  {
    id: 3,
    name: 'property-tour-video.mp4',
    type: 'video',
    size: 52428800,
    property: '789 Maple Drive - Family Home',
    uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    modifiedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    thumbnail: "https://images.unsplash.com/photo-1616028818795-bd415328672e",
    thumbnailAlt: 'Exterior view of two-story family home with front yard and driveway',
    url: '/assets/videos/property-tour.mp4',
    alt: 'Property tour video showcasing interior and exterior of family home',
    tags: ['video', 'tour', 'family-home', 'exterior'],
    hasVersions: true,
    versionCount: 3,
    metadata: {
      duration: '2:45',
      resolution: '4K',
      frameRate: '30fps',
      codec: 'H.264'
    }
  },
  {
    id: 4,
    name: 'master-bedroom-staged.jpg',
    type: 'image',
    size: 1843200,
    property: '321 Cedar Lane - Executive Home',
    uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    modifiedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    thumbnail: "https://images.unsplash.com/photo-1733431770399-1c90263e81e4",
    thumbnailAlt: 'Elegant master bedroom with king bed, neutral decor, and large windows',
    url: "https://images.unsplash.com/photo-1733431770399-1c90263e81e4",
    alt: 'Elegant master bedroom with king bed, neutral decor, and large windows',
    tags: ['bedroom', 'master', 'staged', 'elegant'],
    hasVersions: false,
    versionCount: 1,
    metadata: {
      camera: 'Nikon D850',
      lens: '24-120mm f/4',
      iso: 320,
      aperture: 'f/5.6',
      shutterSpeed: '1/80s'
    }
  },
  {
    id: 5,
    name: 'bathroom-luxury-spa.jpg',
    type: 'image',
    size: 2097152,
    property: '654 Birch Street - Luxury Villa',
    uploadDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    modifiedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    thumbnail: "https://images.unsplash.com/photo-1651065207820-0ffcdf46c6c6",
    thumbnailAlt: 'Luxury spa bathroom with marble surfaces, freestanding tub, and modern fixtures',
    url: "https://images.unsplash.com/photo-1651065207820-0ffcdf46c6c6",
    alt: 'Luxury spa bathroom with marble surfaces, freestanding tub, and modern fixtures',
    tags: ['bathroom', 'luxury', 'spa', 'marble'],
    hasVersions: true,
    versionCount: 2,
    metadata: {
      camera: 'Canon EOS 5D Mark IV',
      lens: '16-35mm f/2.8',
      iso: 800,
      aperture: 'f/4',
      shutterSpeed: '1/60s'
    }
  },
  {
    id: 6,
    name: 'property-floorplan.pdf',
    type: 'document',
    size: 524288,
    property: '987 Elm Court - Commercial Space',
    uploadDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    modifiedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    thumbnail: '/assets/images/document-icon.png',
    thumbnailAlt: 'PDF document icon representing property floorplan',
    url: '/assets/documents/floorplan.pdf',
    alt: 'Detailed architectural floorplan for commercial property space',
    tags: ['floorplan', 'commercial', 'document', 'architecture'],
    hasVersions: false,
    versionCount: 1,
    metadata: {
      pages: 3,
      format: 'PDF',
      size: 'A3',
      created: 'AutoCAD 2024'
    }
  }]
  );

  const filteredAssets = assets?.filter((asset) => {
    // Search filter
    if (searchQuery && !asset?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
    !asset?.property?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
    !asset?.tags?.some((tag) => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))) {
      return false;
    }

    // Property type filter
    if (selectedFilters?.propertyType !== 'all') {
      const propertyLower = asset?.property?.toLowerCase();
      if (selectedFilters?.propertyType === 'luxury' && !propertyLower?.includes('luxury')) return false;
      if (selectedFilters?.propertyType === 'commercial' && !propertyLower?.includes('commercial')) return false;
      if (selectedFilters?.propertyType === 'condo' && !propertyLower?.includes('condo')) return false;
    }

    // File format filter
    if (selectedFilters?.fileFormat !== 'all') {
      if (selectedFilters?.fileFormat === 'image' && asset?.type !== 'image') return false;
      if (selectedFilters?.fileFormat === 'video' && asset?.type !== 'video') return false;
      if (selectedFilters?.fileFormat === 'document' && asset?.type !== 'document') return false;
    }

    // Tag filter
    if (selectedFilters?.tag !== 'all') {
      if (!asset?.tags?.includes(selectedFilters?.tag)) return false;
    }

    // Date range filter
    if (selectedFilters?.dateRange !== 'all') {
      const now = new Date();
      const assetDate = new Date(asset.uploadDate);
      const daysDiff = Math.floor((now - assetDate) / (1000 * 60 * 60 * 24));

      if (selectedFilters?.dateRange === 'today' && daysDiff > 0) return false;
      if (selectedFilters?.dateRange === 'week' && daysDiff > 7) return false;
      if (selectedFilters?.dateRange === 'month' && daysDiff > 30) return false;
      if (selectedFilters?.dateRange === 'quarter' && daysDiff > 90) return false;
    }

    return true;
  });

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      propertyType: 'all',
      fileFormat: 'all',
      dateRange: 'all',
      tag: 'all'
    });
    setSearchQuery('');
  };

  const handleFilesUploaded = (files) => {
    console.log('Files uploaded:', files);
    // Handle file upload logic here
  };

  const handleAssetAction = (action, assetId) => {
    const asset = assets?.find((a) => a?.id === assetId);

    switch (action) {
      case 'preview':
        setPreviewAsset(asset);
        setShowPreview(true);
        break;
      case 'download':
        console.log('Downloading asset:', assetId);
        break;
      case 'share':console.log('Sharing asset:', assetId);
        break;
      case 'edit':console.log('Editing asset:', assetId);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleBulkAction = (action, data) => {
    console.log('Bulk action:', action, 'Data:', data, 'Selected:', selectedAssets);

    switch (action) {
      case 'download':
        console.log('Bulk downloading assets');
        break;
      case 'addTag':console.log('Adding tag to selected assets:', data);
        break;
      case 'move':console.log('Moving assets to folder:', data);
        break;
      case 'share':console.log('Sharing selected assets');
        break;
      case 'delete':
        console.log('Deleting selected assets');
        break;
      default:
        console.log('Unknown bulk action:', action);
    }
  };

  const handleCreateFolder = (folderName) => {
    console.log('Creating folder:', folderName);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`pt-16 transition-layout ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Asset Library</h1>
              <p className="text-muted-foreground">
                Manage and organize your property photos, videos, and documents
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 bg-white border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}>

                  <Icon name="Grid3X3" size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}>

                  <Icon name="List" size={16} />
                </Button>
              </div>
              
              <NotificationCenter />
              
              <Link to="/ai-staging-studio">
                <Button>
                  <Icon name="Wand2" size={16} />
                  <span className="ml-2">AI Stage</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Upload Zone */}
          <UploadZone onFilesUploaded={handleFilesUploaded} />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <FolderNavigation
                selectedFolder={selectedFolder}
                onFolderSelect={setSelectedFolder}
                onCreateFolder={handleCreateFolder} />

            </div>

            {/* Assets Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filters */}
              <FilterControls
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters} />


              {/* Results Header */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredAssets?.length} assets found
                  {selectedAssets?.length > 0 && ` • ${selectedAssets?.length} selected`}
                </p>
                
                {filteredAssets?.length > 0 &&
                <div className="flex items-center space-x-2">
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (selectedAssets?.length === filteredAssets?.length) {
                        setSelectedAssets([]);
                      } else {
                        setSelectedAssets(filteredAssets?.map((asset) => asset?.id));
                      }
                    }}>

                      {selectedAssets?.length === filteredAssets?.length ? 'Deselect All' : 'Select All'}
                    </Button>
                  </div>
                }
              </div>

              {/* Assets Grid/List */}
              {filteredAssets?.length > 0 ?
              <AssetGrid
                assets={filteredAssets}
                selectedAssets={selectedAssets}
                onAssetSelect={setSelectedAssets}
                onAssetAction={handleAssetAction}
                viewMode={viewMode} /> :


              <div className="text-center py-12 bg-white border border-border rounded-lg">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No assets found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or upload new assets
                  </p>
                  <Button onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              }
            </div>
          </div>
        </div>
      </main>
      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedAssets?.length}
        onBulkAction={handleBulkAction}
        onClearSelection={() => setSelectedAssets([])} />

      {/* Asset Preview Modal */}
      <AssetPreview
        asset={previewAsset}
        isOpen={showPreview}
        onClose={() => {
          setShowPreview(false);
          setPreviewAsset(null);
        }}
        onAction={handleAssetAction} />

      {/* Global Components */}
      <AIAssistant />
      <UploadProgress />
    </div>);

};

export default AssetLibrary;