import { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';

import { FooterProps } from './types';

const Footer = ({ footer }: FooterProps): ReactElement => {
  return (
    <HStack width='100%' spacing={0} py={2}>
      {footer}
    </HStack>
  );
};

export default Footer;
