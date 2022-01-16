import { ReactElement } from 'react';

import { useColorMode, Box } from '@chakra-ui/react';

import { DividerProps } from './types';

const Divider = ({ orientation = 'horizontal', ...rest }: DividerProps): ReactElement => {
  const { colorMode } = useColorMode();
  return (
    <Box
      width={orientation === 'horizontal' ? '100%' : '2px'}
      height={orientation === 'horizontal' ? '2px' : '100%'}
      backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      {...rest}
    />
  );
};

export default Divider;
