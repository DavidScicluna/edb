import React, { ReactElement } from 'react';

import { useColorMode, VStack, Text } from '@chakra-ui/react';

import Breadcrumbs from '../Breadcrumbs';
import { TitleProps } from './types';

const Title = (props: TitleProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { title, breadcrumbs } = props;

  return (
    <VStack width='100%' alignItems='flex-start' spacing={0}>
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
  );
};

export default Title;
