import { ReactElement } from 'react';

import { useConst } from '@chakra-ui/react';

import range from 'lodash/range';
import sample from 'lodash/sample';

import { GenreProps } from './types';

import Button from '../../../../../../../../../components/Clickable/Button';
import Icon from '../../../../../../../../../components/Icon';
import SkeletonText from '../../../../../../../../../components/Skeleton/Text';

const dummies = range(25, 200, 5);

const Genre = (props: GenreProps): ReactElement => {
	const { color, colorMode, id, name, isActive = false, isLoading = true, onClick } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<Button
			color={isActive ? color : 'gray'}
			colorMode={colorMode}
			renderRight={
				isActive ? ({ fontSize }) => <Icon icon='check' type='outlined' fontSize={fontSize} /> : undefined
			}
			onClick={onClick ? () => onClick({ id, name }) : undefined}
			isDisabled={isLoading}
			variant='outlined'
		>
			<SkeletonText
				colorMode={colorMode}
				width={isLoading ? `${dummy}px` : 'auto'}
				fontSize='sm'
				isLoaded={!isLoading}
			>
				{name || 'Genre'}
			</SkeletonText>
		</Button>
	);
};

export default Genre;
