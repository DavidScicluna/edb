import { ReactElement } from 'react';

import { Skeleton, Button, Icon } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';
import range from 'lodash/range';
import sample from 'lodash/sample';

import { GenreProps } from './types';

const dummies = range(25, 200, 5);

const Genre = (props: GenreProps): ReactElement => {
	const { color, colorMode, id, name, isActive = false, isLoading = true, onClick } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<Button
			color={isActive ? color : 'gray'}
			colorMode={colorMode}
			renderRight={isActive ? (props) => <Icon {...props} icon='check' category='outlined' /> : undefined}
			onClick={onClick ? () => onClick({ id, name }) : undefined}
			isDisabled={isLoading}
			variant='outlined'
		>
			<Skeleton
				colorMode={colorMode}
				width={isLoading ? `${dummy}px` : 'auto'}
				isLoaded={!isLoading}
				variant='text'
			>
				{name || 'Genre'}
			</Skeleton>
		</Button>
	);
};

export default Genre;
