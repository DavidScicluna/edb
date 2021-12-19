import { ReactElement } from 'react';

import { Box } from '@chakra-ui/react';

import Modal from '../Modal';
import MediaTypes from './components/MediaTypes';
import { MediaTypePickerProps } from './types';

const MediaTypePicker = <MT,>(props: MediaTypePickerProps<MT>): ReactElement => {
  const { isOpen, onClose, ...rest } = props;

  return (
    <Modal title='Select media type' isOpen={isOpen} onClose={onClose} isCentered size='2xl'>
      <Box width='100%' height='100%' p={3}>
        <MediaTypes {...rest} onClose={onClose} />
      </Box>
    </Modal>
  );
};

export default MediaTypePicker;
