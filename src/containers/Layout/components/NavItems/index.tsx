import React, { ReactElement } from 'react';

import { VStack, Divider } from '@chakra-ui/react';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import Logo from '../Logo';
import NavItem from './components/NavItem';
import { NavItemsProps, NavItem as NavItemType } from './types';

const NavItems = ({ navItems }: NavItemsProps): ReactElement => {
  const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

  return (
    <VStack width='100%' spacing={2}>
      <Logo size={sidebarMode === 'expanded' ? 'md' : 'sm'} />
      <Divider height='2px' />
      <VStack width='100%'>
        {navItems.map((navItem: NavItemType) => (
          <NavItem key={navItem.label} {...navItem} />
        ))}
      </VStack>
    </VStack>
  );
};

export default NavItems;
