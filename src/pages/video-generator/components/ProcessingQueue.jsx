import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingQueue = ({ isVisible, onClose }) => {
  const [queueItems, setQueueItems] = useState([
    {
      id: 1,
      title: 'Modern Home Tour - 123 Oak Street',
      status: 'completed',
      progress: 100,
      startTime: new Date(Date.now() - 10 * 60 * 1000),
      completedTime: new Date(Date.now() - 2 * 60 * 1000),
      settings: {
        format: 'MP4',
        quality: 'High (1080p)',
        duration: '1:45',
        fileSize: '245 MB'
      },
      downloadUrl: '/downloads/modern-home-tour.mp4'
    },
    {
      id: 2,
      title: 'Luxury Condo Showcase - Downtown',
      status: 'processing',
      progress: 75,
      startTime: new Date(Date.now() - 5 * 60 * 1000),
      estimatedCompletion: new Date(Date.now() + 2 * 60 * 1000),
      settings: {
        format: 'MP4',
        quality: 'Ultra (4K)',
        duration: '2:30',
        fileSize: '~580 MB'
      },
      currentStep: 'Rendering final video'
    },
    {
      id: 3,
      title: 'Family Home Instagram Reel',
      status: 'queued',
      progress: 0,
      queuePosition: 1,
      settings: {
        format: 'MP4',
        quality: 'High (1080p)',
        duration: '0:30',
        fileSize: '~45 MB'
      },
      estimatedStart: new Date(Date.now() + 3 * 60 * 1000)
    },
    {
      id: 4,
      title: 'Beachfront Property Tour',
      status: 'error',
      progress: 45,
      startTime: new Date(Date.now() - 15 * 60 * 1000),
      errorMessage: 'Insufficient storage space. Please free up space and retry.',
      settings: {
        format: 'MP4',
        quality: 'High (1080p)',
        duration: '3:15',
        fileSize: '~420 MB'
      }
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'processing':
        return <Icon name="Loader" size={16} className="text-primary animate-spin" />;
      case 'queued':
        return <Icon name="Clock" size={16} className="text-muted-foreground" />;
      case 'error':
        return <Icon name="AlertCircle" size={16} className="text-error" />;
      default:
        return <Icon name="Video" size={16} className="text-muted-foreground" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-primary';
      case 'queued': return 'text-muted-foreground';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (startTime, endTime = new Date()) => {
    const diff = Math.floor((endTime - startTime) / 1000 / 60);
    return `${diff}m`;
  };

  const handleRetry = (id) => {
    setQueueItems(prev => prev?.map(item =>
      item?.id === id
        ? { ...item, status: 'queued', progress: 0, errorMessage: undefined }
        : item
    ));
  };

  const handleCancel = (id) => {
    setQueueItems(prev => prev?.filter(item => item?.id !== id));
  };

  const handleDownload = (item) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = item?.downloadUrl;
    link.download = `${item?.title?.replace(/[^a-z0-9]/gi, '_')?.toLowerCase()}.mp4`;
    link?.click();
  };

  const clearCompleted = () => {
    setQueueItems(prev => prev?.filter(item => item?.status !== 'completed'));
  };

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueItems(prev => prev?.map(item => {
        if (item?.status === 'processing' && item?.progress < 100) {
          const newProgress = Math.min(item?.progress + Math.random() * 5, 100);
          if (newProgress >= 100) {
            return {
              ...item,
              status: 'completed',
              progress: 100,
              completedTime: new Date(),
              downloadUrl: `/downloads/${item?.title?.replace(/[^a-z0-9]/gi, '_')?.toLowerCase()}.mp4`
            };
          }
          return { ...item, progress: newProgress };
        }
        return item;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-elevation-2 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Video" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Processing Queue</h2>
              <p className="text-sm text-muted-foreground">
                {queueItems?.filter(i => i?.status === 'processing')?.length} processing • 
                {queueItems?.filter(i => i?.status === 'queued')?.length} queued • 
                {queueItems?.filter(i => i?.status === 'completed')?.length} completed
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {queueItems?.some(i => i?.status === 'completed') && (
              <Button variant="outline" onClick={clearCompleted}>
                Clear Completed
              </Button>
            )}
            <Button variant="ghost" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Queue List */}
        <div className="flex-1 overflow-y-auto">
          {queueItems?.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Icon name="Video" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No videos in queue</h3>
                <p className="text-muted-foreground">Start creating videos to see them here</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {queueItems?.map((item) => (
                <div key={item?.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      {getStatusIcon(item?.status)}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{item?.title}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                          <span>{item?.settings?.format}</span>
                          <span>{item?.settings?.quality}</span>
                          <span>{item?.settings?.duration}</span>
                          <span>{item?.settings?.fileSize}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {item?.status === 'completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(item)}
                        >
                          <Icon name="Download" size={14} />
                          <span className="ml-2">Download</span>
                        </Button>
                      )}
                      
                      {item?.status === 'error' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRetry(item?.id)}
                        >
                          <Icon name="RotateCcw" size={14} />
                          <span className="ml-2">Retry</span>
                        </Button>
                      )}
                      
                      {(item?.status === 'processing' || item?.status === 'queued') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancel(item?.id)}
                        >
                          <Icon name="X" size={14} />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {(item?.status === 'processing' || item?.status === 'error') && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className={getStatusColor(item?.status)}>
                          {item?.status === 'processing' && item?.currentStep}
                          {item?.status === 'error' && 'Processing failed'}
                        </span>
                        <span className="text-muted-foreground">{Math.round(item?.progress)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-smooth ${
                            item?.status === 'error' ? 'bg-error' : 'bg-primary'
                          }`}
                          style={{ width: `${item?.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Status Details */}
                  <div className="text-sm text-muted-foreground">
                    {item?.status === 'completed' && (
                      <div className="flex items-center justify-between">
                        <span>
                          Completed at {formatTime(item?.completedTime)} • 
                          Took {formatDuration(item?.startTime, item?.completedTime)}
                        </span>
                        <span className="text-success">Ready for download</span>
                      </div>
                    )}
                    
                    {item?.status === 'processing' && (
                      <div className="flex items-center justify-between">
                        <span>
                          Started at {formatTime(item?.startTime)} • 
                          Running for {formatDuration(item?.startTime)}
                        </span>
                        <span>
                          Est. completion: {formatTime(item?.estimatedCompletion)}
                        </span>
                      </div>
                    )}
                    
                    {item?.status === 'queued' && (
                      <div className="flex items-center justify-between">
                        <span>Position #{item?.queuePosition} in queue</span>
                        <span>
                          Est. start: {formatTime(item?.estimatedStart)}
                        </span>
                      </div>
                    )}
                    
                    {item?.status === 'error' && (
                      <div className="bg-error/10 border border-error/20 rounded p-3 mt-2">
                        <div className="flex items-start space-x-2">
                          <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
                          <div>
                            <p className="text-error font-medium">Error Details</p>
                            <p className="text-error/80 text-sm mt-1">{item?.errorMessage}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Processing powered by AI • Videos are automatically optimized for each platform
            </span>
            <Button variant="ghost" size="sm">
              <Icon name="Settings" size={14} />
              <span className="ml-2">Queue Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingQueue;