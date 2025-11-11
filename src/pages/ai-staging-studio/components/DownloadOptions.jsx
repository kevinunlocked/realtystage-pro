import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DownloadOptions = ({ isOpen, onClose, stagedImage, originalImage }) => {
  const [selectedFormats, setSelectedFormats] = useState(['jpg']);
  const [selectedResolutions, setSelectedResolutions] = useState(['original']);
  const [includeWatermark, setIncludeWatermark] = useState(false);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [downloadType, setDownloadType] = useState('staged');

  const formatOptions = [
    { value: 'jpg', label: 'JPEG (.jpg)', description: 'Best for photos, smaller file size' },
    { value: 'png', label: 'PNG (.png)', description: 'Lossless quality, larger file size' },
    { value: 'webp', label: 'WebP (.webp)', description: 'Modern format, great compression' },
    { value: 'pdf', label: 'PDF (.pdf)', description: 'Document format for presentations' }
  ];

  const resolutionOptions = [
    { value: 'original', label: 'Original Resolution', description: '1920x1080' },
    { value: '4k', label: '4K Ultra HD', description: '3840x2160' },
    { value: '2k', label: '2K HD', description: '2560x1440' },
    { value: '1080p', label: 'Full HD', description: '1920x1080' },
    { value: '720p', label: 'HD', description: '1280x720' },
    { value: 'social', label: 'Social Media', description: '1080x1080' }
  ];

  const downloadTypeOptions = [
    { value: 'staged', label: 'Staged Image Only' },
    { value: 'original', label: 'Original Image Only' },
    { value: 'comparison', label: 'Before/After Comparison' },
    { value: 'both', label: 'Both Images Separately' }
  ];

  const handleFormatToggle = (format) => {
    setSelectedFormats(prev => 
      prev?.includes(format) 
        ? prev?.filter(f => f !== format)
        : [...prev, format]
    );
  };

  const handleResolutionToggle = (resolution) => {
    setSelectedResolutions(prev => 
      prev?.includes(resolution) 
        ? prev?.filter(r => r !== resolution)
        : [...prev, resolution]
    );
  };

  const calculateFileSize = (format, resolution) => {
    const baseSizes = {
      'jpg': { 'original': '2.4 MB', '4k': '8.1 MB', '2k': '4.2 MB', '1080p': '2.4 MB', '720p': '1.1 MB', 'social': '1.8 MB' },
      'png': { 'original': '4.8 MB', '4k': '16.2 MB', '2k': '8.4 MB', '1080p': '4.8 MB', '720p': '2.2 MB', 'social': '3.6 MB' },
      'webp': { 'original': '1.9 MB', '4k': '6.5 MB', '2k': '3.4 MB', '1080p': '1.9 MB', '720p': '0.9 MB', 'social': '1.4 MB' },
      'pdf': { 'original': '3.2 MB', '4k': '10.8 MB', '2k': '5.6 MB', '1080p': '3.2 MB', '720p': '1.5 MB', 'social': '2.4 MB' }
    };
    return baseSizes?.[format]?.[resolution] || '2.4 MB';
  };

  const getTotalFiles = () => {
    return selectedFormats?.length * selectedResolutions?.length * 
           (downloadType === 'both' ? 2 : downloadType === 'comparison' ? 1 : 1);
  };

  const handleDownload = () => {
    // Simulate download process
    console.log('Downloading with options:', {
      formats: selectedFormats,
      resolutions: selectedResolutions,
      type: downloadType,
      watermark: includeWatermark,
      metadata: includeMetadata
    });
    
    // Close modal after download starts
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-elevation-2 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Download" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Download Options</h2>
              <p className="text-sm text-muted-foreground">Choose formats and settings for your staged images</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Download Type */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">What to Download</h3>
            <Select
              options={downloadTypeOptions}
              value={downloadType}
              onChange={setDownloadType}
              placeholder="Select download type"
            />
          </div>

          {/* Format Selection */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">File Formats</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formatOptions?.map((format) => (
                <div
                  key={format?.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-smooth ${
                    selectedFormats?.includes(format?.value)
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleFormatToggle(format?.value)}
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={selectedFormats?.includes(format?.value)}
                      onChange={() => handleFormatToggle(format?.value)}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{format?.label}</p>
                      <p className="text-sm text-muted-foreground">{format?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resolution Selection */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Resolutions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {resolutionOptions?.map((resolution) => (
                <div
                  key={resolution?.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-smooth ${
                    selectedResolutions?.includes(resolution?.value)
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleResolutionToggle(resolution?.value)}
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={selectedResolutions?.includes(resolution?.value)}
                      onChange={() => handleResolutionToggle(resolution?.value)}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{resolution?.label}</p>
                      <p className="text-sm text-muted-foreground">{resolution?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Additional Options</h3>
            <div className="space-y-3">
              <Checkbox
                label="Include RealtyStage watermark"
                description="Add a small watermark to identify AI-staged images"
                checked={includeWatermark}
                onChange={(e) => setIncludeWatermark(e?.target?.checked)}
              />
              <Checkbox
                label="Include metadata"
                description="Embed staging information and settings in file properties"
                checked={includeMetadata}
                onChange={(e) => setIncludeMetadata(e?.target?.checked)}
              />
            </div>
          </div>

          {/* Download Preview */}
          <div className="p-4 bg-muted/30 rounded-lg space-y-3">
            <h4 className="font-medium text-foreground">Download Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total Files:</span>
                <span className="ml-2 font-medium text-foreground">{getTotalFiles()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Formats:</span>
                <span className="ml-2 font-medium text-foreground">
                  {selectedFormats?.join(', ')?.toUpperCase()}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Resolutions:</span>
                <span className="ml-2 font-medium text-foreground">{selectedResolutions?.length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Est. Size:</span>
                <span className="ml-2 font-medium text-foreground">
                  {selectedFormats?.length > 0 && selectedResolutions?.length > 0
                    ? calculateFileSize(selectedFormats?.[0], selectedResolutions?.[0])
                    : '0 MB'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedFormats?.length === 0 || selectedResolutions?.length === 0
                ? 'Please select at least one format and resolution'
                : `Ready to download ${getTotalFiles()} file${getTotalFiles() > 1 ? 's' : ''}`
              }
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleDownload}
                disabled={selectedFormats?.length === 0 || selectedResolutions?.length === 0}
              >
                <Icon name="Download" size={16} />
                <span className="ml-2">Download Files</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadOptions;