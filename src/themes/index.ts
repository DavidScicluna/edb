// import components from './components';
import { ThemeConfig, ThemeDirection } from '@chakra-ui/react';

// import blur from './blur';
import borders from './foundations/borders';
import breakpoints from './foundations/breakpoints';
// import colors from './colors';
import radii from './foundations/radius';
// import shadows from './shadows';
import sizes from './foundations/sizes';
import spacing from './foundations/spacing';
import transition from './foundations/transition';
import typography from './foundations/typography';
import styles from './styles';

const direction = 'ltr' as ThemeDirection;

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: 'light',
  cssVarPrefix: 'chakra'
};

const foundations = {
  breakpoints,
  radii,
  // blur,
  // colors,
  ...typography,
  sizes,
  // shadows,
  space: spacing,
  borders,
  transition
};

export const theme = {
  direction,
  ...foundations,
  // components,
  styles,
  config
};

// export type Theme = typeof theme;

export default theme;
