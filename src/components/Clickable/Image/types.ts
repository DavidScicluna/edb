import { ReactElement } from 'react';

import { BoxProps, AspectRatioProps } from '@chakra-ui/react';

import { Icon } from '../../../common/types/types';

export type ImageProps = {
  children: ReactElement;
  width?: AspectRatioProps['width'];
  borderRadius?: AspectRatioProps['borderRadius'];
  ratio?: AspectRatioProps['ratio'];
  icon?: Icon;
  isDisabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
} & BoxProps;
