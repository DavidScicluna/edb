import { FC, useState } from 'react';

import { useLocation, Navigate, Outlet } from 'react-router';

import { useTheme, utils } from '@davidscicluna/component-library';

import { ColorMode, useMediaQuery, Center, Container } from '@chakra-ui/react';

import { color as defaultColor, colorMode as defaultColorMode } from '../../common/data/defaultPropValues';
import { useUserTheme } from '../../common/hooks';
import { UserThemeColor } from '../../store/slices/Users/types';

const { getColor } = utils;

const Authentication: FC = () => {
	const theme = useTheme();
	const userTheme = useUserTheme();

	const [isXl] = useMediaQuery(`(min-width: ${theme.breakpoints['2xl']})`);

	const location = useLocation();

	const [color, setColor] = useState<UserThemeColor>(userTheme.color || defaultColor);
	const [colorMode, setColorMode] = useState<ColorMode>(userTheme.colorMode || defaultColorMode);

	return (
		<Center width='100%' minHeight='100vh' sx={{ background: getColor({ theme, colorMode, type: 'background' }) }}>
			<Container
				width='100%'
				maxWidth={theme.breakpoints['2xl']}
				minHeight='100vh'
				centerContent
				borderLeftWidth={isXl ? '2px' : 0}
				borderRightWidth={isXl ? '2px' : 0}
				borderStyle='solid'
				borderColor={getColor({ theme, colorMode, type: 'divider' })}
				p={0}
			>
				{location.pathname === '/authentication' ? (
					<Navigate to='/authentication/signin' />
				) : (
					<Outlet context={{ color, colorMode, setColor, setColorMode }} />
				)}
			</Container>
		</Center>
	);
};

export default Authentication;
