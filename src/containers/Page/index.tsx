import React, { ReactElement } from 'react';

import { useColorMode, VStack, HStack, Box, Text } from '@chakra-ui/react';

import Breadcrumbs from './components/Breadcrumbs';
import Divider from './components/Divider';
import { PageProps } from './types';

const Page = (props: PageProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { children, title, breadcrumbs } = props;

  return (
    <VStack width='100%' divider={<Divider />} spacing={0}>
      {/* Header */}
      <HStack width='100%' justifyContent='space-between' p={2}>
        <VStack alignItems='flex-start' spacing={0}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          {typeof title === 'string' ? (
            <Text
              align='left'
              color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
              fontSize={['2xl', '2xl', '3xl', '3xl', '3xl', '3xl']}
              fontWeight='bold'>
              {title || 'Page title'}
            </Text>
          ) : (
            title
          )}
        </VStack>

        {children.actions}
      </HStack>

      <Box width='100%'>{children.body}</Box>
    </VStack>
  );
};

export default Page;
