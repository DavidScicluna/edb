import { ReactElement, useContext } from 'react';

import { HStack } from '@chakra-ui/react';


import { FooterProps } from './types';

import { PanelContext } from '../../.';
import { handleReturnPadding } from '../../common/utils';
import { Context } from '../../types';

const Footer = ({ children }: FooterProps): ReactElement => {
  const { size = 'md', variant = 'outlined' } = useContext<Context>(PanelContext);

  return (
    <HStack width='100%' alignItems='stretch' justifyContent='stretch' pt={handleReturnPadding(size, variant)}>
      {children}
    </HStack>
  );
};

export default Footer;
