import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateProps, DisplayMode, SortDirection, SidebarMode } from './types';

const initialState: StateProps = {
  data: {
    sortDirection: 'desc'
  },
  ui: {
    displayMode: 'grid',
    sidebarMode: 'expanded'
  }
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDisplayMode: (state: StateProps, action: PayloadAction<DisplayMode>) => {
      state.ui.displayMode = action.payload;
    },
    toggleSortDirection: (state: StateProps, action: PayloadAction<SortDirection>) => {
      state.data.sortDirection = action.payload;
    },
    toggleSidebarMode: (state: StateProps, action: PayloadAction<SidebarMode>) => {
      state.ui.sidebarMode = action.payload;
    }
  }
});

export const { toggleDisplayMode, toggleSortDirection, toggleSidebarMode } = appSlice.actions;

export default appSlice.reducer;
