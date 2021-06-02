import React, { ReactElement } from 'react';

import { SkeletonText as CUISkeletonText, SkeletonTextProps } from '@chakra-ui/react';

import commonProps from '../common/props';

const SkeletonText = (props: SkeletonTextProps): ReactElement => {
  const { children, colorScheme, noOfLines = 1, ...rest } = props;

  const handleReturnColors = (type: 'start' | 'end') => {
    switch (colorScheme) {
      default:
        return type === 'start' ? 'gray.200' : 'gray.600';
    }
  };

  return (
    <CUISkeletonText
      {...rest}
      {...commonProps}
      noOfLines={noOfLines}
      startColor={handleReturnColors('start')}
      endColor={handleReturnColors('end')}>
      {children}
    </CUISkeletonText>
  );
};

export default SkeletonText;
