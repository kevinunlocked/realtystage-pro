import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContentCreationPanel = ({ onCreatePost, onSelectFromLibrary }) => {
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');

  const handleSubmit = () => {
    if (onCreatePost) {
      onCreatePost({
        caption,
        hashtags,
        platforms: ['instagram'],
        scheduledDate: new Date(),
        status: 'draft',
      });
      setCaption('');
      setHashtags('');
    }
  };

  return (
    <div className="bg-white border border-border rounded-lg p-4 shadow-elevation-1">
      <h3 className="text-sm font-medium text-foreground mb-4">Create New Post</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Caption
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write your post caption..."
            className="w-full h-24 px-3 py-2 border border-border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <Input
          label="Hashtags"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          placeholder="#realestate #property"
        />

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectFromLibrary}
            className="flex-1"
          >
            <Icon name="FolderOpen" size={16} />
            <span className="ml-2">Select Assets</span>
          </Button>
          
          <Button
            size="sm"
            onClick={handleSubmit}
            className="flex-1"
            disabled={!caption.trim()}
          >
            <Icon name="Plus" size={16} />
            <span className="ml-2">Create Post</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentCreationPanel;

