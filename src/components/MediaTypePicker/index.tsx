import React, { ReactElement, useEffect } from 'react';

import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import Modal from '../Modal';
import MediaTypes from './components/MediaTypes';
import { MediaTypePickerProps } from './types';

const MediaTypePicker = <MT extends unknown>(props: MediaTypePickerProps<MT>): ReactElement => {
  const location = useLocation();

  const { isOpen, onClose, ...rest } = props;

  useEffect(() => {
    onClose();
  }, [location]);

  return (
    <Modal title='Select media type' isOpen={isOpen} onClose={onClose} isCentered size='2xl'>
      <Box width='100%' height='100%' p={3}>
        <MediaTypes {...rest} />
      </Box>
    </Modal>
  );
};

export default MediaTypePicker;
