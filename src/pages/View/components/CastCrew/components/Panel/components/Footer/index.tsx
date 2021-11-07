import { ReactElement } from 'react';

import { useMediaQuery, VStack, Box } from '@chakra-ui/react';

import Divider from '../Divider';
import { FooterProps } from './types';

const Footer = ({ children }: FooterProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  return (
    <VStack width='100%' spacing={1.5} px={2} pb={1.5}>
      <Divider />

      <Box width={isSm ? '100%' : 'auto'}>{children}</Box>
    </VStack>
  );
};

export default Footer;
