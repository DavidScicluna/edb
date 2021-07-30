import React, { ReactElement } from 'react';

import { useColorMode, VStack, Text, HStack } from '@chakra-ui/react';
import moment from 'moment';

import Modal from '../../../../components/Modal';
import MediaType from './components/MediaType';
import { ListInfoProps } from './types';

const ListInfo = ({ list, isOpen, onClose }: ListInfoProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <Modal
      title={
        <VStack alignItems='flex-start' spacing={0}>
          <Text fontSize='md' fontWeight='semibold' color={colorMode === 'light' ? 'gray.900' : 'gray.50'}>
            {`${list?.label ? `"${list.label}"` : ''} List`}
          </Text>
          <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='xs' fontWeight='normal'>
            {`${(list ? list?.results.movies.length + list?.results.tv.length : 0) > 0 ? 'Updated' : 'Created'} ${
              moment(list?.date).isSame(moment(), 'day')
                ? moment(list?.date).fromNow()
                : moment(list?.date).format('LL')
            }`}
          </Text>
        </VStack>
      }
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size='md'>
      <VStack spacing={3} p={2}>
        {list?.description ? (
          <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='lg' fontWeight='normal'>
            {list.description}
          </Text>
        ) : null}

        <HStack wrap='wrap' spacing={2}>
          {['movie', 'tv'].map((mediaType) => (
            <MediaType
              key={mediaType}
              mediaType={mediaType}
              amount={
                mediaType === 'movie'
                  ? list?.results.movies.length || 0
                  : mediaType === 'tv'
                  ? list?.results.tv.length || 0
                  : 0
              }
            />
          ))}
        </HStack>
      </VStack>
    </Modal>
  );
};

export default ListInfo;
