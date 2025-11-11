import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const BulkActions = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [targetFolder, setTargetFolder] = useState('');

  const folderOptions = [
    { value: 'listings', label: 'Property Listings' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'clients', label: 'Client Projects' },
    { value: 'campaigns', label: 'Marketing Campaigns' },
    { value: 'favorites', label: 'Favorites' }
  ];

  const handleAddTag = () => {
    if (newTag?.trim()) {
      onBulkAction('addTag', newTag?.trim());
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const handleMove = () => {
    if (targetFolder) {
      onBulkAction('move', targetFolder);
      setTargetFolder('');
      setShowMoveDialog(false);
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white border border-border rounded-lg shadow-elevation-2 p-4">
        <div className="flex items-center space-x-4">
          {/* Selection Count */}
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedCount} selected
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('download')}
            >
              <Icon name="Download" size={14} />
              <span className="ml-1">Download</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTagInput(!showTagInput)}
            >
              <Icon name="Tag" size={14} />
              <span className="ml-1">Tag</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMoveDialog(!showMoveDialog)}
            >
              <Icon name="FolderOpen" size={14} />
              <span className="ml-1">Move</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('share')}
            >
              <Icon name="Share2" size={14} />
              <span className="ml-1">Share</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('delete')}
              className="text-error hover:text-error"
            >
              <Icon name="Trash2" size={14} />
              <span className="ml-1">Delete</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
        </div>

        {/* Tag Input */}
        {showTagInput && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Enter tag name"
                value={newTag}
                onChange={(e) => setNewTag(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleAddTag()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleAddTag}>
                Add Tag
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowTagInput(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Move Dialog */}
        {showMoveDialog && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Select
                options={folderOptions}
                value={targetFolder}
                onChange={setTargetFolder}
                placeholder="Select destination folder"
                className="flex-1"
              />
              <Button size="sm" onClick={handleMove}>
                Move
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowMoveDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActions;