import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { TVShowsProps } from './types';

import { useSelector } from '../../../../../../../../../../common/hooks';
import { handleReturnDate, handleReturnImageSize } from '../../../../../../../../../../common/utils';
import LoadMore from '../../../../../../../../../../components/Clickable/LoadMore';
import VerticalGrid from '../../../../../../../../../../components/Grid/Vertical';
import HorizontalPoster from '../../../../../../../../../../components/Poster/Horizontal';
import VerticalPoster from '../../../../../../../../../../components/Poster/Vertical';
import { defaultUser, getUser } from '../../../../../../../../../../store/slices/Users';
import { Show } from '../../types';

const incrementBy = 20;

const thumbnail = handleReturnImageSize('poster', 'thumbnail');
const full = handleReturnImageSize('poster', 'full');

const TVShows = ({ shows, label, job }: TVShowsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

	return (
		<VStack width='100%' spacing={4}>
			<VerticalGrid>
				{({ displayMode }) =>
					shows
						.filter((_show, index) => index < totalVisible)
						.map((show: Show) =>
							displayMode === 'grid' ? (
								<VerticalPoster
									key={show.id}
									mediaItem={show ? { ...show } : undefined}
									mediaType='tv'
									image={{
										alt: `${show?.name || ''} tv show poster`,
										src: show?.poster_path || '',
										size: { thumbnail, full }
									}}
									rating={show?.vote_average || null}
									title={show?.name || ''}
									subtitle={`${compact([
										!(isNil(show?.first_air_date) || isEmpty(show?.first_air_date))
											? `${handleReturnDate(show.first_air_date || '', 'year')}`
											: undefined,
										!(isNil(show?.character) || isEmpty(show?.character))
											? `As ${show.character}`
											: !(isNil(show?.job) || isEmpty(show?.job))
											? show?.job
											: undefined
									]).join(' • ')}`}
									isLoading={false}
								/>
							) : (
								<HorizontalPoster
									key={show.id}
									mediaItem={show ? { ...show } : undefined}
									mediaType='tv'
									image={{
										alt: `${show?.name || ''} tv show poster`,
										src: show?.poster_path || '',
										size: {
											thumbnail: 'w92',
											full: 'original'
										}
									}}
									rating={{
										rating: show?.vote_average || null,
										count: show?.vote_count || null
									}}
									title={show?.name || ''}
									subtitle={`${compact([
										!(isNil(show?.first_air_date) || isEmpty(show?.first_air_date))
											? `${handleReturnDate(show.first_air_date || '', 'full')}`
											: undefined,
										!(isNil(show?.character) || isEmpty(show?.character))
											? `As ${show.character}`
											: !(isNil(show?.job) || isEmpty(show?.job))
											? show?.job
											: undefined
									]).join(' • ')}`}
									description={show?.overview || ''}
									isLoading={false}
								/>
							)
						)
				}
			</VerticalGrid>

			<ScaleFade
				in={shows.length > 0 && shows.length > incrementBy}
				unmountOnExit
				style={{ width: isSm ? '100%' : 'auto' }}
			>
				<LoadMore
					color={color}
					amount={totalVisible}
					total={shows.length}
					label={`"${label}" ${job} TV Shows`}
					onClick={() => setTotalVisible(totalVisible + incrementBy)}
				/>
			</ScaleFade>
		</VStack>
	);
};

export default TVShows;
