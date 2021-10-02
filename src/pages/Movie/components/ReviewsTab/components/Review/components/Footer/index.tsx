import React, { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';
import moment from 'moment';

import { FooterProps } from './types';

const Footer = (props: FooterProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { updated_at, created_at, renderActions } = props;

  const hasUpdated = updated_at && !moment(updated_at).isSame(created_at);

  return (
    <HStack width='100%' justifyContent={hasUpdated ? 'space-between' : 'flex-end'}>
      {hasUpdated ? (
        <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='xs'>
          {`* Updated on: ${moment(updated_at).format('LLL')}`}
        </Text>
      ) : undefined}

      {renderActions}
    </HStack>
  );
};

export default Footer;
