import React, { FC } from 'react';

import { Style, useTheme, InternalLink, Button, IconButton, Icon, Fade, utils } from '@davidscicluna/component-library';

import { useConst, Center } from '@chakra-ui/react';

import { Transition } from 'framer-motion';

import { useSelector, useUserTheme } from '../../../../../../../../../../common/hooks';

const { getTransitionDelay } = utils;

const style: Style = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'absolute'
	// left: '50%',
	// top: '50%',
	// transform: 'translate(-50%,-50%)'
};

const SignInButton: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	// const [isTooltipOpen, setIsTooltipOpen] = useBoolean();

	const buttonDelay = useConst<number>(getTransitionDelay({ theme, duration: 'slow' }));

	const buttonConfig = useConst<Transition>({ delay: buttonDelay });

	return (
		<Center width='100%' minHeight='42px' position='relative'>
			<Center width='100%' sx={{ ...style }}>
				<Fade
					in={sidebarMode === 'expanded'}
					unmountOnExit
					transition={{ enter: { ...buttonConfig } }}
					style={{ width: '100%' }}
				>
					<InternalLink to={{ pathname: '/signin' }} isFullWidth>
						<Button color={color} colorMode={colorMode} isFullWidth>
							Sign in
						</Button>
					</InternalLink>
				</Fade>
			</Center>

			<Center sx={{ ...style }}>
				<Fade in={sidebarMode === 'collapsed'} unmountOnExit>
					{/* TODO: Check why tooltip keeps re rendering! */}
					{/* <Tooltip aria-label='Sign in' isOpen={isTooltipOpen} placement='top' label='Sign in'> */}
					<InternalLink to={{ pathname: '/signin' }} isFullWidth>
						<IconButton
							color={color}
							colorMode={colorMode}
							// onMouseEnter={() => setIsTooltipOpen.on()}
							// onMouseLeave={() => setIsTooltipOpen.off()}
						>
							<Icon icon='login' />
						</IconButton>
					</InternalLink>
					{/* </Tooltip> */}
				</Fade>
			</Center>
		</Center>
	);
};

export default SignInButton;
