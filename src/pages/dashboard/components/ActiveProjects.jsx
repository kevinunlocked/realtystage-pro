import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActiveProjects = () => {
  const projects = [
  {
    id: 1,
    name: 'Luxury Downtown Condo',
    address: '123 Main Street, Unit 4B',
    status: 'staging',
    progress: 75,
    thumbnail: "https://images.unsplash.com/photo-1631049307729-d5db33d15ed1",
    thumbnailAlt: 'Modern luxury condo living room with floor-to-ceiling windows and city view',
    assignedTo: [
    {
      name: 'Sarah Johnson',
      avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      avatarAlt: 'Professional headshot of blonde woman in navy blazer'
    },
    {
      name: 'Michael Chen',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116b22d4e-1762273809021.png",
      avatarAlt: 'Professional headshot of Asian man with glasses in dark suit'
    }],

    dueDate: '2025-11-15',
    priority: 'high'
  },
  {
    id: 2,
    name: 'Suburban Family Home',
    address: '456 Oak Avenue',
    status: 'video_production',
    progress: 45,
    thumbnail: "https://images.unsplash.com/photo-1616028818795-bd415328672e",
    thumbnailAlt: 'Two-story suburban house with white exterior and front porch',
    assignedTo: [
    {
      name: 'Emily Rodriguez',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1beb9fc75-1762273370028.png",
      avatarAlt: 'Professional headshot of Hispanic woman with dark hair in white blouse'
    }],

    dueDate: '2025-11-18',
    priority: 'medium'
  },
  {
    id: 3,
    name: 'Waterfront Villa',
    address: '789 Seaside Drive',
    status: 'content_creation',
    progress: 90,
    thumbnail: "https://images.unsplash.com/photo-1711445783255-572fd321aaba",
    thumbnailAlt: 'Elegant waterfront villa with large windows and outdoor deck overlooking water',
    assignedTo: [
    {
      name: 'David Park',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_164c4dfea-1762274590921.png",
      avatarAlt: 'Professional headshot of Korean man with short black hair in gray suit'
    },
    {
      name: 'Jessica Martinez',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_190332ac2-1762273805567.png",
      avatarAlt: 'Professional headshot of Latina woman with curly hair in burgundy blazer'
    },
    {
      name: 'Alex Thompson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bda5fa76-1762273523770.png",
      avatarAlt: 'Professional headshot of young man with brown hair in light blue shirt'
    }],

    dueDate: '2025-11-12',
    priority: 'high'
  }];


  const getStatusInfo = (status) => {
    switch (status) {
      case 'staging':
        return { label: 'AI Staging', color: 'bg-primary', icon: 'Wand2' };
      case 'video_production':
        return { label: 'Video Production', color: 'bg-warning', icon: 'Video' };
      case 'content_creation':
        return { label: 'Content Creation', color: 'bg-accent', icon: 'Edit3' };
      default:
        return { label: 'In Progress', color: 'bg-muted', icon: 'Clock' };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':return 'text-error';
      case 'medium':return 'text-warning';
      case 'low':return 'text-success';
      default:return 'text-muted-foreground';
    }
  };

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays > 0) return `Due in ${diffDays} days`;
    return `Overdue by ${Math.abs(diffDays)} days`;
  };

  return (
    <div className="bg-white border border-border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="FolderOpen" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Active Projects</h2>
        </div>
        <Link to="/asset-library">
          <Button variant="outline" size="sm">
            View All Projects
          </Button>
        </Link>
      </div>
      <div className="p-6 space-y-6">
        {projects?.map((project) => {
          const statusInfo = getStatusInfo(project?.status);
          return (
            <div
              key={project?.id}
              className="border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth">

              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={project?.thumbnail}
                    alt={project?.thumbnailAlt}
                    className="w-full h-full object-cover" />

                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground truncate">
                        {project?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {project?.address}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`text-xs font-medium ${getPriorityColor(project?.priority)}`}>
                        {project?.priority?.toUpperCase()}
                      </span>
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreHorizontal" size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusInfo?.color} text-white`}>
                      <Icon name={statusInfo?.icon} size={12} />
                      <span className="text-xs font-medium">{statusInfo?.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDueDate(project?.dueDate)}
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-medium text-foreground">{project?.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-smooth"
                        style={{ width: `${project?.progress}%` }} />

                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">Assigned to:</span>
                      <div className="flex -space-x-2">
                        {project?.assignedTo?.slice(0, 3)?.map((member, index) =>
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                          title={member?.name}>

                            <Image
                            src={member?.avatar}
                            alt={member?.avatarAlt}
                            className="w-full h-full object-cover" />

                          </div>
                        )}
                        {project?.assignedTo?.length > 3 &&
                        <div className="w-6 h-6 rounded-full border-2 border-white bg-muted flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">
                              +{project?.assignedTo?.length - 3}
                            </span>
                          </div>
                        }
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                      <Icon name="ArrowRight" size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>);

        })}
      </div>
      {projects?.length === 0 &&
      <div className="p-8 text-center">
          <Icon name="FolderOpen" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No active projects</h3>
          <p className="text-muted-foreground mb-4">Start a new project to see it here</p>
          <Link to="/asset-library">
            <Button>
              <Icon name="Plus" size={16} />
              <span className="ml-2">Create Project</span>
            </Button>
          </Link>
        </div>
      }
    </div>);

};

export default ActiveProjects;