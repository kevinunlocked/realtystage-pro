import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingStatus = ({ isVisible, onClose, currentJob, processingQueue }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const processingSteps = [
    { id: 1, name: 'Image Analysis', description: 'Analyzing room layout and features' },
    { id: 2, name: 'Style Application', description: 'Applying selected staging style' },
    { id: 3, name: 'Furniture Placement', description: 'Positioning furniture and decor' },
    { id: 4, name: 'Lighting Enhancement', description: 'Optimizing lighting and shadows' },
    { id: 5, name: 'Final Rendering', description: 'Generating high-quality output' }
  ];

  useEffect(() => {
    if (isVisible && currentJob) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + 2, 100);
          const stepIndex = Math.floor((newProgress / 100) * processingSteps?.length);
          setCurrentStep(stepIndex);
          return newProgress;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isVisible, currentJob]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-elevation-2 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Wand2" size={20} color="white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Staging in Progress</h3>
              <p className="text-sm text-muted-foreground">
                {currentJob?.style || 'Modern'} style • {currentJob?.quality || 'Standard'} quality
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-smooth"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Processing Steps */}
        <div className="space-y-3 mb-6">
          {processingSteps?.map((step, index) => (
            <div
              key={step?.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-smooth ${
                index < currentStep 
                  ? 'bg-success/10 text-success' 
                  : index === currentStep 
                    ? 'bg-primary/10 text-primary' :'bg-muted/30 text-muted-foreground'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                index < currentStep 
                  ? 'bg-success text-success-foreground' 
                  : index === currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                {index < currentStep ? (
                  <Icon name="Check" size={12} />
                ) : index === currentStep ? (
                  <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="text-xs">{step?.id}</span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{step?.name}</p>
                <p className="text-xs opacity-70">{step?.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Processing Queue */}
        {processingQueue && processingQueue?.length > 1 && (
          <div className="mb-6 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Processing Queue</span>
              <span className="text-sm text-muted-foreground">
                {processingQueue?.length} items
              </span>
            </div>
            <div className="space-y-2">
              {processingQueue?.slice(0, 3)?.map((item, index) => (
                <div key={item?.id} className="flex items-center space-x-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-primary animate-pulse' : 'bg-muted-foreground'
                  }`} />
                  <span className="text-muted-foreground truncate">
                    {item?.name} - {item?.style}
                  </span>
                </div>
              ))}
              {processingQueue?.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  +{processingQueue?.length - 3} more items
                </p>
              )}
            </div>
          </div>
        )}

        {/* Estimated Time */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>Estimated time remaining:</span>
          <span className="font-medium">
            {Math.max(1, Math.ceil((100 - progress) / 3))} minutes
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm">
            <Icon name="Minimize2" size={16} />
            <span className="ml-2">Minimize</span>
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Pause" size={16} />
            <span className="ml-2">Pause</span>
          </Button>
        </div>

        {/* Tips */}
        <div className="mt-6 p-3 bg-accent/10 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Pro Tip</p>
              <p className="text-xs text-muted-foreground">
                Higher quality settings produce better results but take longer to process. 
                You can continue working on other images while this generates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;