import React, { ReactElement, useCallback, useState } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import utils from '../../../../../common/utils/utils';
import SkeletonText from '../../../../Skeleton/Text';
import { SubtitleProps } from './types';

const dummyTextWidths = utils.handleReturnDummyWidths(100, 10);

const Subtitle = (props: SubtitleProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { subtitle, isLoading = false } = props;

  const [isTruncated, setIsTruncated] = useState<boolean>(false);

  const handleIsTruncated = useCallback(
    (ref: HTMLParagraphElement | null) => {
      if (ref) {
        setIsTruncated(utils.handleIsOverflowing(ref));
      }
    },
    [isTruncated, setIsTruncated]
  );

  return (
    <SkeletonText
      width={isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}%` : '100%'}
      offsetY={23}
      isLoaded={!isLoading}>
      <Text
        ref={handleIsTruncated}
        align='left'
        fontSize={['sm', 'md', 'lg', 'xl']}
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        isTruncated
        overflow='hidden'
        whiteSpace='nowrap'>
        {!isLoading ? subtitle : 'Lorem ipsum dolor sit amet'}
      </Text>
    </SkeletonText>
  );
};

export default Subtitle;
