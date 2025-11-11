import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AIAssistant from '../../components/ui/AIAssistant';
import UploadProgress from '../../components/ui/UploadProgress';
import NotificationCenter from '../../components/ui/NotificationCenter';
import BrandAssetSelector from '../../components/ui/BrandAssetSelector';

// Import page components
import VideoPreview from './components/VideoPreview';
import AssetSelector from './components/AssetSelector';
import TemplateLibrary from './components/TemplateLibrary';
import ContentCustomization from './components/ContentCustomization';
import ExportSettings from './components/ExportSettings';
import ProcessingQueue from './components/ProcessingQueue';

const VideoGenerator = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showExportSettings, setShowExportSettings] = useState(false);
  const [showProcessingQueue, setShowProcessingQueue] = useState(false);
  const [showBrandAssets, setShowBrandAssets] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState('template');

  const workspaceSteps = [
  { id: 'template', label: 'Choose Template', icon: 'Layout', completed: !!selectedTemplate },
  { id: 'assets', label: 'Select Assets', icon: 'Image', completed: selectedAssets?.length > 0 },
  { id: 'customize', label: 'Customize Content', icon: 'Edit3', completed: false },
  { id: 'preview', label: 'Preview & Export', icon: 'Play', completed: false }];


  const handleAssetSelect = (asset) => {
    if (!selectedAssets?.find((a) => a?.id === asset?.id)) {
      setSelectedAssets((prev) => [...prev, asset]);
    }
  };

  const handleAssetRemove = (assetId) => {
    setSelectedAssets((prev) => prev?.filter((a) => a?.id !== assetId));
  };

  const handleGenerateVideo = () => {
    setIsGenerating(true);
    // Simulate video generation
    setTimeout(() => {
      setIsGenerating(false);
      setActiveWorkspace('preview');
    }, 3000);
  };

  const handleExport = (settings) => {
    setShowExportSettings(false);
    setShowProcessingQueue(true);
    // Export logic would go here
  };

  const canProceedToNext = () => {
    switch (activeWorkspace) {
      case 'template':
        return !!selectedTemplate;
      case 'assets':
        return selectedAssets?.length > 0;
      case 'customize':
        return true;
      case 'preview':
        return true;
      default:
        return false;
    }
  };

  const getNextStep = () => {
    const currentIndex = workspaceSteps?.findIndex((step) => step?.id === activeWorkspace);
    return currentIndex < workspaceSteps?.length - 1 ? workspaceSteps?.[currentIndex + 1]?.id : null;
  };

  const getPreviousStep = () => {
    const currentIndex = workspaceSteps?.findIndex((step) => step?.id === activeWorkspace);
    return currentIndex > 0 ? workspaceSteps?.[currentIndex - 1]?.id : null;
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`transition-layout ${sidebarCollapsed ? 'ml-16' : 'ml-64'} pt-16`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Video Generator</h1>
                <p className="text-muted-foreground">
                  Create professional property marketing videos with AI-powered tools
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <NotificationCenter />
                <Button
                  variant="outline"
                  onClick={() => setShowBrandAssets(true)}>

                  <Icon name="Palette" size={16} />
                  <span className="ml-2">Brand Assets</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowProcessingQueue(true)}>

                  <Icon name="Video" size={16} />
                  <span className="ml-2">Queue</span>
                </Button>
              </div>
            </div>

            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/dashboard" className="hover:text-foreground transition-smooth">
                Dashboard
              </Link>
              <Icon name="ChevronRight" size={14} />
              <span className="text-foreground">Video Generator</span>
            </nav>
          </div>

          {/* Workflow Steps */}
          <div className="mb-6">
            <div className="flex items-center justify-between bg-white border border-border rounded-lg p-4">
              <div className="flex items-center space-x-6">
                {workspaceSteps?.map((step, index) =>
                <div key={step?.id} className="flex items-center space-x-3">
                    <button
                    onClick={() => setActiveWorkspace(step?.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    activeWorkspace === step?.id ?
                    'bg-primary text-primary-foreground' :
                    step?.completed ?
                    'bg-success/10 text-success hover:bg-success/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`
                    }>

                      <Icon
                      name={step?.completed ? 'CheckCircle' : step?.icon}
                      size={16} />

                      <span>{step?.label}</span>
                    </button>
                    {index < workspaceSteps?.length - 1 &&
                  <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                  }
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {getPreviousStep() &&
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveWorkspace(getPreviousStep())}>

                    <Icon name="ChevronLeft" size={14} />
                    <span className="ml-2">Previous</span>
                  </Button>
                }
                {getNextStep() &&
                <Button
                  size="sm"
                  onClick={() => setActiveWorkspace(getNextStep())}
                  disabled={!canProceedToNext()}>

                    <span className="mr-2">Next</span>
                    <Icon name="ChevronRight" size={14} />
                  </Button>
                }
                {activeWorkspace === 'preview' &&
                <Button
                  onClick={() => setShowExportSettings(true)}
                  disabled={isGenerating}>

                    <Icon name="Download" size={16} />
                    <span className="ml-2">Export</span>
                  </Button>
                }
              </div>
            </div>
          </div>

          {/* Main Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Tools & Settings */}
            <div className="lg:col-span-1 space-y-6">
              {activeWorkspace === 'template' &&
              <TemplateLibrary
                selectedTemplate={selectedTemplate}
                onTemplateSelect={setSelectedTemplate} />

              }
              
              {activeWorkspace === 'assets' &&
              <AssetSelector
                selectedAssets={selectedAssets}
                onAssetSelect={handleAssetSelect}
                onAssetRemove={handleAssetRemove} />

              }
              
              {activeWorkspace === 'customize' &&
              <ContentCustomization
                template={selectedTemplate}
                onUpdate={(updates) => console.log('Content updated:', updates)} />

              }
              
              {activeWorkspace === 'preview' &&
              <ExportSettings
                onExport={handleExport}
                isExporting={isGenerating} />

              }
            </div>

            {/* Right Panel - Preview & Timeline */}
            <div className="lg:col-span-2">
              <VideoPreview
                selectedTemplate={selectedTemplate}
                assets={selectedAssets}
                isGenerating={isGenerating}
                onExport={() => setShowExportSettings(true)} />

              
              {/* Quick Actions */}
              <div className="mt-6 bg-white border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Template:</span>
                      <span className="ml-2 font-medium text-foreground">
                        {selectedTemplate?.name || 'None selected'}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Assets:</span>
                      <span className="ml-2 font-medium text-foreground">
                        {selectedAssets?.length} selected
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGenerateVideo}
                      disabled={!selectedTemplate || selectedAssets?.length === 0 || isGenerating}>

                      <Icon name="Wand2" size={14} />
                      <span className="ml-2">Generate Preview</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm">

                      <Icon name="Save" size={14} />
                      <span className="ml-2">Save Project</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="mt-8">
            <div className="bg-white border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Recent Projects</h2>
                <Button variant="outline" size="sm">
                  <Icon name="FolderOpen" size={14} />
                  <span className="ml-2">View All</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                {
                  id: 1,
                  title: 'Modern Home Tour',
                  thumbnail: "https://images.unsplash.com/photo-1696846911651-a2a51e13d0d9",
                  thumbnailAlt: 'Modern home exterior for video project thumbnail',
                  duration: '1:45',
                  created: '2 hours ago',
                  status: 'completed'
                },
                {
                  id: 2,
                  title: 'Luxury Condo Reel',
                  thumbnail: "https://images.unsplash.com/photo-1642088853782-a7f33504ae96",
                  thumbnailAlt: 'Luxury condo living room for video project thumbnail',
                  duration: '0:30',
                  created: '1 day ago',
                  status: 'processing'
                },
                {
                  id: 3,
                  title: 'Family Home Showcase',
                  thumbnail: "https://images.unsplash.com/photo-1639003149051-52e5763b3ebb",
                  thumbnailAlt: 'Family home kitchen for video project thumbnail',
                  duration: '2:15',
                  created: '3 days ago',
                  status: 'draft'
                }]?.
                map((project) =>
                <div
                  key={project?.id}
                  className="group border border-border rounded-lg overflow-hidden hover:shadow-elevation-1 transition-smooth cursor-pointer">

                    <div className="relative aspect-video bg-muted">
                      <img
                      src={project?.thumbnail}
                      alt={project?.thumbnailAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />

                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                        <Icon name="Play" size={24} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                        {project?.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-foreground text-sm truncate">
                        {project?.title}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{project?.created}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                      project?.status === 'completed' ? 'bg-success/10 text-success' :
                      project?.status === 'processing' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`
                      }>
                          {project?.status}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <ProcessingQueue
        isVisible={showProcessingQueue}
        onClose={() => setShowProcessingQueue(false)} />

      <BrandAssetSelector
        isOpen={showBrandAssets}
        onClose={() => setShowBrandAssets(false)}
        onSelect={(asset) => console.log('Brand asset selected:', asset)} />

      {/* Global Components */}
      <AIAssistant />
      <UploadProgress />
    </div>);

};

export default VideoGenerator;