import { FC, useEffect } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useBoolean, useConst, Container } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { useUpdateEffect } from 'usehooks-ts';

import { toggleSidebarMode } from '../../store/slices/App';
import { useSelector } from '../../common/hooks';
import { guest } from '../../store/slices/Users';

import { LayoutProps } from './types';
import { sidebar } from './common/data/sidebar';
import useStyles from './common/styles';
// import Footer from './components/Footer';
// import Header from './components/Header';
import UserThemeModal from './components/Modals/UserThemeModal';
// import ListsModal from './components/Modals/Lists';
// import QuickViewModal from './components/Modals/QuickView';
// import UserSwitcherModal from './components/Modals/UserSwitcher';
// import ProgressBar from './components/ProgressBar';
import Structure from './components/Structure';
import ProgressBar from './components/ProgressBar';
import ScrollToTop from './components/ScrollToTop';
// import Sidebar from './components/Sidebar';

const { convertREMToPixels, convertStringToNumber } = utils;

const Layout: FC<LayoutProps> = ({ children }) => {
	const theme = useTheme();

	const [isMd] = useMediaQuery('(min-width: 600px)');
	const [isLg] = useMediaQuery('(min-width: 1280px)');

	const dispatch = useDispatch();
	const activeUser = useSelector((state) => state.users.data.activeUser);

	// const users = useSelector((state) => state.users.data.users);
	// const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	// const isQuickViewOpen = useSelector((state) => state.modals.ui.quickViewModal.open);

	const [isGuest, setIsGuest] = useBoolean(guest.data.id === activeUser.data.id);

	// const isFetching = useIsFetching();
	// const isMutating = useIsMutating();

	const style = useStyles({ theme });

	const containerMaxWidth = useConst<string>(
		`${convertREMToPixels(convertStringToNumber(theme.breakpoints.xl, 'em')) + sidebar.expanded}px`
	);

	useEffect(() => {
		if (!isLg) {
			dispatch(toggleSidebarMode('expanded'));
		}
	}, [isLg]);

	useUpdateEffect(() => setIsGuest[guest.data.id === activeUser.data.id ? 'on' : 'off'](), [activeUser]);

	return (
		<>
			<Container
				width='100%'
				maxWidth={containerMaxWidth}
				minHeight='100vh'
				centerContent
				position='relative'
				m={0}
				p={0}
				sx={{ ...style }}
			>
				{/* <ProgressBar /> */}

				<ScrollToTop device={isMd && !isLg ? 'tablet' : isLg ? 'desktop' : 'mobile'} />

				<Structure device={isMd && !isLg ? 'tablet' : isLg ? 'desktop' : 'mobile'} isGuest={isGuest}>
					{children}
				</Structure>
			</Container>

			{/* <QuickViewModal /> */}

			{!isGuest && <UserThemeModal />}

			{/* {!isGuest && users.length > 1 && <UserSwitcherModal />} */}

			{/* <ListsModal /> */}
		</>
	);
};

export default Layout;
