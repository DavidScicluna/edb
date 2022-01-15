import { BoxProps } from '@chakra-ui/react';

import { Orientation } from '../../../../common/types';

export type DividerProps = {
  orientation?: Orientation;
} & BoxProps;
