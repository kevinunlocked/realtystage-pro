import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import assetsReducer from './slices/assetsSlice';
import stagingReducer from './slices/stagingSlice';
import videoReducer from './slices/videoSlice';
import socialReducer from './slices/socialSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    assets: assetsReducer,
    staging: stagingReducer,
    video: videoReducer,
    social: socialReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['assets/uploadProgress', 'staging/generateProgress'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['assets.uploadProgress', 'staging.generateProgress'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

