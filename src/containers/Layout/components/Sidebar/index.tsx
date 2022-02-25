import { ReactElement } from 'react';
import { useIsFetching, useIsMutating } from 'react-query';
import { useDispatch } from 'react-redux';

import { useTheme, useColorMode, VStack } from '@chakra-ui/react';

import { navItems } from '../../.';
import { useSelector } from '../../../../common/hooks';
import Button from '../../../../components/Clickable/Button';
import Icon from '../../../../components/Icon';
import { toggleSidebarMode } from '../../../../store/slices/App';
import { Theme } from '../../../../theme/types';
import { sidebarWidth } from '../../common/data/dimensions';
import useTransitionsStyle from '../../common/styles/transitions';
import NavItems from '../NavItems';

const Sidebar = (): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const transition = useTransitionsStyle(theme);

	const dispatch = useDispatch();
	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	const isFetching = useIsFetching();
	const isMutating = useIsMutating();

	return (
		<VStack
			width={sidebarWidth[sidebarMode]}
			height='100vh'
			position='fixed'
			top={0}
			zIndex={900}
			alignItems={sidebarMode === 'expanded' ? 'flex-start' : 'stretch'}
			justifyContent='space-between'
			backgroundColor={`gray.${colorMode === 'light' ? 50 : 900}`}
			borderRight='solid2'
			borderRightColor={`gray.${colorMode === 'light' ? 200 : 700}`}
			p={1}
			spacing={2}
			sx={{ ...transition }}
		>
			<NavItems navItems={navItems} />

			<Button
				isFullWidth
				isDisabled={isFetching > 0 || isMutating > 0}
				onClick={() => dispatch(toggleSidebarMode(sidebarMode === 'expanded' ? 'collapsed' : 'expanded'))}
				renderLeftIcon={({ fontSize }) => (
					<Icon icon={sidebarMode === 'expanded' ? 'remove' : 'add'} type='outlined' fontSize={fontSize} />
				)}
				variant='outlined'
			>
				{sidebarMode === 'expanded' ? 'Collapse' : ''}
			</Button>
		</VStack>
	);
};

export default Sidebar;
