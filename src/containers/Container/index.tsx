import { FC } from 'react';

import { Slide } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { useWillUnmount } from 'rooks';
import { useDispatch } from 'react-redux';
import { useEffectOnce, useIsFirstRender, useTimeout } from 'usehooks-ts';

import { usePopulateOptions, useSelector } from '../../common/hooks';
import Routes from '../Routes';
import { guest, setUser } from '../../store/slices/Users';
import Splashscreen from '../Splashscreen';

const Container: FC = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.users.data.activeUser);

	const isFirstRender = useIsFirstRender();

	const [isSplashscreenOpen, setSetIsSplashscreenOpen] = useBoolean();

	usePopulateOptions();

	useEffectOnce(() => setSetIsSplashscreenOpen.on());

	useTimeout(() => setSetIsSplashscreenOpen.off(), isSplashscreenOpen ? 2500 : null);

	useWillUnmount(() => {
		if (!user.data.credentials.rememberMe) {
			dispatch(setUser({ ...guest }));
		}
	});

	return isFirstRender && isSplashscreenOpen ? (
		<Splashscreen isOpen />
	) : (
		<Slide in direction='bottom'>
			<Routes />
		</Slide>
	);
};

export default Container;
