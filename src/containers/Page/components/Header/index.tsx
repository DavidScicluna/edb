import React, { ReactElement } from 'react';

import { useMediaQuery, VStack, Center, Stack } from '@chakra-ui/react';
import { useElementSize } from 'usehooks-ts';

import Breadcrumbs from './components/Breadcrumbs';
import Title from './components/Title';
import { HeaderProps } from './types';

const Header = ({ title, actions }: HeaderProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const [ref, { width }] = useElementSize();

  return (
    <Stack width='100%' direction={isSm ? 'column' : 'row'} p={2} spacing={2}>
      <VStack width={isSm ? '100%' : `calc(100% - ${width + 16}px)`} alignItems='flex-start' spacing={0}>
        <Breadcrumbs />
        {title ? <Title title={title} /> : null}
      </VStack>

      <Center ref={ref} width={isSm ? '100%' : 'auto'}>
        {actions || null}
      </Center>
    </Stack>
  );
};

export default Header;
