import { ReactElement, useEffect } from 'react';

import { useColorMode, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerBody } from '@chakra-ui/react';
import { Menu as MenuIcon, X as XIcon } from 'react-feather';
import { useLocation } from 'react-router-dom';

import IconButton from '../../../../../../components/Clickable/IconButton';
import navItems from '../../../../common/data/navItems';
import NavItems from '../../../NavItems';

const Menu = (): ReactElement => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();

  useEffect(() => onClose(), [location]);

  return (
    <>
      <IconButton aria-label='Open Menu' icon={MenuIcon} onClick={onOpen} variant='icon' />

      <Drawer isOpen={isOpen} blockScrollOnMount={false} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
          <DrawerBody position='relative' py={1} px={1}>
            <IconButton
              aria-label='Close modal?'
              position='absolute'
              top={1}
              right={1}
              icon={XIcon}
              onClick={() => onClose()}
              variant='icon'
            />

            <NavItems navItems={navItems} sidebarMode='expanded' />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;
