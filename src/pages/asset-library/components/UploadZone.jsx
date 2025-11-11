import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFilesUploaded }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFileUpload(files);
  };

  const handleFileUpload = async (files) => {
    if (files?.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      onFilesUploaded?.(files);
      setIsUploading(false);
      if (fileInputRef?.current) {
        fileInputRef.current.value = '';
      }
    }, 2000);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
        isDragOver
          ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx"
        onChange={handleFileSelect}
        className="hidden"
      />
      <div className="flex flex-col items-center space-y-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        }`}>
          <Icon name={isUploading ? 'Loader2' : 'Upload'} size={24} className={isUploading ? 'animate-spin' : ''} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {isUploading ? 'Uploading files...' : 'Upload Property Assets'}
          </h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop files here or click to browse
          </p>
          <p className="text-sm text-muted-foreground">
            Supports: JPG, PNG, MP4, MOV, PDF, DOC (Max 50MB per file)
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={() => fileInputRef?.current?.click()}
          disabled={isUploading}
        >
          <Icon name="FolderOpen" size={16} />
          <span className="ml-2">Browse Files</span>
        </Button>
      </div>
    </div>
  );
};

export default UploadZone;