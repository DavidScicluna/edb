import React, { ReactElement } from 'react';

import { Skeleton as CUISkeleton, SkeletonProps } from '@chakra-ui/react';

import commonProps from './common/props';

const Skeleton = (props: SkeletonProps): ReactElement => {
  const { children, ...rest } = props;

  return (
    <CUISkeleton {...rest} {...commonProps}>
      {children}
    </CUISkeleton>
  );
};

export default Skeleton;
