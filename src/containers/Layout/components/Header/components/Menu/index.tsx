import { ReactElement, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
	useColorMode,
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerBody,
	Center
} from '@chakra-ui/react';

import IconButton from '../../../../../../components/Clickable/IconButton';
import Icon from '../../../../../../components/Icon';
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
				<Icon icon='menu' type='outlined' />
			</IconButton>

			<Drawer isOpen={isOpen} blockScrollOnMount={false} placement='left' onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent backgroundColor={`gray.${colorMode === 'light' ? 50 : 900}`}>
					<DrawerBody position='relative' py={1} px={1}>
						<Center position='absolute' top={1} right={1}>
							<IconButton aria-label='Close modal?' onClick={() => onClose()} variant='icon'>
								<Icon icon='close' type='outlined' />
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
