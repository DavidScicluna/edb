import React, { ReactElement, useEffect } from 'react';

import { useBoolean } from '@chakra-ui/react';
import {
  ArrowBackOutlined as ArrowBackOutlinedIcon,
  ArrowForwardOutlined as ArrowForwardOutlinedIcon
} from '@material-ui/icons';

import useInterval from '../../../../../common/hooks/useInterval';
import IconButton from '../../../../Clickable/IconButton';
import Tooltip from '../../../../Tooltip';
import { ArrowProps, Event } from './types';

const Arrow = (props: ArrowProps): ReactElement => {
  const { direction, isLoading = false, isDisabled = false, reset = false, variant, onScrollClick } = props;

  const [isMouseDown, setIsMouseDown] = useBoolean();
  const [isHovering, setIsHovering] = useBoolean();

  const handleOnClick = (event: Event): void => {
    event.preventDefault();

    onScrollClick(direction);
  };

  const handleIsMouseDown = (event: Event): void => {
    event.preventDefault();

    if (event.button === 0) {
      setIsMouseDown.on();
    } else {
      setIsMouseDown.off();
    }
  };

  const handleIsMouseUp = (event: Event): void => {
    event.preventDefault();

    setIsMouseDown.off();
  };

  useInterval(() => onScrollClick(direction), isMouseDown ? 25 : null);

  useEffect(() => {
    if (reset || isDisabled) {
      setIsMouseDown.off();
    }
  }, [reset, isDisabled]);

  return (
    <Tooltip
      aria-label={`Scroll ${direction.toLowerCase()}`}
      closeOnClick={false}
      closeOnMouseDown={false}
      label={`Scroll ${direction.toLowerCase()} (${!isMouseDown ? 'Hold for Auto-Scroll' : 'Auto-Scroll ON'})`}
      placement='top'
      isOpen={isHovering}
      isDisabled={isLoading || isDisabled}
      gutter={isMouseDown ? 8 : 10}>
      <IconButton
        aria-label='Scroll left'
        isDisabled={isLoading || isDisabled}
        icon={direction === 'left' ? ArrowBackOutlinedIcon : ArrowForwardOutlinedIcon}
        onClick={(event: Event) => handleOnClick(event)}
        onMouseDown={(event: Event) => handleIsMouseDown(event)}
        onMouseUp={(event: Event) => handleIsMouseUp(event)}
        onMouseEnter={() => setIsHovering.on()}
        onMouseLeave={() => setIsHovering.off()}
        size={variant === 'transparent' ? 'md' : 'sm'}
        variant='outlined'
      />
    </Tooltip>
  );
};

export default Arrow;
