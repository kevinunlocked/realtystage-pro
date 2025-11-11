import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { assetService } from '../../services/assetService';

// Async thunks
export const fetchAssets = createAsyncThunk(
  'assets/fetchAssets',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await assetService.getAssets(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch assets');
    }
  }
);

export const uploadAsset = createAsyncThunk(
  'assets/uploadAsset',
  async ({ file, metadata, onProgress }, { rejectWithValue }) => {
    try {
      const data = await assetService.uploadAsset(file, metadata, onProgress);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload asset');
    }
  }
);

export const deleteAsset = createAsyncThunk(
  'assets/deleteAsset',
  async (id, { rejectWithValue }) => {
    try {
      await assetService.deleteAsset(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete asset');
    }
  }
);

export const updateAsset = createAsyncThunk(
  'assets/updateAsset',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const data = await assetService.updateAsset(id, updates);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update asset');
    }
  }
);

export const searchAssets = createAsyncThunk(
  'assets/searchAssets',
  async (query, { rejectWithValue }) => {
    try {
      const data = await assetService.searchAssets(query);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search assets');
    }
  }
);

const initialState = {
  assets: [],
  folders: [],
  selectedAssets: [],
  filters: {
    propertyType: 'all',
    fileFormat: 'all',
    dateRange: 'all',
    tag: 'all',
    searchQuery: '',
  },
  loading: false,
  uploading: false,
  uploadProgress: 0,
  error: null,
  viewMode: 'grid',
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setSelectedAssets: (state, action) => {
      state.selectedAssets = action.payload;
    },
    toggleAssetSelection: (state, action) => {
      const assetId = action.payload;
      const index = state.selectedAssets.indexOf(assetId);
      if (index > -1) {
        state.selectedAssets.splice(index, 1);
      } else {
        state.selectedAssets.push(assetId);
      }
    },
    clearSelection: (state) => {
      state.selectedAssets = [];
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        propertyType: 'all',
        fileFormat: 'all',
        dateRange: 'all',
        tag: 'all',
        searchQuery: '',
      };
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch assets
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Upload asset
      .addCase(uploadAsset.pending, (state) => {
        state.uploading = true;
        state.uploadProgress = 0;
        state.error = null;
      })
      .addCase(uploadAsset.fulfilled, (state, action) => {
        state.uploading = false;
        state.uploadProgress = 100;
        state.assets.unshift(action.payload);
      })
      .addCase(uploadAsset.rejected, (state, action) => {
        state.uploading = false;
        state.uploadProgress = 0;
        state.error = action.payload;
      })
      // Delete asset
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.assets = state.assets.filter((asset) => asset.id !== action.payload);
        state.selectedAssets = state.selectedAssets.filter((id) => id !== action.payload);
      })
      // Update asset
      .addCase(updateAsset.fulfilled, (state, action) => {
        const index = state.assets.findIndex((asset) => asset.id === action.payload.id);
        if (index !== -1) {
          state.assets[index] = action.payload;
        }
      });
  },
});

export const {
  setSelectedAssets,
  toggleAssetSelection,
  clearSelection,
  setFilters,
  clearFilters,
  setViewMode,
  setUploadProgress,
  clearError,
} = assetsSlice.actions;

export default assetsSlice.reducer;

