import React, { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';

const { getColor } = utils;

const Logo: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<Center
			width={[theme.space[10], theme.space[16]]}
			height={[theme.space[10], theme.space[16]]}
			fontSize={['200%', '300%']}
			borderWidth={['2px', '4px']}
			sx={{
				cursor: 'default',

				pointerEvents: 'none',

				minWidth: 'auto',
				minHeight: 'auto',
				maxWidth: 'none',
				maxHeight: 'none',

				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',

				userSelect: 'none',

				borderStyle: 'solid',
				borderColor: getColor({ theme, colorMode, type: 'text.primary' }),
				borderRadius: theme.radii.full,

				background: theme.colors.transparent,
				backgroundColor: theme.colors.transparent,
				color: getColor({ theme, colorMode, type: 'text.primary' }),

				fontFamily: '"Pacifico", cursive',
				fontWeight: theme.fontWeights.normal,
				textTransform: 'lowercase',
				whiteSpace: 'nowrap',
				lineHeight: theme.lineHeights.base,
				letterSpacing: '.6px',

				p: theme.space[2]
			}}
		>
			edb
		</Center>
	);
};

export default Logo;
