import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { StateProps, UserAction, User, Info, Search, MediaItems, List, UserReview, OtherReview, Theme } from './types';

export const defaultUser: User = {
	data: {
		id: uuid(),
		info: {
			name: 'Guest',
			username: 'guest'
		},
		recentSearches: [],
		recentlyViewed: {
			movies: [],
			tv: [],
			people: [],
			companies: [],
			collections: []
		},
		liked: {
			movies: [],
			tv: [],
			people: [],
			companies: [],
			collections: []
		},
		lists: [
			{
				id: uuid(),
				label: 'Watchlist',
				description:
					"A collection of movies and tv shows that I'm looking forward to watching and hopefully re-watch 🥳 🤓",
				date: moment(new Date()).toISOString(),
				results: {
					movies: [],
					tv: []
				}
			}
		],
		reviews: {
			user: [],
			other: []
		}
	},
	ui: {
		theme: {
			color: 'blue',
			background: 'light'
		}
	}
};

const initialState: StateProps = {
	data: {
		users: [
			// TODO: Remove this
			{ ...defaultUser }
		]
	}
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUsers: (state: StateProps, action: PayloadAction<User[]>) => {
			state.data.users = action.payload;
		},
		setUserInfo: (state: StateProps, action: UserAction<Info>) => {
			state.data.users = state.data.users.map((user) =>
				user.data.id === action.payload.id
					? {
							...user,
							data: {
								...user.data,
								info: {
									...user.data.info,
									...action.payload.data
								}
							}
					  }
					: { ...user }
			);
		},
		setUserRecentSearches: (state: StateProps, action: UserAction<Search[]>) => {
			state.data.users = state.data.users.map((user) =>
				user.data.id === action.payload.id
					? {
							...user,
							data: {
								...user.data,
								recentSearches: [...user.data.recentSearches, ...action.payload.data]
							}
					  }
					: { ...user }
			);
		},
		setUserRecentlyViewed: (state: StateProps, action: UserAction<MediaItems>) => {
			state.data.users = state.data.users.map((user) =>
				user.data.id === action.payload.id
					? {
							...user,
							data: {
								...user.data,
								recentlyViewed: {
									...user.data.recentlyViewed,
									...action.payload.data
								}
							}
					  }
					: { ...user }
			);
		},
		setUserLiked: (state: StateProps, action: UserAction<MediaItems>) => {
			state.data.users = state.data.users.map((user) =>
				user.data.id === action.payload.id
					? {
							...user,
							data: {
								...user.data,
								liked: {
									...user.data.liked,
									...action.payload.data
								}
							}
					  }
					: { ...user }
			);
		},
		setUserLists: (state: StateProps, action: UserAction<List[]>) => {
			state.data.users = state.data.users.map((user) =>
				user.data.id === action.payload.id
					? {
							...user,
							data: {
								...user.data,
								lists: [...user.data.lists, ...action.payload.data]
							}
					  }
					: { ...user }
			);
		},
		setUserReviews: (state: StateProps, action: UserAction<UserReview[]>) => {
			state.data.users = state.data.users.map((user) =>
				user.data.id === action.payload.id
					? {
							...user,
							data: {
								...user.data,
								reviews: {
									...user.data.reviews,
									user: [...user.data.reviews.user, ...action.payload.data]
								}
							}
					  }
					: { ...user }
			);
		},
		setUserOtherReviews: (state: StateProps, action: UserAction<OtherReview[]>) => {
			state.data.users = state.data.users.map((user) =>
				user.data.id === action.payload.id
					? {
							...user,
							data: {
								...user.data,
								reviews: {
									...user.data.reviews,
									other: [...user.data.reviews.other, ...action.payload.data]
								}
							}
					  }
					: { ...user }
			);
		},
		setUserTheme: (state: StateProps, action: UserAction<Theme>) => {
			state.data.users = state.data.users.map((user) =>
				user.data.id === action.payload.id
					? {
							...user,
							ui: {
								...user.ui,
								theme: {
									...user.ui.theme,
									...action.payload.data
								}
							}
					  }
					: { ...user }
			);
		}
	}
});

export const getUser = (users: User[], id?: string): User | undefined => {
	return users.find((user) => user.data.id === id);
};

export const {
	setUsers,
	setUserInfo,
	setUserRecentSearches,
	setUserRecentlyViewed,
	setUserLiked,
	setUserLists,
	setUserReviews,
	setUserOtherReviews,
	setUserTheme
} = usersSlice.actions;

export default usersSlice.reducer;
