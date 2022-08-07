import React, { FC, useState, useCallback } from 'react';

import { Style, useTheme, Button, Icon, Fade, utils } from '@davidscicluna/component-library';

import { useColorMode, useConst, HStack, Center, Text } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { Transition } from 'framer-motion';
import { useTimeout } from 'usehooks-ts';

import { toggleSpinnerModal } from '../../../../../../store/slices/Modals';
import { useSelector } from '../../../../../../common/hooks';

import { GuestColorModeSwitcherProps } from './types';

const { convertStringToNumber, getColor, getTransitionDelay } = utils;

const collpasedStyle: Style = { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' };
const expandedStyle: Style = { position: 'relative' };

const GuestColorModeSwitcher: FC<GuestColorModeSwitcherProps> = ({ isFixed = false }) => {
	const theme = useTheme();
	const { colorMode, toggleColorMode } = useColorMode();

	const dispatch = useDispatch();
	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	// const [isTooltipOpen, setIsTooltipOpen] = useBoolean();

	const [style, setStyle] = useState<Style>({});

	const delay = useConst<number>(getTransitionDelay({ theme, duration: 'ultra-slow' }));
	const config = useConst<Transition>({ delay });

	const defaultStyle = useConst<Style>({
		width: theme.fontSizes['2xl'],
		height: theme.fontSizes['2xl'],
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	});

	const expandedTimeout = useConst<number>(convertStringToNumber(theme.transition.duration['ultra-slow'], 'ms'));
	const collapsedTimeout = useConst<number>(convertStringToNumber(theme.transition.duration.normal, 'ms'));

	const handleSwitcher = useCallback(() => {
		dispatch(toggleSpinnerModal(true));

		toggleColorMode();

		setTimeout(() => dispatch(toggleSpinnerModal(false)), 500);
	}, [toggleColorMode, toggleSpinnerModal]);

	useTimeout(
		() => setStyle({ ...defaultStyle, ...expandedStyle }),
		sidebarMode === 'expanded' ? expandedTimeout : null
	);
	useTimeout(
		() => setStyle({ ...defaultStyle, ...collpasedStyle }),
		sidebarMode === 'collapsed' ? collapsedTimeout : null
	);

	return (
		// TODO: Check why tooltip keeps re rendering!
		// <Tooltip
		// 	aria-label='Appearance (Light/Dark) Mode Switcher'
		// 	isOpen={isTooltipOpen}
		// 	placement='top'
		// 	label={`Switch to ${colorMode === 'light' ? 'Dark' : 'Light'} mode`}
		// >
		<Button
			as='span'
			onClick={() => handleSwitcher()}
			// onMouseEnter={() => setIsTooltipOpen.on()}
			// onMouseLeave={() => setIsTooltipOpen.off()}
			variant='text'
		>
			<HStack
				width='100%'
				position='relative'
				divider={
					<Fade
						in={isFixed || sidebarMode === 'expanded'}
						unmountOnExit
						transition={sidebarMode === 'expanded' ? { enter: { ...config } } : {}}
					>
						<Text
							align='center'
							color={getColor({ theme, colorMode, type: 'text.secondary' })}
							fontSize='md'
							fontWeight='medium'
							mx={2}
						>
							/
						</Text>
					</Fade>
				}
			>
				{/* Light Mode */}
				<Center sx={{ ...style }}>
					<Fade
						in={isFixed || sidebarMode === 'expanded' || colorMode === 'light'}
						unmountOnExit
						transition={sidebarMode === 'expanded' ? { enter: { ...config } } : {}}
					>
						<Icon
							width='inherit'
							height='inherit'
							fontSize={theme.fontSizes['2xl']}
							icon='light_mode'
							color={getColor({
								theme,
								colorMode,
								type: `text.${colorMode === 'light' ? 'primary' : 'secondary'}`
							})}
						/>
					</Fade>
				</Center>

				{/* Dark Mode */}
				<Center sx={{ ...style }}>
					<Fade
						in={isFixed || sidebarMode === 'expanded' || colorMode === 'dark'}
						unmountOnExit
						transition={sidebarMode === 'expanded' ? { enter: { ...config } } : {}}
					>
						<Icon
							width='inherit'
							height='inherit'
							fontSize={theme.fontSizes['2xl']}
							icon='dark_mode'
							color={getColor({
								theme,
								colorMode,
								type: `text.${colorMode === 'dark' ? 'primary' : 'secondary'}`
							})}
						/>
					</Fade>
				</Center>
			</HStack>
		</Button>
		// </Tooltip>
	);
};

export default GuestColorModeSwitcher;
