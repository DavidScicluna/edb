import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import _ from 'lodash';

import { TVShowsProps } from './types';

import { handleReturnDate } from '../../../../../../../../../../common/utils';
import LoadMore from '../../../../../../../../../../components/Clickable/LoadMore';
import VerticalGrid from '../../../../../../../../../../components/Grid/Vertical';
import HorizontalPoster from '../../../../../../../../../../components/Poster/Horizontal';
import VerticalPoster from '../../../../../../../../../../components/Poster/Vertical';
import { Show } from '../../types';

const incrementBy = 20;

const TVShows = ({ shows, label, job }: TVShowsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

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
										size: {
											thumbnail: 'w92',
											full: 'original'
										}
									}}
									rating={show?.vote_average || null}
									title={show?.name || ''}
									subtitle={`${_.compact([
										!_.isNil(show?.first_air_date) && !_.isEmpty(show?.first_air_date)
											? `${handleReturnDate(show.first_air_date || '', 'year')}`
											: undefined,
										!_.isNil(show?.character) && !_.isEmpty(show?.character)
											? `As ${show.character}`
											: !_.isNil(show?.job) && !_.isEmpty(show?.job)
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
									subtitle={`${_.compact([
										!_.isNil(show?.first_air_date) && !_.isEmpty(show?.first_air_date)
											? `${handleReturnDate(show.first_air_date || '', 'full')}`
											: undefined,
										!_.isNil(show?.character) && !_.isEmpty(show?.character)
											? `As ${show.character}`
											: !_.isNil(show?.job) && !_.isEmpty(show?.job)
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
