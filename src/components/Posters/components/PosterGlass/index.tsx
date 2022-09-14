import React, { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { merge } from 'lodash';

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
			sx={{
				...merge(
					{
						'backdropFilter': `blur(${theme.space[2]}) saturate(100%)`,
						'-webkit-backdrop-filter': `blur(${theme.space[2]}) saturate(100%)`,
						'backgroundColor': getColor({ theme, colorMode, type: 'background' }),
						'borderRadius': theme.radii.full,
						'borderWidth': '2px',
						'borderStyle': 'solid',
						'borderColor': getColor({ theme, colorMode, type: 'divider' })
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
