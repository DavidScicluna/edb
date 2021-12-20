import { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';

import { Space } from '../../../../theme/types';
import { FooterProps } from './types';

const Footer = ({ children, size = 'md' }: FooterProps): ReactElement => {
  /**
   * This method will return the appropriate padding depending on the size passed
   *
   * @returns - number: Padding value
   */
  const handleReturnPadding = (): keyof Space => {
    switch (size) {
      case 'xs':
        return 1;
      case 'sm':
        return 1.5;
      case 'lg':
        return 2.5;
      case 'xl':
        return 3;
      default:
        return 2;
    }
  };

  return (
    <HStack width='100%' alignItems='stretch' justifyContent='stretch' pt={handleReturnPadding()}>
      {children}
    </HStack>
  );
};

export default Footer;
