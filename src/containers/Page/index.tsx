import React, { ReactElement } from 'react';

import { useMediaQuery, VStack, HStack, Box } from '@chakra-ui/react';

import Divider from './components/Divider';
import Title from './components/Title';
import { PageProps } from './types';

const Page = (props: PageProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 480px)');

  const { children, title, breadcrumbs } = props;

  return (
    <VStack width='100%' divider={<Divider />} spacing={0}>
      {/* Header */}
      {isSm ? (
        <VStack width='100%' p={2} spacing={2}>
          <Title title={title} breadcrumbs={breadcrumbs} />

          {children?.actions || null}
        </VStack>
      ) : (
        <HStack width='100%' justifyContent='space-between' p={2}>
          <Title title={title} breadcrumbs={breadcrumbs} />

          {children?.actions || null}
        </HStack>
      )}

      <Box width='100%'>{children.body}</Box>
    </VStack>
  );
};

export default Page;
