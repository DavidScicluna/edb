import { ReactElement } from 'react';

import { BoxProps as CUIBoxProps } from '@chakra-ui/react';

import { CardVariant, ColorMode } from '../../common/types';
import { Theme } from '../../store/slices/User/types';

type BoxProps = {
  header?: CUIBoxProps;
  body?: CUIBoxProps;
  footer?: CUIBoxProps;
};

export type Header = {
  title?: ReactElement | string;
  actions?: ReactElement;
};

export type CardProps = {
  children: {
    header?: Header;
    body: ReactElement;
    footer?: ReactElement;
  };
  box?: BoxProps;
  color?: Theme['color'];
  colorMode?: ColorMode;
  isFullWidth?: boolean;
  hasDivider?: boolean;
  variant?: CardVariant;
} & CUIBoxProps;
