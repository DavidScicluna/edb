import { FC } from 'react';

import { useBreakpointValue } from '@chakra-ui/react';

import Rating from '../../../../Ratings/Rating';
import { RatingSize } from '../../../../Ratings/common/types';

import { HorizontalPosterRatingProps } from './types';

const HorizontalPosterRating: FC<HorizontalPosterRatingProps> = (props) => {
	const fontSize = useBreakpointValue<RatingSize>({
		'base': 'md',
		'sm': 'lg',
		'md': 'xl',
		'lg': '2xl',
		'xl': '3xl',
		'2xl': '4xl'
	});

	const { rating, count } = props;

	return <Rating rating={rating} count={count} size={fontSize} />;
};

export default HorizontalPosterRating;
