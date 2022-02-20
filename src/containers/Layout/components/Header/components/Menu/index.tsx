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

import { MenuOutlined as MenuOutlinedIcon, CloseOutlined as CloseOutlinedIcon } from '@material-ui/icons';

import IconButton from '../../../../../../components/Clickable/IconButton';
import { navItems } from '../../../../index';
import NavItems from '../../../NavItems';

const Menu = (): ReactElement => {
	const { colorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const location = useLocation();

	useEffect(() => onClose(), [location]);

	return (
		<>
			<IconButton aria-label='Open Menu' onClick={onOpen} variant='icon'>
				<MenuOutlinedIcon />
			</IconButton>

			<Drawer isOpen={isOpen} blockScrollOnMount={false} placement='left' onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
					<DrawerBody position='relative' py={1} px={1}>
						<Center position='absolute' top={1} right={1}>
							<IconButton aria-label='Close modal?' onClick={() => onClose()} variant='icon'>
								<CloseOutlinedIcon />
							</IconButton>
						</Center>

						<NavItems navItems={navItems} sidebarMode='expanded' />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Menu;
