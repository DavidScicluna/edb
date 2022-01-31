import React, { ReactElement, useState } from 'react';

import { useColorMode, useMediaQuery, Text } from '@chakra-ui/react';
import _ from 'lodash';

import SkeletonText from '../../../../../../../../../../components/Skeleton/Text';
import { DepartmentProps } from './types';

const dummies = _.range(25, 200, 6);

const Department = ({ department, isLoading = true, isQuickView = false }: DepartmentProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const [dummy] = useState<number>(_.sample(dummies) || 100);

  return (
    <SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='sm' isLoaded={!isLoading}>
      <Text
        align='left'
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        fontSize={isSm && !isQuickView ? 'xs' : 'sm'}
        whiteSpace='nowrap'
      >
        {!isLoading ? department : 'Lorem Ipsum'}
      </Text>
    </SkeletonText>
  );
};

export default Department;
