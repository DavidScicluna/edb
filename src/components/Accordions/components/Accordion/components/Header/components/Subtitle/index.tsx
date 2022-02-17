import { ReactElement } from 'react';

import { useColorMode, useConst, Box, Text } from '@chakra-ui/react';
import _ from 'lodash';

import SkeletonText from '../../../../../../../Skeleton/Text';
import { SubtitleProps } from './types';

const dummies = _.range(25, 100, 10);

const Subtitle = (props: SubtitleProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { subtitle, isLoading = false, inView = true } = props;

  const dummy = useConst<number>(_.sample(dummies) || 100);

  return (
    <Box
      width='100%'
      maxWidth='100%'
      height='19.25px' // Size of typography height
    >
      {inView || isLoading ? (
        <SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize='xs' isLoaded={!isLoading}>
          <Text
            align='left'
            fontSize='sm'
            color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
            isTruncated
            overflow='hidden'
            whiteSpace='nowrap'
          >
            {subtitle || 'Subtitle'}
          </Text>
        </SkeletonText>
      ) : null}
    </Box>
  );
};

export default Subtitle;
