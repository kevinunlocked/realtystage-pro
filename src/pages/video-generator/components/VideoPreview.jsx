import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPreview = ({ selectedTemplate, assets, isGenerating, onExport }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const mockVideoData = {
    title: "Luxury Modern Home - 123 Oak Street",
    description: "Stunning 4BR/3BA contemporary home with open floor plan and premium finishes",
    frames: [
    {
      id: 1,
      timestamp: 0,
      type: 'image',
      content: "https://images.unsplash.com/photo-1662543469405-276fd25d6995",
      contentAlt: 'Modern luxury home exterior with large windows and contemporary architecture',
      duration: 3
    },
    {
      id: 2,
      timestamp: 3,
      type: 'image',
      content: "https://images.unsplash.com/photo-1704040686428-7534b262d0d8",
      contentAlt: 'Spacious living room with modern furniture and floor-to-ceiling windows',
      duration: 4
    },
    {
      id: 3,
      timestamp: 7,
      type: 'image',
      content: "https://images.unsplash.com/photo-1722604817803-4c88edef9bc0",
      contentAlt: 'Gourmet kitchen with white cabinets, marble countertops and stainless steel appliances',
      duration: 4
    }]

  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const newTime = clickX / rect?.width * duration;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  useEffect(() => {
    let interval;
    if (isPlaying && !isGenerating) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, isGenerating]);

  const getCurrentFrame = () => {
    return mockVideoData?.frames?.find((frame) =>
    currentTime >= frame?.timestamp &&
    currentTime < frame?.timestamp + frame?.duration
    ) || mockVideoData?.frames?.[0];
  };

  const currentFrame = getCurrentFrame();

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden">
      {/* Video Player */}
      <div className="relative bg-black aspect-video">
        {isGenerating ?
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-foreground font-medium">Generating Video...</p>
              <p className="text-sm text-muted-foreground">This may take a few minutes</p>
            </div>
          </div> :

        <>
            <img
            src={currentFrame?.content}
            alt={currentFrame?.contentAlt}
            className="w-full h-full object-cover" />

            
            {/* Play Overlay */}
            {!isPlaying &&
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Button
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-black">

                  <Icon name="Play" size={24} />
                </Button>
              </div>
          }

            {/* Video Info Overlay */}
            <div className="absolute top-4 left-4 right-4">
              <div className="bg-black/60 text-white p-3 rounded-lg">
                <h3 className="font-semibold text-sm">{mockVideoData?.title}</h3>
                <p className="text-xs opacity-90 mt-1">{mockVideoData?.description}</p>
              </div>
            </div>

            {/* Template Badge */}
            {selectedTemplate &&
          <div className="absolute top-4 right-4">
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                  {selectedTemplate?.name}
                </span>
              </div>
          }
          </>
        }
      </div>
      {/* Controls */}
      <div className="p-4 space-y-4">
        {/* Timeline */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div
            className="relative h-2 bg-muted rounded-full cursor-pointer"
            onClick={handleSeek}>

            <div
              className="absolute top-0 left-0 h-full bg-primary rounded-full transition-smooth"
              style={{ width: `${currentTime / duration * 100}%` }} />

            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-elevation-1 transition-smooth"
              style={{ left: `${currentTime / duration * 100}%` }} />

          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePlayPause}
              disabled={isGenerating}>

              <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentTime(0)}
              disabled={isGenerating}>

              <Icon name="RotateCcw" size={16} />
            </Button>

            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}>

                <Icon name={isMuted ? "VolumeX" : "Volume2"} size={16} />
              </Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-muted rounded-full appearance-none cursor-pointer" />

            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={isGenerating}>

              <Icon name="Settings" size={16} />
              <span className="ml-2">Settings</span>
            </Button>
            
            <Button
              onClick={onExport}
              disabled={isGenerating}>

              <Icon name="Download" size={16} />
              <span className="ml-2">Export</span>
            </Button>
          </div>
        </div>

        {/* Frame Timeline */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Timeline</h4>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {mockVideoData?.frames?.map((frame, index) =>
            <div
              key={frame?.id}
              className={`flex-shrink-0 w-20 h-12 rounded border-2 cursor-pointer transition-smooth ${
              currentTime >= frame?.timestamp && currentTime < frame?.timestamp + frame?.duration ?
              'border-primary' : 'border-border hover:border-muted-foreground'}`
              }
              onClick={() => setCurrentTime(frame?.timestamp)}>

                <img
                src={frame?.content}
                alt={frame?.contentAlt}
                className="w-full h-full object-cover rounded" />

              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

};

export default VideoPreview;