import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AIAssistant from '../../components/ui/AIAssistant';
import UploadProgress from '../../components/ui/UploadProgress';
import NotificationCenter from '../../components/ui/NotificationCenter';

// Import page components
import ImageUploadZone from './components/ImageUploadZone';
import StyleSelectionPanel from './components/StyleSelectionPanel';
import ImagePreviewArea from './components/ImagePreviewArea';
import GenerationControls from './components/GenerationControls';
import ProcessingStatus from './components/ProcessingStatus';
import DownloadOptions from './components/DownloadOptions';

const AIStagingStudio = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [stagedImage, setStagedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showProcessingStatus, setShowProcessingStatus] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePanel, setActivePanel] = useState('upload'); // 'upload', 'styles', 'controls'

  const [parameters, setParameters] = useState({
    intensity: 70,
    density: 60,
    colorScheme: 'neutral',
    roomType: 'living-room',
    quality: 'standard',
    resolution: '1920x1080',
    styleStrength: 70,
    aspectRatio: 'original',
    seedType: 'random',
    creativity: 50,
    detailLevel: 60,
    lighting: 40
  });

  const handleParameterChange = (key, value) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setStagedImage(null); // Reset staged image when new image is selected
    setActivePanel('styles'); // Move to style selection
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    setActivePanel('controls'); // Move to generation controls
  };

  const handleGenerate = async () => {
    if (!selectedImage || !selectedStyle) return;

    setIsGenerating(true);
    setShowProcessingStatus(true);

    // Simulate AI generation process
    setTimeout(() => {
      const mockStagedImage = {
        id: Date.now(),
        name: `${selectedImage?.name}_staged_${selectedStyle?.id}`,
        preview: selectedImage?.preview, // In real app, this would be the AI-generated image
        alt: `AI staged version of ${selectedImage?.alt || selectedImage?.name} using ${selectedStyle?.name} style`,
        style: selectedStyle?.name,
        parameters: { ...parameters }
      };
      
      setStagedImage(mockStagedImage);
      setIsGenerating(false);
      setShowProcessingStatus(false);
    }, 5000);
  };

  const handleDownload = () => {
    if (stagedImage) {
      setShowDownloadOptions(true);
    }
  };

  // Mock processing queue for demonstration
  const processingQueue = [
    {
      id: 1,
      name: 'living-room-01.jpg',
      style: 'Modern',
      status: 'processing'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`transition-layout ${sidebarCollapsed ? 'ml-16' : 'ml-64'} pt-16`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">AI Staging Studio</h1>
                <p className="text-muted-foreground">
                  Transform empty property photos into professionally staged images using advanced AI technology
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <NotificationCenter />
                <Button variant="outline" asChild>
                  <Link to="/asset-library">
                    <Icon name="FolderOpen" size={16} />
                    <span className="ml-2">Asset Library</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/video-generator">
                    <Icon name="Video" size={16} />
                    <span className="ml-2">Create Video</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mt-4 flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${selectedImage ? 'text-success' : 'text-muted-foreground'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  selectedImage ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {selectedImage ? <Icon name="Check" size={12} /> : '1'}
                </div>
                <span className="text-sm font-medium">Upload Image</span>
              </div>
              <div className="w-8 h-px bg-border"></div>
              <div className={`flex items-center space-x-2 ${selectedStyle ? 'text-success' : selectedImage ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  selectedStyle ? 'bg-success text-success-foreground' : 
                  selectedImage ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {selectedStyle ? <Icon name="Check" size={12} /> : '2'}
                </div>
                <span className="text-sm font-medium">Choose Style</span>
              </div>
              <div className="w-8 h-px bg-border"></div>
              <div className={`flex items-center space-x-2 ${stagedImage ? 'text-success' : selectedStyle ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  stagedImage ? 'bg-success text-success-foreground' : 
                  selectedStyle ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {stagedImage ? <Icon name="Check" size={12} /> : '3'}
                </div>
                <span className="text-sm font-medium">Generate & Download</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            {/* Left Panel - Controls */}
            <div className="lg:col-span-1 space-y-4 overflow-y-auto">
              {/* Panel Navigation */}
              <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 mb-4">
                <Button
                  variant={activePanel === 'upload' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActivePanel('upload')}
                  className="flex-1 lg:flex-none justify-start"
                >
                  <Icon name="Upload" size={16} />
                  <span className="ml-2">Upload</span>
                </Button>
                <Button
                  variant={activePanel === 'styles' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActivePanel('styles')}
                  disabled={!selectedImage}
                  className="flex-1 lg:flex-none justify-start"
                >
                  <Icon name="Palette" size={16} />
                  <span className="ml-2">Styles</span>
                </Button>
                <Button
                  variant={activePanel === 'controls' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActivePanel('controls')}
                  disabled={!selectedStyle}
                  className="flex-1 lg:flex-none justify-start"
                >
                  <Icon name="Settings" size={16} />
                  <span className="ml-2">Generate</span>
                </Button>
              </div>

              {/* Panel Content */}
              {activePanel === 'upload' && (
                <ImageUploadZone
                  onImageSelect={handleImageSelect}
                  selectedImage={selectedImage}
                />
              )}

              {activePanel === 'styles' && selectedImage && (
                <StyleSelectionPanel
                  selectedStyle={selectedStyle}
                  onStyleSelect={handleStyleSelect}
                  onParameterChange={handleParameterChange}
                  parameters={parameters}
                />
              )}

              {activePanel === 'controls' && selectedStyle && (
                <GenerationControls
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                  selectedStyle={selectedStyle}
                  parameters={parameters}
                  onParameterChange={handleParameterChange}
                />
              )}
            </div>

            {/* Center Panel - Image Preview */}
            <div className="lg:col-span-3">
              <ImagePreviewArea
                selectedImage={selectedImage}
                stagedImage={stagedImage}
                isGenerating={isGenerating}
                onGenerate={handleGenerate}
              />
            </div>
          </div>

          {/* Quick Actions Bar */}
          {stagedImage && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-border rounded-lg shadow-elevation-2 p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span>Staging complete!</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleGenerate}>
                    <Icon name="RefreshCw" size={16} />
                    <span className="ml-2">Regenerate</span>
                  </Button>
                  <Button size="sm" onClick={handleDownload}>
                    <Icon name="Download" size={16} />
                    <span className="ml-2">Download</span>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/video-generator">
                      <Icon name="Video" size={16} />
                      <span className="ml-2">Create Video</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Modals and Overlays */}
      <ProcessingStatus
        isVisible={showProcessingStatus}
        onClose={() => setShowProcessingStatus(false)}
        currentJob={{
          style: selectedStyle?.name,
          quality: parameters?.quality
        }}
        processingQueue={processingQueue}
      />
      <DownloadOptions
        isOpen={showDownloadOptions}
        onClose={() => setShowDownloadOptions(false)}
        stagedImage={stagedImage}
        originalImage={selectedImage}
      />
      <AIAssistant />
      <UploadProgress />
    </div>
  );
};

export default AIStagingStudio;