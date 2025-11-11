import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const AssetGrid = ({ 
  assets, 
  selectedAssets, 
  onAssetSelect, 
  onAssetAction,
  viewMode = 'grid' 
}) => {
  const [hoveredAsset, setHoveredAsset] = useState(null);

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return 'Image';
      case 'video':
        return 'Video';
      case 'document':
        return 'FileText';
      default:
        return 'File';
    }
  };

  const getFileTypeColor = (type) => {
    switch (type) {
      case 'image':
        return 'text-accent';
      case 'video':
        return 'text-warning';
      case 'document':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-border rounded-lg shadow-elevation-1">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-foreground">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    onChange={(e) => {
                      if (e?.target?.checked) {
                        onAssetSelect(assets?.map(asset => asset?.id));
                      } else {
                        onAssetSelect([]);
                      }
                    }}
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Name</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Type</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Size</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Modified</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Tags</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets?.map((asset) => (
                <tr key={asset?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="rounded border-border"
                      checked={selectedAssets?.includes(asset?.id)}
                      onChange={(e) => {
                        if (e?.target?.checked) {
                          onAssetSelect([...selectedAssets, asset?.id]);
                        } else {
                          onAssetSelect(selectedAssets?.filter(id => id !== asset?.id));
                        }
                      }}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
                        {asset?.type === 'image' ? (
                          <Image
                            src={asset?.thumbnail}
                            alt={asset?.thumbnailAlt}
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <Icon name={getFileIcon(asset?.type)} size={16} className={getFileTypeColor(asset?.type)} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{asset?.name}</p>
                        <p className="text-xs text-muted-foreground">{asset?.property}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground capitalize">{asset?.type}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{formatFileSize(asset?.size)}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{formatDate(asset?.uploadDate)}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {asset?.tags?.slice(0, 2)?.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      {asset?.tags?.length > 2 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                          +{asset?.tags?.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => onAssetAction('download', asset?.id)}>
                        <Icon name="Download" size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onAssetAction('share', asset?.id)}>
                        <Icon name="Share2" size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onAssetAction('edit', asset?.id)}>
                        <Icon name="Edit" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {assets?.map((asset) => (
        <div
          key={asset?.id}
          className="group bg-white border border-border rounded-lg overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-smooth cursor-pointer"
          onMouseEnter={() => setHoveredAsset(asset?.id)}
          onMouseLeave={() => setHoveredAsset(null)}
        >
          {/* Thumbnail */}
          <div className="aspect-square bg-muted relative">
            {asset?.type === 'image' ? (
              <Image
                src={asset?.thumbnail}
                alt={asset?.thumbnailAlt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon name={getFileIcon(asset?.type)} size={32} className={getFileTypeColor(asset?.type)} />
              </div>
            )}

            {/* Selection Checkbox */}
            <div className="absolute top-2 left-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-border bg-white/80 backdrop-blur-sm"
                checked={selectedAssets?.includes(asset?.id)}
                onChange={(e) => {
                  if (e?.target?.checked) {
                    onAssetSelect([...selectedAssets, asset?.id]);
                  } else {
                    onAssetSelect(selectedAssets?.filter(id => id !== asset?.id));
                  }
                }}
              />
            </div>

            {/* Quick Actions */}
            {hoveredAsset === asset?.id && (
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAssetAction('download', asset?.id)}
                  className="w-8 h-8 bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <Icon name="Download" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAssetAction('share', asset?.id)}
                  className="w-8 h-8 bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <Icon name="Share2" size={14} />
                </Button>
              </div>
            )}

            {/* File Type Badge */}
            <div className="absolute bottom-2 left-2">
              <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-full backdrop-blur-sm">
                {asset?.type?.toUpperCase()}
              </span>
            </div>

            {/* Version Indicator */}
            {asset?.hasVersions && (
              <div className="absolute bottom-2 right-2">
                <span className="w-6 h-6 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {asset?.versionCount}
                </span>
              </div>
            )}
          </div>

          {/* Asset Info */}
          <div className="p-3">
            <h4 className="text-sm font-medium text-foreground truncate mb-1">{asset?.name}</h4>
            <p className="text-xs text-muted-foreground truncate mb-2">{asset?.property}</p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>{formatFileSize(asset?.size)}</span>
              <span>{formatDate(asset?.uploadDate)}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {asset?.tags?.slice(0, 2)?.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  {tag}
                </span>
              ))}
              {asset?.tags?.length > 2 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  +{asset?.tags?.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssetGrid;