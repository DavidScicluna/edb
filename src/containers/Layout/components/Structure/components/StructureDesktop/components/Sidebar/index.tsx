import { FC, useState } from 'react';

import { useTheme, Divider, InternalLink, Button, IconButton, Icon, utils } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { omit } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { isGuest as defaultIsGuest } from '../../../../common/data/defaultPropValues';
import { StructureCommonProps as SidebarProps } from '../../../../common/types';
import Logo from '../../../../../../../../components/Logo';
import useStyles from '../../../../../../common/styles';
import { useSelector, useUserTheme } from '../../../../../../../../common/hooks';
import { toggleSidebarMode } from '../../../../../../../../store/slices/App';
import Navigation from '../../../Navigation';

import User from './components/User';

const { getColor } = utils;

const Sidebar: FC<SidebarProps> = ({ isGuest = defaultIsGuest }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const dispatch = useDispatch();
	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	const [background, setBackground] = useState<string>(getColor({ theme, colorMode, type: 'background' }));

	const style = useStyles({ theme });

	useUpdateEffect(() => setBackground(getColor({ theme, colorMode, type: 'background' })), [colorMode]);

	return (
		<VStack
			width='100%'
			height='100vh'
			alignItems='stretch'
			justifyContent='space-between'
			background={background}
			backgroundColor={background}
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
				<InternalLink to={{ pathname: '/' }}>
					<Logo
						isClickable={false}
						isSquare
						size={sidebarMode === 'expanded' ? 'xl' : 'md'}
						sx={{ ...omit(style, 'transitionProperty') }}
					/>
				</InternalLink>

				<Navigation isGuest={isGuest} />
			</VStack>

			<VStack width='100%' spacing={1} sx={{ ...style }}>
				{!isGuest ? (
					<User />
				) : (
					<InternalLink to={{ pathname: '/signin' }} isFullWidth>
						<Button color={color} isFullWidth>
							Sign in
						</Button>
					</InternalLink>
				)}

				<IconButton
					aria-label={sidebarMode === 'expanded' ? 'Collapse navigation-bar' : 'Expand navigation-bar'}
					colorMode={colorMode}
					onClick={() => dispatch(toggleSidebarMode(sidebarMode === 'expanded' ? 'collapsed' : 'expanded'))}
					variant='icon'
				>
					<Icon icon={sidebarMode === 'expanded' ? 'remove' : 'add'} />
				</IconButton>
			</VStack>
		</VStack>
	);
};

export default Sidebar;
