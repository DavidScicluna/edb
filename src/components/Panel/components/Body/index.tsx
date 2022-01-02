import React, { ReactElement } from 'react';

import { Box } from '@chakra-ui/react';

import { Space } from '../../../../theme/types';
import { BodyProps } from './types';

const Body = (props: BodyProps): ReactElement => {
  const { children, hasHeader = false, hasFooter = false, size = 'md' } = props;

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
    <Box width='100%' pt={hasHeader ? handleReturnPadding() : 0} pb={hasFooter ? handleReturnPadding() : 0}>
      {children}
    </Box>
  );
};

export default Body;
