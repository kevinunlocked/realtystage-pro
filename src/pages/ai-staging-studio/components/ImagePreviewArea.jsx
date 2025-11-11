import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ImagePreviewArea = ({ selectedImage, stagedImage, isGenerating, onGenerate }) => {
  const [viewMode, setViewMode] = useState('original'); // 'original', 'staged', 'comparison'
  const [zoomLevel, setZoomLevel] = useState(100);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    if (zoomLevel > 100) {
      setIsDragging(true);
      setDragStart({
        x: e?.clientX - panPosition?.x,
        y: e?.clientY - panPosition?.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 100) {
      setPanPosition({
        x: e?.clientX - dragStart?.x,
        y: e?.clientY - dragStart?.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const resetView = () => {
    setZoomLevel(100);
    setPanPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
    if (zoomLevel <= 100) {
      setPanPosition({ x: 0, y: 0 });
    }
  };

  if (!selectedImage) {
    return (
      <div className="h-full bg-muted/30 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Icon name="ImagePlus" size={64} className="mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Image Selected</h3>
          <p className="text-muted-foreground">
            Upload or select a property photo to begin AI staging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-lg border border-border">
      {/* Header Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-foreground">Image Preview</h3>
          <span className="text-sm text-muted-foreground">
            {selectedImage?.name || 'Selected Image'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'original' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('original')}
              className="text-xs"
            >
              Original
            </Button>
            {stagedImage && (
              <>
                <Button
                  variant={viewMode === 'staged' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('staged')}
                  className="text-xs"
                >
                  Staged
                </Button>
                <Button
                  variant={viewMode === 'comparison' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('comparison')}
                  className="text-xs"
                >
                  Compare
                </Button>
              </>
            )}
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <Button variant="ghost" size="sm" onClick={zoomOut}>
              <Icon name="ZoomOut" size={16} />
            </Button>
            <span className="text-xs text-muted-foreground px-2 min-w-[3rem] text-center">
              {zoomLevel}%
            </span>
            <Button variant="ghost" size="sm" onClick={zoomIn}>
              <Icon name="ZoomIn" size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={resetView}>
              <Icon name="RotateCcw" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Image Display Area */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden bg-muted/20 cursor-move"
        onMouseDown={handleMouseDown}
      >
        {viewMode === 'comparison' && stagedImage ? (
          <ComparisonView 
            originalImage={selectedImage}
            stagedImage={stagedImage}
            zoomLevel={zoomLevel}
            panPosition={panPosition}
          />
        ) : (
          <SingleImageView
            image={viewMode === 'staged' && stagedImage ? stagedImage : selectedImage}
            zoomLevel={zoomLevel}
            panPosition={panPosition}
            isGenerating={isGenerating && viewMode === 'staged'}
          />
        )}

        {/* Generation Overlay */}
        {isGenerating && viewMode === 'staged' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 text-center max-w-sm">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h4 className="font-medium text-foreground mb-2">AI Staging in Progress</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Creating your staged image with selected style...
              </p>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-3/4 transition-smooth"></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Estimated time: 30-45 seconds
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Footer Actions */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Resolution: 1920x1080</span>
            <span>Format: JPG</span>
            {stagedImage && <span>AI Enhanced</span>}
          </div>

          <div className="flex items-center space-x-2">
            {!stagedImage && !isGenerating && (
              <Button onClick={onGenerate} className="flex items-center space-x-2">
                <Icon name="Wand2" size={16} />
                <span>Generate Staging</span>
              </Button>
            )}
            
            {stagedImage && (
              <>
                <Button variant="outline" onClick={onGenerate}>
                  <Icon name="RefreshCw" size={16} />
                  <span className="ml-2">Regenerate</span>
                </Button>
                <Button>
                  <Icon name="Download" size={16} />
                  <span className="ml-2">Download</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SingleImageView = ({ image, zoomLevel, panPosition, isGenerating }) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div
        className="relative max-w-full max-h-full transition-transform"
        style={{
          transform: `scale(${zoomLevel / 100}) translate(${panPosition?.x}px, ${panPosition?.y}px)`
        }}
      >
        <Image
          src={image?.preview || image?.url}
          alt={image?.alt || `Property photo showing ${image?.name || 'room interior'}`}
          className="max-w-full max-h-full object-contain rounded-lg shadow-elevation-1"
        />
        {isGenerating && (
          <div className="absolute inset-0 bg-primary/10 rounded-lg animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

const ComparisonView = ({ originalImage, stagedImage, zoomLevel, panPosition }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div
        className="relative max-w-full max-h-full transition-transform"
        style={{
          transform: `scale(${zoomLevel / 100}) translate(${panPosition?.x}px, ${panPosition?.y}px)`
        }}
      >
        <div className="relative overflow-hidden rounded-lg shadow-elevation-1">
          {/* Original Image */}
          <Image
            src={originalImage?.preview || originalImage?.url}
            alt={originalImage?.alt || `Original property photo showing ${originalImage?.name || 'room interior'}`}
            className="w-full h-full object-contain"
          />
          
          {/* Staged Image Overlay */}
          <div
            className="absolute top-0 left-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src={stagedImage?.preview || stagedImage?.url}
              alt={stagedImage?.alt || `AI staged version showing ${originalImage?.name || 'room interior'} with furniture`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Slider */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={(e) => {
              const startX = e?.clientX;
              const startPosition = sliderPosition;
              
              const handleMouseMove = (e) => {
                const rect = e?.currentTarget?.parentElement?.getBoundingClientRect();
                const newPosition = Math.max(0, Math.min(100, 
                  startPosition + ((e?.clientX - startX) / rect?.width) * 100
                ));
                setSliderPosition(newPosition);
              };

              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <Icon name="Move" size={16} className="text-muted-foreground" />
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            Original
          </div>
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            AI Staged
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewArea;