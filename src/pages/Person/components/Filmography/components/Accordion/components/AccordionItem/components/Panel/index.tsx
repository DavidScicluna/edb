import { ReactElement } from 'react';

import { useMediaQuery, VStack } from '@chakra-ui/react';

import Badge from '../../../../../../../../../../components/Badge';
import Card from '../../../../../../../../../../components/Card';
import { ListProps } from './types';

const Panel = ({ children, title, total }: ListProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  return (
    <Card box={{ header: { pb: 1.5 }, body: { pt: 1.5 } }} isFullWidth variant='transparent'>
      {{
        header: {
          title,
          actions: <Badge size={isSm ? 'sm' : 'md'}>{String(total)}</Badge>
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
