import { ReactElement } from 'react';

import { useConst, Text } from '@chakra-ui/react';

import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import range from 'lodash/range';
import sample from 'lodash/sample';

import Date from './components/Date';
import Show from './components/Show';
import { EpisodeTitleProps } from './types';

import SkeletonText from '../../../../../../components/Skeleton/Text';
import Title from '../../../../components/Title';
import { handleReturnCertification } from '../../../Show/components/Title';
import Certification from '../../../Show/components/Title/components/Certification';

const dummies = range(25, 100, 5);

const EpisodeTitle = (props: EpisodeTitleProps): ReactElement => {
	const { show, episode, isLoading = true } = props;
	const { name, air_date, season_number: season, episode_number } = episode || {};

	const dummy = useConst<number>(sample(dummies) || 75);

	const certification: string | undefined = handleReturnCertification(show?.content_ratings);

	return (
		<Title
			mediaType='tv'
			renderTitle={({ color, fontSize, fontWeight, lineHeight }) => (
				<SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
					<Text
						align='left'
						color={color}
						fontSize={fontSize}
						fontWeight={fontWeight}
						lineHeight={lineHeight}
						whiteSpace={isLoading ? 'nowrap' : 'normal'}
					>
						{name || 'Episode Name'}
					</Text>
				</SkeletonText>
			)}
			renderSubtitles={({ color, fontSize }) =>
				compact([
					<Show
						key={`tv-show-${show?.id}-name`}
						name={show?.name}
						season={season}
						episode={episode_number}
						fontSize={fontSize}
						isLoading={isLoading}
					/>,
					!(isNil(air_date) || isEmpty(air_date)) || isLoading ? (
						<Date
							key={`tv-show-${show?.id}-season-${season}-episode-${episode_number}-date`}
							air_date={air_date}
							color={color}
							fontSize={fontSize}
							isLoading={isLoading}
						/>
					) : undefined,
					!(isNil(certification) || isEmpty(certification)) || isLoading ? (
						<Certification
							key={`tv-show-${show?.id}-certification`}
							certification={certification}
							fontSize={fontSize}
							isLoading={isLoading}
						/>
					) : undefined
				])
			}
			isLoading={isLoading}
		/>
	);
};

export default EpisodeTitle;
