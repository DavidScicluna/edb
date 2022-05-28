import { ReactElement, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { IconButton, Icon } from '@davidscicluna/component-library';

import {
	useColorMode,
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerBody,
	Center
} from '@chakra-ui/react';

import { navItems } from '../../../../index';
import NavItems from '../../../NavItems';

const Menu = (): ReactElement => {
	const { colorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const location = useLocation();

	useEffect(() => onClose(), [location]);

	return (
		<>
			<IconButton aria-label='Open Menu' onClick={onOpen} size='lg' variant='icon'>
				<Icon icon='menu' category='outlined' />
			</IconButton>

			<Drawer isOpen={isOpen} blockScrollOnMount={false} placement='left' onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent backgroundColor={`gray.${colorMode === 'light' ? 50 : 900}`}>
					<DrawerBody position='relative' py={1} px={1}>
						<Center position='absolute' top={1} right={1}>
							<IconButton aria-label='Close modal?' onClick={() => onClose()} variant='icon'>
								<Icon icon='close' category='outlined' />
							</IconButton>
						</Center>

						<NavItems
							navItems={navItems.filter((navItem) => navItem.path !== '/search')}
							sidebarMode='expanded'
						/>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Menu;
