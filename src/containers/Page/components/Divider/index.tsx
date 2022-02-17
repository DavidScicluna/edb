import { ReactElement } from 'react';

import { useTheme, useColorMode, Box } from '@chakra-ui/react';


import { Theme } from '../../../../theme/types';

const Divider = (): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  return (
    <Box
      width={`calc(100% - ${theme.space[4]})`}
      height='2px'
      backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
    />
  );
};

export default Divider;
