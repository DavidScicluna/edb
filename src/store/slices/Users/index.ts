import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

import { StateProps, UserAction, User, Info, Search, MediaItems, List, UserReview, OtherReview, Theme } from './types';

export const guest: User = {
	data: {
		id: 'guest',
		credentials: {
			username: 'guest',
			password: '',
			rememberMe: false
		},
		info: {
			name: 'Guest',
			avatar_path: '',
			background_path: ''
		}
	},
	ui: {
		theme: {
			color: 'light_blue',
			colorMode: 'light'
		}
	}
};

export const defaultUser: User = {
	data: {
		id: uuid(),
		credentials: {
			username: '',
			password: '',
			rememberMe: false
		},
		info: {
			name: '',
			avatar_path: '',
			background_path: ''
		},
		recentSearches: [],
		recentlyViewed: {
			movies: [],
			tv: [],
			people: [],
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
				date: dayjs(new Date()).toISOString(),
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
			color: 'light_blue',
			colorMode: 'light'
		}
	}
};

const initialState: StateProps = {
	data: {
		users: [guest]
	}
};

console.log(initialState);
console.log(guest.data.id);

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
								recentSearches: [...(user.data.recentSearches || []), ...action.payload.data]
							}
					  }
					: { ...user }
			);
		},
		setUserRecentlyViewed: (state: StateProps, action: UserAction<Omit<MediaItems, 'companies'>>) => {
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
								lists: [...(user.data.lists || []), ...action.payload.data]
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
									...(user.data.reviews || {}),
									user: [...action.payload.data],
									other: [...(user.data.reviews?.other || [])]
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
									...(user.data.reviews || {}),
									user: [...(user.data.reviews?.user || [])],
									other: [...action.payload.data]
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
