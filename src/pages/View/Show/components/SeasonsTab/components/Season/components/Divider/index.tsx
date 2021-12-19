import { ReactElement } from 'react';

import { useColorMode, Box } from '@chakra-ui/react';

const Divider = (): ReactElement => {
  const { colorMode } = useColorMode();

  return <Box width='100%' height='2px' backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />;
};

export default Divider;
