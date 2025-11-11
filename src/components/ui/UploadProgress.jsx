import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UploadProgress = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploads, setUploads] = useState([
    {
      id: 1,
      name: 'living-room-01.jpg',
      size: '2.4 MB',
      progress: 100,
      status: 'completed',
      type: 'image'
    },
    {
      id: 2,
      name: 'kitchen-panorama.jpg',
      size: '5.1 MB',
      progress: 75,
      status: 'uploading',
      type: 'image'
    },
    {
      id: 3,
      name: 'property-tour.mp4',
      size: '45.2 MB',
      progress: 25,
      status: 'uploading',
      type: 'video'
    },
    {
      id: 4,
      name: 'bedroom-staging.ai',
      size: '1.8 MB',
      progress: 0,
      status: 'queued',
      type: 'ai-project'
    }
  ]);

  const activeUploads = uploads?.filter(upload => upload?.status !== 'completed');
  const hasActiveUploads = activeUploads?.length > 0;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'uploading':
        return <Icon name="Upload" size={16} className="text-primary animate-pulse" />;
      case 'queued':
        return <Icon name="Clock" size={16} className="text-muted-foreground" />;
      case 'error':
        return <Icon name="AlertCircle" size={16} className="text-error" />;
      default:
        return <Icon name="File" size={16} className="text-muted-foreground" />;
    }
  };

  const getFileTypeIcon = (type) => {
    switch (type) {
      case 'image':
        return <Icon name="Image" size={16} className="text-accent" />;
      case 'video':
        return <Icon name="Video" size={16} className="text-warning" />;
      case 'ai-project':
        return <Icon name="Wand2" size={16} className="text-primary" />;
      default:
        return <Icon name="File" size={16} className="text-muted-foreground" />;
    }
  };

  const cancelUpload = (id) => {
    setUploads(prev => prev?.filter(upload => upload?.id !== id));
  };

  const retryUpload = (id) => {
    setUploads(prev => prev?.map(upload => 
      upload?.id === id 
        ? { ...upload, status: 'uploading', progress: 0 }
        : upload
    ));
  };

  const clearCompleted = () => {
    setUploads(prev => prev?.filter(upload => upload?.status !== 'completed'));
  };

  if (!hasActiveUploads && uploads?.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Trigger Button */}
      {!isOpen && hasActiveUploads && (
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="bg-white shadow-elevation-2 border-primary/20"
        >
          <Icon name="Upload" size={16} className="text-primary animate-pulse" />
          <span className="ml-2">{activeUploads?.length} uploading</span>
        </Button>
      )}
      {/* Upload Panel */}
      {isOpen && (
        <div className="w-80 bg-white border border-border rounded-lg shadow-elevation-2">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Upload" size={18} />
              <span className="font-medium">Upload Progress</span>
              {hasActiveUploads && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                  {activeUploads?.length}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {uploads?.some(u => u?.status === 'completed') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCompleted}
                  className="text-xs"
                >
                  Clear
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>

          {/* Upload List */}
          <div className="max-h-80 overflow-y-auto">
            {uploads?.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Icon name="Upload" size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No uploads in progress</p>
              </div>
            ) : (
              <div className="p-2 space-y-2">
                {uploads?.map((upload) => (
                  <div
                    key={upload?.id}
                    className="p-3 border border-border rounded-lg bg-card"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        {getFileTypeIcon(upload?.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {upload?.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {upload?.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        {getStatusIcon(upload?.status)}
                        {upload?.status === 'uploading' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => cancelUpload(upload?.id)}
                            className="p-1"
                          >
                            <Icon name="X" size={12} />
                          </Button>
                        )}
                        {upload?.status === 'error' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => retryUpload(upload?.id)}
                            className="p-1"
                          >
                            <Icon name="RotateCcw" size={12} />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {upload?.status === 'uploading' && (
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-smooth"
                          style={{ width: `${upload?.progress}%` }}
                        />
                      </div>
                    )}

                    {/* Status Text */}
                    <div className="mt-2 flex justify-between items-center text-xs">
                      <span className={`${
                        upload?.status === 'completed' ? 'text-success' :
                        upload?.status === 'error' ? 'text-error' :
                        upload?.status === 'uploading'? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {upload?.status === 'completed' && 'Upload complete'}
                        {upload?.status === 'uploading' && `${upload?.progress}% uploaded`}
                        {upload?.status === 'queued' && 'Waiting in queue'}
                        {upload?.status === 'error' && 'Upload failed'}
                      </span>
                      {upload?.status === 'uploading' && (
                        <span className="text-muted-foreground">
                          {Math.round((upload?.progress / 100) * parseFloat(upload?.size))}MB / {upload?.size}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {hasActiveUploads && (
            <div className="p-4 border-t border-border bg-muted/30">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{activeUploads?.length} files uploading</span>
                <span>
                  {Math.round(
                    activeUploads?.reduce((acc, upload) => acc + upload?.progress, 0) / 
                    activeUploads?.length
                  )}% overall
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadProgress;