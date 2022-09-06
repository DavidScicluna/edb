import { FC, useState } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';

import { colorMode as defaultColorMode } from '../../../../../../common/data/defaultPropValues';

import { LogoProps } from './types';

const { getColor } = utils;

const Logo: FC<LogoProps> = ({ colorMode = defaultColorMode }) => {
	const theme = useTheme();

	const [color, setColor] = useState(getColor({ theme, colorMode, type: 'text.primary' }));

	useUpdateEffect(() => setColor(getColor({ theme, colorMode, type: 'text.primary' })), [colorMode]);

	return (
		<Center
			width={[theme.space[10], theme.space[12], theme.space[14], theme.space[16]]}
			height={[theme.space[10], theme.space[12], theme.space[14], theme.space[16]]}
			fontSize={['200%', '250%', '250%', '300%']}
			borderWidth={['2px', '2px', '4px', '4px']}
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
				borderColor: color,
				borderRadius: theme.radii.full,

				background: theme.colors.transparent,
				backgroundColor: theme.colors.transparent,
				color: color,

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
