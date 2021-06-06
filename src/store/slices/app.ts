import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SortDirection = 'asc' | 'desc';

type DisplayMode = 'grid' | 'list';

type StateProps = {
  data: {
    displayMode: DisplayMode;
    sortDirection: SortDirection;
  };
};

const initialState: StateProps = {
  data: {
    displayMode: 'grid',
    sortDirection: 'asc'
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
    }
  }
});

export const { toggleDisplayMode, toggleSortDirection } = appSlice.actions;

export default appSlice.reducer;
