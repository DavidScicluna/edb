import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateProps, DisplayMode, SidebarMode } from './types';

const initialState: StateProps = {
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
    toggleSidebarMode: (state: StateProps, action: PayloadAction<SidebarMode>) => {
      state.ui.sidebarMode = action.payload;
    }
  }
});

export const { toggleDisplayMode, toggleSidebarMode } = appSlice.actions;

export default appSlice.reducer;
