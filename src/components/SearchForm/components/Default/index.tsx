import React, { ReactElement, useState, useCallback } from 'react';

import { VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../common/hooks';
import Card from '../../../../components/Card';
import Button from '../../../../components/Clickable/Button';
import { setRecentSearches } from '../../../../store/slices/User';
import Empty from '../../../Empty';
import Row from '../Row';

const Default = (): ReactElement => {
  const dispatch = useDispatch();
  const recentSearches = useSelector((state) => state.user.data.recentSearches);

  const [isOverflown, setIsOverflown] = useState<boolean>(false);

  const handleIsOverflown = useCallback((ref: HTMLDivElement | null) => {
    if (ref) {
      setIsOverflown(ref.scrollHeight > ref.offsetHeight);
    }
  }, []);

  return (
    <Card
      box={{
        header: { pb: 1 }
      }}
      isFullWidth
      hasDivider={false}
      variant='transparent'>
      {{
        header: {
          title: 'Recent searches',
          actions: (
            <ScaleFade in={recentSearches.length > 0} unmountOnExit>
              <Button onClick={() => dispatch(setRecentSearches([]))} size='sm' variant='text'>
                Clear
              </Button>
            </ScaleFade>
          )
        },
        body: (
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
                <Row
                  key={search.id}
                  id={search.id}
                  label={search.label}
                  mediaType={search.mediaType}
                  state='isLoaded'
                />
              ))
            ) : (
              <Empty hasIllustration={false} label='No recent searches' size='xs' />
            )}
          </VStack>
        )
      }}
    </Card>
  );
};

export default Default;
