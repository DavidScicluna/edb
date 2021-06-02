import React, { ReactElement, useState, useCallback, useEffect } from 'react';

import { useDisclosure, HStack, Heading } from '@chakra-ui/react';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';

import IconButton from '../../../../Inputs/IconButton';
import Tooltip from '../../../../Tooltip';
import { ScrollButtonsState } from '../../index';

type HeaderProps = {
  title: string;
  reset: boolean;
  scrollButtons: ScrollButtonsState;
  handleScrollClick: (direction: 'left' | 'right') => void;
};

let interval: ReturnType<typeof setInterval>;

const Header = ({ title, reset = false, scrollButtons, handleScrollClick }: HeaderProps): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <HStack justify='space-between' p={[2]}>
      <Heading size='lg'>{title}</Heading>

      {/* Scroll buttons */}
      <HStack spacing={2}>
        {/* Maybe add an auto scroll button */}

        <Tooltip
          aria-label='Scroll left'
          closeOnClick={false}
          label={`Scroll left (${!isOpen ? 'Hold for Auto-Scroll' : 'Auto-Scroll ON'})`}
          placement='top'
          isDisabled={scrollButtons.left}
          gutter={16}>
          <IconButton
            aria-label='Scroll left'
            isDisabled={scrollButtons.left}
            icon={ArrowBackOutlinedIcon}
            onMouseDown={() => {
              if (!isOpen) {
                onOpen();
                setDirection('left');
              }
            }}
            onClick={() => handleClose()}
            variant='outlined'
            size='xs'
          />
        </Tooltip>
        <Tooltip
          aria-label='Scroll right'
          closeOnClick={false}
          label={`Scroll right (${!isOpen ? 'Hold for Auto-Scroll' : 'Auto-Scroll ON'})`}
          placement='top'
          isDisabled={scrollButtons.right}
          gutter={16}>
          <IconButton
            aria-label='Scroll right'
            isDisabled={scrollButtons.right}
            icon={ArrowForwardOutlinedIcon}
            onMouseDown={() => {
              if (!isOpen) {
                onOpen();
                setDirection('right');
              }
            }}
            onClick={() => handleClose()}
            variant='outlined'
            size='xs'
          />
        </Tooltip>
      </HStack>
    </HStack>
  );
};

export default Header;
