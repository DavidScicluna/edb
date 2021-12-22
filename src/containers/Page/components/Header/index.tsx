import React, { ReactElement } from 'react';

import { useMediaQuery, VStack, HStack } from '@chakra-ui/react';

import Breadcrumbs from './components/Breadcrumbs';
import Title from './components/Title';
import { HeaderProps } from './types';

const Header = ({ title, actions }: HeaderProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  return isSm ? (
    <VStack width='100%' p={2} spacing={2}>
      <VStack width='100%' alignItems='flex-start' spacing={0}>
        <Breadcrumbs />
        {title ? <Title title={title} /> : null}
      </VStack>

      {actions || null}
    </VStack>
  ) : (
    <HStack width='100%' justifyContent='space-between' p={2}>
      <VStack width='100%' alignItems='flex-start' spacing={0}>
        <Breadcrumbs />
        {title ? <Title title={title} /> : null}
      </VStack>

      {actions || null}
    </HStack>
  );
};

export default Header;
