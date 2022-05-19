import { ReactElement, useState, useEffect } from 'react';


import { Button } from '@davidscicluna/component-library';

import { useMediaQuery, useDisclosure, useToast, VStack, Collapse, Fade, Center } from '@chakra-ui/react';

import { useLocation } from 'react-router';
import dayjs from 'dayjs';
import { AnimatePresence } from 'framer-motion';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import orderBy from 'lodash/orderBy';


import { useSelector } from '../../../../common/hooks';
import IconButton from '../../../../components/Clickable/IconButton';
import Divider from '../../../../components/Divider';
import Empty from '../../../../components/Empty';
import Icon from '../../../../components/Icon';
import Tabs from '../../../../components/Tabs';
import TabPanels from '../../../../components/Tabs/components/TabPanels';
import Page from '../../../../containers/Page';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import { List as ListType } from '../../../../store/slices/Users/types';

import Toast from './components/Toast';
import MediaTypesSection from './components/MediaTypesSection';
import ListPicker from './components/ListPicker';
import ListInfo from './components/ListInfo';
import ListHeader from './components/ListHeader';
import EditList from './components/EditList';
import DeleteList from './components/DeleteList';
import CreateList from './components/CreateList';

const Lists = (): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { isOpen: isCreateListOpen, onOpen: onCreateListOpen, onClose: onCreateListClose } = useDisclosure();
	const { isOpen: isDeleteListOpen, onOpen: onDeleteListOpen, onClose: onDeleteListClose } = useDisclosure();
	const { isOpen: isEditListOpen, onOpen: onEditListOpen, onClose: onEditListClose } = useDisclosure();
	const { isOpen: isListInfoOpen, onOpen: onListInfoOpen, onClose: onListInfoClose } = useDisclosure();

	const location = useLocation();

	const toast = useToast();

	const user = useSelector((state) => state.app.data.user);
	const lists = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.data.lists || defaultUser.data.lists || []
	);

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const [selectedListID, setSelectedListID] = useState<ListType['id']>();
	const [activeTab, setActiveTab] = useState<number>();

	const handleSelectList = (id: ListType['id']): void => {
		if (selectedListID && selectedListID === id) {
			setSelectedListID(undefined);
		} else {
			setSelectedListID(id);
		}
	};

	const handleOpenList = (index: number): void => {
		setActiveTab(index);
	};

	const handleReset = (): void => {
		toast.closeAll();

		onCreateListClose();
		onDeleteListClose();
		onEditListClose();
		onListInfoClose();

		setActiveTab(undefined);
		setSelectedListID(undefined);
	};

	const handleResetSelected = (): void => {
		toast.closeAll();

		setSelectedListID(undefined);
	};

	useEffect(() => {
		if (!isNil(activeTab)) {
			handleResetSelected();
		}
	}, [activeTab]);

	useEffect(() => {
		toast.closeAll();

		// TODO: Check if is working!
		if (isNil(activeTab) && !(isNil(selectedListID) || isEmpty(selectedListID))) {
			toast({
				duration: null,
				isClosable: true,
				position: 'bottom',
				variant: 'solid',
				render: () => {
					return (
						<Toast
							list={lists.find((list) => list.id === selectedListID)}
							onEdit={onEditListOpen}
							onDelete={onDeleteListOpen}
							onClose={handleResetSelected}
						/>
					);
				}
			});
		}
	}, [selectedListID]);

	useEffect(() => {
		if (lists.length === 0) {
			handleReset();
		}
	}, [lists]);

	const handleCheckLocation = (): void => {
		const hash = location.hash.replace('#', '');

		if (hash) {
			if (lists.some((list) => list.id === hash)) {
				setActiveTab(lists.findIndex((list) => list.id === hash));
			} else {
				setActiveTab(undefined);
			}
		}
	};

	useEffect(() => {
		if (location.pathname === '/lists') {
			handleCheckLocation();
		}
	}, [location.hash]);

	return (
		<>
			<Page title='Lists'>
				{{
					actions: (
						<Button
							color={isCreateListOpen ? color : 'gray'}
							onClick={() => onCreateListOpen()}
							isDisabled={isNil(user) || isEmpty(user)}
							isFullWidth={isSm}
							variant='outlined'
						>
							Create new list
						</Button>
					),
					body: (
						<Tabs activeTab={activeTab} onChange={(index: number) => setActiveTab(index)}>
							<VStack
								width='100%'
								divider={lists && lists.length > 0 ? <Divider orientation='horizontal' /> : undefined}
								spacing={2}
								p={2}
							>
								<Collapse in={lists && lists.length > 0} unmountOnExit style={{ width: '100%' }}>
									<ListHeader activeTab={activeTab} lists={lists} onListsClick={handleReset} />
								</Collapse>

								{lists.length === 0 ? (
									<Empty
										hasIllustration
										label='Oh no! 😢'
										description='Please add a list to be able to add items to lists.'
										size='xl'
										variant='outlined'
									/>
								) : (
									<AnimatePresence exitBeforeEnter initial={false}>
										{isNil(activeTab) ? (
											<Center as={Fade} key='list-picker' width='100%' in unmountOnExit>
												<ListPicker
													lists={lists}
													selectedListID={selectedListID}
													onSelected={handleSelectList}
													onOpenList={handleOpenList}
												/>
											</Center>
										) : (
											<Center as={Fade} key='list-tab-panels' width='100%' in unmountOnExit>
												<TabPanels>
													{orderBy(lists, (list) => dayjs(list.date), ['desc']).map(
														(list) => (
															<MediaTypesSection
																key={list.id}
																movies={list.results.movies}
																tv={list.results.tv}
																renderActions={() => (
																	<IconButton
																		aria-label='Open Information modal'
																		onClick={() => {
																			handleSelectList(list.id);
																			onListInfoOpen();
																		}}
																		variant='outlined'
																	>
																		<Icon
																			icon='info'
																			type={
																				isListInfoOpen ? 'filled' : 'outlined'
																			}
																		/>
																	</IconButton>
																)}
															/>
														)
													)}
												</TabPanels>
											</Center>
										)}
									</AnimatePresence>
								)}
							</VStack>
						</Tabs>
					)
				}}
			</Page>

			<CreateList isOpen={isCreateListOpen} onSubmit={() => setActiveTab(0)} onClose={onCreateListClose} />

			{lists && lists.length > 0 && selectedListID ? (
				<DeleteList
					id={selectedListID}
					isOpen={isDeleteListOpen}
					onClose={onDeleteListClose}
					onCloseToast={handleReset}
				/>
			) : null}

			{lists && lists.length > 0 && selectedListID ? (
				<EditList id={selectedListID} isOpen={isEditListOpen} onClose={onEditListClose} />
			) : null}

			{lists && lists.length > 0 && selectedListID ? (
				<ListInfo
					id={selectedListID}
					isOpen={isListInfoOpen}
					onEdit={() => onEditListOpen()}
					onDelete={() => onDeleteListOpen()}
					onClose={onListInfoClose}
				/>
			) : null}
		</>
	);
};

export default Lists;
