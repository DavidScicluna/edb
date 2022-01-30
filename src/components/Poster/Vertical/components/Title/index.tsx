import { ReactElement, useCallback, useState } from 'react';

import { useColorMode, Box, Text } from '@chakra-ui/react';
import _ from 'lodash';

import { handleIsOverflowing } from '../../../../../common/utils';
import SkeletonText from '../../../../Skeleton/Text';
import { TitleProps } from './types';

const dummies = _.range(25, 100, 10);

const Title = (props: TitleProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { title, isLoading = false, inView = true } = props;

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
      height={isLoading || _.isNil(title) || _.isEmpty(title) ? '19.25px' : 'auto'} // Size of typography height
    >
      {inView || isLoading ? (
        <SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize='sm' isLoaded={!isLoading}>
          <Text
            ref={handleIsTruncated}
            align='left'
            fontSize='sm'
            fontWeight='semibold'
            color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
            isTruncated
            overflow='hidden'
            whiteSpace='nowrap'
          >
            {!isLoading ? title : 'Lorem ipsum'}
          </Text>
        </SkeletonText>
      ) : null}
    </Box>
  );
};

export default Title;
