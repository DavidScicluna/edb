import { FC, useState, Fragment, lazy } from 'react';

import { useTheme, useDebounce, utils } from '@davidscicluna/component-library';

import { Center, Text } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';

import Page from '../../../containers/Page';
import PageHeader from '../../../containers/Page/components/PageHeader';
import PageBody from '../../../containers/Page/components/PageBody';
import { useSelector, useUserTheme } from '../../../common/hooks';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	Suspense,
	DisplayMode
} from '../../../components';
import RecentlyViewedDummyMoviesTab from '../components/RecentlyViewedDummyMovies';
import RecentlyViewedDummyPeopleTab from '../components/RecentlyViewedDummyPeople';
import RecentlyViewedDummyTVShowsTab from '../components/RecentlyViewedDummyTVShows';
import RecentlyViewedDummyCollectionsTab from '../components/RecentlyViewedDummyCollections';
import RecentlyViewedDummyTabs from '../components/RecentlyViewedDummyTabs';
import { formatMediaTypeLabel } from '../../../common/utils';
import { getEmptySubtitle } from '../../../components/QueryEmpty/common/utils';

import { RecentlyViewedMediaTypes, RecentlyViewedStatus } from './types';
import { getRecentlyViewedStatus } from './common/utils';
import RecentlyViewedClearButton from './components/RecentlyViewedClearButton';

const RecentlyViewedTabs = lazy(() => import('./components/RecentlyViewedTabs'));
const RecentlyViewedMovies = lazy(() => import('./components/RecentlyViewedMovies'));
const RecentlyViewedPeople = lazy(() => import('./components/RecentlyViewedPeople'));
const RecentlyViewedTVShows = lazy(() => import('./components/RecentlyViewedTVShows'));
const RecentlyViewedCollections = lazy(() => import('./components/RecentlyViewedCollections'));

export const recentlyviewedMediaTypes: RecentlyViewedMediaTypes = ['movie', 'tv', 'person'];

const { getColor } = utils;

const RecentlyViewed: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const recentlyViewed = useSelector((state) => state.users.data.activeUser.data.recentlyViewed);

	const [status, setStatus] = useState<RecentlyViewedStatus>(getRecentlyViewedStatus({ ...recentlyViewed }));
	const statusDebounced = useDebounce<RecentlyViewedStatus>(status);

	useUpdateEffect(() => setStatus(getRecentlyViewedStatus({ ...recentlyViewed })), [recentlyViewed]);

	return (
		<Page>
			<PageHeader
				renderTitle={(props) => <Text {...props}>Recently Viewed</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`A list containing the most recently viewed ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'movie'
						})}, ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'tv'
						})}, ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'person'
						})} & ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'collection'
						})}`}
					</Text>
				)}
				actions={statusDebounced === 'single' ? <DisplayMode /> : undefined}
				direction='row'
				spacing={spacing}
				px={spacing}
				py={spacing * 2}
			/>
			{recentlyViewed.movie.length +
				recentlyViewed.tv.length +
				recentlyViewed.person.length +
				recentlyViewed.collection.length >
			0 ? (
				<Center width='100%' p={spacing}>
					<RecentlyViewedClearButton />
				</Center>
			) : null}
			<PageBody px={spacing} pt={statusDebounced !== 'multiple' ? spacing : 0} pb={spacing}>
				{statusDebounced === 'empty' ? (
					<QueryEmpty
						color={color}
						colorMode={colorMode}
						borderWidth='2px'
						borderStyle='dashed'
						borderColor={getColor({ theme, colorMode, type: 'divider' })}
						borderRadius='lg'
					>
						<QueryEmptyStack>
							<QueryEmptyBody>
								<QueryEmptyTitle />
								<QueryEmptySubtitle>
									{getEmptySubtitle({
										type: 'empty',
										label: 'Recently Viewed'
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : (
					(statusDebounced === 'single' || statusDebounced === 'multiple') && (
						<Center width='100%'>
							{statusDebounced === 'multiple' ? (
								<Suspense fallback={<RecentlyViewedDummyTabs />}>
									<RecentlyViewedTabs />
								</Suspense>
							) : (
								<Fragment>
									{recentlyViewed.movie.length > 0 && (
										<Suspense fallback={<RecentlyViewedDummyMoviesTab />}>
											<RecentlyViewedMovies />
										</Suspense>
									)}

									{recentlyViewed.tv.length > 0 && (
										<Suspense fallback={<RecentlyViewedDummyTVShowsTab />}>
											<RecentlyViewedTVShows />
										</Suspense>
									)}

									{recentlyViewed.person.length > 0 && (
										<Suspense fallback={<RecentlyViewedDummyPeopleTab />}>
											<RecentlyViewedPeople />
										</Suspense>
									)}

									{recentlyViewed.collection.length > 0 && (
										<Suspense fallback={<RecentlyViewedDummyCollectionsTab />}>
											<RecentlyViewedCollections />
										</Suspense>
									)}
								</Fragment>
							)}
						</Center>
					)
				)}
			</PageBody>
		</Page>
	);
};

export default RecentlyViewed;
