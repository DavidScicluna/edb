import React, { ReactElement } from 'react';

import { useMediaQuery, VStack } from '@chakra-ui/react';

import Badge from '../../../../../../../../../../components/Badge';
import Card from '../../../../../../../../../../components/Card';
import { ListProps } from './types';

const Panel = ({ children, title, total }: ListProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 480px)');

  return (
    <Card box={{ header: { pb: 2 }, body: { pt: 2 } }} isFullWidth variant='transparent'>
      {{
        header: {
          title,
          actions: <Badge label={String(total)} size={isSm ? 'sm' : 'md'} ml={2} />
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
