import React, { ReactElement } from 'react';

import { VStack, Text, useColorMode } from '@chakra-ui/react';
import _ from 'lodash';

import SkeletonText from '../../../../../../../../components/Skeleton/Text';
import { OverviewProps } from './types';

const Overview = ({ overview, isLoading = true }: OverviewProps): ReactElement => {
  const { colorMode } = useColorMode();

  return !isLoading ? (
    <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md'>
      {overview}
    </Text>
  ) : (
    <VStack width='100%' spacing={1}>
      {_.range(0, 2).map((_dummy, index) => (
        <SkeletonText key={index} width='100%' offsetY={6} isLoaded={!isLoading}>
          <Text align='left' fontSize='xs'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </SkeletonText>
      ))}
    </VStack>
  );
};

export default Overview;
