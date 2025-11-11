import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FolderNavigation = ({ selectedFolder, onFolderSelect, onCreateFolder }) => {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const folders = [
    {
      id: 'all',
      name: 'All Assets',
      icon: 'FolderOpen',
      count: 1247,
      type: 'system'
    },
    {
      id: 'recent',
      name: 'Recently Added',
      icon: 'Clock',
      count: 23,
      type: 'system'
    },
    {
      id: 'favorites',
      name: 'Favorites',
      icon: 'Star',
      count: 45,
      type: 'system'
    },
    {
      id: 'listings',
      name: 'Property Listings',
      icon: 'Home',
      count: 892,
      type: 'category',
      subfolders: [
        { id: 'residential', name: 'Residential', count: 654 },
        { id: 'commercial', name: 'Commercial', count: 238 }
      ]
    },
    {
      id: 'clients',
      name: 'Client Projects',
      icon: 'Users',
      count: 234,
      type: 'category',
      subfolders: [
        { id: 'johnson-family', name: 'Johnson Family', count: 45 },
        { id: 'smith-corp', name: 'Smith Corporation', count: 67 }
      ]
    },
    {
      id: 'campaigns',
      name: 'Marketing Campaigns',
      icon: 'Megaphone',
      count: 121,
      type: 'category',
      subfolders: [
        { id: 'spring-2024', name: 'Spring 2024', count: 78 },
        { id: 'luxury-homes', name: 'Luxury Homes', count: 43 }
      ]
    }
  ];

  const handleCreateFolder = () => {
    if (newFolderName?.trim()) {
      onCreateFolder?.(newFolderName?.trim());
      setNewFolderName('');
      setIsCreatingFolder(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleCreateFolder();
    } else if (e?.key === 'Escape') {
      setIsCreatingFolder(false);
      setNewFolderName('');
    }
  };

  return (
    <div className="bg-white border border-border rounded-lg shadow-elevation-1">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Folders</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCreatingFolder(true)}
          >
            <Icon name="Plus" size={16} />
          </Button>
        </div>
      </div>
      <div className="p-2">
        {/* Create New Folder */}
        {isCreatingFolder && (
          <div className="p-2 mb-2 border border-border rounded-md bg-muted/30">
            <Input
              type="text"
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e?.target?.value)}
              onKeyPress={handleKeyPress}
              className="mb-2"
              autoFocus
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleCreateFolder}>
                Create
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setIsCreatingFolder(false);
                  setNewFolderName('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Folder List */}
        <div className="space-y-1">
          {folders?.map((folder) => (
            <div key={folder?.id}>
              <button
                onClick={() => onFolderSelect(folder?.id)}
                className={`w-full flex items-center justify-between p-2 rounded-md text-left transition-smooth ${
                  selectedFolder === folder?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <Icon name={folder?.icon} size={16} />
                  <span className="text-sm font-medium truncate">{folder?.name}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedFolder === folder?.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {folder?.count}
                </span>
              </button>

              {/* Subfolders */}
              {folder?.subfolders && selectedFolder === folder?.id && (
                <div className="ml-6 mt-1 space-y-1">
                  {folder?.subfolders?.map((subfolder) => (
                    <button
                      key={subfolder?.id}
                      onClick={() => onFolderSelect(subfolder?.id)}
                      className="w-full flex items-center justify-between p-2 rounded-md text-left hover:bg-muted/50 transition-smooth"
                    >
                      <span className="text-sm text-muted-foreground truncate">
                        {subfolder?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {subfolder?.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FolderNavigation;