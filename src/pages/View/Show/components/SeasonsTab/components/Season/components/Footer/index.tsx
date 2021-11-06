import { ReactElement } from 'react';

import { VStack, Box } from '@chakra-ui/react';

import Divider from '../Divider';
import { FooterProps } from './types';

const Footer = ({ children }: FooterProps): ReactElement => {
  return (
    <VStack width='100%' spacing={3} pb={2}>
      <Divider />

      <Box width='auto'>{children}</Box>
    </VStack>
  );
};

export default Footer;
