import React, { ReactElement } from 'react';

import { useTheme, useColorMode, Skeleton as CUISkeleton } from '@chakra-ui/react';

import utils from '../../common/utils/utils';
import { Theme } from '../../theme/types';
import commonProps from './common/props';
import skeletonUtils from './common/utils/utils';
import { SkeletonProps } from './types';

const Skeleton = (props: SkeletonProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { children, color = 'gray', isLoaded = false, type = 'default', ...rest } = props;

  return (
    <CUISkeleton
      {...rest}
      {...commonProps}
      isLoaded={isLoaded}
      fadeDuration={
        type === 'default' && !isLoaded
          ? utils.handleReturnNumberFromString(theme.transition.duration['normal'], 'ms') / 250
          : 0
      }
      startColor={skeletonUtils.handleReturnColors('start', color, colorMode)}
      endColor={skeletonUtils.handleReturnColors('end', color, colorMode)}>
      {children}
    </CUISkeleton>
  );
};

export default Skeleton;
