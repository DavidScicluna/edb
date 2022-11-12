import { FC } from 'react';

import { SimpleGrid } from '@chakra-ui/react';

import { sort } from 'fast-sort';

import { useSelector } from '../../../../../../../../../../../common/hooks';
import { getListIndex, getListTotal } from '../../common/utils';
import { UserList } from '../../../../../../../../../../../store/slices/Users/types';

import ListActions from './components/ListActions';
import List from './components/List';
import { MyListsTabAllTabProps } from './types';

const MyListsTabAllTab: FC<MyListsTabAllTabProps> = (props) => {
	const lists = useSelector((state) => state.users.data.activeUser.data.lists || []);

	const {
		selectedList,
		isListActionsOpen,
		onTabChange,
		onSetSelectedList,
		onEditList,
		onDeleteList,
		onListActionsOpen,
		onListActionsClose
	} = props;

	const handleSelectList = (list: UserList): void => {
		const isSelected = list.id !== selectedList?.id;

		if (isSelected) {
			onSetSelectedList(list);

			setTimeout(() => onListActionsOpen(), 250);
		} else {
			onSetSelectedList(undefined);
		}
	};

	const handleCloseListActions = (): void => {
		onListActionsClose();
		onSetSelectedList(undefined);
	};

	return (
		<>
			<SimpleGrid width='100%' columns={[1, 2, 4, 4, 5, 6]} spacing={2}>
				{sort(lists)
					.desc(({ updatedAt }) => updatedAt)
					.map((list) => (
						<List
							key={list.id}
							list={list}
							isDisabled={getListTotal(list) === 0}
							isSelected={list.id === selectedList?.id}
							onSelectList={() => handleSelectList(list)}
							onListClick={() => onTabChange({ index: getListIndex({ lists, list }) })}
						/>
					))}
			</SimpleGrid>

			{selectedList && (
				<ListActions
					list={selectedList}
					isOpen={isListActionsOpen}
					onEdit={() => onEditList()}
					onDelete={() => onDeleteList()}
					onClose={handleCloseListActions}
				/>
			)}
		</>
	);
};

export default MyListsTabAllTab;
