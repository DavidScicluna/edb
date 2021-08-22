import React, { ReactElement } from 'react';

import { useColorMode, SlideFade } from '@chakra-ui/react';

import Skeleton from '../../Skeleton';
import commonProps from '../common/props';
import utils from '../common/utils/utils';
import { SkeletonTextProps } from './types';

const SkeletonText = (props: SkeletonTextProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { children, color = 'gray', isLoaded = false, offsetY, ...rest } = props;

  return (
    <Skeleton
      {...rest}
      {...commonProps}
      isLoaded={isLoaded}
      startColor={utils.handleReturnColors('start', color, colorMode)}
      endColor={utils.handleReturnColors('end', color, colorMode)}>
      <SlideFade in={isLoaded} offsetY={offsetY}>
        {children}
      </SlideFade>
    </Skeleton>
  );
};

export default SkeletonText;
