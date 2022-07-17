import { FC, useState } from 'react';

import { useLocation, Outlet } from 'react-router-dom';

import { useTheme, InternalLink, IconButton, Icon, Fade, utils } from '@davidscicluna/component-library';

import { useDisclosure, VStack, HStack, Center, Avatar } from '@chakra-ui/react';

import { useElementSize, useUpdateEffect } from 'usehooks-ts';

import { useUserTheme, useSelector } from '../../../../../../common/hooks';
import ScrollToTop from '../../../ScrollToTop';
import Gradient from '../Gradient';

import Sidebar from './components/Sidebar';

const { getColor } = utils;

const StructureTablet: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const location = useLocation();

	const { isOpen: isSidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose } = useDisclosure();

	const user = useSelector((state) => state.users.data.activeUser);

	const [headerRef, { height: headerHeight }] = useElementSize();

	const [background, setBackground] = useState<string>(getColor({ theme, colorMode, type: 'background' }));

	useUpdateEffect(() => setBackground(getColor({ theme, colorMode, type: 'background' })), [colorMode]);

	useUpdateEffect(() => onSidebarClose(), [location.pathname]);

	return (
		<>
			<VStack width='100%' minHeight='100vh' position='relative' spacing={0}>
				<HStack
					ref={headerRef}
					width='100%'
					position='fixed'
					top={0}
					justifyContent='space-between'
					background={background}
					backgroundColor={background}
					borderBottomWidth='2px'
					borderBottomStyle='solid'
					borderBottomColor={getColor({ theme, colorMode, type: 'divider' })}
					p={2}
				>
					<IconButton
						aria-label='SideBar Navigation Menu Button'
						colorMode={colorMode}
						onClick={() => onSidebarOpen()}
						variant='icon'
					>
						<Icon colorMode={colorMode} icon='menu' />
					</IconButton>

					<HStack spacing={2}>
						<Fade in={location.pathname !== '/search'} unmountOnExit>
							<InternalLink to={{ pathname: '/search' }}>
								<IconButton aria-label='Search Button' colorMode={colorMode} variant='icon'>
									<Icon colorMode={colorMode} icon='search' />
								</IconButton>
							</InternalLink>
						</Fade>

						<IconButton aria-label='SideBar Navigation Menu Button' colorMode={colorMode} variant='icon'>
							<Avatar name={user.data.info.name} src={user.data.info.avatar_path} />
						</IconButton>
					</HStack>
				</HStack>

				<Gradient position='fixed' top={headerHeight} />

				<Center
					width='100%'
					minHeight={`calc(100vh - ${headerHeight}px)`}
					position='relative'
					top={headerHeight}
				>
					<Outlet />
				</Center>

				<ScrollToTop />
			</VStack>

			<Sidebar isOpen={isSidebarOpen} onClose={onSidebarClose} />
		</>
	);
};

export default StructureTablet;
