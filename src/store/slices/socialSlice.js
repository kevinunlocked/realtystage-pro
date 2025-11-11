import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const fetchPosts = createAsyncThunk(
  'social/fetchPosts',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/social/posts', { params: filters });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
    }
  }
);

export const createPost = createAsyncThunk(
  'social/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await api.post('/social/posts', postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create post');
    }
  }
);

export const updatePost = createAsyncThunk(
  'social/updatePost',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/social/posts/${id}`, updates);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update post');
    }
  }
);

export const deletePost = createAsyncThunk(
  'social/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/social/posts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete post');
    }
  }
);

export const connectPlatform = createAsyncThunk(
  'social/connectPlatform',
  async (platform, { rejectWithValue }) => {
    try {
      const response = await api.post(`/social/connect/${platform}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to connect platform');
    }
  }
);

export const getPlatformStatus = createAsyncThunk(
  'social/getPlatformStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/social/platforms');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get platform status');
    }
  }
);

const initialState = {
  posts: [],
  platforms: [],
  loading: false,
  error: null,
  filters: {
    status: 'all',
    platform: 'all',
    dateRange: 'all',
  },
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: 'all',
        platform: 'all',
        dateRange: 'all',
      };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create post
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      // Update post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      // Delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      // Get platform status
      .addCase(getPlatformStatus.fulfilled, (state, action) => {
        state.platforms = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearError } = socialSlice.actions;
export default socialSlice.reducer;

