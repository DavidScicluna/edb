import { FC, useState, useCallback, useEffect, Fragment, lazy } from 'react';

import { useTheme, useDebounce, Divider, Undefinable } from '@davidscicluna/component-library';

import { VStack, Center } from '@chakra-ui/react';

import { debounce } from 'lodash';

import { useUserTheme } from '../../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../../containers/Layout/common/hooks';
import { UserListMediaType } from '../../../../../../../../../../store/slices/Users/types';
import { Suspense } from '../../../../../../../../../../components';
import DummyMovies from '../../../../../../../../../Movies/components/VerticalDummyMovies';
import DummyTVShows from '../../../../../../../../../TVShows/components/VerticalDummyTVShows';
import DummyTabs from '../../../../../../../DummyUserProfile/components/DummyUserProfileTabs/components/DummyUserProfileTabsTabs';
import { MediaType } from '../../../../../../../../../../common/types';

import MyListsTabListTabEmpty from './components/MyListsTabListTabEmpty';
import MyListsTabListTabHeadline from './components/MyListsTabListTabHeadline';
import { activeTab as defaultActiveTab, status as defaultStatus } from './common/data/defaultPropValues';
import { MyListsTabListTabProps, MyListsTabListTabStatus } from './types';

const Tabs = lazy(() => import('../../../UserProfileTabsTabs'));
const Movies = lazy(() => import('../../../UserProfileTabsMovies'));
const TVShows = lazy(() => import('../../../UserProfileTabsTVShows'));

const mediaTypes: MediaType[] = ['movie', 'tv'];

const MyListsTabListTab: FC<MyListsTabListTabProps> = ({ list, onEditList, onDeleteList }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const [status, setStatus] = useState<MyListsTabListTabStatus>(defaultStatus);
	const statusDebounced = useDebounce<MyListsTabListTabStatus>(status);

	const [mediaType, setMediaType] = useState<Undefinable<UserListMediaType>>();

	const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const handleStatus = useCallback(
		debounce((): void => {
			if (list && list.mediaItems) {
				let total = 0;

				let mediaType: Undefinable<UserListMediaType>;
				let key: Undefinable<UserListMediaType>;

				for (key in list.mediaItems) {
					if (list.mediaItems[key as UserListMediaType].length > 0) {
						mediaType = key;
						total = total + 1;
					}
				}

				if (mediaType && total === 1) {
					setMediaType(mediaType);
				}

				setStatus(total === 0 ? 'empty' : total === 1 ? 'single' : 'multiple');
			}
		}, 500),
		[list]
	);

	useEffect(() => {
		setStatus('loading');

		handleStatus();
	}, [list]);

	return (
		<VStack
			width='100%'
			divider={<Divider colorMode={colorMode} mt={`${theme.space[spacing]} !important`} />}
			spacing={statusDebounced !== 'loading' && statusDebounced !== 'multiple' ? spacing : 0}
		>
			<Center width='100%' py={spacing * 2}>
				<MyListsTabListTabHeadline
					list={list}
					mediaType={mediaType}
					onEditList={onEditList}
					onDeleteList={onDeleteList}
				/>
			</Center>

			{statusDebounced === 'loading' ? (
				<Center width='100%'>
					{(list?.mediaItems.movie.length || 0) > 0 && (list?.mediaItems.tv.length || 0) > 0 ? (
						<DummyTabs mediaTypes={mediaTypes} />
					) : (
						<Fragment>
							{(list?.mediaItems.movie.length || 0) > 0 && <DummyMovies />}

							{(list?.mediaItems.tv.length || 0) > 0 && <DummyTVShows />}
						</Fragment>
					)}
				</Center>
			) : statusDebounced === 'empty' ? (
				<MyListsTabListTabEmpty />
			) : (
				(statusDebounced === 'single' || statusDebounced === 'multiple') && (
					<Center width='100%'>
						{statusDebounced === 'multiple' ? (
							<Suspense fallback={<DummyTabs mediaTypes={mediaTypes} />}>
								<Tabs
									type='lists'
									mediaItems={list?.mediaItems || {}}
									activeTab={activeTabDebounced}
									onChange={({ index }) => setActiveTab(index)}
								/>
							</Suspense>
						) : (
							<Fragment>
								{(list?.mediaItems.movie.length || 0) > 0 && (
									<Suspense fallback={<DummyMovies />}>
										<Movies movies={list?.mediaItems.movie || []} />
									</Suspense>
								)}

								{(list?.mediaItems.tv.length || 0) > 0 && (
									<Suspense fallback={<DummyTVShows />}>
										<TVShows shows={list?.mediaItems.tv || []} />
									</Suspense>
								)}
							</Fragment>
						)}
					</Center>
				)
			)}
		</VStack>
	);
};

export default MyListsTabListTab;
