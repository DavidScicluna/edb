import { FC } from 'react';

import { Button, Icon } from '@davidscicluna/component-library';

import DummyGenre from '../DummyGenre';
import { useUserTheme } from '../../../../../../../common/hooks';

import { GenreProps } from './types';

const Genre: FC<GenreProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const { id, name, isActive = false, onClick } = props;

	return id && name ? (
		<Button
			color={isActive ? color : 'gray'}
			colorMode={colorMode}
			renderRight={
				isActive
					? ({ colorMode, height }) => (
							<Icon
								colorMode={colorMode}
								width={`${height}px`}
								height={`${height}px`}
								fontSize={`${height}px`}
								icon='check'
								category='outlined'
							/>
					  )
					: undefined
			}
			onClick={() => onClick()}
			variant='outlined'
		>
			{name}
		</Button>
	) : (
		<DummyGenre />
	);
};

export default Genre;
