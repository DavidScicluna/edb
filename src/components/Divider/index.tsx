import { ReactElement } from 'react';

import { ColorMode, useColorMode, Box } from '@chakra-ui/react';

import { DividerProps } from './types';

const Divider = (props: DividerProps): ReactElement => {
  const { colorMode: colorModeHook } = useColorMode();

  const { colorMode: colorModeProp, orientation = 'horizontal', ...rest } = props;

  const colorMode: ColorMode = colorModeProp || colorModeHook;

  return (
    <Box
      width={orientation === 'horizontal' ? '100%' : '2px'}
      height={orientation === 'horizontal' ? '2px' : '100%'}
      backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      {...rest}
      border='none'
    />
  );
};

export default Divider;
