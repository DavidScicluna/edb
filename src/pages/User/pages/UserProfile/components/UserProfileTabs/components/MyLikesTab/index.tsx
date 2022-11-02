import { FC, useState, useCallback, useEffect, Fragment, lazy } from 'react';

import { useTheme, Divider, Undefinable } from '@davidscicluna/component-library';

import { VStack, Center } from '@chakra-ui/react';

import { useDebounce } from 'usehooks-ts';
import { debounce } from 'lodash';

import { useLayoutContext } from '../../../../../../../../containers/Layout/common/hooks';
import { Suspense } from '../../../../../../../../components';
import { useSelector, useUserTheme } from '../../../../../../../../common/hooks';
import { MediaItems } from '../../../../../../../../store/slices/Users/types';
import { MediaType } from '../../../../../../../../common/types';

import { activeTab as defaultActiveTab, status as defaultStatus } from './common/data/defaultPropValues';
import MyLikesTabHeadline from './components/MyLikesTabHeadline';
import { MyLikesTabStatus } from './types';
import MyLikesTabEmpty from './components/MyLikesTabEmpty';
import DummyTabs from './components/MyLikesTabDummyTabs';
import DummyMovies from './components/MyLikesTabDummyMovies';
import DummyPeople from './components/MyLikesTabDummyPeople';
import DummyTVShows from './components/MyLikesTabDummyTVShows';

const Tabs = lazy(() => import('./components/MyLikesTabTabs'));
const Movies = lazy(() => import('./components/MyLikesTabMovies'));
const People = lazy(() => import('./components/MyLikesTabPeople'));
const TVShows = lazy(() => import('./components/MyLikesTabTVShows'));

const MyLikesTab: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const liked = useSelector((state) => state.users.data.activeUser.data.liked);

	const [status, setStatus] = useState<MyLikesTabStatus>(defaultStatus);
	const statusDebounced = useDebounce<MyLikesTabStatus>(status, 500);

	const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);

	const [mediaType, setMediaType] = useState<Undefinable<MediaType>>();

	const handleStatus = useCallback(
		debounce((): void => {
			let mediaType: Undefinable<MediaType>;

			let total = 0;
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

	useEffect(() => handleStatus(), [liked]);

	return (
		<VStack
			width='100%'
			divider={<Divider colorMode={colorMode} mt={`${theme.space[spacing]} !important`} />}
			spacing={statusDebounced !== 'multiple' ? spacing : 0}
		>
			<Center width='100%' py={spacing * 2}>
				<MyLikesTabHeadline mediaType={mediaType} />
			</Center>

			{statusDebounced === 'empty' ? (
				<MyLikesTabEmpty />
			) : (
				(statusDebounced === 'single' || statusDebounced === 'multiple') && (
					<Center width='100%'>
						{statusDebounced === 'multiple' ? (
							<Suspense fallback={<DummyTabs />}>
								<Tabs activeTab={activeTab} onChange={({ index }) => setActiveTab(index)} />
							</Suspense>
						) : (
							<Fragment>
								{liked.movie.length > 0 && (
									<Suspense fallback={<DummyMovies />}>
										<Movies />
									</Suspense>
								)}

								{liked.tv.length > 0 && (
									<Suspense fallback={<DummyTVShows />}>
										<TVShows />
									</Suspense>
								)}

								{liked.person.length > 0 && (
									<Suspense fallback={<DummyPeople />}>
										<People />
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
