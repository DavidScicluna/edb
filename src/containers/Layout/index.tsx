import { FC, createContext, useCallback, useEffect } from 'react';

import { useLocation } from 'react-router';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useToast, useBoolean, useConst, Container } from '@chakra-ui/react';

import { useIsFirstRender, useUpdateEffect } from 'usehooks-ts';
import { useOnline, useWindowSize } from 'rooks';
import { debounce } from 'lodash';

import { useCheckColorMode, useSelector, useUserTheme } from '../../common/hooks';
import { guest } from '../../store/slices/Users';
import { Alert } from '../../components';
import { convertDurationToMS } from '../../components/Alert/common/utils';

import { LayoutContext as LayoutContextType, LayoutProps } from './types';
import { sidebar } from './common/data/sidebar';
import useStyles from './common/styles';
// import Footer from './components/Footer';
// import Header from './components/Header';
import InternationalizationModal from './components/Modals/InternationalizationModal';
import AuthenticationConfirmModal from './components/Modals/AuthenticationConfirmModal';
import UserThemeModal from './components/Modals/UserThemeModal';
import BookmarkModal from './components/Modals/BookmarkModal';
import PromptConfirmModal from './components/Modals/PromptConfirmModal';
// import QuickViewModal from './components/Modals/QuickView';
// import ProgressBar from './components/ProgressBar';
import Structure from './components/Structure';
import ProgressBar from './components/ProgressBar';
import {
	isGuest as defaultIsGuest,
	isAuthenticationRoute as defaultIsAuthenticationRoute,
	spacing as defaultSpacing
} from './common/data/defaultPropValues';
import ScrollToTop from './components/ScrollToTop';
// import Sidebar from './components/Sidebar';

const { convertREMToPixels, convertStringToNumber, getColor } = utils;

export const LayoutContext = createContext<LayoutContextType>({
	isGuest: defaultIsGuest,
	isAuthenticationRoute: defaultIsAuthenticationRoute,
	spacing: defaultSpacing
});

const onlineToastID = 'ds-edb-is-online-toast';
const offlineToastID = 'ds-edb-is-offline-toast';

const Layout: FC<LayoutProps> = ({ children }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
	const [isXl] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);

	const location = useLocation();

	const activeUser = useSelector((state) => state.users.data.activeUser);

	const { innerWidth: windowWidth = 0 } = useWindowSize();

	const toast = useToast();

	const isOnline = useOnline();
	const isFirstRender = useIsFirstRender();

	useCheckColorMode();

	// const users = useSelector((state) => state.users.data.users);
	// const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	// const isQuickViewOpen = useSelector((state) => state.modals.ui.quickViewModal.open);

	const [isGuest, setIsGuest] = useBoolean(guest.data.id === activeUser.data.id);
	const [isAuthenticationRoute, setIsAuthenticationRoute] = useBoolean();

	// const isFetching = useIsFetching();
	// const isMutating = useIsMutating();

	const style = useStyles({ theme });

	const containerMaxWidth = useConst<number>(
		convertREMToPixels(convertStringToNumber(theme.breakpoints.xl, 'em')) + sidebar.expanded
	);

	const handleCheckIsOnline = useCallback(
		debounce(() => {
			if (!isOnline && !toast.isActive(offlineToastID)) {
				toast.close(onlineToastID);
				toast({
					id: offlineToastID,
					duration: null,
					position: 'bottom-left',
					render: () => (
						<Alert
							duration={null}
							description='You are currently offline! Please connect to view data.'
							status='error'
						/>
					)
				});
			} else if (!isFirstRender && !toast.isActive(onlineToastID)) {
				toast.close(offlineToastID);
				toast({
					id: onlineToastID,
					duration: convertDurationToMS(),
					position: 'bottom-left',
					render: () => (
						<Alert
							duration={12.5}
							description='You have successfully reconnected to the app!'
							status='success'
							onClose={() => toast.close(onlineToastID)}
						/>
					)
				});
			}
		}, 500),
		[toast, isOnline, offlineToastID, onlineToastID, isFirstRender]
	);

	useEffect(() => handleCheckIsOnline(), [isOnline]);

	useEffect(() => {
		setIsAuthenticationRoute[location.pathname.includes('authentication') ? 'on' : 'off']();
	}, [location.pathname]);

	useUpdateEffect(() => setIsGuest[guest.data.id === activeUser.data.id ? 'on' : 'off'](), [activeUser]);

	return (
		<>
			<Container
				width='100%'
				maxWidth={!isAuthenticationRoute ? `${containerMaxWidth}px` : '100%'}
				minHeight='100vh'
				centerContent
				borderLeftWidth={!isAuthenticationRoute && (windowWidth || 0) >= containerMaxWidth ? '2px' : 0}
				borderRightWidth={!isAuthenticationRoute && (windowWidth || 0) >= containerMaxWidth ? '2px' : 0}
				borderStyle='solid'
				borderColor={getColor({ theme, colorMode, type: 'divider' })}
				p={0}
				sx={{ ...style }}
			>
				<ProgressBar maxWidth={`${containerMaxWidth}px`} />

				<ScrollToTop />

				<LayoutContext.Provider value={{ isGuest, isAuthenticationRoute, spacing: isXl ? 4 : isSm ? 3 : 2 }}>
					<Structure device={isXl ? 'desktop' : isSm ? 'tablet' : 'mobile'}>{children}</Structure>
				</LayoutContext.Provider>
			</Container>

			{/* <QuickViewModal /> */}

			<InternationalizationModal />

			<PromptConfirmModal />

			{!isGuest && <UserThemeModal />}

			{!isGuest && <BookmarkModal />}

			{isGuest && <AuthenticationConfirmModal />}

			{/* !isGuest && <ListsModal /> */}
		</>
	);
};

export default Layout;
