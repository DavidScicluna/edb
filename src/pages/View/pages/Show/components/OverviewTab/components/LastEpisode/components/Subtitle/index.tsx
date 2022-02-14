import { ReactElement, useState } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';
import _ from 'lodash';

import SkeletonText from '../../../../../../../../../../components/Skeleton/Text';
import { SubtitleProps } from './types';

const dummies = _.range(25, 100, 10);

const Subtitle = (props: SubtitleProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { subtitle, isLoading = false } = props;

  const [dummy] = useState<number>(_.sample(dummies) || 100);

  return (
    <SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize='xs' isLoaded={!isLoading}>
      <Text
        align='left'
        fontSize='sm'
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        isTruncated
        overflow='hidden'
        whiteSpace='nowrap'
      >
        {!isLoading ? subtitle : 'Lorem ipsum dolor sit amet'}
      </Text>
    </SkeletonText>
  );
};

export default Subtitle;
