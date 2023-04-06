import { FC, createContext, useCallback, useEffect } from 'react';

import { useLocation } from 'react-router';

import { useTheme, Alert, ScrollToTop, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useToast, useBoolean, useConst, Container, Center } from '@chakra-ui/react';

import { useIsFirstRender, useUpdateEffect } from 'usehooks-ts';
import { useOnline, useWindowSize } from 'rooks';
import { debounce } from 'lodash';

import { useCheckColorMode, useSelector, useUserTheme } from '../../common/hooks';
import { guest } from '../../store/slices/Users';

import { LayoutContext as LayoutContextType, LayoutProps } from './types';
import { sidebar } from './common/data/sidebar';
import useStyles from './common/styles';
import InternationalizationModal from './components/Modals/InternationalizationModal';
import AuthenticationConfirmModal from './components/Modals/AuthenticationConfirmModal';
import UserThemeModal from './components/Modals/UserThemeModal';
import BookmarkModal from './components/Modals/BookmarkModal';
import PromptConfirmModal from './components/Modals/PromptConfirmModal';
import QuickViewModal from './components/Modals/QuickViewModal';
import Structure from './components/Structure';
import ProgressBar from './components/ProgressBar';
import {
	device as defaultDevice,
	isGuest as defaultIsGuest,
	isAuthenticationRoute as defaultIsAuthenticationRoute,
	spacing as defaultSpacing
} from './common/data/defaultPropValues';

const { convertDurationToMS, convertREMToPixels, convertStringToNumber, getColor } = utils;

export const LayoutContext = createContext<LayoutContextType>({
	device: defaultDevice,
	isGuest: defaultIsGuest,
	isAuthenticationRoute: defaultIsAuthenticationRoute,
	spacing: defaultSpacing
});

const onlineToastID = 'ds-edb-layout-is-online-toast';
const offlineToastID = 'ds-edb-layout-is-offline-toast';

const Layout: FC<LayoutProps> = ({ children }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const [isXl] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);

	const location = useLocation();

	const activeUser = useSelector((state) => state.users.data.activeUser);

	const { innerWidth: windowWidth = 0 } = useWindowSize();

	const toast = useToast();

	const isOnline = useOnline();
	const isFirstRender = useIsFirstRender();

	const [isGuest, setIsGuest] = useBoolean(guest.data.id === activeUser.data.id);
	const [isAuthenticationRoute, setIsAuthenticationRoute] = useBoolean();

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

	useCheckColorMode();

	return (
		<LayoutContext.Provider
			value={{
				device: isXl ? 'desktop' : isMd ? 'tablet' : 'mobile',
				isGuest,
				isAuthenticationRoute,
				spacing: isXl ? 5 : isMd ? 4 : isSm ? 3 : 2
			}}
		>
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

				<Center
					position='fixed'
					bottom={theme.space[2]}
					right={theme.space[2]}
					zIndex={theme.zIndices.toast}
					background='transparent'
				>
					<ScrollToTop />
				</Center>

				<Structure>{children}</Structure>
			</Container>

			<PromptConfirmModal />

			<InternationalizationModal />

			<QuickViewModal />

			{!isGuest && <UserThemeModal />}

			{!isGuest && <BookmarkModal />}

			{isGuest && <AuthenticationConfirmModal />}
		</LayoutContext.Provider>
	);
};

export default Layout;
