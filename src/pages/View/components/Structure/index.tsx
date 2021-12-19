import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, HStack, Box } from '@chakra-ui/react';

import Page from '../../../../containers/Page';
import { StructureProps } from './types';

const Structure = ({ children }: StructureProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 960px)');

  return (
    <Page title={children.title} breadcrumbs={[]}>
      {{
        actions: children.actions,
        body: (
          <VStack
            alignItems='stretch'
            justifyContent='stretch'
            divider={
              <Box width='100%' height='2px' backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />
            }
            spacing={0}
            px={2}>
            <HStack
              width='100%'
              justifyContent='space-between'
              divider={
                <Box width='2px' height='38px' backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />
              }
              spacing={2}
              py={2}>
              {children.tabList}

              {!isSm ? children.socials : null}
            </HStack>

            <VStack alignItems='stretch' justifyContent='stretch' spacing={2} py={2}>
              {children.tabPanels}
            </VStack>
          </VStack>
        )
      }}
    </Page>
  );
};

export default Structure;
