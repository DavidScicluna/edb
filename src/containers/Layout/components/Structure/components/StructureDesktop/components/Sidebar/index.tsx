import { FC, useContext } from 'react';

import { useLocation } from 'react-router';

import { useTheme, Divider, InternalLink, utils } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { omit } from 'lodash';

import { isGuest as defaultIsGuest } from '../../../../../../common/data/defaultPropValues';
import Logo from '../../../../../../../../components/Logo';
import useStyles from '../../../../../../common/styles';
import { useSelector, useUserTheme } from '../../../../../../../../common/hooks';
import Navigation from '../../../Navigation';
import { LayoutContext } from '../../../../../..';
import { LayoutContext as LayoutContextType } from '../../../../../../types';

import ToggleIconButton from './components/ToggleIconButton';
import User from './components/User';
import SignInButton from './components/SignInButton';

const { getColor } = utils;

const Sidebar: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { isGuest = defaultIsGuest } = useContext<LayoutContextType>(LayoutContext);

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	const location = useLocation();

	const style = useStyles({ theme });

	return (
		<VStack
			width='100%'
			height='100vh'
			position='relative'
			alignItems='stretch'
			justifyContent='space-between'
			background={getColor({ theme, colorMode, type: 'background' })}
			borderRightWidth='2px'
			borderRightStyle='solid'
			borderRightColor={getColor({ theme, colorMode, type: 'divider' })}
			p={2}
			spacing={4}
			sx={{ ...style }}
		>
			<VStack
				width='100%'
				alignItems='flex-start'
				divider={<Divider colorMode={colorMode} />}
				spacing={2}
				sx={{ ...style }}
			>
				<InternalLink to='/' isDisabled={location.pathname === '/'} sx={{ ...style }}>
					<Logo
						isClickable={false}
						isSquare
						size={sidebarMode === 'expanded' ? 'xl' : 'md'}
						sx={{ ...omit(style, 'transitionProperty') }}
					/>
				</InternalLink>

				<Navigation />
			</VStack>

			{!isGuest ? <User /> : <SignInButton />}

			<ToggleIconButton />
		</VStack>
	);
};

export default Sidebar;
