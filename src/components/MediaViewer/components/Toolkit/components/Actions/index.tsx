import { ReactElement, MouseEvent } from 'react';

import { useMediaQuery, useBoolean, Stack } from '@chakra-ui/react';

import { compact } from 'lodash';

import { ActionsProps, HTMLFullscreenElement, FullscreenDocument } from './types';

import IconButton from '../../../../../Clickable/IconButton';
import Icon from '../../../../../Icon';

const Actions = (props: ActionsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { hasFullscreen = true, onClose, onGalleryClick } = props;

	const [isFullscreen, setIsFullscreen] = useBoolean();
	const [isfullscreenNotSupported, setIsfullscreenNotSupported] = useBoolean();

	/**
	 * This method will open fullscreen mode
	 */
	const handleOpenFullscreen = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => {
		event.preventDefault();

		const element: HTMLFullscreenElement = document.documentElement;

		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		} else {
			console.error('Fullscreen API is not supported.');
			setIsfullscreenNotSupported.on();
		}

		setIsFullscreen.on();
	};

	/**
	 * This method will close fullscreen mode
	 */
	const handleCloseFullscreen = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => {
		event.preventDefault();

		const doc: FullscreenDocument = document;

		if (doc.exitFullscreen) {
			doc.exitFullscreen();
		} else if (doc.webkitExitFullscreen) {
			doc.webkitExitFullscreen();
		} else if (doc.mozCancelFullScreen) {
			doc.mozCancelFullScreen();
		} else if (doc.msExitFullscreen) {
			doc.msExitFullscreen();
		} else {
			console.error('Fullscreen API is not supported.');
			setIsfullscreenNotSupported.on();
		}

		setIsFullscreen.off();
	};

	/**
	 * This method will close the modal and will close fullscreen if fullscreen is open
	 */
	const handleClose = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => {
		if (isFullscreen) {
			handleCloseFullscreen(event);
		}

		onClose();
	};

	const actions = compact([
		// Close button
		<IconButton
			key='close_button'
			aria-label='Close modal'
			onClick={(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => handleClose(event)}
			variant='icon'
		>
			<Icon icon='close' type='outlined' />
		</IconButton>,

		// Gallery button
		<IconButton key='gallery_button' aria-label='Open Gallery' onClick={() => onGalleryClick()} variant='icon'>
			<Icon icon='dashboard' type='outlined' />
		</IconButton>,

		//  Fullscreen button
		!isfullscreenNotSupported && hasFullscreen ? (
			<IconButton
				key='fullscreen_button'
				aria-label={isFullscreen ? 'Exit fullscreen ' : 'Enter fullscreen'}
				onClick={
					isFullscreen ? (event) => handleCloseFullscreen(event) : (event) => handleOpenFullscreen(event)
				}
				variant='icon'
			>
				<Icon icon={isFullscreen ? 'fullscreen_exit' : 'fullscreen'} type='outlined' />
			</IconButton>
		) : undefined
	]);

	return (
		<Stack direction={isSm ? 'row' : 'column'} backgroundColor='transparent' spacing={0} p={2}>
			{isSm ? actions.reverse() : actions}
		</Stack>
	);
};

export default Actions;
