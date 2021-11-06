import React, { ReactElement } from 'react';

import { useColorMode, VStack, Text } from '@chakra-ui/react';

import { handleReturnDate } from '../../../../../../../../../../../common/utils';
import Modal from '../../../../../../../../../../../components/Modal';
import { EpisodeModalProps } from './types';

const EpisodeModal = (props: EpisodeModalProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { isOpen = false, name, date, onClose } = props;

  return (
    <Modal
      title={
        <VStack alignItems='flex-start' spacing={0}>
          <Text align='left' fontSize='xl' fontWeight='semibold' color={colorMode === 'light' ? 'gray.900' : 'gray.50'}>
            {name}
          </Text>
          <Text align='left' fontSize='xs' fontWeight='normal' color={colorMode === 'light' ? 'gray.400' : 'gray.500'}>
            {handleReturnDate(date, 'full')}
          </Text>
        </VStack>
      }
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size='2xl'>
      <h1>EpisodeModal</h1>
    </Modal>
  );
};

export default EpisodeModal;
