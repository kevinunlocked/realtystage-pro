import api from './api';

export const assetService = {
  // Get all assets with optional filters
  getAssets: async (filters = {}) => {
    const response = await api.get('/assets', { params: filters });
    return response.data;
  },

  // Upload asset
  uploadAsset: async (file, metadata = {}, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata.property) formData.append('property', metadata.property);
    if (metadata.tags) formData.append('tags', JSON.stringify(metadata.tags));
    if (metadata.folder) formData.append('folder', metadata.folder);

    const response = await api.post('/assets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
    return response.data;
  },

  // Get asset by ID
  getAsset: async (id) => {
    const response = await api.get(`/assets/${id}`);
    return response.data;
  },

  // Update asset metadata
  updateAsset: async (id, updates) => {
    const response = await api.put(`/assets/${id}`, updates);
    return response.data;
  },

  // Delete asset
  deleteAsset: async (id) => {
    const response = await api.delete(`/assets/${id}`);
    return response.data;
  },

  // Search assets
  searchAssets: async (query) => {
    const response = await api.get('/assets/search', { params: { q: query } });
    return response.data;
  },

  // Bulk operations
  bulkDelete: async (assetIds) => {
    const response = await api.post('/assets/bulk/delete', { assetIds });
    return response.data;
  },

  bulkTag: async (assetIds, tags) => {
    const response = await api.post('/assets/bulk/tags', { assetIds, tags });
    return response.data;
  },

  // Get folders
  getFolders: async () => {
    const response = await api.get('/assets/folders');
    return response.data;
  },

  // Create folder
  createFolder: async (folderName) => {
    const response = await api.post('/assets/folders', { name: folderName });
    return response.data;
  },
};

