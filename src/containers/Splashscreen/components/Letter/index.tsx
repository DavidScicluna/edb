import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { lighten, darken } from 'color2k';
import { range } from 'lodash';

import { LetterProps } from './types';

const { getColor } = utils;

const Letter: FC<LetterProps> = ({ letter, color: colorProp, colorMode }) => {
	const theme = useTheme();

	const color = getColor({ theme, colorMode, color: colorProp, type: 'color' });

	return (
		<Center
			as='p'
			sx={{
				fontFamily: '"Pacifico", cursive',
				fontSize: '9xl',
				fontWeight: 400,
				textTransform: 'lowercase',
				color,
				textShadow: range(1, 13)
					.map(
						(num) =>
							`0px ${num}px 0px ${colorMode === 'light' ? lighten(color, 0.25) : darken(color, 0.25)}`
					)
					.join(', ')
			}}
		>
			{letter}
		</Center>
	);
};

export default Letter;
