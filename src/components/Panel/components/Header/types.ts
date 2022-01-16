import { ColorMode } from '@chakra-ui/react';

import { Header, Size } from '../../types';

export type HeaderProps = {
  colorMode: ColorMode;
  size: Size;
} & Header;
