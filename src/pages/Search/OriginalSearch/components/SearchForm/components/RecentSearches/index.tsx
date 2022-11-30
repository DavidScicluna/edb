import { FC } from 'react';

import { Button, AnimatePresence } from '@davidscicluna/component-library';

import { useDispatch } from 'react-redux';
import { sort } from 'fast-sort';

import { useSelector, useUserTheme } from '../../../../../../../common/hooks';
import { setUserRecentSearches } from '../../../../../../../store/slices/Users';
import List from '../SearchList';

import { RecentSearchesProps } from './types';
import RecentSearch from './components/RecentSearch';

const RecentSearches: FC<RecentSearchesProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const dispatch = useDispatch();
	// TODO: Go over all useSelector and see if we are not getting data from user double
	// example: one for ID an one for recentSearches instead of consolidated in one
	const {
		data: { id: activeUserID, recentSearches: allRecentSearches = [] }
	} = useSelector((state) => state.users.data.activeUser);

	return (
		<List
			title='Recent Searches'
			actions={
				<Button
					color={color}
					colorMode={colorMode}
					onClick={() => dispatch(setUserRecentSearches({ id: activeUserID, data: [] }))}
					size='xs'
					variant='text'
				>
					Clear
				</Button>
			}
		>
			<AnimatePresence>
				{sort([...allRecentSearches])
					.desc(({ searchedAt }) => searchedAt)
					.map((search) => (
						<RecentSearch {...props} {...search} key={search.id} />
					))}
			</AnimatePresence>
		</List>
	);
};

export default RecentSearches;
