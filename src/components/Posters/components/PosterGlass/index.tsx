import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { merge } from 'lodash';
import { transparentize } from 'color2k';

import { useUserTheme } from '../../../../common/hooks';

import { PosterGlassProps } from './types';

// TODO: Maybe Move to its own component

const { getColor } = utils;

const PosterGlass: FC<PosterGlassProps> = ({ children, sx, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<Center
			{...rest}
			p={0.25}
			sx={{
				...merge(
					{
						backdropFilter: `blur(${theme.space[2]})`,
						WebkitBackdropFilter: `blur(${theme.space[2]})`,
						backgroundColor: transparentize(getColor({ theme, colorMode, type: 'dark' }), 0.25),
						borderRadius: theme.radii.full
					},
					sx
				)
			}}
		>
			{children}
		</Center>
	);
};

export default PosterGlass;
