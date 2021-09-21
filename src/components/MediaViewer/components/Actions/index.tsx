import { ReactElement, MouseEvent } from 'react';

import { useMediaQuery, useBoolean, VStack, HStack } from '@chakra-ui/react';
import {
  CloseOutlined as CloseOutlinedIcon,
  DashboardOutlined as DashboardOutlinedIcon,
  FullscreenOutlined as FullscreenOutlinedIcon,
  FullscreenExitOutlined as FullscreenExitOutlinedIcon
} from '@material-ui/icons';

import IconButton from '../../../Clickable/IconButton';
import { ActionsProps, HTMLFullscreenElement, FullscreenDocument } from './types';

const Actions = (props: ActionsProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { activeType, onClose, onGalleryClick } = props;

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

  const actions = [
    // Close button
    <IconButton
      key='close_button'
      aria-label='Close modal'
      icon={CloseOutlinedIcon}
      onClick={(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => handleClose(event)}
      variant='icon'
    />,

    // Gallery button
    <IconButton
      key='gallery_button'
      aria-label='Open Gallery'
      icon={DashboardOutlinedIcon}
      onClick={() => onGalleryClick()}
      variant='icon'
    />,

    //  Fullscreen button
    !isfullscreenNotSupported && activeType !== 'video' ? (
      <IconButton
        key='fullscreen_button'
        aria-label={isFullscreen ? 'Exit fullscreen ' : 'Enter fullscreen'}
        icon={isFullscreen ? FullscreenExitOutlinedIcon : FullscreenOutlinedIcon}
        onClick={isFullscreen ? (event) => handleCloseFullscreen(event) : (event) => handleOpenFullscreen(event)}
        variant='icon'
      />
    ) : null
  ].filter((action) => action);

  return isSm ? (
    <HStack position='absolute' top={1} right={1} zIndex={2} backgroundColor='transparent' spacing={0}>
      {actions.reverse()}
    </HStack>
  ) : (
    <VStack position='absolute' top={1} right={1} zIndex={2} backgroundColor='transparent' spacing={0}>
      {actions}
    </VStack>
  );
};

export default Actions;
