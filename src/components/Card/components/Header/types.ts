import { BoxProps } from '@chakra-ui/react';

import { ColorMode } from '../../../../common/types/types';
import { Header } from '../../types';

export type HeaderProps = Omit<BoxProps, 'title'> & {
  colorMode: ColorMode;
} & Header;
