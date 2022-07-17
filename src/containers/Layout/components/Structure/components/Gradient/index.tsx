import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { transparentize } from 'color2k';

import { useUserTheme } from '../../../../../../common/hooks';

import { GradientProps } from './types';

const { getColor } = utils;

const Gradient: FC<GradientProps> = (props) => {
	const theme = useTheme();

	const { colorMode } = useUserTheme();

	return (
		<Center
			{...props}
			width='100%'
			height={theme.space[4]}
			sx={{
				background: `linear-gradient(0deg, ${transparentize(
					getColor({ theme, colorMode, type: 'background' }),
					0
				)} 25%, ${transparentize(getColor({ theme, colorMode, type: 'background' }), 1)} 100%)`
			}}
		/>
	);
};

export default Gradient;
