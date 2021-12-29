import { ReactElement } from 'react';

import { useColorMode, Box } from '@chakra-ui/react';

import { DividerProps } from './types';

const Divider = ({ height }: DividerProps): ReactElement => {
  const { colorMode } = useColorMode();

  return <Box width='4px' height={`${height}px`} backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />;
};

export default Divider;
