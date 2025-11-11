import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ContentCustomization = ({ template, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('script');
  const [scriptContent, setScriptContent] = useState({
    title: "Stunning Modern Home at 123 Oak Street",
    description: `Welcome to this breathtaking 4-bedroom, 3-bathroom contemporary home featuring an open floor plan and premium finishes throughout.\n\nHighlights include:\n• Gourmet kitchen with marble countertops\n• Spacious living areas with floor-to-ceiling windows\n• Master suite with luxury bathroom\n• Beautiful backyard with pool and patio\n\nSchedule your private showing today!`,
    callToAction: "Contact Sarah Johnson at (555) 123-4567 or visit our website for more details."
  });

  const [brandingSettings, setBrandingSettings] = useState({
    agentName: "Sarah Johnson",
    agentTitle: "Senior Real Estate Agent",
    brokerage: "Premier Properties Group",
    phone: "(555) 123-4567",
    email: "sarah@premierproperties.com",
    website: "www.premierproperties.com",
    logoUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1a5ee2dc5-1762803888393.png",
    logoAlt: "Premier Properties Group logo with modern typography and house icon",
    showLogo: true,
    showContactInfo: true,
    showWebsite: true
  });

  const [voiceoverSettings, setVoiceoverSettings] = useState({
    type: 'ai', // 'ai' or 'upload'
    voice: 'professional-female',
    speed: 1.0,
    pitch: 1.0,
    audioFile: null,
    useBackgroundMusic: true,
    musicVolume: 0.3,
    musicTrack: 'upbeat-modern'
  });

  const [musicTracks] = useState([
  { id: 'upbeat-modern', name: 'Upbeat Modern', duration: '2:30' },
  { id: 'elegant-classical', name: 'Elegant Classical', duration: '3:15' },
  { id: 'ambient-soft', name: 'Ambient Soft', duration: '2:45' },
  { id: 'corporate-inspiring', name: 'Corporate Inspiring', duration: '3:00' }]
  );

  const [aiVoices] = useState([
  { id: 'professional-female', name: 'Professional Female', accent: 'American' },
  { id: 'professional-male', name: 'Professional Male', accent: 'American' },
  { id: 'warm-female', name: 'Warm Female', accent: 'British' },
  { id: 'confident-male', name: 'Confident Male', accent: 'Canadian' }]
  );

  const tabs = [
  { id: 'script', label: 'Script & Content', icon: 'FileText' },
  { id: 'branding', label: 'Branding', icon: 'Palette' },
  { id: 'voiceover', label: 'Voiceover & Music', icon: 'Mic' }];


  const handleScriptUpdate = (field, value) => {
    const updatedScript = { ...scriptContent, [field]: value };
    setScriptContent(updatedScript);
    onUpdate?.({ script: updatedScript });
  };

  const handleBrandingUpdate = (field, value) => {
    const updatedBranding = { ...brandingSettings, [field]: value };
    setBrandingSettings(updatedBranding);
    onUpdate?.({ branding: updatedBranding });
  };

  const handleVoiceoverUpdate = (field, value) => {
    const updatedVoiceover = { ...voiceoverSettings, [field]: value };
    setVoiceoverSettings(updatedVoiceover);
    onUpdate?.({ voiceover: updatedVoiceover });
  };

  const generateAIScript = () => {
    // Simulate AI script generation
    const aiScript = `Discover your dream home at 123 Oak Street! This stunning 4-bedroom, 3-bathroom contemporary residence offers the perfect blend of luxury and comfort.\n\nStep inside to find an open-concept living space with soaring ceilings and abundant natural light. The gourmet kitchen features premium appliances, marble countertops, and a spacious island perfect for entertaining.\n\nThe master suite is a true retreat with a spa-like bathroom and walk-in closet. Three additional bedrooms provide flexibility for family, guests, or a home office.\n\nOutside, enjoy the beautifully landscaped backyard with a sparkling pool and covered patio - ideal for year-round entertaining.\n\nDon't miss this opportunity to own a piece of paradise. Schedule your private showing today!`;

    handleScriptUpdate('description', aiScript);
  };

  return (
    <div className="bg-white border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Content Customization</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Customize your video content, branding, and audio
        </p>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) =>
        <button
          key={tab?.id}
          onClick={() => setActiveTab(tab?.id)}
          className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-smooth ${
          activeTab === tab?.id ?
          'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'}`
          }>

            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        )}
      </div>
      {/* Tab Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {activeTab === 'script' &&
        <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Video Title</label>
                <Button
                variant="ghost"
                size="sm"
                onClick={generateAIScript}>

                  <Icon name="Wand2" size={14} />
                  <span className="ml-2">AI Generate</span>
                </Button>
              </div>
              <Input
              type="text"
              value={scriptContent?.title}
              onChange={(e) => handleScriptUpdate('title', e?.target?.value)}
              placeholder="Enter video title..." />

            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Property Description
              </label>
              <textarea
              value={scriptContent?.description}
              onChange={(e) => handleScriptUpdate('description', e?.target?.value)}
              placeholder="Describe the property features and highlights..."
              className="w-full h-32 px-3 py-2 border border-border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />

              <p className="text-xs text-muted-foreground mt-1">
                {scriptContent?.description?.length} characters
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Call to Action
              </label>
              <Input
              type="text"
              value={scriptContent?.callToAction}
              onChange={(e) => handleScriptUpdate('callToAction', e?.target?.value)}
              placeholder="Add your call to action..." />

            </div>

            <div className="bg-muted/30 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-2">Script Preview</h4>
              <div className="text-xs text-muted-foreground space-y-2">
                <p><strong>Title:</strong> {scriptContent?.title}</p>
                <p><strong>Description:</strong> {scriptContent?.description?.substring(0, 100)}...</p>
                <p><strong>CTA:</strong> {scriptContent?.callToAction}</p>
              </div>
            </div>
          </div>
        }

        {activeTab === 'branding' &&
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
              label="Agent Name"
              type="text"
              value={brandingSettings?.agentName}
              onChange={(e) => handleBrandingUpdate('agentName', e?.target?.value)} />

              <Input
              label="Agent Title"
              type="text"
              value={brandingSettings?.agentTitle}
              onChange={(e) => handleBrandingUpdate('agentTitle', e?.target?.value)} />

            </div>

            <Input
            label="Brokerage Name"
            type="text"
            value={brandingSettings?.brokerage}
            onChange={(e) => handleBrandingUpdate('brokerage', e?.target?.value)} />


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
              label="Phone Number"
              type="tel"
              value={brandingSettings?.phone}
              onChange={(e) => handleBrandingUpdate('phone', e?.target?.value)} />

              <Input
              label="Email Address"
              type="email"
              value={brandingSettings?.email}
              onChange={(e) => handleBrandingUpdate('email', e?.target?.value)} />

            </div>

            <Input
            label="Website URL"
            type="url"
            value={brandingSettings?.website}
            onChange={(e) => handleBrandingUpdate('website', e?.target?.value)} />


            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Display Options</h4>
              <Checkbox
              label="Show logo in video"
              checked={brandingSettings?.showLogo}
              onChange={(e) => handleBrandingUpdate('showLogo', e?.target?.checked)} />

              <Checkbox
              label="Show contact information"
              checked={brandingSettings?.showContactInfo}
              onChange={(e) => handleBrandingUpdate('showContactInfo', e?.target?.checked)} />

              <Checkbox
              label="Show website URL"
              checked={brandingSettings?.showWebsite}
              onChange={(e) => handleBrandingUpdate('showWebsite', e?.target?.checked)} />

            </div>

            <div className="bg-muted/30 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-2">Branding Preview</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>{brandingSettings?.agentName} - {brandingSettings?.agentTitle}</p>
                <p>{brandingSettings?.brokerage}</p>
                <p>{brandingSettings?.phone} • {brandingSettings?.email}</p>
                <p>{brandingSettings?.website}</p>
              </div>
            </div>
          </div>
        }

        {activeTab === 'voiceover' &&
        <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Voiceover Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                variant={voiceoverSettings?.type === 'ai' ? 'default' : 'outline'}
                onClick={() => handleVoiceoverUpdate('type', 'ai')}
                className="justify-start">

                  <Icon name="Bot" size={16} />
                  <span className="ml-2">AI Generated</span>
                </Button>
                <Button
                variant={voiceoverSettings?.type === 'upload' ? 'default' : 'outline'}
                onClick={() => handleVoiceoverUpdate('type', 'upload')}
                className="justify-start">

                  <Icon name="Upload" size={16} />
                  <span className="ml-2">Upload Audio</span>
                </Button>
              </div>
            </div>

            {voiceoverSettings?.type === 'ai' &&
          <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    AI Voice Selection
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {aiVoices?.map((voice) =>
                <Button
                  key={voice?.id}
                  variant={voiceoverSettings?.voice === voice?.id ? 'default' : 'outline'}
                  onClick={() => handleVoiceoverUpdate('voice', voice?.id)}
                  className="justify-between">

                        <span>{voice?.name}</span>
                        <span className="text-xs opacity-70">{voice?.accent}</span>
                      </Button>
                )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Speed: {voiceoverSettings?.speed}x
                    </label>
                    <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={voiceoverSettings?.speed}
                  onChange={(e) => handleVoiceoverUpdate('speed', parseFloat(e?.target?.value))}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer" />

                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Pitch: {voiceoverSettings?.pitch}x
                    </label>
                    <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={voiceoverSettings?.pitch}
                  onChange={(e) => handleVoiceoverUpdate('pitch', parseFloat(e?.target?.value))}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer" />

                  </div>
                </div>
              </div>
          }

            {voiceoverSettings?.type === 'upload' &&
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-foreground mb-1">Upload Audio File</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Supported formats: MP3, WAV, M4A (Max 10MB)
                </p>
                <Button size="sm">
                  <Icon name="Upload" size={14} />
                  <span className="ml-2">Choose File</span>
                </Button>
              </div>
          }

            <div className="space-y-3">
              <Checkbox
              label="Add background music"
              checked={voiceoverSettings?.useBackgroundMusic}
              onChange={(e) => handleVoiceoverUpdate('useBackgroundMusic', e?.target?.checked)} />


              {voiceoverSettings?.useBackgroundMusic &&
            <div className="ml-6 space-y-3">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Music Track
                    </label>
                    <div className="space-y-2">
                      {musicTracks?.map((track) =>
                  <Button
                    key={track?.id}
                    variant={voiceoverSettings?.musicTrack === track?.id ? 'default' : 'outline'}
                    onClick={() => handleVoiceoverUpdate('musicTrack', track?.id)}
                    className="w-full justify-between"
                    size="sm">

                          <span>{track?.name}</span>
                          <span className="text-xs opacity-70">{track?.duration}</span>
                        </Button>
                  )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Music Volume: {Math.round(voiceoverSettings?.musicVolume * 100)}%
                    </label>
                    <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={voiceoverSettings?.musicVolume}
                  onChange={(e) => handleVoiceoverUpdate('musicVolume', parseFloat(e?.target?.value))}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer" />

                  </div>
                </div>
            }
            </div>
          </div>
        }
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm">
            <Icon name="RotateCcw" size={14} />
            <span className="ml-2">Reset to Default</span>
          </Button>
          <Button size="sm">
            <Icon name="Save" size={14} />
            <span className="ml-2">Save Settings</span>
          </Button>
        </div>
      </div>
    </div>);

};

export default ContentCustomization;