import { FC, useState, useCallback, useEffect, Fragment, lazy } from 'react';

import { useTheme, useDebounce, Headline, Divider, Undefinable } from '@davidscicluna/component-library';

import { VStack, Center, Text } from '@chakra-ui/react';

import { debounce } from 'lodash';

import { useLayoutContext } from '../../../../../../../../../containers/Layout/common/hooks';
import { Suspense, TotalBadge } from '../../../../../../../../../components';
import { useSelector, useUserTheme } from '../../../../../../../../../common/hooks';
import { MediaItems } from '../../../../../../../../../store/slices/Users/types';
import { MediaType } from '../../../../../../../../../common/types';
import DummyTVShows from '../../../../../../../../TVShows/components/VerticalDummyTVShows';
import DummyMovies from '../../../../../../../../Movies/components/VerticalDummyMovies';
import DummyPeople from '../../../../../../../../People/components/VerticalDummyPeople';
import DummyTabs from '../../../../../DummyUserProfile/components/DummyUserProfileTabs/components/DummyUserProfileTabsTabs';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';

import { activeTab as defaultActiveTab, status as defaultStatus } from './common/data/defaultPropValues';
import { MyLikesTabStatus } from './types';
import MyLikesTabEmpty from './components/MyLikesTabEmpty';

const Tabs = lazy(() => import('../UserProfileTabsTabs'));
const Movies = lazy(() => import('../UserProfileTabsMovies'));
const People = lazy(() => import('../UserProfileTabsPeople'));
const TVShows = lazy(() => import('../UserProfileTabsTVShows'));

const mediaTypes: MediaType[] = ['movie', 'tv', 'person', 'company', 'collection'];

const MyLikesTab: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const liked = useSelector((state) => state.users.data.activeUser.data.liked);

	const [status, setStatus] = useState<MyLikesTabStatus>(defaultStatus);
	const statusDebounced = useDebounce<MyLikesTabStatus>(status);

	const [mediaType, setMediaType] = useState<Undefinable<MediaType>>();

	const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const total =
		liked.movie.length + liked.tv.length + liked.person.length + liked.company.length + liked.collection.length;

	const handleStatus = useCallback(
		debounce((): void => {
			let total = 0;

			let mediaType: Undefinable<MediaType>;
			let key: Undefinable<MediaType>;

			for (key in liked) {
				if (liked[key as keyof MediaItems].length > 0) {
					mediaType = key;
					total = total + 1;
				}
			}

			if (mediaType && total === 1) {
				setMediaType(mediaType);
			}

			setStatus(total === 0 ? 'empty' : total === 1 ? 'single' : 'multiple');
		}, 500),
		[liked]
	);

	useEffect(() => {
		setStatus('loading');

		handleStatus();
	}, [liked]);

	return (
		<VStack
			width='100%'
			divider={<Divider colorMode={colorMode} mt={`${theme.space[spacing]} !important`} />}
			spacing={statusDebounced !== 'loading' && statusDebounced !== 'multiple' ? spacing : 0}
		>
			<Center width='100%' py={spacing * 2}>
				<Headline
					width='100%'
					renderCaption={() => (
						<TotalBadge
							color={color}
							colorMode={colorMode}
							prefix='Total of'
							suffix={
								mediaType
									? `${formatMediaTypeLabel({
											type: total === 1 ? 'single' : 'multiple',
											mediaType
									  })} liked`
									: 'likes'
							}
							total={total}
							size='xs'
						/>
					)}
					renderTitle={(props) => <Text {...props}>My Likes</Text>}
					renderSubtitle={(props) => (
						<Text {...props}>
							This Tab contains all likes that have been added to the likes list and all are separated
							into their respective tab depending on the media type.
						</Text>
					)}
				/>
			</Center>

			{statusDebounced === 'loading' ? (
				<DummyTabs mediaTypes={mediaTypes} />
			) : statusDebounced === 'empty' ? (
				<MyLikesTabEmpty />
			) : (
				(statusDebounced === 'single' || statusDebounced === 'multiple') && (
					<Center width='100%'>
						{statusDebounced === 'multiple' ? (
							<Suspense fallback={<DummyTabs mediaTypes={mediaTypes} />}>
								<Tabs
									type='liked'
									mediaItems={liked}
									activeTab={activeTabDebounced}
									onChange={({ index }) => setActiveTab(index)}
								/>
							</Suspense>
						) : (
							<Fragment>
								{liked.movie.length > 0 && (
									<Suspense fallback={<DummyMovies />}>
										<Movies movies={liked.movie} />
									</Suspense>
								)}

								{liked.tv.length > 0 && (
									<Suspense fallback={<DummyTVShows />}>
										<TVShows shows={liked.tv} />
									</Suspense>
								)}

								{liked.person.length > 0 && (
									<Suspense fallback={<DummyPeople />}>
										<People people={liked.person} />
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

export default MyLikesTab;
