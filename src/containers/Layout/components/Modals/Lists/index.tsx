import { ReactElement, useState, useEffect } from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, IconButton, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, useDisclosure, VStack, Center, Text } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { useSelector } from '../../../../../common/hooks';
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

	const handleClose = (): void => {
		dispatch(setList({ ...defaultListsModal }));
	};

	const handleCloseLists = (): void => {
		setSelected([]);
		handleClose();
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
			<Modal isOpen={listsModal.open} onClose={handleClose} size='2xl'>
				<ModalHeader
					renderTitle={(props) => (
						<Text {...props}>{isSm ? 'Add to a list/s' : `Add "${listsModal.title}" to a list`}</Text>
					)}
					renderCancel={({ icon, category, ...rest }) => (
						<IconButton {...rest}>
							<Icon icon={icon} category={category} />
						</IconButton>
					)}
				/>
				<ModalBody>
					<VStack spacing={2} p={2}>
						{lists.map((list) => (
							<Center key={list.id} width='100%'>
								<List list={list} isSelected={selected.includes(list.id)} onClick={handleIsSelected} />
							</Center>
						))}
					</VStack>
				</ModalBody>
				<ModalFooter
					renderCancel={(props) => (
						<Button {...props} onClick={handleClose}>
							Cancel
						</Button>
					)}
					renderAction={(props) => (
						<Button
							{...props}
							// color={color}
							color='blue'
							isDisabled={isNil(user) || isEmpty(user)}
							onClick={() => (selected.length > 0 ? handleSaveItem() : onCreateListOpen())}
						>
							{selected.length > 0
								? `Save to List${selected.length > 1 ? 's' : ''}`
								: 'Create a new List'}
						</Button>
					)}
				/>
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
