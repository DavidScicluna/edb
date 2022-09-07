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
	Info,
	Search,
	MediaItems,
	List,
	// UserReview,
	// OtherReview,
	UserTheme,
	UserThemeColor
} from './types';

const colors: UserThemeColor[] = [
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

const color: UserThemeColor = sample(colors) || defaultColor;

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
				updatedAt: dayjs(new Date()).toISOString(),
				createdAt: dayjs(new Date()).toISOString(),
				results: {
					movies: [],
					tv: []
				}
			}
		],
		// reviews: {
		// 	user: [],
		// 	other: []
		// },
		signedInAt: dayjs().toISOString(),
		updatedAt: dayjs().toISOString(),
		createdAt: dayjs().toISOString()
	},
	ui: {
		theme: {
			color: color,
			colorMode: 'system'
		}
	}
};

// TODO: Set User Boring Avatar src on render if user is not logged in
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
		// reviews: {
		// 	user: [],
		// 	other: []
		// },
	},
	ui: {
		...defaultUser.ui,
		theme: {
			...defaultUser.ui.theme,
			color: color,
			colorMode: 'light'
		}
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

const updateUsers = memoize(({ users, user }: UpdateUsersProps): User[] => {
	return sort([...users.filter((u) => u.data.id !== user.data.id), user]).desc((u) => u.data.updatedAt);
});

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUser: (state: StateProps, action: PayloadAction<User>) => {
			state.data.activeUser = action.payload;
		},
		setUsers: (state: StateProps, action: PayloadAction<User[]>) => {
			state.data.users = action.payload;
		},
		setUserInfo: (state: StateProps, action: UserAction<Info>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });
			const updatedUser: User = {
				...user,
				data: {
					...user.data,
					info: {
						...user.data.info,
						...action.payload.data
					},
					updatedAt: dayjs().toISOString()
				}
			};

			state.data.users = updateUsers({
				users: state.data.users,
				user: { ...updatedUser }
			});

			if (state.data.activeUser.data.id === user.data.id) {
				state.data.activeUser = { ...updatedUser };
			}
		},
		setUserRecentSearches: (state: StateProps, action: UserAction<Search[]>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });
			const updatedUser: User = {
				...user,
				data: {
					...user.data,
					recentSearches: [...user.data.recentSearches, ...action.payload.data],
					updatedAt: dayjs().toISOString()
				}
			};

			state.data.users = updateUsers({
				users: state.data.users,
				user: { ...updatedUser }
			});

			if (state.data.activeUser.data.id === user.data.id) {
				state.data.activeUser = { ...updatedUser };
			}
		},
		setUserRecentlyViewed: (state: StateProps, action: UserAction<Omit<MediaItems, 'companies'>>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });
			const updatedUser: User = {
				...user,
				data: {
					...user.data,
					recentlyViewed: {
						...user.data.recentlyViewed,
						...action.payload.data
					},
					updatedAt: dayjs().toISOString()
				}
			};

			state.data.users = updateUsers({
				users: state.data.users,
				user: { ...updatedUser }
			});

			if (state.data.activeUser.data.id === user.data.id) {
				state.data.activeUser = { ...updatedUser };
			}
		},
		setUserLiked: (state: StateProps, action: UserAction<MediaItems>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });
			const updatedUser: User = {
				...user,
				data: {
					...user.data,
					liked: {
						...user.data.liked,
						...action.payload.data
					},
					updatedAt: dayjs().toISOString()
				}
			};

			state.data.users = updateUsers({
				users: state.data.users,
				user: { ...updatedUser }
			});

			if (state.data.activeUser.data.id === user.data.id) {
				state.data.activeUser = { ...updatedUser };
			}
		},
		// TODO: Maybe add more reducers to update specific lists with utils like user
		setUserLists: (state: StateProps, action: UserAction<List[]>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });
			const updatedUser: User = {
				...user,
				data: {
					...user.data,
					lists: [...user.data.lists, ...action.payload.data],
					updatedAt: dayjs().toISOString()
				}
			};

			state.data.users = updateUsers({
				users: state.data.users,
				user: { ...updatedUser }
			});

			if (state.data.activeUser.data.id === user.data.id) {
				state.data.activeUser = { ...updatedUser };
			}
		},
		// setUserReviews: (state: StateProps, action: UserAction<UserReview[]>) => {
		// const user = getUser({ users: state.data.users, user: action.payload.id });
		//
		// 	state.data.users = state.data.users.map((user) =>
		// 		user.data.id === action.payload.id
		// 			? {
		// 					...user,
		// 					data: {
		// 						...user.data,
		// 						reviews: {
		// 							...(user.data.reviews || {}),
		// 							user: [...action.payload.data],
		// 							other: [...(user.data.reviews?.other || [])]
		// 						}
		// 					}
		// 			  }
		// 			: { ...user }
		// 	);
		// },
		// setUserOtherReviews: (state: StateProps, action: UserAction<OtherReview[]>) => {
		// const user = getUser({ users: state.data.users, user: action.payload.id });
		//
		// 	state.data.users = state.data.users.map((user) =>
		// 		user.data.id === action.payload.id
		// 			? {
		// 					...user,
		// 					data: {
		// 						...user.data,
		// 						reviews: {
		// 							...(user.data.reviews || {}),
		// 							user: [...(user.data.reviews?.user || [])],
		// 							other: [...action.payload.data]
		// 						}
		// 					}
		// 			  }
		// 			: { ...user }
		// 	);
		// },
		setUserTheme: (state: StateProps, action: UserAction<UserTheme>) => {
			const user = getUser({ users: state.data.users, user: action.payload.id });
			const updatedUser: User = {
				...user,
				data: {
					...user.data,
					updatedAt: dayjs().toISOString()
				},
				ui: {
					...user.ui,
					theme: {
						...user.ui.theme,
						...action.payload.data
					}
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
});

export const {
	setUser,
	setUsers,
	setUserInfo,
	setUserRecentSearches,
	setUserRecentlyViewed,
	setUserLiked,
	setUserLists,
	// setUserReviews,
	// setUserOtherReviews,
	setUserTheme
} = usersSlice.actions;

export default usersSlice.reducer;
