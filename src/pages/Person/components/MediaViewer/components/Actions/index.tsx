import React, { ReactElement } from 'react';

import { useBoolean, VStack } from '@chakra-ui/react';
import {
  CloseOutlined as CloseOutlinedIcon,
  DashboardOutlined as DashboardOutlinedIcon,
  FullscreenOutlined as FullscreenOutlinedIcon,
  FullscreenExitOutlined as FullscreenExitOutlinedIcon
} from '@material-ui/icons';

import IconButton from '../../../../../../components/Clickable/IconButton';
import { ActionsProps } from './types';

const Actions = (props: ActionsProps): ReactElement => {
  const [isFullscreen, setIsFullscreen] = useBoolean();

  const { onClose, onGalleryClick } = props;

  /**
   * This method will open fullscreen mode
   */
  const handleOpenFullscreen = (): void => {
    document.documentElement.requestFullscreen();
    setIsFullscreen.on();
  };

  /**
   * This method will close fullscreen mode
   */
  const handleCloseFullscreen = (): void => {
    document.exitFullscreen();
    setIsFullscreen.off();
  };

  /**
   * This method will close the modal and will close fullscreen if fullscreen is open
   */
  const handleClose = (): void => {
    if (isFullscreen) {
      handleCloseFullscreen();
    }

    onClose();
  };

  return (
    <VStack position='absolute' top={2} right={2} zIndex={2} backgroundColor='transparent' spacing={0}>
      {/* Close button */}
      <IconButton aria-label='Close modal' icon={CloseOutlinedIcon} onClick={() => handleClose()} variant='icon' />

      {/* Gallery button */}
      <IconButton
        aria-label='Open Gallery'
        icon={DashboardOutlinedIcon}
        onClick={() => onGalleryClick()}
        variant='icon'
      />

      {/* Fullscreen button */}
      <IconButton
        aria-label={isFullscreen ? 'Exit fullscreen ' : 'Enter fullscreen'}
        icon={isFullscreen ? FullscreenExitOutlinedIcon : FullscreenOutlinedIcon}
        onClick={isFullscreen ? () => handleCloseFullscreen() : () => handleOpenFullscreen()}
        variant='icon'
      />
    </VStack>
  );
};

export default Actions;
