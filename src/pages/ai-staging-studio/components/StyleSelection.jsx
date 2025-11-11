import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const StyleSelectionPanel = ({ selectedStyle, onStyleSelect, onParameterChange, parameters }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const stagingStyles = [
  {
    id: 'modern',
    name: 'Modern',
    category: 'contemporary',
    description: 'Clean lines, neutral colors, minimalist furniture',
    preview: "https://images.unsplash.com/photo-1721614463238-c327d3d42ccf",
    previewAlt: 'Modern living room with sleek furniture, neutral tones, and clean geometric lines',
    popularity: 95,
    tags: ['minimalist', 'neutral', 'sleek']
  },
  {
    id: 'luxury',
    name: 'Luxury',
    category: 'upscale',
    description: 'Premium materials, rich textures, elegant details',
    preview: "https://images.unsplash.com/photo-1663169250337-85a70596c09e",
    previewAlt: 'Luxury bedroom with velvet headboard, gold accents, and premium bedding',
    popularity: 88,
    tags: ['premium', 'elegant', 'rich']
  },
  {
    id: 'rustic',
    name: 'Rustic',
    category: 'traditional',
    description: 'Natural wood, warm tones, cozy atmosphere',
    preview: "https://images.unsplash.com/photo-1725905803121-dd123b058a5c",
    previewAlt: 'Rustic kitchen with wooden cabinets, stone countertops, and warm lighting',
    popularity: 76,
    tags: ['natural', 'warm', 'cozy']
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    category: 'contemporary',
    description: 'Essential furniture only, maximum space, clean aesthetic',
    preview: "https://images.unsplash.com/photo-1722606489534-b8e70547cdec",
    previewAlt: 'Minimalist dining room with simple white table, few chairs, and abundant natural light',
    popularity: 82,
    tags: ['simple', 'spacious', 'clean']
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    category: 'contemporary',
    description: 'Light woods, white walls, functional design',
    preview: "https://images.unsplash.com/photo-1722248242695-4c0ab9769dbe",
    previewAlt: 'Scandinavian living room with light wood furniture, white walls, and cozy textiles',
    popularity: 79,
    tags: ['light', 'functional', 'cozy']
  },
  {
    id: 'industrial',
    name: 'Industrial',
    category: 'modern',
    description: 'Metal accents, exposed elements, urban feel',
    preview: "https://images.unsplash.com/photo-1701912236298-3f9ae9b49443",
    previewAlt: 'Industrial bedroom with metal bed frame, exposed brick wall, and urban lighting',
    popularity: 71,
    tags: ['metal', 'urban', 'exposed']
  }];


  const categories = [
  { id: 'all', name: 'All Styles', icon: 'Grid3x3' },
  { id: 'contemporary', name: 'Contemporary', icon: 'Square' },
  { id: 'traditional', name: 'Traditional', icon: 'Home' },
  { id: 'upscale', name: 'Upscale', icon: 'Crown' },
  { id: 'modern', name: 'Modern', icon: 'Zap' }];


  const filteredStyles = activeCategory === 'all' ?
  stagingStyles :
  stagingStyles?.filter((style) => style?.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Style Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) =>
          <Button
            key={category?.id}
            variant={activeCategory === category?.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(category?.id)}
            className="flex items-center space-x-2">

              <Icon name={category?.icon} size={14} />
              <span>{category?.name}</span>
            </Button>
          )}
        </div>
      </div>
      {/* Style Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Choose Staging Style</h3>
          <span className="text-sm text-muted-foreground">
            {filteredStyles?.length} styles available
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStyles?.map((style) =>
          <div
            key={style?.id}
            className={`relative border rounded-lg overflow-hidden cursor-pointer transition-smooth ${
            selectedStyle?.id === style?.id ?
            'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-border hover:border-primary/50 hover:shadow-elevation-1'}`
            }
            onClick={() => onStyleSelect(style)}>

              {/* Preview Image */}
              <div className="aspect-video bg-muted">
                <Image
                src={style?.preview}
                alt={style?.previewAlt}
                className="w-full h-full object-cover" />

              </div>

              {/* Style Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{style?.name}</h4>
                    <p className="text-sm text-muted-foreground">{style?.description}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="TrendingUp" size={12} />
                    <span>{style?.popularity}%</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {style?.tags?.map((tag) =>
                <span
                  key={tag}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">

                      {tag}
                    </span>
                )}
                </div>

                {/* Selection Indicator */}
                {selectedStyle?.id === style?.id &&
              <div className="flex items-center space-x-2 text-primary">
                    <Icon name="CheckCircle" size={16} />
                    <span className="text-sm font-medium">Selected</span>
                  </div>
              }
              </div>

              {/* Popularity Badge */}
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                {style?.popularity}% popular
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Style Parameters */}
      {selectedStyle &&
      <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium text-foreground">Customization Options</h4>
          
          {/* Style Intensity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Style Intensity</label>
              <span className="text-sm text-muted-foreground">{parameters?.intensity}%</span>
            </div>
            <input
            type="range"
            min="20"
            max="100"
            value={parameters?.intensity}
            onChange={(e) => onParameterChange('intensity', parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider" />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Subtle</span>
              <span>Bold</span>
            </div>
          </div>

          {/* Furniture Density */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Furniture Density</label>
              <span className="text-sm text-muted-foreground">{parameters?.density}%</span>
            </div>
            <input
            type="range"
            min="30"
            max="90"
            value={parameters?.density}
            onChange={(e) => onParameterChange('density', parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider" />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Minimal</span>
              <span>Full</span>
            </div>
          </div>

          {/* Color Scheme */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Color Scheme</label>
            <div className="grid grid-cols-3 gap-2">
              {['neutral', 'warm', 'cool']?.map((scheme) =>
            <Button
              key={scheme}
              variant={parameters?.colorScheme === scheme ? 'default' : 'outline'}
              size="sm"
              onClick={() => onParameterChange('colorScheme', scheme)}
              className="capitalize">

                  {scheme}
                </Button>
            )}
            </div>
          </div>

          {/* Room Type Hint */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Room Type</label>
            <div className="grid grid-cols-2 gap-2">
              {['living-room', 'bedroom', 'kitchen', 'dining-room']?.map((room) =>
            <Button
              key={room}
              variant={parameters?.roomType === room ? 'default' : 'outline'}
              size="sm"
              onClick={() => onParameterChange('roomType', room)}
              className="capitalize text-xs">

                  {room?.replace('-', ' ')}
                </Button>
            )}
            </div>
          </div>
        </div>
      }
    </div>);

};

export default StyleSelectionPanel;