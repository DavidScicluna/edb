import React, { ReactElement } from 'react';

import { useColorMode, Skeleton as CUISkeleton } from '@chakra-ui/react';

import commonProps from './common/props';
import utils from './common/utils/utils';
import { SkeletonProps } from './types';

const Skeleton = (props: SkeletonProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { children, color = 'gray', ...rest } = props;

  return (
    <CUISkeleton
      {...rest}
      {...commonProps}
      startColor={utils.handleReturnColors('start', color, colorMode)}
      endColor={utils.handleReturnColors('end', color, colorMode)}>
      {children}
    </CUISkeleton>
  );
};

export default Skeleton;
