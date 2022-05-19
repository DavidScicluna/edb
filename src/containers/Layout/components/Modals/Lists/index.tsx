import { ReactElement, useState, useEffect } from 'react';


import { useMediaQuery, useDisclosure, VStack, Center } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';


import { useSelector } from '../../../../../common/hooks';
import Button from '../../../../../components/Clickable/Button';
import Modal from '../../../../../components/Modal';
import CreateList from '../../../../../pages/User/pages/Lists/components/CreateList';
import { defaultListsModal, setList } from '../../../../../store/slices/Modals';
import { ListModal as ListModalType } from '../../../../../store/slices/Modals/types';
import { defaultUser, getUser, setUserLists } from '../../../../../store/slices/Users';
import { List as ListType } from '../../../../../store/slices/Users/types';

import List from './components/List';

const ListsModal = (): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { isOpen: isCreateListOpen, onOpen: onCreateListOpen, onClose: onCreateListClose } = useDisclosure();

	const dispatch = useDispatch();
	const user = useSelector((state) => state.app.data.user);
	const listsModal: ListModalType = useSelector((state) => state.modals.ui.listsModal);
	const lists = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.data.lists || defaultUser.data.lists || []
	);

	const [selected, setSelected] = useState<ListType['id'][]>([]);

	const handleIsSelected = (id: string, isSelected: boolean): void => {
		if (isSelected) {
			setSelected(selected.filter((list) => list !== id));
		} else {
			setSelected([...selected, id]);
		}
	};

	const handleSaveItem = (): void => {
		if (listsModal.mediaItem && listsModal.mediaItem.id && listsModal.mediaType) {
			let updatedLists: ListType[] = [...lists];

			selected.forEach((list) => {
				updatedLists = updatedLists.map((updatedList) => {
					const results = { ...updatedList.results };

					switch (listsModal.mediaType) {
						case 'movie': {
							const movieMediaItem = {
								...listsModal.mediaItem,
								dateAdded: dayjs(new Date()).toISOString()
							};

							results.movies = [...results.movies, movieMediaItem];
							break;
						}
						case 'tv': {
							const showMediaItem = {
								...listsModal.mediaItem,
								dateAdded: dayjs(new Date()).toISOString()
							};

							results.tv = [...results.tv, showMediaItem];
							break;
						}
						default:
							break;
					}

					return updatedList.id === list
						? {
								...updatedList,
								date: dayjs(new Date()).toISOString(),
								results: { ...results }
						  }
						: updatedList;
				});
			});

			dispatch(
				setUserLists({
					id: user || '',
					data: [...updatedLists]
				})
			);

			handleCloseLists();
		}
	};

	const handleCloseLists = (): void => {
		setSelected([]);
		dispatch(setList({ ...defaultListsModal }));
	};

	const handleCloseCreateList = (): void => {
		onCreateListClose();
	};

	useEffect(() => {
		if (!listsModal.open) {
			handleCloseLists();
		}
	}, [listsModal.open]);

	return (
		<>
			<Modal
				title={isSm ? 'Add to a list/s' : `Add "${listsModal.title}" to a list`}
				renderActions={({ color, colorMode, size }) => (
					<Button
						color={color}
						colorMode={colorMode}
						isDisabled={isNil(user) || isEmpty(user)}
						onClick={() => (selected.length > 0 ? handleSaveItem() : onCreateListOpen())}
						size={size}
					>
						{selected.length > 0 ? `Save to List${selected.length > 1 ? 's' : ''}` : 'Create a new List'}
					</Button>
				)}
				isOpen={listsModal.open}
				onClose={() => dispatch(setList({ ...defaultListsModal }))}
				isCentered
				size='2xl'
			>
				<VStack spacing={2} p={2}>
					{lists.map((list) => (
						<Center key={list.id} width='100%'>
							<List list={list} isSelected={selected.includes(list.id)} onClick={handleIsSelected} />
						</Center>
					))}
				</VStack>
			</Modal>

			<CreateList
				isOpen={isCreateListOpen}
				onClose={handleCloseCreateList}
				onSubmit={(id) => handleIsSelected(id, false)}
			/>
		</>
	);
};

export default ListsModal;
