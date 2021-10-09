import React, { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';

import { FooterProps } from './types';

const Footer = (props: FooterProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { date, renderDate, renderActions } = props;

  return (
    <HStack width='100%' justifyContent={renderDate ? 'space-between' : 'flex-end'}>
      {renderDate ? (
        <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='xs'>
          {date}
        </Text>
      ) : undefined}

      {renderActions}
    </HStack>
  );
};

export default Footer;
