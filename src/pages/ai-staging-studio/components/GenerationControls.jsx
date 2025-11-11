import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const GenerationControls = ({ 
  onGenerate, 
  isGenerating, 
  selectedStyle, 
  parameters,
  onParameterChange 
}) => {
  const [advancedMode, setAdvancedMode] = useState(false);

  const qualityOptions = [
    { value: 'standard', label: 'Standard Quality' },
    { value: 'high', label: 'High Quality' },
    { value: 'ultra', label: 'Ultra Quality (Slower)' }
  ];

  const resolutionOptions = [
    { value: '1024x768', label: '1024x768 (4:3)' },
    { value: '1920x1080', label: '1920x1080 (16:9)' },
    { value: '1080x1080', label: '1080x1080 (Square)' },
    { value: '1080x1350', label: '1080x1350 (Portrait)' }
  ];

  const aspectRatioOptions = [
    { value: 'original', label: 'Keep Original' },
    { value: '16:9', label: '16:9 (Widescreen)' },
    { value: '4:3', label: '4:3 (Standard)' },
    { value: '1:1', label: '1:1 (Square)' },
    { value: '4:5', label: '4:5 (Portrait)' }
  ];

  const seedOptions = [
    { value: 'random', label: 'Random Seed' },
    { value: 'fixed', label: 'Fixed Seed (Reproducible)' }
  ];

  const canGenerate = selectedStyle && !isGenerating;

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Generation Settings</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setAdvancedMode(!advancedMode)}
        >
          <Icon name={advancedMode ? 'ChevronUp' : 'ChevronDown'} size={16} />
          <span className="ml-1">{advancedMode ? 'Simple' : 'Advanced'}</span>
        </Button>
      </div>
      {/* Basic Settings */}
      <div className="space-y-4">
        {/* Quality Setting */}
        <div className="space-y-2">
          <Select
            label="Output Quality"
            description="Higher quality takes longer to generate"
            options={qualityOptions}
            value={parameters?.quality || 'standard'}
            onChange={(value) => onParameterChange('quality', value)}
          />
        </div>

        {/* Resolution Setting */}
        <div className="space-y-2">
          <Select
            label="Output Resolution"
            description="Choose the dimensions for your staged image"
            options={resolutionOptions}
            value={parameters?.resolution || '1920x1080'}
            onChange={(value) => onParameterChange('resolution', value)}
          />
        </div>

        {/* Style Strength */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Style Strength</label>
            <span className="text-sm text-muted-foreground">{parameters?.styleStrength || 70}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={parameters?.styleStrength || 70}
            onChange={(e) => onParameterChange('styleStrength', parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Subtle</span>
            <span>Strong</span>
          </div>
        </div>
      </div>
      {/* Advanced Settings */}
      {advancedMode && (
        <div className="space-y-4 pt-4 border-t border-border">
          <h4 className="font-medium text-foreground">Advanced Options</h4>

          {/* Aspect Ratio */}
          <div className="space-y-2">
            <Select
              label="Aspect Ratio"
              description="Adjust the image proportions"
              options={aspectRatioOptions}
              value={parameters?.aspectRatio || 'original'}
              onChange={(value) => onParameterChange('aspectRatio', value)}
            />
          </div>

          {/* Seed Setting */}
          <div className="space-y-2">
            <Select
              label="Generation Seed"
              description="Control randomness for reproducible results"
              options={seedOptions}
              value={parameters?.seedType || 'random'}
              onChange={(value) => onParameterChange('seedType', value)}
            />
          </div>

          {/* Creativity Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">AI Creativity</label>
              <span className="text-sm text-muted-foreground">{parameters?.creativity || 50}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={parameters?.creativity || 50}
              onChange={(e) => onParameterChange('creativity', parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Conservative</span>
              <span>Creative</span>
            </div>
          </div>

          {/* Detail Enhancement */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Detail Enhancement</label>
              <span className="text-sm text-muted-foreground">{parameters?.detailLevel || 60}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={parameters?.detailLevel || 60}
              onChange={(e) => onParameterChange('detailLevel', parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Basic</span>
              <span>Ultra Detail</span>
            </div>
          </div>

          {/* Lighting Adjustment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Lighting Enhancement</label>
              <span className="text-sm text-muted-foreground">{parameters?.lighting || 40}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={parameters?.lighting || 40}
              onChange={(e) => onParameterChange('lighting', parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Natural</span>
              <span>Enhanced</span>
            </div>
          </div>
        </div>
      )}
      {/* Generation Summary */}
      <div className="p-4 bg-muted/30 rounded-lg space-y-2">
        <h4 className="font-medium text-foreground">Generation Summary</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Style:</span>
            <span className="text-foreground">{selectedStyle?.name || 'None'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quality:</span>
            <span className="text-foreground capitalize">{parameters?.quality || 'Standard'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Resolution:</span>
            <span className="text-foreground">{parameters?.resolution || '1920x1080'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Est. Time:</span>
            <span className="text-foreground">
              {parameters?.quality === 'ultra' ? '60-90s' : 
               parameters?.quality === 'high' ? '45-60s' : '30-45s'}
            </span>
          </div>
        </div>
      </div>
      {/* Generate Button */}
      <div className="space-y-3">
        <Button
          onClick={onGenerate}
          disabled={!canGenerate}
          loading={isGenerating}
          fullWidth
          className="h-12"
        >
          {isGenerating ? (
            <>
              <Icon name="Loader2" size={20} className="animate-spin" />
              <span className="ml-2">Generating Staging...</span>
            </>
          ) : (
            <>
              <Icon name="Wand2" size={20} />
              <span className="ml-2">Generate AI Staging</span>
            </>
          )}
        </Button>

        {!selectedStyle && (
          <p className="text-sm text-muted-foreground text-center">
            Please select a staging style to continue
          </p>
        )}

        {isGenerating && (
          <div className="text-center space-y-2">
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-3/4 transition-smooth animate-pulse"></div>
            </div>
            <p className="text-xs text-muted-foreground">
              AI is analyzing your image and applying {selectedStyle?.name} styling...
            </p>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button variant="ghost" size="sm">
          <Icon name="RotateCcw" size={16} />
          <span className="ml-2">Reset Settings</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="Save" size={16} />
          <span className="ml-2">Save Preset</span>
        </Button>
      </div>
    </div>
  );
};

export default GenerationControls;