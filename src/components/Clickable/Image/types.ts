import { ReactElement } from 'react';

import { BoxProps, AspectRatioProps } from '@chakra-ui/react';

import { Icon } from '../../../common/types';
import { FontSizes, Color } from '../../../theme/types';

export type IconProps = {
  color: Color['gray'][50] | Color['gray'][900];
  fontSize: FontSizes['6xl'] | FontSizes['7xl'];
};

export type ImageProps = {
  children: ReactElement;
  width?: AspectRatioProps['width'];
  borderRadius?: AspectRatioProps['borderRadius'];
  ratio?: AspectRatioProps['ratio'];
  renderIcon: (props: IconProps) => Icon;
  isDisabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
} & BoxProps;
