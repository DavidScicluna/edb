import React, { ReactElement } from 'react';

import { useMediaQuery, VStack, SimpleGrid } from '@chakra-ui/react';

import Badge from '../../../../../../components/Badge';
import Card from '../../../../../../components/Card';
import { PanelProps } from './types';

const Panel = ({ children, title, total }: PanelProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');
  const [isSmallMob] = useMediaQuery('(max-width: 340px)');

  return (
    <Card box={{ header: { pb: 1.5 }, body: { pt: 1.5 } }} isFullWidth hasDivider px={2} pt={1.5} pb={2}>
      {{
        header: {
          title,
          actions: <Badge label={String(total)} size={isSm ? 'sm' : 'md'} />
        },
        body: (
          <VStack width='100%' spacing={2}>
            <SimpleGrid width='100%' columns={[isSmallMob ? 1 : 2, 2, 3, 4, 4, 5]} spacing={2}>
              {children}
            </SimpleGrid>
          </VStack>
        )
      }}
    </Card>
  );
};

export default Panel;
