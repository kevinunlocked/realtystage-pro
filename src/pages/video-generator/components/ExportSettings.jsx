import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportSettings = ({ onExport, isExporting }) => {
  const [exportSettings, setExportSettings] = useState({
    format: 'mp4',
    quality: 'high',
    resolution: '1920x1080',
    frameRate: '30',
    platforms: ['youtube'],
    includeWatermark: false,
    includeSubtitles: true,
    compressionLevel: 'balanced'
  });

  const formatOptions = [
    { value: 'mp4', label: 'MP4 (Recommended)' },
    { value: 'mov', label: 'MOV (Apple)' },
    { value: 'avi', label: 'AVI (Windows)' },
    { value: 'webm', label: 'WebM (Web)' }
  ];

  const qualityOptions = [
    { value: 'ultra', label: 'Ultra (4K)' },
    { value: 'high', label: 'High (1080p)' },
    { value: 'medium', label: 'Medium (720p)' },
    { value: 'low', label: 'Low (480p)' }
  ];

  const resolutionOptions = [
    { value: '3840x2160', label: '4K Ultra HD (3840x2160)' },
    { value: '1920x1080', label: 'Full HD (1920x1080)' },
    { value: '1280x720', label: 'HD (1280x720)' },
    { value: '854x480', label: 'SD (854x480)' },
    { value: '1080x1920', label: 'Vertical HD (1080x1920)' },
    { value: '720x1280', label: 'Vertical (720x1280)' }
  ];

  const frameRateOptions = [
    { value: '60', label: '60 FPS (Smooth)' },
    { value: '30', label: '30 FPS (Standard)' },
    { value: '24', label: '24 FPS (Cinematic)' }
  ];

  const compressionOptions = [
    { value: 'none', label: 'No Compression (Largest file)' },
    { value: 'light', label: 'Light Compression' },
    { value: 'balanced', label: 'Balanced (Recommended)' },
    { value: 'aggressive', label: 'Aggressive (Smallest file)' }
  ];

  const platformPresets = [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: 'Play',
      description: '1920x1080, 30fps, MP4',
      settings: { resolution: '1920x1080', frameRate: '30', format: 'mp4' }
    },
    {
      id: 'instagram',
      name: 'Instagram Feed',
      icon: 'Instagram',
      description: '1080x1080, 30fps, MP4',
      settings: { resolution: '1080x1080', frameRate: '30', format: 'mp4' }
    },
    {
      id: 'instagram-story',
      name: 'Instagram Story',
      icon: 'Instagram',
      description: '1080x1920, 30fps, MP4',
      settings: { resolution: '1080x1920', frameRate: '30', format: 'mp4' }
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: 'Music',
      description: '1080x1920, 30fps, MP4',
      settings: { resolution: '1080x1920', frameRate: '30', format: 'mp4' }
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      description: '1920x1080, 30fps, MP4',
      settings: { resolution: '1920x1080', frameRate: '30', format: 'mp4' }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      description: '1920x1080, 30fps, MP4',
      settings: { resolution: '1920x1080', frameRate: '30', format: 'mp4' }
    }
  ];

  const handleSettingChange = (key, value) => {
    setExportSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePlatformToggle = (platformId) => {
    setExportSettings(prev => ({
      ...prev,
      platforms: prev?.platforms?.includes(platformId)
        ? prev?.platforms?.filter(p => p !== platformId)
        : [...prev?.platforms, platformId]
    }));
  };

  const applyPlatformPreset = (preset) => {
    setExportSettings(prev => ({
      ...prev,
      ...preset?.settings,
      platforms: [preset?.id]
    }));
  };

  const getEstimatedFileSize = () => {
    const baseSize = exportSettings?.quality === 'ultra' ? 500 :
                    exportSettings?.quality === 'high' ? 200 :
                    exportSettings?.quality === 'medium' ? 100 : 50;
    
    const compressionMultiplier = exportSettings?.compressionLevel === 'none' ? 2 :
                                 exportSettings?.compressionLevel === 'light' ? 1.5 :
                                 exportSettings?.compressionLevel === 'balanced' ? 1 : 0.7;
    
    return Math.round(baseSize * compressionMultiplier);
  };

  const getEstimatedTime = () => {
    const baseTime = exportSettings?.quality === 'ultra' ? 8 :
                    exportSettings?.quality === 'high' ? 5 :
                    exportSettings?.quality === 'medium' ? 3 : 2;
    
    return `${baseTime}-${baseTime + 2} minutes`;
  };

  return (
    <div className="bg-white border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Export Settings</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Configure video output settings and platform optimization
        </p>
      </div>
      <div className="p-4 space-y-6">
        {/* Platform Presets */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Platform Presets</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {platformPresets?.map((preset) => (
              <div
                key={preset?.id}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-smooth ${
                  exportSettings?.platforms?.includes(preset?.id)
                    ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground'
                }`}
                onClick={() => applyPlatformPreset(preset)}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name={preset?.icon} size={16} />
                  <span className="text-sm font-medium text-foreground">{preset?.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{preset?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Custom Settings</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Video Format"
              options={formatOptions}
              value={exportSettings?.format}
              onChange={(value) => handleSettingChange('format', value)}
            />
            
            <Select
              label="Quality Preset"
              options={qualityOptions}
              value={exportSettings?.quality}
              onChange={(value) => handleSettingChange('quality', value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Resolution"
              options={resolutionOptions}
              value={exportSettings?.resolution}
              onChange={(value) => handleSettingChange('resolution', value)}
            />
            
            <Select
              label="Frame Rate"
              options={frameRateOptions}
              value={exportSettings?.frameRate}
              onChange={(value) => handleSettingChange('frameRate', value)}
            />
          </div>

          <Select
            label="Compression Level"
            description="Higher compression reduces file size but may affect quality"
            options={compressionOptions}
            value={exportSettings?.compressionLevel}
            onChange={(value) => handleSettingChange('compressionLevel', value)}
          />
        </div>

        {/* Additional Options */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Additional Options</h4>
          
          <Checkbox
            label="Include RealtyStage watermark"
            description="Add a small watermark to promote your professional tools"
            checked={exportSettings?.includeWatermark}
            onChange={(e) => handleSettingChange('includeWatermark', e?.target?.checked)}
          />
          
          <Checkbox
            label="Generate subtitles automatically"
            description="AI-generated captions for better accessibility"
            checked={exportSettings?.includeSubtitles}
            onChange={(e) => handleSettingChange('includeSubtitles', e?.target?.checked)}
          />
        </div>

        {/* Export Preview */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-3">Export Preview</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Format:</span>
              <span className="ml-2 font-medium text-foreground">
                {exportSettings?.format?.toUpperCase()}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Quality:</span>
              <span className="ml-2 font-medium text-foreground capitalize">
                {exportSettings?.quality}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Resolution:</span>
              <span className="ml-2 font-medium text-foreground">
                {exportSettings?.resolution}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Frame Rate:</span>
              <span className="ml-2 font-medium text-foreground">
                {exportSettings?.frameRate} FPS
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Est. File Size:</span>
              <span className="ml-2 font-medium text-foreground">
                ~{getEstimatedFileSize()} MB
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Est. Time:</span>
              <span className="ml-2 font-medium text-foreground">
                {getEstimatedTime()}
              </span>
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {exportSettings?.platforms?.length > 0 && (
              <span>Optimized for: {exportSettings?.platforms?.join(', ')}</span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Icon name="Save" size={16} />
              <span className="ml-2">Save Preset</span>
            </Button>
            <Button
              onClick={() => onExport(exportSettings)}
              disabled={isExporting}
              loading={isExporting}
            >
              <Icon name="Download" size={16} />
              <span className="ml-2">
                {isExporting ? 'Exporting...' : 'Export Video'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportSettings;