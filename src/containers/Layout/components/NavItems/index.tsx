import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import NavItem from './components/NavItem';
import { NavProps } from './types';

const NavItems = ({ navItems, isExpanded = false }: NavProps): ReactElement => {
  return (
    <VStack width='100%'>
      {navItems.map((navItem) => (
        <NavItem key={navItem.label} {...navItem} isExpanded={isExpanded} />
      ))}
    </VStack>
  );
};

export default NavItems;
