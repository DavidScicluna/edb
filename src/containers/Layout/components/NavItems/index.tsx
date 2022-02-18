import { ReactElement } from 'react';
import { useIsFetching, useIsMutating } from 'react-query';

import { useColorMode, VStack, Box } from '@chakra-ui/react';

import { NavItemsProps } from './types';

import { useSelector } from '../../../../common/hooks';
import Link from '../../../../components/Clickable/Link';
import NavItem from '../../../../components/NavItem';
import Logo from '../Logo';

const NavItems = ({ navItems, sidebarMode: sidebarModeProp }: NavItemsProps): ReactElement => {
	const { colorMode } = useColorMode();

	const isFetching = useIsFetching();
	const isMutating = useIsMutating();

	const sidebarModeHook = useSelector((state) => state.app.ui.sidebarMode);

	const sidebarMode = sidebarModeProp || sidebarModeHook;

	return (
		<VStack width='100%' spacing={2}>
			<Link to={{ pathname: '/' }} style={{ alignSelf: 'flex-start' }}>
				<Logo size={sidebarMode === 'expanded' ? 'md' : 'sm'} />
			</Link>

			<Box width='100%' height='2px' backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />

			<VStack width='100%'>
				{navItems.map((navItem) => (
					<NavItem
						key={navItem.label}
						{...navItem}
						isExpanded={sidebarMode === 'expanded'}
						isDisabled={isFetching > 0 || isMutating > 0}
					/>
				))}
			</VStack>
		</VStack>
	);
};

export default NavItems;
