import React, { ReactElement, useState, useCallback, useEffect } from 'react';

import { useColorMode, useDisclosure, HStack, Text } from '@chakra-ui/react';
import {
  ArrowBackOutlined as ArrowBackOutlinedIcon,
  ArrowForwardOutlined as ArrowForwardOutlinedIcon
} from '@material-ui/icons';

import utils from '../../../../../common/utils/utils';
import IconButton from '../../../../Clickable/IconButton';
import Tooltip from '../../../../Tooltip';
import { HeaderProps } from './types';

let interval: ReturnType<typeof setInterval>;

const Header = (props: HeaderProps): ReactElement => {
  const { colorMode } = useColorMode();
  const { isOpen: isMouseDown, onOpen: onMouseDown, onClose: onMouseLeave } = useDisclosure();

  const { title, isLoading = false, reset = false, scrollButtons, variant = 'transparent', handleScrollClick } = props;

  const [direction, setDirection] = useState<'left' | 'right' | ''>('');

  const handleScroll = useCallback(() => {
    if (direction === 'left' || direction === 'right') {
      handleScrollClick(direction);
    }
  }, [direction, handleScrollClick]);

  const handleIsMouseDown = useCallback(() => {
    if (isMouseDown) {
      interval = setInterval(() => {
        handleScroll();
      }, 25);
    }
  }, [isMouseDown, interval]);

  const handleClose = () => {
    setDirection('');
    clearInterval(interval);

    onMouseLeave();
  };

  useEffect(() => {
    handleIsMouseDown();
  }, [isMouseDown]);

  useEffect(() => {
    if (reset) {
      handleClose();
    }
  }, [reset]);

  return (
    <HStack
      width='100%'
      justify='space-between'
      borderBottom={variant === 'outlined' ? 'solid2' : 'none'}
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      px={variant === 'transparent' ? 2 : 0}
      py={variant === 'transparent' ? 2 : 1.75}>
      {typeof title === 'string' ? (
        <Text
          align='left'
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontSize='2xl'
          fontWeight='semibold'
          textTransform='capitalize'>
          {title}
        </Text>
      ) : (
        title
      )}

      {/* Scroll buttons */}
      {!utils.handleIsTouchDevice() && (
        <HStack spacing={variant === 'transparent' ? 2 : 1.5}>
          {/* Maybe add an auto scroll button */}
          <Tooltip
            aria-label='Scroll left'
            closeOnClick={false}
            closeOnMouseDown={false}
            label={`Scroll left (${!isMouseDown ? 'Hold for Auto-Scroll' : 'Auto-Scroll ON'})`}
            placement='top'
            isDisabled={isLoading || scrollButtons.left}
            span>
            <IconButton
              aria-label='Scroll left'
              isDisabled={isLoading || scrollButtons.left}
              icon={ArrowBackOutlinedIcon}
              onMouseDown={() => {
                if (!isMouseDown) {
                  onMouseDown();
                  setDirection('left');
                }
              }}
              onClick={() => handleClose()}
              size={variant === 'transparent' ? 'md' : 'sm'}
              variant='outlined'
            />
          </Tooltip>
          <Tooltip
            aria-label='Scroll right'
            closeOnClick={false}
            closeOnMouseDown={false}
            label={`Scroll right (${!isMouseDown ? 'Hold for Auto-Scroll' : 'Auto-Scroll ON'})`}
            placement='top'
            isDisabled={isLoading || scrollButtons.right}
            span>
            <IconButton
              aria-label='Scroll right'
              isDisabled={isLoading || scrollButtons.right}
              icon={ArrowForwardOutlinedIcon}
              onMouseDown={() => {
                if (!isMouseDown) {
                  onMouseDown();
                  setDirection('right');
                }
              }}
              onClick={() => handleClose()}
              size={variant === 'transparent' ? 'md' : 'sm'}
              variant='outlined'
            />
          </Tooltip>
        </HStack>
      )}
    </HStack>
  );
};

export default Header;
