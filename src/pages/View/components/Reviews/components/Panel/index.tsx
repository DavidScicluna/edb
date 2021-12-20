import { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import EDBPanel from '../../../../../../components/Panel';
import { ListProps } from './types';

const Panel = ({ children, title, actions }: ListProps): ReactElement => {
  return (
    <EDBPanel isFullWidth variant='transparent' size='sm'>
      {{
        header: {
          title,
          actions
        },
        body: (
          <VStack width='100%' spacing={2}>
            {children}
          </VStack>
        )
      }}
    </EDBPanel>
  );
};

export default Panel;
