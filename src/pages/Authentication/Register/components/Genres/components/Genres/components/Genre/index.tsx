import { ReactElement } from 'react';

import { Button, Icon } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';
import range from 'lodash/range';
import sample from 'lodash/sample';

import SkeletonText from '../../../../../../../../../components/Skeleton/Text';

import { GenreProps } from './types';

const dummies = range(25, 200, 5);

const Genre = (props: GenreProps): ReactElement => {
	const { color, colorMode, id, name, isActive = false, isLoading = true, onClick } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<Button
			color={isActive ? color : 'gray'}
			colorMode={colorMode}
			renderRight={
				isActive ? ({ fontSize }) => <Icon icon='check' category='outlined' fontSize={fontSize} /> : undefined
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
