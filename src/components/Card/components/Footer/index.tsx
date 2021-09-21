import { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';

import { FooterProps } from './types';

const Footer = (props: FooterProps): ReactElement => {
  const { footer, ...rest } = props;

  return (
    <HStack {...rest} width='100%' alignItems='stretch' justifyContent='stretch'>
      {footer}
    </HStack>
  );
};

export default Footer;
