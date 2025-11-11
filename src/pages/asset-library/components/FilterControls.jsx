import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterControls = ({ 
  searchQuery, 
  onSearchChange, 
  selectedFilters, 
  onFilterChange,
  onClearFilters 
}) => {
  const propertyTypeOptions = [
    { value: 'all', label: 'All Property Types' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'condo', label: 'Condominium' },
    { value: 'townhouse', label: 'Townhouse' }
  ];

  const fileFormatOptions = [
    { value: 'all', label: 'All Formats' },
    { value: 'image', label: 'Images (JPG, PNG)' },
    { value: 'video', label: 'Videos (MP4, MOV)' },
    { value: 'document', label: 'Documents (PDF, DOC)' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' }
  ];

  const tagOptions = [
    { value: 'all', label: 'All Tags' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'living-room', label: 'Living Room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'bathroom', label: 'Bathroom' },
    { value: 'exterior', label: 'Exterior' },
    { value: 'modern', label: 'Modern' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'staged', label: 'Staged' }
  ];

  const hasActiveFilters = selectedFilters?.propertyType !== 'all' || 
                          selectedFilters?.fileFormat !== 'all' || 
                          selectedFilters?.dateRange !== 'all' || 
                          selectedFilters?.tag !== 'all';

  return (
    <div className="bg-white border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search assets by name, property, or AI tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Select
            options={propertyTypeOptions}
            value={selectedFilters?.propertyType}
            onChange={(value) => onFilterChange('propertyType', value)}
            placeholder="Property Type"
            className="w-40"
          />

          <Select
            options={fileFormatOptions}
            value={selectedFilters?.fileFormat}
            onChange={(value) => onFilterChange('fileFormat', value)}
            placeholder="File Format"
            className="w-40"
          />

          <Select
            options={dateRangeOptions}
            value={selectedFilters?.dateRange}
            onChange={(value) => onFilterChange('dateRange', value)}
            placeholder="Date Range"
            className="w-36"
          />

          <Select
            options={tagOptions}
            value={selectedFilters?.tag}
            onChange={(value) => onFilterChange('tag', value)}
            placeholder="AI Tags"
            className="w-32"
          />

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} />
              <span className="ml-1">Clear</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterControls;