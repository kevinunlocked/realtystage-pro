import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const ApprovalWorkflow = ({ onApprovePost, onRejectPost, onRequestRevision }) => {
  const [filterStatus, setFilterStatus] = useState('pending');
  const [selectedPost, setSelectedPost] = useState(null);

  const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'revision', label: 'Needs Revision' }];


  const pendingPosts = [
  {
    id: 1,
    title: 'Luxury Downtown Condo - Open House',
    creator: 'Sarah Johnson',
    creatorAvatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    creatorAvatarAlt: 'Professional headshot of Sarah Johnson, blonde woman in navy blazer',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    platforms: ['instagram', 'facebook'],
    scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    status: 'pending',
    priority: 'high',
    thumbnail: "https://images.unsplash.com/photo-1586129006413-0fb04715aef4",
    thumbnailAlt: 'Modern luxury condo interior with floor-to-ceiling windows and city skyline view',
    caption: `🏢 OPEN HOUSE THIS WEEKEND! \n\nStep into luxury at this stunning downtown condo featuring:\n✨ Floor-to-ceiling windows\n✨ Premium finishes throughout\n✨ Breathtaking city views\n✨ Modern kitchen with top-tier appliances\n\nSaturday & Sunday 2-4 PM\n📍 123 Downtown Plaza, Unit 2501\n\n#LuxuryLiving #OpenHouse #DowntownCondo #CityViews #ModernLiving #RealEstate #DreamHome`,
    hashtags: '#LuxuryLiving #OpenHouse #DowntownCondo #CityViews #ModernLiving #RealEstate #DreamHome',
    comments: [
    {
      id: 1,
      author: 'Mike Chen',
      authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116b22d4e-1762273809021.png",
      authorAvatarAlt: 'Professional headshot of Mike Chen, Asian man with glasses in dark suit',
      content: 'Caption looks great! Maybe add the price range for better lead qualification?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'suggestion'
    }]

  },
  {
    id: 2,
    title: 'Before & After Staging Transformation',
    creator: 'David Martinez',
    creatorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f1bc9bb8-1762273361706.png",
    creatorAvatarAlt: 'Professional headshot of David Martinez, Hispanic man with beard in blue shirt',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    platforms: ['tiktok', 'instagram'],
    scheduledDate: new Date(Date.now() + 12 * 60 * 60 * 1000),
    status: 'revision',
    priority: 'medium',
    thumbnail: "https://images.unsplash.com/photo-1721274503100-29fa72a4b4ec",
    thumbnailAlt: 'Split screen showing empty room transformation to beautifully staged living space with modern furniture',
    caption: `The power of professional staging! 🪄\n\nWatch this empty space transform into a buyer's dream. Our staging team works magic to help properties sell faster and for top dollar.\n\n#Staging #BeforeAndAfter #RealEstateMarketing #PropertyTransformation #HomeSelling`,
    hashtags: '#Staging #BeforeAndAfter #RealEstateMarketing #PropertyTransformation #HomeSelling',
    comments: [
    {
      id: 2,
      author: 'Lisa Thompson', authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11b715d60-1762273834012.png", authorAvatarAlt: 'Professional headshot of Lisa Thompson, woman with short brown hair in white blouse', content: 'Love the concept! Can we add our company branding more prominently in the video?', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), type: 'revision'
    }]

  },
  {
    id: 3,
    title: 'Market Update - Q4 2024 Trends', creator: 'Jennifer Lee', creatorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19dc77a7e-1762274545448.png", creatorAvatarAlt: 'Professional headshot of Jennifer Lee, Asian woman with long black hair in gray blazer',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    platforms: ['facebook', 'instagram'],
    scheduledDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
    status: 'approved', priority: 'low', thumbnail: "https://images.unsplash.com/photo-1649003515353-c58a239cf662", thumbnailAlt: 'Professional chart and graphs showing real estate market data and trends on computer screen',
    caption: `📊 Q4 2024 Market Update\n\nKey insights for buyers and sellers:\n• Average home prices up 3.2% YoY\n• Inventory levels stabilizing\n• Interest rates showing signs of moderation\n• Best opportunities in suburban markets\n\nReady to make your move? Let's discuss your goals!\n\n#MarketUpdate #RealEstateData #Q4Trends #BuyersMarket #PropertyInvestment`,
    hashtags: '#MarketUpdate #RealEstateData #Q4Trends #BuyersMarket #PropertyInvestment',
    comments: []
  }];


  const filteredPosts = pendingPosts?.filter((post) =>
  filterStatus === 'all' || post?.status === filterStatus
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'approved':
        return 'text-success bg-success/10';
      case 'rejected':
        return 'text-error bg-error/10';
      case 'revision':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return 'Clock';
      case 'approved':
        return 'CheckCircle';
      case 'rejected':
        return 'XCircle';
      case 'revision':
        return 'Edit';
      default:
        return 'Circle';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleApprove = (postId) => {
    onApprovePost?.(postId);
    setSelectedPost(null);
  };

  const handleReject = (postId) => {
    onRejectPost?.(postId);
    setSelectedPost(null);
  };

  const handleRequestRevision = (postId, comment) => {
    onRequestRevision?.(postId, comment);
    setSelectedPost(null);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className="bg-white border border-border rounded-lg shadow-elevation-1">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-foreground">Approval Workflow</h2>
          <span className="bg-warning text-warning-foreground text-xs px-2 py-1 rounded-full">
            {filteredPosts?.filter((p) => p?.status === 'pending')?.length} pending
          </span>
        </div>
        <Select
          options={statusOptions}
          value={filterStatus}
          onChange={setFilterStatus}
          className="w-40" />

      </div>
      {/* Posts List */}
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {filteredPosts?.length === 0 ?
        <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">All caught up!</h3>
            <p className="text-muted-foreground">
              No posts require approval at this time
            </p>
          </div> :

        filteredPosts?.map((post) =>
        <div key={post?.id} className="p-4 hover:bg-muted/30 transition-smooth">
              <div className="flex items-start space-x-4">
                {/* Thumbnail */}
                <Image
              src={post?.thumbnail}
              alt={post?.thumbnailAlt}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />


                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {post?.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Image
                      src={post?.creatorAvatar}
                      alt={post?.creatorAvatarAlt}
                      className="w-4 h-4 rounded-full" />

                        <span className="text-xs text-muted-foreground">
                          by {post?.creator}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(post?.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      <Icon
                    name="AlertCircle"
                    size={14}
                    className={getPriorityColor(post?.priority)} />

                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post?.status)}`}>
                        <Icon name={getStatusIcon(post?.status)} size={10} className="mr-1" />
                        {post?.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post?.caption}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {/* Platforms */}
                      <div className="flex items-center space-x-1">
                        {post?.platforms?.map((platform) =>
                    <div
                      key={platform}
                      className="w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                      title={platform}>

                            <Icon name="Share" size={10} color="white" />
                          </div>
                    )}
                      </div>

                      {/* Schedule */}
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Icon name="Calendar" size={12} className="mr-1" />
                        {post?.scheduledDate?.toLocaleDateString()}
                      </div>

                      {/* Comments */}
                      {post?.comments?.length > 0 &&
                  <div className="flex items-center text-xs text-muted-foreground">
                          <Icon name="MessageCircle" size={12} className="mr-1" />
                          {post?.comments?.length} comment{post?.comments?.length !== 1 ? 's' : ''}
                        </div>
                  }
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-1">
                      <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPost(post)}
                    className="p-1">

                        <Icon name="Eye" size={14} />
                      </Button>
                      
                      {post?.status === 'pending' &&
                  <>
                          <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRequestRevision(post?.id)}
                      className="p-1 text-primary hover:text-primary">

                            <Icon name="Edit" size={14} />
                          </Button>
                          <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReject(post?.id)}
                      className="p-1 text-error hover:text-error">

                            <Icon name="X" size={14} />
                          </Button>
                          <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleApprove(post?.id)}
                      className="p-1 text-success hover:text-success">

                            <Icon name="Check" size={14} />
                          </Button>
                        </>
                  }
                    </div>
                  </div>

                  {/* Comments Preview */}
                  {post?.comments?.length > 0 &&
              <div className="mt-3 pt-3 border-t border-border">
                      {post?.comments?.slice(0, 2)?.map((comment) =>
                <div key={comment?.id} className="flex items-start space-x-2 mb-2">
                          <Image
                    src={comment?.authorAvatar}
                    alt={comment?.authorAvatarAlt}
                    className="w-6 h-6 rounded-full flex-shrink-0" />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-medium text-foreground">
                                {comment?.author}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatTimeAgo(comment?.timestamp)}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {comment?.content}
                            </p>
                          </div>
                        </div>
                )}
                    </div>
              }
                </div>
              </div>
            </div>
        )
        }
      </div>
      {/* Footer */}
      {filteredPosts?.length > 0 &&
      <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filteredPosts?.length} posts in workflow</span>
            <div className="flex items-center space-x-4">
              <span>{filteredPosts?.filter((p) => p?.status === 'pending')?.length} pending</span>
              <span>{filteredPosts?.filter((p) => p?.status === 'approved')?.length} approved</span>
              <span>{filteredPosts?.filter((p) => p?.status === 'revision')?.length} need revision</span>
            </div>
          </div>
        </div>
      }
      {/* Post Detail Modal */}
      {selectedPost &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-elevation-2 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Review Post</h3>
              <Button variant="ghost" onClick={() => setSelectedPost(null)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                <Image
                src={selectedPost?.thumbnail}
                alt={selectedPost?.thumbnailAlt}
                className="w-full h-48 object-cover rounded-lg" />

                
                <div>
                  <h4 className="font-medium text-foreground mb-2">{selectedPost?.title}</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {selectedPost?.caption}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-muted/30">
              <div className="flex items-center justify-end space-x-2">
                <Button variant="outline" onClick={() => handleRequestRevision(selectedPost?.id)}>
                  Request Revision
                </Button>
                <Button variant="outline" onClick={() => handleReject(selectedPost?.id)}>
                  Reject
                </Button>
                <Button onClick={() => handleApprove(selectedPost?.id)}>
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default ApprovalWorkflow;