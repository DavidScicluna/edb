import { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import Card from '../../../../../../../components/Card';
import { ListProps } from './types';

const Panel = ({ children, title, actions }: ListProps): ReactElement => {
  return (
    <Card box={{ header: { pb: 1.5 }, body: { pt: 1.5 } }} isFullWidth variant='transparent'>
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
    </Card>
  );
};

export default Panel;
