import { ReactElement, useCallback, useState } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import { handleReturnDummyWidths, handleIsOverflowing } from '../../../../../common/utils';
import SkeletonText from '../../../../Skeleton/Text';
import { SubtitleProps } from './types';

const dummyTextWidths = handleReturnDummyWidths(100, 10);

const Subtitle = (props: SubtitleProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { subtitle, isLoading = false, inView = true } = props;

  const [dummyTextWidth] = useState<number>(dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]);

  const [isTruncated, setIsTruncated] = useState<boolean>(false);

  const handleIsTruncated = useCallback(
    (ref: HTMLParagraphElement | null) => {
      if (ref) {
        setIsTruncated(handleIsOverflowing(ref));
      }
    },
    [isTruncated, setIsTruncated]
  );

  return (
    <SkeletonText
      width={inView && isLoading ? `${dummyTextWidth}%` : 'auto'}
      maxWidth='100%'
      height='16.5px'
      offsetY={6}
      isLoaded={inView && !isLoading}
    >
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
  );
};

export default Subtitle;
