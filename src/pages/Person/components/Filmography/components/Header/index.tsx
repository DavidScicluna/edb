import React, { ReactElement } from 'react';

import { useColorMode, VStack, HStack, Text, ScaleFade } from '@chakra-ui/react';

import Button from '../../../../../../components/Clickable/Button';
import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { isAccordionsExpanded = false, isLoading = false, isError = false, onToggleAccordions } = props;

  return (
    <VStack width='100%' spacing={0}>
      <HStack
        width='100%'
        justifyContent='space-between'
        borderBottom='solid2'
        borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
        spacing={0}
        pb={!isError ? 1.25 : 2}>
        <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md' fontWeight='medium'>
          Filmography
        </Text>

        <ScaleFade in={!isError} unmountOnExit>
          <Button isDisabled={isLoading} onClick={() => onToggleAccordions()} size='sm' variant='text'>
            {isAccordionsExpanded ? 'Hide all' : 'Show all'}
          </Button>
        </ScaleFade>
      </HStack>
    </VStack>
  );
};

export default Header;
