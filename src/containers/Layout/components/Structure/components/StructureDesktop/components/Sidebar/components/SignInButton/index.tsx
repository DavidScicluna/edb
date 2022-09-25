import { FC } from 'react';

import { useTheme, InternalLink, Button, Icon, Fade, utils } from '@davidscicluna/component-library';

import { useConst, Center } from '@chakra-ui/react';

import { AnimatePresence, Transition } from 'framer-motion';

import { useSelector, useUserTheme } from '../../../../../../../../../../common/hooks';

const { getTransitionDelay } = utils;

// TODO: Replace all exitBeforeEnter with mode='wait'

const SignInButton: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	const delay = useConst<number>(getTransitionDelay({ theme, duration: 'slow' }));
	const config = useConst<Transition>({ delay });

	return (
		<InternalLink to='/authentication/signin' isFullWidth>
			<Button color={color} colorMode={colorMode} isFullWidth>
				<Center width='100%' position='relative'>
					<AnimatePresence initial={false} exitBeforeEnter>
						<Fade
							in={sidebarMode === 'expanded'}
							transition={{ enter: { ...config } }}
							style={{ position: 'absolute' }}
						>
							Sign in
						</Fade>
						<Fade
							in={sidebarMode === 'collapsed'}
							transition={{ enter: { ...config } }}
							style={{ position: 'absolute' }}
						>
							<Icon icon='login' />
						</Fade>
					</AnimatePresence>
				</Center>
			</Button>
		</InternalLink>
	);
};

export default SignInButton;
