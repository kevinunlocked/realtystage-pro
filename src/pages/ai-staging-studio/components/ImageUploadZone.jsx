import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ImageUploadZone = ({ onImageSelect, selectedImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadQueue, setUploadQueue] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragging(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files?.filter((file) => {
      const isImage = file?.type?.startsWith('image/');
      const isValidSize = file?.size <= 10 * 1024 * 1024; // 10MB limit
      return isImage && isValidSize;
    });

    if (validFiles?.length > 0) {
      const newUploads = validFiles?.map((file) => ({
        id: Date.now() + Math.random(),
        file,
        name: file?.name,
        size: (file?.size / (1024 * 1024))?.toFixed(2) + ' MB',
        preview: URL.createObjectURL(file),
        status: 'processing'
      }));

      setUploadQueue((prev) => [...prev, ...newUploads]);

      // Simulate processing
      newUploads?.forEach((upload) => {
        setTimeout(() => {
          setUploadQueue((prev) => prev?.map((item) =>
          item?.id === upload?.id ? { ...item, status: 'completed' } : item
          ));
        }, 2000);
      });

      // Select first uploaded image
      if (newUploads?.length > 0) {
        onImageSelect(newUploads?.[0]);
      }
    }
  };

  const removeFromQueue = (id) => {
    setUploadQueue((prev) => prev?.filter((item) => item?.id !== id));
  };

  const selectFromQueue = (upload) => {
    onImageSelect(upload);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
        isDragging ?
        'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`
        }>

        <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          Upload Property Photos
        </h3>
        <p className="text-muted-foreground mb-4">
          Drag and drop images here, or click to browse
        </p>
        <Button
          onClick={() => fileInputRef?.current?.click()}
          variant="outline">

          <Icon name="FolderOpen" size={16} />
          <span className="ml-2">Browse Files</span>
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden" />

        <p className="text-xs text-muted-foreground mt-4">
          Supports JPG, PNG, WebP up to 10MB each
        </p>
      </div>
      {/* Upload Queue */}
      {uploadQueue?.length > 0 &&
      <div className="space-y-3">
          <h4 className="font-medium text-foreground">Recent Uploads</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {uploadQueue?.map((upload) =>
          <div
            key={upload?.id}
            className={`relative border rounded-lg overflow-hidden cursor-pointer transition-smooth ${
            selectedImage?.id === upload?.id ?
            'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'}`
            }
            onClick={() => selectFromQueue(upload)}>

                <div className="aspect-square bg-muted">
                  <Image
                src={upload?.preview}
                alt={`Uploaded property photo showing ${upload?.name?.split('.')?.[0]} room`}
                className="w-full h-full object-cover" />

                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-foreground truncate">
                    {upload?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{upload?.size}</p>
                </div>
                
                {/* Status Indicator */}
                <div className="absolute top-2 right-2">
                  {upload?.status === 'processing' ?
              <div className="w-6 h-6 bg-warning text-warning-foreground rounded-full flex items-center justify-center">
                      <Icon name="Clock" size={12} />
                    </div> :

              <div className="w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} />
                    </div>
              }
                </div>

                {/* Remove Button */}
                <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e?.stopPropagation();
                removeFromQueue(upload?.id);
              }}
              className="absolute top-2 left-2 w-6 h-6 p-0 bg-black/50 text-white hover:bg-black/70">

                  <Icon name="X" size={12} />
                </Button>

                {/* Selection Indicator */}
                {selectedImage?.id === upload?.id &&
            <div className="absolute inset-0 bg-primary/10 border-2 border-primary rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <Icon name="Check" size={16} />
                    </div>
                  </div>
            }
              </div>
          )}
          </div>
        </div>
      }
      {/* Sample Images */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Try Sample Images</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
          {
            id: 'sample-1',
            name: 'Empty Living Room',
            preview: "https://images.unsplash.com/photo-1721901950428-56e381bfc8fe",
            alt: 'Empty modern living room with white walls, hardwood floors, and large windows'
          },
          {
            id: 'sample-2',
            name: 'Vacant Bedroom',
            preview: "https://images.unsplash.com/photo-1722650362301-b23639e4857e",
            alt: 'Empty bedroom with carpeted floors, white walls, and natural lighting from windows'
          },
          {
            id: 'sample-3',
            name: 'Unfurnished Kitchen',
            preview: "https://images.unsplash.com/photo-1609766856923-7e0a0c06584d",
            alt: 'Empty modern kitchen with white cabinets, granite countertops, and stainless steel appliances'
          },
          {
            id: 'sample-4',
            name: 'Empty Dining Room',
            preview: "https://images.unsplash.com/photo-1705585712210-3ce00012615d",
            alt: 'Vacant dining room with hardwood floors, white walls, and chandelier fixture'
          }]?.
          map((sample) =>
          <div
            key={sample?.id}
            className={`relative border rounded-lg overflow-hidden cursor-pointer transition-smooth ${
            selectedImage?.id === sample?.id ?
            'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'}`
            }
            onClick={() => onImageSelect(sample)}>

              <div className="aspect-square bg-muted">
                <Image
                src={sample?.preview}
                alt={sample?.alt}
                className="w-full h-full object-cover" />

              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-foreground text-center">
                  {sample?.name}
                </p>
              </div>

              {/* Selection Indicator */}
              {selectedImage?.id === sample?.id &&
            <div className="absolute inset-0 bg-primary/10 border-2 border-primary rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <Icon name="Check" size={16} />
                  </div>
                </div>
            }
            </div>
          )}
        </div>
      </div>
    </div>);

};

export default ImageUploadZone;