import React, { ReactElement, useState, useCallback } from 'react';

import { useColorMode, VStack, HStack, Text, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import Card from '../../../../components/Card';
import Button from '../../../../components/Clickable/Button';
import { setRecentSearches } from '../../../../store/slices/User';
import Empty from '../../../Empty';
import Row from '../Row';

const Default = (): ReactElement => {
  const { colorMode } = useColorMode();

  const dispatch = useDispatch();
  const recentSearches = useSelector((state) => state.user.data.recentSearches);

  const [isOverflown, setIsOverflown] = useState<boolean>(false);

  const handleIsOverflown = useCallback((ref: HTMLDivElement | null) => {
    if (ref) {
      setIsOverflown(ref.scrollHeight > ref.offsetHeight);
    }
  }, []);

  return (
    <Card isFullWidth variant='transparent'>
      <VStack width='100%' spacing={2}>
        <HStack width='100%' justifyContent='space-between'>
          <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md' fontWeight='medium'>
            Recent searches
          </Text>
          <ScaleFade in={recentSearches.length > 0} unmountOnExit>
            <Button onClick={() => dispatch(setRecentSearches([]))} size='sm' variant='text'>
              Clear
            </Button>
          </ScaleFade>
        </HStack>

        <VStack
          ref={(ref: HTMLDivElement | null) => handleIsOverflown(ref)}
          width='100%'
          alignItems='flex-start'
          spacing={0}
          maxHeight='35vh'
          overflowY='auto'
          pr={isOverflown ? 2 : 0}>
          {recentSearches.length > 0 ? (
            _.sortBy(recentSearches, 'date').map((search) => (
              <Row key={search.id} id={search.id} label={search.label} mediaType={search.mediaType} state='isLoaded' />
            ))
          ) : (
            <Empty hasIllustration={false} label='No recent searches' size='xs' />
          )}
        </VStack>
      </VStack>
    </Card>
  );
};

export default Default;
