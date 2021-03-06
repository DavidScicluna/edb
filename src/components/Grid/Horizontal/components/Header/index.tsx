import React, { ReactElement, useState, useCallback, useEffect } from 'react';

import { useColorMode, useDisclosure, HStack, Text } from '@chakra-ui/react';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';

import utils from '../../../../../common/utils/utils';
import IconButton from '../../../../Clickable/IconButton';
import Tooltip from '../../../../Tooltip';
import { HeaderProps } from './types';

let interval: ReturnType<typeof setInterval>;

const Header = (props: HeaderProps): ReactElement => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { title, isLoading = false, reset = false, scrollButtons, handleScrollClick } = props;

  const [direction, setDirection] = useState<'left' | 'right' | ''>('');

  const handleScroll = useCallback(() => {
    if (direction === 'left' || direction === 'right') {
      handleScrollClick(direction);
    }
  }, [direction, handleScrollClick]);

  const handleIsOpen = useCallback(() => {
    if (isOpen) {
      interval = setInterval(() => {
        handleScroll();
      }, 25);
    }
  }, [isOpen, interval]);

  const handleClose = () => {
    setDirection('');
    clearInterval(interval);

    onClose();
  };

  useEffect(() => {
    handleIsOpen();
  }, [isOpen]);

  useEffect(() => {
    if (reset) {
      handleClose();
    }
  }, [reset]);

  return (
    <HStack justify='space-between' p={2}>
      <Text
        align='left'
        color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
        fontSize='2xl'
        fontWeight='semibold'
        textTransform='capitalize'>
        {title}
      </Text>

      {/* Scroll buttons */}
      {!utils.handleIsTouchDevice() && (
        <HStack spacing={2}>
          {/* Maybe add an auto scroll button */}
          <Tooltip
            aria-label='Scroll left'
            closeOnClick={false}
            closeOnMouseDown={false}
            label={`Scroll left (${!isOpen ? 'Hold for Auto-Scroll' : 'Auto-Scroll ON'})`}
            placement='top'
            isDisabled={isLoading || scrollButtons.left}
            span>
            <IconButton
              aria-label='Scroll left'
              isDisabled={isLoading || scrollButtons.left}
              icon={ArrowBackOutlinedIcon}
              onMouseDown={() => {
                if (!isOpen) {
                  onOpen();
                  setDirection('left');
                }
              }}
              onClick={() => handleClose()}
              variant='outlined'
            />
          </Tooltip>
          <Tooltip
            aria-label='Scroll right'
            closeOnClick={false}
            closeOnMouseDown={false}
            label={`Scroll right (${!isOpen ? 'Hold for Auto-Scroll' : 'Auto-Scroll ON'})`}
            placement='top'
            isDisabled={isLoading || scrollButtons.right}
            span>
            <IconButton
              aria-label='Scroll right'
              isDisabled={isLoading || scrollButtons.right}
              icon={ArrowForwardOutlinedIcon}
              onMouseDown={() => {
                if (!isOpen) {
                  onOpen();
                  setDirection('right');
                }
              }}
              onClick={() => handleClose()}
              variant='outlined'
            />
          </Tooltip>
        </HStack>
      )}
    </HStack>
  );
};

export default Header;
