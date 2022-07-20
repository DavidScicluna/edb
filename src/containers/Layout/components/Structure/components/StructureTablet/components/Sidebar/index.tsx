import { FC, useState } from 'react';

import { useTheme, Divider, InternalLink, IconButton, Icon, utils } from '@davidscicluna/component-library';

import { Drawer, DrawerOverlay, DrawerContent, DrawerBody, VStack, Center } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';

import Logo from '../../../../../../../../components/Logo';
import { useUserTheme } from '../../../../../../../../common/hooks';
import Navigation from '../../../Navigation';

import { SidebarProps } from './types';

const { getColor } = utils;

const Sidebar: FC<SidebarProps> = ({ isOpen = false, onClose }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [background, setBackground] = useState<string>(getColor({ theme, colorMode, type: 'background' }));

	useUpdateEffect(() => setBackground(getColor({ theme, colorMode, type: 'background' })), [colorMode]);

	return (
		<Drawer isOpen={isOpen} isFullHeight placement='left' preserveScrollBarGap onClose={() => onClose()} size='xs'>
			<DrawerOverlay />
			<DrawerContent background={background} backgroundColor={background} sx={{ transition: 'none' }}>
				<DrawerBody position='relative' p={0} m={0} sx={{ transition: 'none' }}>
					<Center position='absolute' top={theme.space[2]} right={theme.space[2]}>
						<IconButton
							aria-label='Close modal'
							colorMode={colorMode}
							onClick={() => onClose()}
							variant='icon'
						>
							<Icon icon='close' category='outlined' />
						</IconButton>
					</Center>

					<VStack
						width='100%'
						alignItems='flex-start'
						divider={<Divider colorMode={colorMode} />}
						background={background}
						backgroundColor={background}
						p={2}
						spacing={2}
					>
						<InternalLink to={{ pathname: '/' }}>
							<Logo isClickable={false} isSquare size='xl' />
						</InternalLink>

						<Navigation />
					</VStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default Sidebar;
