import { sort } from 'fast-sort';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { memoize, sample } from 'lodash';
import { v4 as uuid } from 'uuid';

import { color as defaultColor } from '../../../common/data/defaultPropValues';

import {
	GetUserProps,
	UpdateUsersProps,
	StateProps,
	UserAction,
	User,
	Users,
	UserInfo,
	UserSearches,
	MediaItems,
	UserLists,
	UserRecentlyViewed,
	UserReviewsMediaItems,
	OtherReviews,
	UserLanguage,
	UserThemeColor,
	UserThemeColors,
	UserTheme,
	UserCredentials
} from './types';

const colors: UserThemeColors = [
	'pink',
	'purple',
	'deep_purple',
	'indigo',
	'blue',
	'light_blue',
	'cyan',
	'teal',
	'light_green',
	'lime',
	'orange',
	'deep_orange'
];

const guestColor: UserThemeColor = sample(colors) || defaultColor;

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
			bio: '',
			avatar_path: '',
			background_path: '',
			prefers: {
				movie: [],
				tv: []
			}
		},
		recentSearches: [],
		recentlyViewed: {
			movie: [],
			tv: [],
			person: [],
			collection: []
		},
		liked: {
			movie: [],
			tv: [],
			person: [],
			company: [],
			collection: []
		},
		lists: [
			{
				id: 'ds-edb-user-lists-watchlist',
				label: 'Watchlist',
				description:
					"A collection of movies and tv shows that I'm looking forward to watching and hopefully re-watch 🥳 🤓",
				updatedAt: dayjs(new Date()).toISOString(),
				createdAt: dayjs(new Date()).toISOString(),
				mediaItems: {
					movie: [],
					tv: []
				}
			}
		],
		reviews: {
			user: { movie: [], tv: [] },
			other: []
		},
		signedInAt: dayjs(new Date()).toISOString(),
		updatedAt: dayjs(new Date()).toISOString(),
		createdAt: dayjs(new Date()).toISOString()
	},
	ui: {
		language: {
			english_name: 'English',
			iso_639_1: 'en',
			name: 'English'
		},
		theme: {
			color: guestColor,
			colorMode: 'system'
		}
	}
};

export const guest: User = {
	...defaultUser,
	data: {
		...defaultUser.data,
		id: 'ds-edb-guest-user',
		info: {
			...defaultUser.data.info,
			name: 'Guest',
			avatar_path:
				'https://source.boringavatars.com/beam/500/ds-edb-guest-user?colors=%23ef5350%2C%23ec407a%2C%23ab47bc%2C%237e57c2%2C%235c6bc0%2C%2342a5f5%2C%2329b6f6%2C%2326c6da%2C%2326a69a%2C%2366bb6a%2C%239ccc65%2C%23d4e157%2C%23ffca28%2C%23ffa726%2C%23ff7043&square=true'
		},
		lists: []
	}
};

const initialState: StateProps = {
	data: {
		activeUser: { ...guest },
		users: []
	}
};

const getUser = memoize(({ users, user }: GetUserProps): User => {
	return users.find((u) => u.data.id === user) || { ...guest };
});

const updateUsers = memoize(({ users, user }: UpdateUsersProps): Users => {
	return sort([...users.filter((u) => u.data.id !== user.data.id), user]).desc((u) => u.data.updatedAt);
});

const usersSlice = createSlice({
	name: 'users',
	initialState: { ...initialState },
	reducers: {
		setUser: (state: StateProps, action: PayloadAction<User>) => {
			state.data.activeUser = action.payload;
		},
		setUsers: (state: StateProps, action: PayloadAction<Users>) => {
			state.data.users = action.payload;
		},
		setUserCredentials: (state: StateProps, action: UserAction<UserCredentials>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });

			if (user.data.id !== guest.data.id) {
				const updatedUser: User = {
					...user,
					data: {
						...user.data,
						credentials: { ...action.payload.data },
						updatedAt: dayjs(new Date()).toISOString()
					}
				};

				state.data.users = updateUsers({
					users: state.data.users,
					user: { ...updatedUser }
				});

				if (state.data.activeUser.data.id === user.data.id) {
					state.data.activeUser = { ...updatedUser };
				}
			}
		},
		setUserInfo: (state: StateProps, action: UserAction<UserInfo>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });

			if (user.data.id !== guest.data.id) {
				const updatedUser: User = {
					...user,
					data: {
						...user.data,
						info: { ...action.payload.data },
						updatedAt: dayjs(new Date()).toISOString()
					}
				};

				state.data.users = updateUsers({
					users: state.data.users,
					user: { ...updatedUser }
				});

				if (state.data.activeUser.data.id === user.data.id) {
					state.data.activeUser = { ...updatedUser };
				}
			}
		},
		setUserRecentSearches: (state: StateProps, action: UserAction<UserSearches>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });

			if (user.data.id !== guest.data.id) {
				const updatedUser: User = {
					...user,
					data: {
						...user.data,
						recentSearches: [...action.payload.data],
						updatedAt: dayjs(new Date()).toISOString()
					}
				};

				state.data.users = updateUsers({
					users: state.data.users,
					user: { ...updatedUser }
				});

				if (state.data.activeUser.data.id === user.data.id) {
					state.data.activeUser = { ...updatedUser };
				}
			}
		},
		setUserRecentlyViewed: (state: StateProps, action: UserAction<UserRecentlyViewed>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });

			if (user.data.id !== guest.data.id) {
				const updatedUser: User = {
					...user,
					data: {
						...user.data,
						recentlyViewed: { ...action.payload.data },
						updatedAt: dayjs(new Date()).toISOString()
					}
				};

				state.data.users = updateUsers({
					users: state.data.users,
					user: { ...updatedUser }
				});

				if (state.data.activeUser.data.id === user.data.id) {
					state.data.activeUser = { ...updatedUser };
				}
			}
		},
		setUserLiked: (state: StateProps, action: UserAction<MediaItems>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });

			if (user.data.id !== guest.data.id) {
				const updatedUser: User = {
					...user,
					data: {
						...user.data,
						liked: { ...action.payload.data },
						updatedAt: dayjs(new Date()).toISOString()
					}
				};

				state.data.users = updateUsers({
					users: state.data.users,
					user: { ...updatedUser }
				});

				if (state.data.activeUser.data.id === user.data.id) {
					state.data.activeUser = { ...updatedUser };
				}
			}
		},
		setUserLists: (state: StateProps, action: UserAction<UserLists>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });

			if (user.data.id !== guest.data.id) {
				const updatedUser: User = {
					...user,
					data: {
						...user.data,
						lists: [...action.payload.data],
						updatedAt: dayjs(new Date()).toISOString()
					}
				};

				state.data.users = updateUsers({
					users: state.data.users,
					user: { ...updatedUser }
				});

				if (state.data.activeUser.data.id === user.data.id) {
					state.data.activeUser = { ...updatedUser };
				}
			}
		},
		setMovieUserReviews: (state: StateProps, action: UserAction<UserReviewsMediaItems<'movie'>>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });

			if (user.data.id !== guest.data.id) {
				const updatedUser: User = {
					...user,
					data: {
						...user.data,
						reviews: {
							...user.data.reviews,
							user: {
								...user.data.reviews.user,
								movie: [...action.payload.data]
							}
						},
						updatedAt: dayjs(new Date()).toISOString()
					}
				};

				state.data.users = updateUsers({
					users: state.data.users,
					user: { ...updatedUser }
				});

				if (state.data.activeUser.data.id === user.data.id) {
					state.data.activeUser = { ...updatedUser };
				}
			}
		},
		setTVShowUserReviews: (state: StateProps, action: UserAction<UserReviewsMediaItems<'tv'>>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });

			if (user.data.id !== guest.data.id) {
				const updatedUser: User = {
					...user,
					data: {
						...user.data,
						reviews: {
							...user.data.reviews,
							user: {
								...user.data.reviews.user,
								tv: [...action.payload.data]
							}
						},
						updatedAt: dayjs(new Date()).toISOString()
					}
				};

				state.data.users = updateUsers({
					users: state.data.users,
					user: { ...updatedUser }
				});

				if (state.data.activeUser.data.id === user.data.id) {
					state.data.activeUser = { ...updatedUser };
				}
			}
		},
		setUserOtherReviews: (state: StateProps, action: UserAction<OtherReviews>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });

			if (user.data.id !== guest.data.id) {
				const updatedUser: User = {
					...user,
					data: {
						...user.data,
						reviews: { ...user.data.reviews, other: [...action.payload.data] },
						updatedAt: dayjs(new Date()).toISOString()
					}
				};

				state.data.users = updateUsers({
					users: state.data.users,
					user: { ...updatedUser }
				});

				if (state.data.activeUser.data.id === user.data.id) {
					state.data.activeUser = { ...updatedUser };
				}
			}
		},
		setUserLanguage: (state: StateProps, action: UserAction<UserLanguage>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });

			if (user.data.id !== guest.data.id) {
				const updatedUser: User = {
					...user,
					data: {
						...user.data,
						updatedAt: dayjs(new Date()).toISOString()
					},
					ui: {
						...user.ui,
						language: { ...action.payload.data }
					}
				};

				state.data.users = updateUsers({
					users: state.data.users,
					user: { ...updatedUser }
				});

				if (state.data.activeUser.data.id === user.data.id) {
					state.data.activeUser = { ...updatedUser };
				}
			} else {
				const updatedUser: User = {
					...user,
					ui: {
						...user.ui,
						language: { ...action.payload.data },
						theme: {
							...user.ui.theme,
							color: user.ui.theme.color
						}
					}
				};

				state.data.activeUser = { ...updatedUser };
			}
		},
		setUserTheme: (state: StateProps, action: UserAction<UserTheme>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });

			if (user.data.id !== guest.data.id) {
				const updatedUser: User = {
					...user,
					data: {
						...user.data,
						updatedAt: dayjs(new Date()).toISOString()
					},
					ui: {
						...user.ui,
						theme: { ...action.payload.data }
					}
				};

				state.data.users = updateUsers({
					users: state.data.users,
					user: { ...updatedUser }
				});

				if (state.data.activeUser.data.id === user.data.id) {
					state.data.activeUser = { ...updatedUser };
				}
			}
		}
	}
});

export const {
	setUser,
	setUsers,
	setUserCredentials,
	setUserInfo,
	setUserRecentSearches,
	setUserRecentlyViewed,
	setUserLiked,
	setUserLists,
	setMovieUserReviews,
	setTVShowUserReviews,
	setUserOtherReviews,
	setUserLanguage,
	setUserTheme
} = usersSlice.actions;

export default usersSlice.reducer;
