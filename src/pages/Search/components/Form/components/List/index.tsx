import React, { ReactElement, useState, useCallback } from 'react';

import { VStack, List as CUIList } from '@chakra-ui/react';

import Card from '../../../../../../components/Card';
import { ListProps } from './types';

const List = (props: ListProps): ReactElement => {
  const { children, title, actions } = props;

  const [isOverflown, setIsOverflown] = useState<boolean>(false);

  const handleIsOverflown = useCallback((ref: HTMLDivElement | null) => {
    if (ref) {
      setIsOverflown(ref.scrollHeight > ref.offsetHeight);
    }
  }, []);

  return (
    <CUIList spacing={0}>
      <Card
        box={{
          header: { pb: 1 }
        }}
        isFullWidth
        hasDivider={false}
        variant='transparent'>
        {{
          header: {
            title,
            actions
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
              {children}
            </VStack>
          )
        }}
      </Card>
    </CUIList>
  );
};

export default List;
