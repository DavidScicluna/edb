import { ReactElement, useEffect } from 'react';

import { useColorMode, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerBody } from '@chakra-ui/react';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
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
      <IconButton aria-label='Open Menu' icon={MenuOutlinedIcon} onClick={onOpen} variant='icon' />

      <Drawer isOpen={isOpen} blockScrollOnMount={false} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
          <DrawerBody py={1} px={1}>
            <NavItems navItems={navItems} sidebarMode='expanded' />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;
