import { ReactElement } from 'react';

import { useDispatch } from 'react-redux';
import sort from 'array-sort';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import range from 'lodash/range';


import { useSelector } from '../../../../../../common/hooks';
import Button from '../../../../../../components/Clickable/Button';
import Empty from '../../../../../../components/Empty';
import { defaultUser, getUser, setUserRecentSearches } from '../../../../../../store/slices/Users';
import { Search as SearchType } from '../../../../../../store/slices/Users/types';
import List from '../List';
import ListItem from '../List/components/ListItem';

import { RecentSearchesProps } from './types';
import Search from './components/Search';

const RecentSearches = ({ onSearchClick }: RecentSearchesProps): ReactElement => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.app.data.user);
	const recentSearches = useSelector(
		(state) =>
			getUser(state.users.data.users, state.app.data.user)?.data.recentSearches ||
			defaultUser.data.recentSearches ||
			[]
	);

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const isDisabled: boolean = isNil(user) || isEmpty(user);

	const handleClear = (): void => {
		dispatch(
			setUserRecentSearches({
				id: user || '',
				data: []
			})
		);
	};

	const handleDelete = (id: SearchType['id']): void => {
		dispatch(
			setUserRecentSearches({
				id: user || '',
				data: recentSearches.filter((search) => search.id !== id)
			})
		);
	};

	return (
		<List
			title='Recent Searches'
			actions={
				<Button
					color={color}
					isDisabled={isDisabled || recentSearches.length === 0}
					onClick={() => handleClear()}
					size='sm'
					variant='text'
				>
					Clear
				</Button>
			}
		>
			{recentSearches.length === 0 ? (
				<Empty hasIllustration={false} label='No recent searches found!' size='sm' />
			) : recentSearches.length > 0 ? (
				<>
					{sort([...recentSearches], 'date', { reverse: true }).map((search) => (
						<Search
							key={search.id}
							{...search}
							isDisabled={isDisabled}
							onDelete={handleDelete}
							onClick={onSearchClick}
						/>
					))}
				</>
			) : (
				<>
					{range(0, 5).map((_dummy, index) => (
						<ListItem
							key={index}
							id={String(index)}
							title={`Search ${index + 1}`}
							isLoading
							variant='transparent'
						/>
					))}
				</>
			)}
		</List>
	);
};

export default RecentSearches;
