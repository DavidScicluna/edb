import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useBoolean } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { useEventListener, useIsFirstRender, useTimeout, useUpdateEffect } from 'usehooks-ts';

import { usePopulateOptions, useSelector, useUserTheme } from '../../common/hooks';
import Layout from '../Layout';
import Routes from '../Routes';
import { guest, setUser } from '../../store/slices/Users';
import Splashscreen from '../Splashscreen';
import Spinner from '../Spinner';
import Router from '../Router';
import { toggleSpinnerModal } from '../../store/slices/Modals';
import { updateFavicon } from '../../common/utils';

const { checkIsTouchDevice } = utils;

const isTouchDevice = checkIsTouchDevice();

const Container: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isLg] = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

	const isFirstRender = useIsFirstRender();

	const dispatch = useDispatch();
	const activeUser = useSelector((state) => state.users.data.activeUser);
	const isSpinnerModalOpen = useSelector((state) => state.modals.ui.isSpinnerModalOpen);

	const [isSplashscreenOpen, setSetIsSplashscreenOpen] = useBoolean(isFirstRender);
	const [isSpinnerVisible, setSetIsSpinnerVisible] = useBoolean();
	const [isRoutesVisible, setSetIsRoutesVisible] = useBoolean();

	const handleCheckRememberMe = (): void => {
		if (!activeUser.data.credentials.rememberMe) {
			dispatch(
				setUser({
					...guest,
					ui: {
						...guest.ui,
						theme: {
							...guest.ui.theme,
							color: activeUser.ui.theme.color
						}
					}
				})
			);

			updateFavicon({ color: activeUser.ui.theme.color, colorMode });
		}
	};

	usePopulateOptions();

	useTimeout(() => setSetIsSplashscreenOpen.off(), isSplashscreenOpen ? 10000 : null);
	useTimeout(() => setSetIsRoutesVisible.on(), isLg && isTouchDevice ? (isSplashscreenOpen ? 5000 : null) : 0);
	useTimeout(() => setSetIsSpinnerVisible.on(), isRoutesVisible ? 7500 : null);

	useEventListener('beforeunload', () => handleCheckRememberMe());

	useUpdateEffect(() => updateFavicon({ color: activeUser.ui.theme.color, colorMode }), [colorMode]);

	return (
		<Router>
			{isLg && isTouchDevice && (
				<Splashscreen isOpen={isSplashscreenOpen} onClose={() => setSetIsSplashscreenOpen.off()} />
			)}

			{isSpinnerVisible && (
				<Spinner isOpen={isSpinnerModalOpen} onClose={() => dispatch(toggleSpinnerModal(false))} />
			)}

			{isRoutesVisible && (
				<Layout>
					<Routes />
				</Layout>
			)}
		</Router>
	);
};

export default Container;
