import React, { ReactElement, useCallback, useEffect } from 'react';

import { useTheme, useColorMode, useDisclosure, Center, ScaleFade } from '@chakra-ui/react';
import {
  ChevronLeftOutlined as ChevronLeftOutlinedIcon,
  ChevronRightOutlined as ChevronRightOutlinedIcon
} from '@material-ui/icons';
import _ from 'lodash';

import { Theme } from '../../../../theme/types';
import IconButton from '../../../Clickable/IconButton';
import useStyles from './styles';
import { ArrowProps } from './types';

let interval: ReturnType<typeof setInterval>;

const Arrow = (props: ArrowProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const { isOpen: isMouseDown, onOpen: onMouseDown, onClose: onMouseLeave } = useDisclosure();

  const style = useStyles(theme, props);

  const { direction, isDisabled = false, reset = false, onScrollClick } = props;

  const handleIsMouseDown = useCallback(() => {
    if (isMouseDown) {
      interval = setInterval(() => {
        onScrollClick(direction);
      }, 25);
    }
  }, [isMouseDown, interval, direction, onScrollClick]);

  const handleIsMouseUp = (): void => {
    clearInterval(interval);

    onMouseLeave();
  };

  useEffect(() => {
    handleIsMouseDown();
  }, [isMouseDown]);

  useEffect(() => {
    if (reset) {
      handleIsMouseUp();
    }
  }, [reset]);

  return (
    <Center
      width='auto'
      position='absolute'
      left={direction === 'left' ? 0 : undefined}
      right={direction === 'right' ? 0 : undefined}
      zIndex={1}
      backgroundColor='transparent'
      _after={direction === 'left' ? { ..._.merge(style.arrow, style[colorMode][direction]) } : undefined}
      _before={direction === 'right' ? { ..._.merge(style.arrow, style[colorMode][direction]) } : undefined}>
      <ScaleFade in={!isDisabled} unmountOnExit>
        <Center backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
          <IconButton
            aria-label={`Scroll ${direction}`}
            icon={direction === 'left' ? ChevronLeftOutlinedIcon : ChevronRightOutlinedIcon}
            onMouseDown={() => {
              if (!isMouseDown) {
                onMouseDown();
              }
            }}
            onMouseUp={() => handleIsMouseUp()}
            size='sm'
            variant='icon'
          />
        </Center>
      </ScaleFade>
    </Center>
  );
};

export default Arrow;
