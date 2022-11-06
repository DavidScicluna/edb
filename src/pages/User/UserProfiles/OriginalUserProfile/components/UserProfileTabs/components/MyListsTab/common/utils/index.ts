import { Undefinable } from '@davidscicluna/component-library';

import { memoize } from 'lodash';

import { UserList } from '../../../../../../../../../../store/slices/Users/types';

export const getListTotal = memoize(({ mediaItems: { movie = [], tv = [] } }: UserList): number => {
	return movie.length + tv.length;
});

type GetListProps = { lists: UserList[]; list: UserList };

export const getListIndex = memoize(({ lists = [], list }: GetListProps): number => {
	return lists.findIndex(({ id }) => id === list.id) + 1;
});

export const getList = memoize(({ lists = [], list }: GetListProps): Undefinable<UserList> => {
	return lists.find(({ id }) => id === list.id);
});
