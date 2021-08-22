import React, { ReactElement } from 'react';

import { useColorMode, SkeletonCircle as CUISkeletonCircle, SkeletonProps } from '@chakra-ui/react';

import commonProps from '../common/props';
import utils from '../common/utils/utils';

const SkeletonCircle = (props: SkeletonProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { children, ...rest } = props;

  return (
    <CUISkeletonCircle
      {...rest}
      {...commonProps}
      startColor={utils.handleReturnColors('start', 'gray', colorMode)}
      endColor={utils.handleReturnColors('end', 'gray', colorMode)}>
      {children}
    </CUISkeletonCircle>
  );
};

export default SkeletonCircle;
