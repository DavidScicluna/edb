import { ReactElement } from 'react';

import { VStack, Box } from '@chakra-ui/react';

import Divider from '../Divider';
import { FooterProps } from './types';

const Footer = ({ children }: FooterProps): ReactElement => {
  return (
    <VStack width='100%' spacing={1.5} px={2} pb={1.5}>
      <Divider />

      <Box width='100%'>{children}</Box>
    </VStack>
  );
};

export default Footer;
