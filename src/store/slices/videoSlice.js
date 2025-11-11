import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const createVideoProject = createAsyncThunk(
  'video/createVideoProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await api.post('/videos', projectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create video project');
    }
  }
);

export const generateVideo = createAsyncThunk(
  'video/generateVideo',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/videos/${projectId}/generate`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate video');
    }
  }
);

export const getVideoStatus = createAsyncThunk(
  'video/getVideoStatus',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/videos/${projectId}/status`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get video status');
    }
  }
);

export const fetchVideoProjects = createAsyncThunk(
  'video/fetchVideoProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/videos');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch video projects');
    }
  }
);

const initialState = {
  projects: [],
  currentProject: null,
  selectedTemplate: null,
  selectedAssets: [],
  isGenerating: false,
  generatingProgress: 0,
  error: null,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
    setSelectedAssets: (state, action) => {
      state.selectedAssets = action.payload;
    },
    addAsset: (state, action) => {
      if (!state.selectedAssets.find((a) => a.id === action.payload.id)) {
        state.selectedAssets.push(action.payload);
      }
    },
    removeAsset: (state, action) => {
      state.selectedAssets = state.selectedAssets.filter((a) => a.id !== action.payload);
    },
    setGeneratingProgress: (state, action) => {
      state.generatingProgress = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetVideo: (state) => {
      state.selectedTemplate = null;
      state.selectedAssets = [];
      state.currentProject = null;
      state.isGenerating = false;
      state.generatingProgress = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create video project
      .addCase(createVideoProject.fulfilled, (state, action) => {
        state.currentProject = action.payload;
        state.projects.unshift(action.payload);
      })
      // Generate video
      .addCase(generateVideo.pending, (state) => {
        state.isGenerating = true;
        state.generatingProgress = 0;
        state.error = null;
      })
      .addCase(generateVideo.fulfilled, (state, action) => {
        state.isGenerating = false;
        state.generatingProgress = 100;
        state.currentProject = action.payload;
      })
      .addCase(generateVideo.rejected, (state, action) => {
        state.isGenerating = false;
        state.generatingProgress = 0;
        state.error = action.payload;
      })
      // Get video status
      .addCase(getVideoStatus.fulfilled, (state, action) => {
        const { status, progress, result } = action.payload;
        state.generatingProgress = progress || 0;
        if (status === 'completed' && result) {
          state.isGenerating = false;
          state.currentProject = result;
        } else if (status === 'failed') {
          state.isGenerating = false;
          state.error = 'Video generation failed';
        }
      })
      // Fetch video projects
      .addCase(fetchVideoProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      });
  },
});

export const {
  setSelectedTemplate,
  setSelectedAssets,
  addAsset,
  removeAsset,
  setGeneratingProgress,
  clearError,
  resetVideo,
} = videoSlice.actions;

export default videoSlice.reducer;

