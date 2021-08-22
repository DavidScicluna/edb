import React, { ReactElement } from 'react';

import { useColorMode, VStack, Box } from '@chakra-ui/react';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import Link from '../../../../components/Clickable/Link';
import NavItem from '../../../../components/NavItem';
import Logo from '../Logo';
import { NavItemsProps } from './types';

const NavItems = ({ navItems, sidebarMode: sidebarModeProp }: NavItemsProps): ReactElement => {
  const { colorMode } = useColorMode();

  const sidebarModeState = useSelector((state) => state.app.ui.sidebarMode);

  const sidebarMode = sidebarModeProp || sidebarModeState;

  return (
    <VStack width='100%' spacing={2}>
      <Link to={{ pathname: '/' }} style={{ alignSelf: 'flex-start' }}>
        <Logo size={sidebarMode === 'expanded' ? 'md' : 'sm'} />
      </Link>

      <Box width='100%' height='2px' backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />

      <VStack width='100%'>
        {navItems.map((navItem) => (
          <NavItem key={navItem.label} {...navItem} sidebarMode={sidebarMode} />
        ))}
      </VStack>
    </VStack>
  );
};

export default NavItems;
