import { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';

import Badge from '../../../../../../components/Badge';
import Card from '../../../../../../components/Card';
import { ListProps } from './types';

const Panel = ({ children, title, total }: ListProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');
  const [isSmallMob] = useMediaQuery('(max-width: 340px)');

  return (
    <Card box={{ header: { pb: 1.5 }, body: { pt: 1.5 } }} isFullWidth variant='transparent'>
      {{
        header: {
          title,
          actions: total > 0 ? <Badge label={String(total)} size={isSm ? 'sm' : 'md'} /> : undefined
        },
        body: (
          <SimpleGrid width='100%' columns={[isSmallMob ? 1 : 2, 2, 3, 4, 5, 6]} spacing={2}>
            {children}
          </SimpleGrid>
        )
      }}
    </Card>
  );
};

export default Panel;
