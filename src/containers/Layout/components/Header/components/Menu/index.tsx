import React, { ReactElement } from 'react';

import { useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerBody } from '@chakra-ui/react';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';

import IconButton from '../../../../../../components/Inputs/IconButton';
import navItems from '../../../../common/data/navItems';
import NavItems from '../../../NavItems';

const Menu = (): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton aria-label='Open Menu' icon={MenuOutlinedIcon} onClick={onOpen} variant='icon' />

      <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody py={1} px={1}>
            <NavItems navItems={navItems} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;
