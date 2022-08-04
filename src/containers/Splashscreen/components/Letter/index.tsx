import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useBoolean, Center } from '@chakra-ui/react';

import { lighten, darken } from 'color2k';
import { useTimeout } from 'usehooks-ts';
import { range } from 'lodash';

import { LetterProps } from './types';

const { getColor } = utils;

const Letter: FC<LetterProps> = ({ color: colorProp, colorMode, letter, delay }) => {
	const theme = useTheme();

	const [hasShadow, setHasShadow] = useBoolean();

	const color = getColor({ theme, colorMode, color: colorProp, type: 'color' });

	useTimeout(() => setHasShadow.on(), delay * 1000 + 250);

	return (
		<Center
			as='p'
			sx={{
				fontFamily: '"Pacifico", cursive',
				fontSize: '9xl',
				fontWeight: 400,
				textTransform: 'lowercase',
				color,
				textShadow: hasShadow
					? range(1, 13)
							.map(
								(num) =>
									`0px ${num}px 0px ${
										colorMode === 'light' ? lighten(color, 0.25) : darken(color, 0.25)
									}`
							)
							.join(', ')
					: undefined
			}}
		>
			{letter}
		</Center>
	);
};

export default Letter;
