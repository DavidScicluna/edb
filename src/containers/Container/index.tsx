import { FC, useCallback } from 'react';

import { Collapse } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { useEventListener, useIsFirstRender, useTimeout } from 'usehooks-ts';

import { usePopulateOptions, useSelector } from '../../common/hooks';
import Layout from '../Layout';
import Routes from '../Routes';
import { guest, setUser } from '../../store/slices/Users';
import Splashscreen from '../Splashscreen';
import Spinner from '../Spinner';
import Router from '../Router';
import { toggleSpinnerModal } from '../../store/slices/Modals';

const Container: FC = () => {
	const dispatch = useDispatch();

	const isFirstRender = useIsFirstRender();

	const activeUser = useSelector((state) => state.users.data.activeUser);
	const isSpinnerModalOpen = useSelector((state) => state.modals.ui.isSpinnerModalOpen);

	const [isSplashscreenOpen, setSetIsSplashscreenOpen] = useBoolean(isFirstRender);
	const [isSpinnerVisible, setSetIsSpinnerVisible] = useBoolean();
	const [isRoutesVisible, setSetIsRoutesVisible] = useBoolean();

	const handleCheckRememberMe = useCallback((): void => {
		if (!activeUser.data.credentials.rememberMe) {
			dispatch(setUser({ ...guest }));
		}
	}, [activeUser, guest]);

	usePopulateOptions();

	useTimeout(() => setSetIsSplashscreenOpen.off(), isSplashscreenOpen ? 6000 : null);
	useTimeout(() => setSetIsSpinnerVisible.on(), isSplashscreenOpen ? 8000 : null);
	useTimeout(() => setSetIsRoutesVisible.on(), isSplashscreenOpen ? 3000 : null);

	useEventListener('beforeunload', () => handleCheckRememberMe());

	return (
		<Router>
			<Splashscreen isOpen={isSplashscreenOpen} onClose={() => setSetIsSplashscreenOpen.off()} />

			{isSpinnerVisible && (
				<Spinner isOpen={isSpinnerModalOpen} onClose={() => dispatch(toggleSpinnerModal(false))} />
			)}

			<Collapse in={isRoutesVisible} unmountOnExit>
				<Layout>
					<Routes />
				</Layout>
			</Collapse>
		</Router>
	);
};

export default Container;
