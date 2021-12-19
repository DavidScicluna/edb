import { extendTheme, Theme } from '@chakra-ui/react';

import foundations from './foundations';
import styles from './styles';

const config: Theme['config'] = {
  cssVarPrefix: 'chakra',
  initialColorMode: 'light',
  useSystemColorMode: false
};

const theme = {
  styles,
  config,
  ...foundations
};

export default extendTheme({ ...theme });
