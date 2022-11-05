import { FC, useState, lazy } from 'react';

import {
	TabsOnChangeProps,
	TabListTab,
	useTheme,
	Tabs,
	TabList,
	TabPanels,
	Divider
} from '@davidscicluna/component-library';

import { useDisclosure, VStack, Center } from '@chakra-ui/react';

import { sort } from 'fast-sort';
import { compact } from 'lodash';

import { useDebounce, useSelector, useUserTheme } from '../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../containers/Layout/common/hooks';
import DummyAllTab from '../DummyMyListsTab/components/DummyMyListsTabAllTab';
import { Suspense, TabBadge } from '../../../../../../../../../components';

import { activeTab as defaultActiveTab } from './common/data/defaultPropValues';
import { getListIndex, getListTotal } from './common/utils';
import MyListsTabHeadline from './components/MyListsTabHeadline';
import CreateList from './components/CreateList';
import DeleteList from './components/DeleteList';
import { SelectedList } from './types';
import EditList from './components/EditList';

const AllTab = lazy(() => import('./components/MyListsTabAllTab'));
const ListTab = lazy(() => import('./components/MyListsTabListTab'));

const MyListsTab: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { isOpen: isListActionsOpen, onOpen: onListActionsOpen, onClose: onListActionsClose } = useDisclosure();

	const { isOpen: isCreateListOpen, onOpen: onCreateListOpen, onClose: onCreateListClose } = useDisclosure();
	const { isOpen: isEditListOpen, onOpen: onEditListOpen, onClose: onEditListClose } = useDisclosure();
	const { isOpen: isDeleteListOpen, onOpen: onDeleteListOpen, onClose: onDeleteListClose } = useDisclosure();

	const { spacing } = useLayoutContext();

	const lists = useSelector((state) => state.users.data.activeUser.data.lists || []);

	const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const [selectedList, setSelectedList] = useState<SelectedList>();
	const selectedListDebounced = useDebounce<SelectedList>(selectedList);

	const handleTabChange = ({ index }: TabsOnChangeProps): void => {
		setActiveTab(index);
		setSelectedList(lists.find((_list, i) => i === index - 1));
	};

	const handleOnDeleteList = (): void => {
		onListActionsClose();
		handleTabChange({ index: 0 });
	};

	return (
		<>
			<VStack
				width='100%'
				divider={<Divider colorMode={colorMode} mt={`${theme.space[spacing]} !important`} />}
				spacing={0}
			>
				<Center width='100%' py={spacing * 2}>
					<MyListsTabHeadline onCreateListOpen={onCreateListOpen} />
				</Center>

				<Tabs
					width='100%'
					color={color}
					colorMode={colorMode}
					activeTab={activeTabDebounced}
					onChange={handleTabChange}
					size='lg'
				>
					<VStack width='100%' spacing={spacing}>
						<TabList
							tabs={[
								{ label: 'All' },

								...sort(lists)
									.desc(({ updatedAt }) => updatedAt)
									.map((list) => {
										return {
											label: list.label,
											isDisabled: getListTotal(list) === 0,
											renderRight:
												getListTotal(list) > 0
													? ({ color, ...rest }) => (
															<TabBadge
																{...rest}
																color={
																	activeTab === getListIndex({ lists, list })
																		? color
																		: 'gray'
																}
																total={getListTotal(list)}
																variant={
																	activeTab === getListIndex({ lists, list })
																		? 'contained'
																		: 'outlined'
																}
															/>
													  )
													: undefined
										} as TabListTab;
									})
							]}
						/>

						<TabPanels>
							{compact([
								<Suspense key='MyListsTabs_AllTab' fallback={<DummyAllTab />}>
									<AllTab
										selectedList={selectedListDebounced}
										isListActionsOpen={isListActionsOpen}
										onTabChange={handleTabChange}
										onSetSelectedList={(list) => setSelectedList(list)}
										onEditList={onEditListOpen}
										onDeleteList={onDeleteListOpen}
										onListActionsOpen={onListActionsOpen}
										onListActionsClose={onListActionsClose}
									/>
								</Suspense>,

								...sort(lists)
									.desc(({ updatedAt }) => updatedAt)
									.map((list) => (
										<Suspense key={`MyListsTabs_ListTab_${list.label}`}>
											<ListTab
												list={list}
												onEditList={onEditListOpen}
												onDeleteList={onDeleteListOpen}
											/>
										</Suspense>
									))
							])}
						</TabPanels>
					</VStack>
				</Tabs>
			</VStack>

			<CreateList isOpen={isCreateListOpen} onClose={onCreateListClose} />

			{selectedList && <EditList list={selectedList} isOpen={isEditListOpen} onClose={onEditListClose} />}

			{selectedList && (
				<DeleteList
					list={selectedList}
					isOpen={isDeleteListOpen}
					onClose={onDeleteListClose}
					onDelete={handleOnDeleteList}
				/>
			)}
		</>
	);
};

export default MyListsTab;
