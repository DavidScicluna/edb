import { ReactElement } from 'react';

import { useBreakpointValue } from '@chakra-ui/react';

import { inView as defaultInView } from '../../../common/data/defaultPropValues';
import Rating from '../../../../Ratings/Rating';
import { RatingSize } from '../../../../Ratings/common/types';

import { HorizontalPosterRatingProps } from './types';

const HorizontalPosterRating = (props: HorizontalPosterRatingProps): ReactElement => {
	const fontSize = useBreakpointValue<RatingSize>({
		'base': 'md',
		'sm': 'lg',
		'md': 'xl',
		'lg': '2xl',
		'xl': '3xl',
		'2xl': '4xl'
	});

	const { rating, count, inView = defaultInView } = props;

	return <Rating rating={rating} count={count} inView={inView} size={fontSize} />;
};

export default HorizontalPosterRating;
