import { ReactElement, useState, useCallback } from 'react';

import { useColorMode, VStack, List as CUIList, Text } from '@chakra-ui/react';

import Panel from '../../../../../../components/Panel';
import { ListProps, Ref } from './types';

const List = (props: ListProps): ReactElement => {
  const { colorMode } = useColorMode();
  const { children, title, actions } = props;

  const [isOverflown, setIsOverflown] = useState<boolean>(false);

  const handleIsOverflown = useCallback((ref: Ref) => {
    if (ref) {
      setIsOverflown(ref.scrollHeight > ref.offsetHeight);
    }
  }, []);

  return (
    <Panel isFullWidth isDivisible={false} variant='transparent'>
      {{
        header: {
          title: (
            <Text
              align='left'
              color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
              fontSize='sm'
              fontWeight='bold'
              textTransform='uppercase'
            >
              {title}
            </Text>
          ),
          actions
        },
        body: (
          <VStack
            as={CUIList}
            ref={(ref: Ref) => handleIsOverflown(ref)}
            width='100%'
            maxHeight='35vh'
            overflowY='auto'
            pr={isOverflown ? 2 : 0}
            spacing={0}
          >
            {children}
          </VStack>
        )
      }}
    </Panel>
  );
};

export default List;
