import { ReactElement } from 'react';

import { Button } from '@davidscicluna/component-library';

import { useTheme, useColorMode, VStack } from '@chakra-ui/react';

import { useIsFetching, useIsMutating } from 'react-query';
import { useDispatch } from 'react-redux';


import { navItems } from '../../.';
import { useSelector } from '../../../../common/hooks';
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

	const isQuickViewOpen = useSelector((state) => state.modals.ui.quickViewModal.open);

	const isFetching = useIsFetching();
	const isMutating = useIsMutating();

	return (
		<VStack
			width={sidebarWidth[sidebarMode]}
			height={`calc(100vh - ${!isQuickViewOpen && (isFetching > 0 || isMutating) > 0 ? 4 : 0}px)`}
			position='fixed'
			top={!isQuickViewOpen && (isFetching > 0 || isMutating) > 0 ? '4px' : 0}
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

			<VStack width='100%' spacing={2}>
				<Button
					isFullWidth
					isDisabled={isFetching > 0 || isMutating > 0}
					onClick={() => dispatch(toggleSidebarMode(sidebarMode === 'expanded' ? 'collapsed' : 'expanded'))}
					renderLeft={({ fontSize }) => (
						<Icon
							icon={sidebarMode === 'expanded' ? 'remove' : 'add'}
							type='outlined'
							fontSize={fontSize}
						/>
					)}
					variant='outlined'
				>
					{sidebarMode === 'expanded' ? 'Collapse' : ''}
				</Button>
			</VStack>
		</VStack>
	);
};

export default Sidebar;
