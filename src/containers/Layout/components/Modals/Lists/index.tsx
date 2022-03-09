import { ReactElement, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useMediaQuery, useDisclosure, VStack } from '@chakra-ui/react';

import moment from 'moment';

import List from './components/List';

import { useSelector } from '../../../../../common/hooks';
import Button from '../../../../../components/Clickable/Button';
import Modal from '../../../../../components/Modal';
import CreateList from '../../../../../pages/User/pages/Lists/components/CreateList';
import { defaultListsModal, toggleList } from '../../../../../store/slices/Modals';
import { ListModal as ListModalType } from '../../../../../store/slices/Modals/types';
import { setLists } from '../../../../../store/slices/Users';
import { List as ListType } from '../../../../../store/slices/Users/types';

const ListsModal = (): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { isOpen: isCreateListOpen, onOpen: onCreateListOpen, onClose: onCreateListClose } = useDisclosure();

	const dispatch = useDispatch();
	const listsModal: ListModalType = useSelector((state) => state.modals.ui.listsModal);
	const lists: ListType[] = useSelector((state) => state.user.data.lists);

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
								dateAdded: moment(new Date()).toISOString()
							};

							results.movies = [...results.movies, movieMediaItem];
							break;
						}
						case 'tv': {
							const showMediaItem = {
								...listsModal.mediaItem,
								dateAdded: moment(new Date()).toISOString()
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
								date: moment(new Date()).toISOString(),
								results: { ...results }
						  }
						: updatedList;
				});
			});

			dispatch(setLists([...updatedLists]));

			handleCloseLists();
		}
	};

	const handleCloseLists = (): void => {
		setSelected([]);
		dispatch(toggleList({ ...defaultListsModal }));
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
						onClick={() => (selected.length > 0 ? handleSaveItem() : onCreateListOpen())}
						size={size}
					>
						{selected.length > 0 ? `Save to List${selected.length > 1 ? 's' : ''}` : 'Create a new List'}
					</Button>
				)}
				isOpen={listsModal.open}
				onClose={() => dispatch(toggleList({ ...defaultListsModal }))}
				isCentered
				size='2xl'
			>
				<VStack spacing={2} p={2}>
					{lists.map((list) => (
						<span key={list.id} style={{ width: '100%' }}>
							<List list={list} isSelected={selected.includes(list.id)} onClick={handleIsSelected} />
						</span>
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
