import React, { ReactElement } from 'react';

import { useColorMode, VStack, Text } from '@chakra-ui/react';
import _ from 'lodash';

import SkeletonText from '../../../../../../../../../components/Skeleton/Text';
import Label from '../../../../components/Label';
import { OverviewProps } from './types';

const Overview = ({ overview, isLoading = true }: OverviewProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <Label width='100%' label='Overview'>
      {!isLoading ? (
        <SkeletonText width='100%' fontSize='md' isLoaded>
          <Text
            align='left'
            color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
            fontSize='md'
            isTruncated
            overflow='hidden'
            whiteSpace='normal'
            sx={{
              'display': '-webkit-box !important',
              '-webkit-line-clamp': '10',
              '-webkit-box-orient': 'vertical'
            }}
          >
            {overview || 'Collection Overview'}
          </Text>
        </SkeletonText>
      ) : (
        <VStack width='100%' spacing={0.5}>
          {_.range(0, 2).map((_dummy, index: number) => (
            <SkeletonText key={index} width='100%' fontSize='md' isLoaded={false}>
              {`Paragraph ${index + 1}`}
            </SkeletonText>
          ))}
        </VStack>
      )}
    </Label>
  );
};

export default Overview;
