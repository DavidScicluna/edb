import { ReactElement, useState, useCallback } from 'react';

import { VStack, List as CUIList } from '@chakra-ui/react';

import Panel from '../../../../../../components/Panel';
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
      <Panel isFullWidth hasDivider={false} variant='transparent' size='xs'>
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
      </Panel>
    </CUIList>
  );
};

export default List;
