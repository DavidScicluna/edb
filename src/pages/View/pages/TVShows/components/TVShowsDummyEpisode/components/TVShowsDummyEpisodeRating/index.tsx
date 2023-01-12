import { FC } from 'react';

import { useBreakpointValue } from '@chakra-ui/react';

import { RatingSize } from '../../../../../../../../components/Ratings/common/types';
import { DummyRating } from '../../../../../../../../components';

const TVShowsDummyEpisodeRating: FC = () => {
	const fontSize = useBreakpointValue<RatingSize>({
		'base': 'md',
		'sm': 'lg',
		'md': 'xl',
		'lg': '2xl',
		'xl': '3xl',
		'2xl': '4xl'
	});

	return <DummyRating size={fontSize} />;
};

export default TVShowsDummyEpisodeRating;
