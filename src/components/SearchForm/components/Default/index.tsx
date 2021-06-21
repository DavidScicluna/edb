import React, { ReactElement, useState, useCallback } from 'react';

import { useColorMode, VStack, Text } from '@chakra-ui/react';
import _ from 'lodash';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import Empty from '../../../Empty';
import Row from '../Row';

const Default = (): ReactElement => {
  const { colorMode } = useColorMode();

  const recentSearches = useSelector((state) => state.user.data.recentSearches);

  const [isOverflown, setIsOverflown] = useState<boolean>(false);

  const handleIsOverflown = useCallback((ref: HTMLDivElement | null) => {
    if (ref) {
      setIsOverflown(ref.scrollHeight > ref.offsetHeight);
    }
  }, []);

  return (
    <VStack
      ref={(ref: HTMLDivElement | null) => handleIsOverflown(ref)}
      alignItems='flex-start'
      spacing={2}
      maxHeight='35vh'
      overflowY='auto'>
      <VStack width='100%' alignItems='flex-start' spacing={1} pr={isOverflown ? 2 : 0}>
        <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md' fontWeight='medium'>
          Recent searches
        </Text>
        {recentSearches.length > 0 ? (
          _.sortBy(recentSearches, 'date').map((search) => (
            <Row key={search.id} id={search.id} label={search.label} mediaType={search.mediaType} state='isLoaded' />
          ))
        ) : (
          <Empty hasIllustration={false} label='No recent searches' size='xs' />
        )}
      </VStack>
    </VStack>
  );
};

export default Default;
