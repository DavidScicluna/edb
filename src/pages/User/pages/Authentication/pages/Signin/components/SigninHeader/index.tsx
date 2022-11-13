import { FC, useState } from 'react';

import { useOutletContext } from 'react-router';

import { useTheme, utils } from '@davidscicluna/component-library';

import { VStack, Center, Text } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';

import { colorMode as defaultColorMode } from '../../../../../../../../common/data/defaultPropValues';
import { AuthenticationOutletContext } from '../../../../types';

const { getColor } = utils;

const SigninHeader: FC = () => {
	const theme = useTheme();

	const { colorMode = defaultColorMode } = useOutletContext<AuthenticationOutletContext>();

	const [color, setColor] = useState(getColor({ theme, colorMode, type: 'text.primary' }));

	useUpdateEffect(() => setColor(getColor({ theme, colorMode, type: 'text.primary' })), [colorMode]);

	return (
		<VStack width='100%' spacing={2}>
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

			<VStack width='100%' spacing={0}>
				<Text
					align='center'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					fontSize={['4xl', '4xl', '6xl', '6xl']}
					lineHeight='base'
					whiteSpace='nowrap'
				>
					Hello there!
				</Text>
				<Text
					align='center'
					color={getColor({ theme, colorMode, type: 'text.secondary' })}
					fontSize={['xs', 'xs', 'sm', 'sm']}
				>
					Welcome to The Entertainment Database application or EDB for short. The one-stop app for all things
					Movies, TV Shows, and the people that make it happen!
				</Text>
			</VStack>
		</VStack>
	);
};

export default SigninHeader;
