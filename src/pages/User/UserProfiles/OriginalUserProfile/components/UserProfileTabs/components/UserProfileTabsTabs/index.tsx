import { FC, useState, useEffect, lazy } from 'react';

import { TabListTab, Tabs, TabList, TabPanels } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { compact } from 'lodash';

import { activeTab as defaultActiveTab } from '../MyLikesTab/common/data/defaultPropValues';
import { Suspense, TabBadge, TabIcon } from '../../../../../../../../components';
import DummyMoviesTab from '../../../../../../../Movies/components/VerticalDummyMovies';
import DummyPeopleTab from '../../../../../../../People/components/VerticalDummyPeople';
import DummyTVShowsTab from '../../../../../../../TVShows/components/VerticalDummyTVShows';
import DummyAllTab from '../../../../../DummyUserProfile/components/DummyUserProfileTabs/components/DummyUserProfileTabsTabs/components/DummyAllTab';
import { useDebounce, useUserTheme } from '../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../containers/Layout/common/hooks';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../../../../../../common/utils';
import { MediaType } from '../../../../../../../../common/types';

import { UserProfileTabsTabsProps } from './types';
import { getMediaTypeIndex } from './common/utils';

const AllTab = lazy(() => import('./components/AllTab'));
const MoviesTab = lazy(() => import('../UserProfileTabsMovies'));
const PeopleTab = lazy(() => import('../UserProfileTabsPeople'));
const TVShowsTab = lazy(() => import('../UserProfileTabsTVShows'));

const UserProfileTabsTabs: FC<UserProfileTabsTabsProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { activeTab = defaultActiveTab, type, mediaItems, onChange } = props;
	const { movie = [], tv = [], person = [], company = [], collection = [] } = mediaItems;

	const [mediaTypes, setMediaTypes] = useState<MediaType[]>([]);
	const mediaTypesDebounced = useDebounce<MediaType[]>(mediaTypes);

	const [total, setTotal] = useState<number>(0);
	const totalDebounced = useDebounce<number>(total);

	const handleCheckLiked = () => {
		const mediaTypes: MediaType[] = [];
		let total = 0;

		if (movie.length > 0) {
			mediaTypes.push('movie');
			total = total + movie.length;
		}

		if (tv.length > 0) {
			mediaTypes.push('tv');
			total = total + tv.length;
		}

		if (person.length > 0) {
			mediaTypes.push('person');
			total = total + person.length;
		}

		if (company.length > 0) {
			mediaTypes.push('company');
			total = total + company.length;
		}

		if (collection.length > 0) {
			mediaTypes.push('collection');
			total = total + collection.length;
		}

		setMediaTypes([...mediaTypes]);
		setTotal(total);
	};

	useEffect(() => handleCheckLiked(), [mediaItems]);

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

						mediaTypesDebounced.some((mediaType) => mediaType === 'movie') &&
							({
								label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' }),
								renderLeft: (props) => (
									<TabIcon
										{...props}
										icon={getMediaTypeIcon({ mediaType: 'movie' })}
										category={
											activeTab ===
											getMediaTypeIndex({
												mediaTypes: mediaTypesDebounced,
												mediaType: 'movie'
											})
												? 'filled'
												: 'outlined'
										}
									/>
								),
								renderRight:
									movie.length > 0
										? ({ color, ...rest }) => (
												<TabBadge
													{...rest}
													color={
														activeTab ===
														getMediaTypeIndex({
															mediaTypes: mediaTypesDebounced,
															mediaType: 'movie'
														})
															? color
															: 'gray'
													}
													total={movie.length}
													variant={
														activeTab ===
														getMediaTypeIndex({
															mediaTypes: mediaTypesDebounced,
															mediaType: 'movie'
														})
															? 'contained'
															: 'outlined'
													}
												/>
										  )
										: undefined
							} as TabListTab),

						mediaTypesDebounced.some((mediaType) => mediaType === 'tv') &&
							({
								label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' }),
								renderLeft: (props) => (
									<TabIcon
										{...props}
										icon={getMediaTypeIcon({ mediaType: 'tv' })}
										category={
											activeTab ===
											getMediaTypeIndex({
												mediaTypes: mediaTypesDebounced,
												mediaType: 'tv'
											})
												? 'filled'
												: 'outlined'
										}
									/>
								),
								renderRight:
									tv.length > 0
										? ({ color, ...rest }) => (
												<TabBadge
													{...rest}
													color={
														activeTab ===
														getMediaTypeIndex({
															mediaTypes: mediaTypesDebounced,
															mediaType: 'tv'
														})
															? color
															: 'gray'
													}
													total={tv.length}
													variant={
														activeTab ===
														getMediaTypeIndex({
															mediaTypes: mediaTypesDebounced,
															mediaType: 'tv'
														})
															? 'contained'
															: 'outlined'
													}
												/>
										  )
										: undefined
							} as TabListTab),

						mediaTypesDebounced.some((mediaType) => mediaType === 'person') &&
							({
								label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' }),
								renderLeft: (props) => (
									<TabIcon
										{...props}
										icon={getMediaTypeIcon({ mediaType: 'person' })}
										category={
											activeTab ===
											getMediaTypeIndex({
												mediaTypes: mediaTypesDebounced,
												mediaType: 'person'
											})
												? 'filled'
												: 'outlined'
										}
									/>
								),
								renderRight:
									person.length > 0
										? ({ color, ...rest }) => (
												<TabBadge
													{...rest}
													color={
														activeTab ===
														getMediaTypeIndex({
															mediaTypes: mediaTypesDebounced,
															mediaType: 'person'
														})
															? color
															: 'gray'
													}
													total={person.length}
													variant={
														activeTab ===
														getMediaTypeIndex({
															mediaTypes: mediaTypesDebounced,
															mediaType: 'person'
														})
															? 'contained'
															: 'outlined'
													}
												/>
										  )
										: undefined
							} as TabListTab),

						mediaTypesDebounced.some((mediaType) => mediaType === 'company') &&
							({
								label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'company' }),
								renderLeft: (props) => (
									<TabIcon
										{...props}
										icon={getMediaTypeIcon({ mediaType: 'company' })}
										category={
											activeTab ===
											getMediaTypeIndex({
												mediaTypes: mediaTypesDebounced,
												mediaType: 'company'
											})
												? 'filled'
												: 'outlined'
										}
									/>
								),
								renderRight:
									company.length > 0
										? ({ color, ...rest }) => (
												<TabBadge
													{...rest}
													color={
														activeTab ===
														getMediaTypeIndex({
															mediaTypes: mediaTypesDebounced,
															mediaType: 'company'
														})
															? color
															: 'gray'
													}
													total={company.length}
													variant={
														activeTab ===
														getMediaTypeIndex({
															mediaTypes: mediaTypesDebounced,
															mediaType: 'company'
														})
															? 'contained'
															: 'outlined'
													}
												/>
										  )
										: undefined
							} as TabListTab),

						mediaTypesDebounced.some((mediaType) => mediaType === 'collection') &&
							({
								label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'collection' }),
								renderLeft: (props) => (
									<TabIcon
										{...props}
										icon={getMediaTypeIcon({ mediaType: 'collection' })}
										category={
											activeTab ===
											getMediaTypeIndex({
												mediaTypes: mediaTypesDebounced,
												mediaType: 'collection'
											})
												? 'filled'
												: 'outlined'
										}
									/>
								),
								renderRight:
									collection.length > 0
										? ({ color, ...rest }) => (
												<TabBadge
													{...rest}
													color={
														activeTab ===
														getMediaTypeIndex({
															mediaTypes: mediaTypesDebounced,
															mediaType: 'collection'
														})
															? color
															: 'gray'
													}
													total={collection.length}
													variant={
														activeTab ===
														getMediaTypeIndex({
															mediaTypes: mediaTypesDebounced,
															mediaType: 'collection'
														})
															? 'contained'
															: 'outlined'
													}
												/>
										  )
										: undefined
							} as TabListTab)
					])}
				/>

				<TabPanels>
					{compact([
						<Suspense
							key='UserProfileTabsTabs_AllTab'
							fallback={
								<DummyAllTab
									mediaTypes={compact([
										movie.length > 0 ? 'movie' : null,
										tv.length > 0 ? 'tv' : null,
										person.length > 0 ? 'person' : null,
										company.length > 0 ? 'company' : null,
										collection.length > 0 ? 'collection' : null
									])}
								/>
							}
						>
							<AllTab
								type={type}
								mediaItems={mediaItems}
								onSetActiveTab={
									onChange
										? ({ mediaType }) =>
												onChange({
													index: getMediaTypeIndex({
														mediaTypes: mediaTypesDebounced,
														mediaType
													})
												})
										: undefined
								}
							/>
						</Suspense>,

						mediaTypesDebounced.some((mediaType) => mediaType === 'movie') && (
							<Suspense key='UserProfileTabsTabs_MoviesTab' fallback={<DummyMoviesTab />}>
								<MoviesTab movies={movie} />
							</Suspense>
						),

						mediaTypesDebounced.some((mediaType) => mediaType === 'tv') && (
							<Suspense key='UserProfileTabsTabs_TVShowsTab' fallback={<DummyTVShowsTab />}>
								<TVShowsTab shows={tv} />
							</Suspense>
						),

						mediaTypesDebounced.some((mediaType) => mediaType === 'person') && (
							<Suspense key='UserProfileTabsTabs_PeopleTab' fallback={<DummyPeopleTab />}>
								<PeopleTab people={person} />
							</Suspense>
						)
					])}

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

export default UserProfileTabsTabs;
