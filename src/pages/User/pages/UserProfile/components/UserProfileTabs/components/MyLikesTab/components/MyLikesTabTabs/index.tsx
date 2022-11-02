import { FC, useState, useEffect, lazy } from 'react';

import { TabListTab, Tabs, TabList, TabPanels } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { compact, includes } from 'lodash';
import { useDebounce } from 'usehooks-ts';

import { activeTab as defaultActiveTab } from '../../common/data/defaultPropValues';
import { Suspense } from '../../../../../../../../../../components';
import DummyMoviesTab from '../MyLikesTabDummyMovies';
import DummyPeopleTab from '../MyLikesTabDummyPeople';
import DummyTVShowsTab from '../MyLikesTabDummyTVShows';
import DummyAllTab from '../MyLikesTabDummyTabs/components/DummyAllTab';
import { useSelector, useUserTheme } from '../../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../../containers/Layout/common/hooks';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../../../../../../../../common/utils';
import { MediaType } from '../../../../../../../../../../common/types';

import TabBadge from './components/TabBadge';
import TabIcon from './components/TabIcon';
import { MyLikesTabTabsProps } from './types';
import { getMediaTypeIndex } from './common/utils';

const AllTab = lazy(() => import('./components/AllTab'));
const MoviesTab = lazy(() => import('../MyLikesTabMovies'));
const PeopleTab = lazy(() => import('../MyLikesTabPeople'));
const TVShowsTab = lazy(() => import('../MyLikesTabTVShows'));

const MyLikesTabTabs: FC<MyLikesTabTabsProps> = ({ activeTab = defaultActiveTab, onChange }) => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const liked = useSelector((state) => state.users.data.activeUser.data.liked);

	const [mediaTypes, setMediaTypes] = useState<MediaType[]>([]);

	const [total, setTotal] = useState<number>(0);
	const totalDebounced = useDebounce<number>(total, 500);

	const handleCheckLiked = () => {
		const mediaTypes: MediaType[] = [];
		let total = 0;

		if (liked.movie.length > 0) {
			mediaTypes.push('movie');
			total = total + liked.movie.length;
		}

		if (liked.tv.length > 0) {
			mediaTypes.push('tv');
			total = total + liked.tv.length;
		}

		if (liked.person.length > 0) {
			mediaTypes.push('person');
			total = total + liked.person.length;
		}

		if (liked.company.length > 0) {
			mediaTypes.push('company');
			total = total + liked.company.length;
		}

		if (liked.collection.length > 0) {
			mediaTypes.push('collection');
			total = total + liked.collection.length;
		}

		setMediaTypes([...mediaTypes]);
		setTotal(total);
	};

	useEffect(() => handleCheckLiked(), [liked]);

	return (
		<Tabs width='100%' color={color} colorMode={colorMode} activeTab={activeTab} onChange={onChange} size='lg'>
			<VStack width='100%' spacing={spacing}>
				<TabList
					tabs={compact([
						{
							label: 'All',
							renderRight:
								totalDebounced > 0
									? ({ color, ...rest }) => (
											<TabBadge
												{...rest}
												color={activeTab === 0 ? color : 'gray'}
												total={totalDebounced}
												variant={activeTab === 0 ? 'contained' : 'outlined'}
											/>
									  )
									: undefined
						} as TabListTab,

						includes(mediaTypes, 'movie')
							? ({
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' }),
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'movie' })}
											category={
												activeTab ===
												getMediaTypeIndex({
													mediaTypes,
													mediaType: 'movie'
												})
													? 'filled'
													: 'outlined'
											}
										/>
									),
									renderRight:
										liked.movie.length > 0
											? ({ color, ...rest }) => (
													<TabBadge
														{...rest}
														color={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes,
																mediaType: 'movie'
															})
																? color
																: 'gray'
														}
														total={liked.movie.length}
														variant={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes,
																mediaType: 'movie'
															})
																? 'contained'
																: 'outlined'
														}
													/>
											  )
											: undefined
							  } as TabListTab)
							: null,

						includes(mediaTypes, 'tv')
							? ({
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' }),
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'tv' })}
											category={
												activeTab ===
												getMediaTypeIndex({
													mediaTypes,
													mediaType: 'tv'
												})
													? 'filled'
													: 'outlined'
											}
										/>
									),
									renderRight:
										liked.tv.length > 0
											? ({ color, ...rest }) => (
													<TabBadge
														{...rest}
														color={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes,
																mediaType: 'tv'
															})
																? color
																: 'gray'
														}
														total={liked.tv.length}
														variant={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes,
																mediaType: 'tv'
															})
																? 'contained'
																: 'outlined'
														}
													/>
											  )
											: undefined
							  } as TabListTab)
							: null,

						includes(mediaTypes, 'person')
							? ({
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' }),
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'person' })}
											category={
												activeTab ===
												getMediaTypeIndex({
													mediaTypes,
													mediaType: 'person'
												})
													? 'filled'
													: 'outlined'
											}
										/>
									),
									renderRight:
										liked.person.length > 0
											? ({ color, ...rest }) => (
													<TabBadge
														{...rest}
														color={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes,
																mediaType: 'person'
															})
																? color
																: 'gray'
														}
														total={liked.person.length}
														variant={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes,
																mediaType: 'person'
															})
																? 'contained'
																: 'outlined'
														}
													/>
											  )
											: undefined
							  } as TabListTab)
							: null,

						includes(mediaTypes, 'company')
							? ({
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'company' }),
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'company' })}
											category={
												activeTab ===
												getMediaTypeIndex({
													mediaTypes,
													mediaType: 'company'
												})
													? 'filled'
													: 'outlined'
											}
										/>
									),
									renderRight:
										liked.company.length > 0
											? ({ color, ...rest }) => (
													<TabBadge
														{...rest}
														color={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes,
																mediaType: 'company'
															})
																? color
																: 'gray'
														}
														total={liked.company.length}
														variant={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes,
																mediaType: 'company'
															})
																? 'contained'
																: 'outlined'
														}
													/>
											  )
											: undefined
							  } as TabListTab)
							: null,

						includes(mediaTypes, 'collection')
							? ({
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'collection' }),
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'collection' })}
											category={
												activeTab ===
												getMediaTypeIndex({
													mediaTypes,
													mediaType: 'collection'
												})
													? 'filled'
													: 'outlined'
											}
										/>
									),
									renderRight:
										liked.collection.length > 0
											? ({ color, ...rest }) => (
													<TabBadge
														{...rest}
														color={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes,
																mediaType: 'collection'
															})
																? color
																: 'gray'
														}
														total={liked.collection.length}
														variant={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes,
																mediaType: 'collection'
															})
																? 'contained'
																: 'outlined'
														}
													/>
											  )
											: undefined
							  } as TabListTab)
							: null
					])}
				/>

				<TabPanels>
					<Suspense fallback={<DummyAllTab />}>
						<AllTab
							onSetActiveTab={
								onChange
									? ({ mediaType }) =>
											onChange({
												index: getMediaTypeIndex({
													mediaTypes,
													mediaType
												})
											})
									: undefined
							}
						/>
					</Suspense>

					{includes(mediaTypes, 'movie') && (
						<Suspense fallback={<DummyMoviesTab />}>
							<MoviesTab />
						</Suspense>
					)}

					{includes(mediaTypes, 'tv') && (
						<Suspense fallback={<DummyTVShowsTab />}>
							<TVShowsTab />
						</Suspense>
					)}

					{includes(mediaTypes, 'person') && (
						<Suspense fallback={<DummyPeopleTab />}>
							<PeopleTab />
						</Suspense>
					)}

					{/* <Suspense fallback={<TrendingDummyTV />}>
						<TrendingTV />
					</Suspense>

					<Suspense fallback={<TrendingDummyPeople />}>
						<TrendingPeople />
					</Suspense> */}
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default MyLikesTabTabs;
