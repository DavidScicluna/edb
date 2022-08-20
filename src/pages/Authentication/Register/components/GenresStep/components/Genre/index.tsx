import { FC } from 'react';

import { Button, Icon } from '@davidscicluna/component-library';

import DummyGenre from '../DummyGenre';
import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../common/data/defaultPropValues';

import { GenreProps } from './types';

const Genre: FC<GenreProps> = (props) => {
	const { color = defaultColor, colorMode = defaultColorMode, id, name, isActive = false, onClick } = props;

	return id && name ? (
		<Button
			color={isActive ? color : 'gray'}
			colorMode={colorMode}
			renderRight={isActive ? (props) => <Icon {...props} icon='check' category='outlined' /> : undefined}
			onClick={() => onClick()}
			variant='outlined'
		>
			{name}
		</Button>
	) : (
		<DummyGenre colorMode={colorMode} />
	);
};

export default Genre;
