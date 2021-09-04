import { ReactElement } from 'react';

import { BoxProps, AspectRatioProps } from '@chakra-ui/react';

export type ImageProps = {
  children: ReactElement;
  width?: AspectRatioProps['width'];
  borderRadius?: AspectRatioProps['borderRadius'];
  ratio?: AspectRatioProps['ratio'];
  isDisabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
} & BoxProps;
