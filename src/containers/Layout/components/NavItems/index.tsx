import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import NavItem from './components/NavItem';
import { NavItemsProps, NavItem as NavItemType } from './types';

const NavItems = ({ navItems }: NavItemsProps): ReactElement => {
  return (
    <VStack width='100%'>
      {navItems.map((navItem: NavItemType) => (
        <NavItem key={navItem.label} {...navItem} />
      ))}
    </VStack>
  );
};

export default NavItems;
