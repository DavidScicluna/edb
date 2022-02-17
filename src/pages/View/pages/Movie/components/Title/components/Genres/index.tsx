import { ReactElement } from 'react';

import { useConst, Text } from '@chakra-ui/react';

import _ from 'lodash';

import { GenresProps } from './types';

import SkeletonText from '../../../../../../../../components/Skeleton/Text';

const dummies = _.range(25, 250, 20);

const Genres = (props: GenresProps): ReactElement => {
	const { genres, color, fontSize, isLoading = true } = props;

	const dummy = useConst<number>(_.sample(dummies) || 50);

	return (
		<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
			<Text align='left' color={color} fontSize={fontSize} whiteSpace='nowrap'>
				{(genres || []).map((genre) => genre.name).join(', ') || 'Movie Genres'}
			</Text>
		</SkeletonText>
	);
};

export default Genres;
