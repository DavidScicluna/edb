import { FC } from 'react';

import { useBreakpointValue } from '@chakra-ui/react';

import { Rating } from '../../../../../../../../../components';
import { RatingSize } from '../../../../../../../../../components/Ratings/common/types';

import { TVShowEpisodeRatingProps } from './types';

const TVShowEpisodeRating: FC<TVShowEpisodeRatingProps> = (props) => {
	const fontSize = useBreakpointValue<RatingSize>({
		'base': 'md',
		'sm': 'lg',
		'md': 'xl',
		'lg': '2xl',
		'xl': '3xl',
		'2xl': '4xl'
	});

	const { vote_average, vote_count } = props;

	return <Rating rating={vote_average} count={vote_count} size={fontSize} />;
};

export default TVShowEpisodeRating;
