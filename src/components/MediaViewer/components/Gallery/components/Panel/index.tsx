import { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';

import Badge from '../../../../../../components/Badge';
import EDBPanel from '../../../../../../components/Panel';
import { ListProps } from './types';

const Panel = ({ children, title, total }: ListProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');
  const [isSmallMob] = useMediaQuery('(max-width: 340px)');

  return (
    <EDBPanel isFullWidth variant='transparent' size='sm'>
      {{
        header: {
          title,
          actions: total > 0 ? <Badge size={isSm ? 'sm' : 'md'}>{String(total)}</Badge> : undefined
        },
        body: (
          <SimpleGrid width='100%' columns={[isSmallMob ? 1 : 2, 2, 3, 4, 5, 6]} spacing={2}>
            {children}
          </SimpleGrid>
        )
      }}
    </EDBPanel>
  );
};

export default Panel;
