import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateProps, Search } from './types';

const initialState: StateProps = {
  data: {
    recentSearches: []
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRecentSearches: (state: StateProps, action: PayloadAction<Search[]>) => {
      state.data.recentSearches = action.payload;
    }
  }
});

export const { setRecentSearches } = userSlice.actions;

export default userSlice.reducer;
