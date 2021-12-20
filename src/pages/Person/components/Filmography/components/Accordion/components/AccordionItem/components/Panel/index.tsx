import { ReactElement } from 'react';

import { useMediaQuery, VStack } from '@chakra-ui/react';

import Badge from '../../../../../../../../../../components/Badge';
import EDBPanel from '../../../../../../../../../../components/Panel';
import { ListProps } from './types';

const Panel = ({ children, title, total }: ListProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  return (
    <EDBPanel isFullWidth variant='transparent' size='sm'>
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
    </EDBPanel>
  );
};

export default Panel;
