import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterControls = ({ onFiltersChange, savedViews, onSaveView, onLoadView }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '30days',
    teamMember: 'all',
    propertyType: 'all',
    campaign: 'all',
    platform: 'all',
    contentType: 'all'
  });
  const [viewName, setViewName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: '6months', label: 'Last 6 months' },
    { value: '1year', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const teamMemberOptions = [
    { value: 'all', label: 'All Team Members' },
    { value: 'sarah-johnson', label: 'Sarah Johnson' },
    { value: 'mike-chen', label: 'Mike Chen' },
    { value: 'emily-davis', label: 'Emily Davis' },
    { value: 'david-wilson', label: 'David Wilson' },
    { value: 'lisa-martinez', label: 'Lisa Martinez' }
  ];

  const propertyTypeOptions = [
    { value: 'all', label: 'All Property Types' },
    { value: 'single-family', label: 'Single Family' },
    { value: 'condo', label: 'Condominium' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'luxury', label: 'Luxury Homes' },
    { value: 'commercial', label: 'Commercial' }
  ];

  const campaignOptions = [
    { value: 'all', label: 'All Campaigns' },
    { value: 'spring-listings', label: 'Spring Listings 2024' },
    { value: 'luxury-showcase', label: 'Luxury Showcase' },
    { value: 'first-time-buyers', label: 'First Time Buyers' },
    { value: 'investment-properties', label: 'Investment Properties' },
    { value: 'downtown-condos', label: 'Downtown Condos' }
  ];

  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'snapchat', label: 'Snapchat' },
    { value: 'linkedin', label: 'LinkedIn' }
  ];

  const contentTypeOptions = [
    { value: 'all', label: 'All Content Types' },
    { value: 'photos', label: 'Property Photos' },
    { value: 'videos', label: 'Video Tours' },
    { value: 'staged', label: 'Staged Content' },
    { value: 'stories', label: 'Stories' },
    { value: 'reels', label: 'Reels/Short Videos' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: '30days',
      teamMember: 'all',
      propertyType: 'all',
      campaign: 'all',
      platform: 'all',
      contentType: 'all'
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const handleSaveView = () => {
    if (viewName?.trim()) {
      onSaveView?.({
        name: viewName,
        filters: filters,
        createdAt: new Date()?.toISOString()
      });
      setViewName('');
      setShowSaveDialog(false);
    }
  };

  const activeFiltersCount = Object.values(filters)?.filter(value => value !== 'all' && value !== '30days')?.length;

  return (
    <div className="bg-white border border-border rounded-lg shadow-elevation-1">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              iconPosition="left"
            >
              Filters & Views
            </Button>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                {activeFiltersCount} active
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {savedViews && savedViews?.length > 0 && (
              <Select
                options={[
                  { value: '', label: 'Load saved view...' },
                  ...savedViews?.map(view => ({ value: view?.id, label: view?.name }))
                ]}
                value=""
                onChange={(value) => value && onLoadView?.(value)}
                className="w-48"
              />
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSaveDialog(true)}
              iconName="Save"
            >
              Save View
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              iconName="RotateCcw"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />

            <Select
              label="Team Member"
              options={teamMemberOptions}
              value={filters?.teamMember}
              onChange={(value) => handleFilterChange('teamMember', value)}
            />

            <Select
              label="Property Type"
              options={propertyTypeOptions}
              value={filters?.propertyType}
              onChange={(value) => handleFilterChange('propertyType', value)}
            />

            <Select
              label="Campaign"
              options={campaignOptions}
              value={filters?.campaign}
              onChange={(value) => handleFilterChange('campaign', value)}
            />

            <Select
              label="Platform"
              options={platformOptions}
              value={filters?.platform}
              onChange={(value) => handleFilterChange('platform', value)}
            />

            <Select
              label="Content Type"
              options={contentTypeOptions}
              value={filters?.contentType}
              onChange={(value) => handleFilterChange('contentType', value)}
            />
          </div>

          {filters?.dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <Input
                type="date"
                label="Start Date"
                placeholder="Select start date"
              />
              <Input
                type="date"
                label="End Date"
                placeholder="Select end date"
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              {activeFiltersCount > 0 ? (
                `${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} applied`
              ) : (
                'No filters applied - showing all data'
              )}
            </div>
            <Button
              onClick={() => onFiltersChange?.(filters)}
              iconName="Search"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
      {/* Save View Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md bg-white rounded-lg shadow-elevation-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Save Current View</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSaveDialog(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="space-y-4">
              <Input
                label="View Name"
                type="text"
                placeholder="Enter a name for this view"
                value={viewName}
                onChange={(e) => setViewName(e?.target?.value)}
              />
              <div className="text-sm text-muted-foreground">
                This will save your current filter settings for quick access later.
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSaveDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveView}
                  disabled={!viewName?.trim()}
                  className="flex-1"
                >
                  Save View
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;