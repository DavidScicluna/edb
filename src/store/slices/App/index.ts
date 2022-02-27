import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateProps, DisplayMode, SidebarMode } from './types';

const initialState: StateProps = {
	ui: {
		displayMode: 'grid',
		sidebarMode: 'expanded'
	},
	data: {
		hasLoadedIcons: false
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
		},
		toggleHasLoadedIcons: (state: StateProps, action: PayloadAction<boolean>) => {
			state.data.hasLoadedIcons = action.payload;
		}
	}
});

export const { toggleDisplayMode, toggleSidebarMode, toggleHasLoadedIcons } = appSlice.actions;

export default appSlice.reducer;
