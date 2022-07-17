import { FC } from 'react';

import { useTheme, Divider, InternalLink, IconButton, Icon, utils } from '@davidscicluna/component-library';

import { useConst, VStack } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { omit } from 'lodash';

import Logo from '../../../../../../../../components/Logo';
import useStyles from '../../../../../../common/styles';
import { useSelector, useUserTheme } from '../../../../../../../../common/hooks';
import { toggleSidebarMode } from '../../../../../../../../store/slices/App';
import Navigation from '../../../Navigation';

const { getColor } = utils;

const Sidebar: FC = () => {
	const theme = useTheme();

	const dispatch = useDispatch();
	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	const { colorMode } = useUserTheme();

	const style = useStyles({ theme });

	const background = useConst<string>(getColor({ theme, colorMode, type: 'background' }));

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
			<VStack width='100%' alignItems='flex-start' divider={<Divider />} spacing={2} sx={{ ...style }}>
				<InternalLink to={{ pathname: '/' }}>
					<Logo
						isClickable={false}
						isSquare
						size={sidebarMode === 'expanded' ? 'xl' : 'md'}
						sx={{ ...omit(style, 'transitionProperty') }}
					/>
				</InternalLink>

				<Navigation />
			</VStack>

			<VStack width='100%' spacing={2} sx={{ ...style }}>
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
