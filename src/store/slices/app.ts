import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SortDirection = 'asc' | 'desc';

type DisplayMode = 'grid' | 'list';

type SidebarMode = 'expanded' | 'collapsed';

type StateProps = {
  data: {
    displayMode: DisplayMode;
    sortDirection: SortDirection;
    sidebarMode: SidebarMode;
  };
};

const initialState: StateProps = {
  data: {
    displayMode: 'grid',
    sortDirection: 'asc',
    sidebarMode: 'expanded'
  }
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDisplayMode: (state: StateProps, action: PayloadAction<DisplayMode>) => {
      state.data.displayMode = action.payload;
    },
    toggleSortDirection: (state: StateProps, action: PayloadAction<SortDirection>) => {
      state.data.sortDirection = action.payload;
    },
    toggleSidebarMode: (state: StateProps, action: PayloadAction<SidebarMode>) => {
      state.data.sidebarMode = action.payload;
    }
  }
});

export const { toggleDisplayMode, toggleSortDirection, toggleSidebarMode } = appSlice.actions;

export default appSlice.reducer;
