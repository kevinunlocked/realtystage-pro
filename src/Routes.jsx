import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AssetLibrary from './pages/asset-library';
import AnalyticsDashboard from './pages/analytics-dashboard';
import AIStagingStudio from './pages/ai-staging-studio';
import VideoGenerator from './pages/video-generator';
import SocialMediaScheduler from './pages/social-media-scheduler';
import Dashboard from './pages/dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/asset-library" element={<AssetLibrary />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/ai-staging-studio" element={<AIStagingStudio />} />
        <Route path="/video-generator" element={<VideoGenerator />} />
        <Route path="/social-media-scheduler" element={<SocialMediaScheduler />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
