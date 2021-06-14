import React, { ReactElement } from 'react';

import { useColorMode, Fade, VStack, Text } from '@chakra-ui/react';

import Button from '../../../../components/Inputs/Button';

const Label = ({ handleOpenModal }: { handleOpenModal: () => void }): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <Fade in>
      <VStack
        width='100%'
        background='transparent'
        borderRadius='lg'
        border='solid2'
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
        spacing={2}
        px={2}
        py={12}>
        <Text align='center' fontSize='md' fontWeight='semibold' color={colorMode === 'light' ? 'gray.900' : 'gray.50'}>
          Select media type to view data!
        </Text>
        <Button color='blue' onClick={() => handleOpenModal()}>
          Select media type
        </Button>
      </VStack>
    </Fade>
  );
};

export default Label;
