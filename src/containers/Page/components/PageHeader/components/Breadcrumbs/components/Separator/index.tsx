import React, { FC } from 'react';

import { useTheme, Icon, utils } from '@davidscicluna/component-library';

import { useBreakpointValue } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';

const { getColor } = utils;

const Separator: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const fontSize = useBreakpointValue({
		'base': theme.fontSizes.md,
		'sm': theme.fontSizes.md,
		'md': theme.fontSizes.lg,
		'lg': theme.fontSizes.lg,
		'xl': theme.fontSizes.lg,
		'2xl': theme.fontSizes.lg
	});

	return (
		<Icon
			icon='chevron_right'
			category='outlined'
			color={getColor({ theme, colorMode, type: 'text.secondary' })}
			fontSize={fontSize}
		/>
	);
};

export default Separator;
