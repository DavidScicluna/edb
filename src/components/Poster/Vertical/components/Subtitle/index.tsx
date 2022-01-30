import { ReactElement, useCallback, useState } from 'react';

import { useColorMode, Box, Text } from '@chakra-ui/react';
import _ from 'lodash';

import { handleIsOverflowing } from '../../../../../common/utils';
import SkeletonText from '../../../../Skeleton/Text';
import { SubtitleProps } from './types';

const dummies = _.range(25, 100, 10);

const Subtitle = (props: SubtitleProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { subtitle, isLoading = false, inView = true } = props;

  const [dummy] = useState<number>(_.sample(dummies) || 100);

  const [isTruncated, setIsTruncated] = useState<boolean>(false);

  const handleIsTruncated = useCallback(
    (ref: HTMLParagraphElement | null) => {
      if (ref) {
        setIsTruncated(handleIsOverflowing(ref));
      }
    },
    [isTruncated, setIsTruncated, handleIsOverflowing]
  );

  return (
    <Box
      width='100%'
      maxWidth='100%'
      height={isLoading || _.isNil(subtitle) || _.isEmpty(subtitle) ? '16.5px' : 'auto'} // Size of typography height
    >
      {inView || isLoading ? (
        <SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize='xs' isLoaded={!isLoading}>
          <Text
            ref={handleIsTruncated}
            align='left'
            fontSize='xs'
            color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
            isTruncated
            overflow='hidden'
            whiteSpace='nowrap'
          >
            {!isLoading ? subtitle : 'Lorem ipsum dolor sit amet'}
          </Text>
        </SkeletonText>
      ) : null}
    </Box>
  );
};

export default Subtitle;
