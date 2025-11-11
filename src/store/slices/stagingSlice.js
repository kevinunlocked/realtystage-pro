import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const generateStaging = createAsyncThunk(
  'staging/generateStaging',
  async ({ imageId, style, parameters }, { rejectWithValue }) => {
    try {
      const response = await api.post('/staging/generate', {
        imageId,
        style,
        parameters,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate staging');
    }
  }
);

export const getStagingStatus = createAsyncThunk(
  'staging/getStagingStatus',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/staging/status/${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get staging status');
    }
  }
);

export const fetchStagingProjects = createAsyncThunk(
  'staging/fetchStagingProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/staging/projects');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch staging projects');
    }
  }
);

const initialState = {
  projects: [],
  currentProject: null,
  selectedImage: null,
  selectedStyle: null,
  parameters: {
    intensity: 70,
    density: 60,
    colorScheme: 'neutral',
    roomType: 'living-room',
    quality: 'standard',
    resolution: '1920x1080',
    styleStrength: 70,
  },
  isGenerating: false,
  generatingProgress: 0,
  error: null,
};

const stagingSlice = createSlice({
  name: 'staging',
  initialState,
  reducers: {
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    setSelectedStyle: (state, action) => {
      state.selectedStyle = action.payload;
    },
    setParameters: (state, action) => {
      state.parameters = { ...state.parameters, ...action.payload };
    },
    setGeneratingProgress: (state, action) => {
      state.generatingProgress = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetStaging: (state) => {
      state.selectedImage = null;
      state.selectedStyle = null;
      state.currentProject = null;
      state.isGenerating = false;
      state.generatingProgress = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate staging
      .addCase(generateStaging.pending, (state) => {
        state.isGenerating = true;
        state.generatingProgress = 0;
        state.error = null;
      })
      .addCase(generateStaging.fulfilled, (state, action) => {
        state.isGenerating = false;
        state.generatingProgress = 100;
        state.currentProject = action.payload;
        state.projects.unshift(action.payload);
      })
      .addCase(generateStaging.rejected, (state, action) => {
        state.isGenerating = false;
        state.generatingProgress = 0;
        state.error = action.payload;
      })
      // Get staging status
      .addCase(getStagingStatus.fulfilled, (state, action) => {
        const { status, progress, result } = action.payload;
        state.generatingProgress = progress || 0;
        if (status === 'completed' && result) {
          state.isGenerating = false;
          state.currentProject = result;
        } else if (status === 'failed') {
          state.isGenerating = false;
          state.error = 'Staging generation failed';
        }
      })
      // Fetch staging projects
      .addCase(fetchStagingProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      });
  },
});

export const {
  setSelectedImage,
  setSelectedStyle,
  setParameters,
  setGeneratingProgress,
  clearError,
  resetStaging,
} = stagingSlice.actions;

export default stagingSlice.reducer;

