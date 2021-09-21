import { ReactElement } from 'react';

import { Box } from '@chakra-ui/react';

import { DividerProps } from './types';

const Divider = ({ colorMode }: DividerProps): ReactElement => {
  return <Box width='100%' height='2px' backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />;
};

export default Divider;
