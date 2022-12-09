import { FC } from 'react';

import { useTheme, InternalLink, Button, Icon, AnimatePresence, Fade, utils } from '@davidscicluna/component-library';

import { useConst, Center } from '@chakra-ui/react';

import { Transition } from 'framer-motion';

import { useSelector, useUserTheme } from '../../../../../../../../../../common/hooks';

const { getTransitionConfig, getTransitionDelay } = utils;

const SignInButton: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	const delay = useConst<number>(getTransitionDelay({ theme, duration: 'slow' }));
	const config = useConst<Transition>({ ...getTransitionConfig({ theme }), delay });

	return (
		<InternalLink to='/authentication/signin' isFullWidth>
			<Button color={color} colorMode={colorMode} isFullWidth>
				<Center width='100%' position='relative'>
					<AnimatePresence>
						<Fade
							key='ds-edb-structure-desktop-sidebar-sign-in-button-text'
							in={sidebarMode === 'expanded'}
							transition={{ enter: { ...config } }}
							style={{ position: 'absolute' }}
						>
							Sign in
						</Fade>
						<Fade
							key='ds-edb-structure-desktop-sidebar-sign-in-button-icon'
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
