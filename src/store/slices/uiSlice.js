import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarCollapsed: false,
  notifications: [],
  modals: {
    assetPreview: { open: false, asset: null },
    downloadOptions: { open: false, data: null },
    processingStatus: { open: false, job: null },
  },
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString(),
      };
      state.notifications.unshift(notification);
      // Keep only last 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50);
      }
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    openModal: (state, action) => {
      const { modal, data } = action.payload;
      if (state.modals[modal]) {
        state.modals[modal] = { open: true, ...data };
      }
    },
    closeModal: (state, action) => {
      const modal = action.payload;
      if (state.modals[modal]) {
        state.modals[modal] = { open: false, ...state.modals[modal] };
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  addNotification,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
  setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;

