import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = () => {
  const activities = [
  {
    id: 1,
    type: 'video_complete',
    title: 'Video generation completed',
    description: 'Property tour video for 456 Maple Avenue is ready for review',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    user: {
      name: 'Sarah Johnson',
      avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      avatarAlt: 'Professional headshot of blonde woman in navy blazer smiling at camera'
    },
    actionUrl: '/video-generator',
    icon: 'Video',
    iconColor: 'bg-success'
  },
  {
    id: 2,
    type: 'staging_complete',
    title: 'AI staging completed',
    description: 'Modern living room staging for 789 Pine Street has been generated',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    user: {
      name: 'Michael Chen',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116b22d4e-1762273809021.png",
      avatarAlt: 'Professional headshot of Asian man with glasses in dark suit'
    },
    actionUrl: '/ai-staging-studio',
    icon: 'Wand2',
    iconColor: 'bg-primary'
  },
  {
    id: 3,
    type: 'asset_upload',
    title: 'Assets uploaded',
    description: '24 new property photos added to Sunset Villa project',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    user: {
      name: 'Emily Rodriguez',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1beb9fc75-1762273370028.png",
      avatarAlt: 'Professional headshot of Hispanic woman with dark hair in white blouse'
    },
    actionUrl: '/asset-library',
    icon: 'Upload',
    iconColor: 'bg-accent'
  },
  {
    id: 4,
    type: 'post_scheduled',
    title: 'Social media post scheduled',
    description: 'Instagram post for open house event scheduled for tomorrow 2:00 PM',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    user: {
      name: 'David Park',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_164c4dfea-1762274590921.png",
      avatarAlt: 'Professional headshot of Korean man with short black hair in gray suit'
    },
    actionUrl: '/social-media-scheduler',
    icon: 'Calendar',
    iconColor: 'bg-warning'
  },
  {
    id: 5,
    type: 'collaboration',
    title: 'Team collaboration',
    description: 'Jessica Martinez commented on luxury condo staging project',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    user: {
      name: 'Jessica Martinez',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_190332ac2-1762273805567.png",
      avatarAlt: 'Professional headshot of Latina woman with curly hair in burgundy blazer'
    },
    actionUrl: '/ai-staging-studio',
    icon: 'MessageCircle',
    iconColor: 'bg-secondary'
  }];


  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  return (
    <div className="bg-white border border-border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Activity" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        </div>
        <Link to="/analytics-dashboard">
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            View All Activity
          </button>
        </Link>
      </div>
      <div className="divide-y divide-border">
        {activities?.map((activity) =>
        <div key={activity?.id} className="p-6 hover:bg-muted/30 transition-smooth">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                    src={activity?.user?.avatar}
                    alt={activity?.user?.avatarAlt}
                    className="w-full h-full object-cover" />

                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${activity?.iconColor} flex items-center justify-center border-2 border-white`}>
                    <Icon name={activity?.icon} size={12} color="white" />
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium text-foreground">{activity?.user?.name}</span>
                      <span className="text-muted-foreground"> {activity?.title}</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatTimestamp(activity?.timestamp)}
                    </p>
                  </div>
                  {activity?.actionUrl &&
                <Link to={activity?.actionUrl}>
                      <button className="text-primary hover:text-primary/80 ml-4">
                        <Icon name="ArrowRight" size={16} />
                      </button>
                    </Link>
                }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {activities?.length === 0 &&
      <div className="p-8 text-center">
          <Icon name="Activity" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No recent activity</h3>
          <p className="text-muted-foreground">Activity from your team will appear here</p>
        </div>
      }
    </div>);

};

export default ActivityFeed;