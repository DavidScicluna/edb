import { ReactElement, useCallback, useState } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import { handleReturnDummyWidths, handleIsOverflowing } from '../../../../../common/utils';
import SkeletonText from '../../../../Skeleton/Text';
import { SubtitleProps } from './types';

const dummyTextWidths = handleReturnDummyWidths(100, 10);

const Subtitle = (props: SubtitleProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { subtitle, isLoading = false, inView = true } = props;

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
      width={inView && isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}%` : 'auto'}
      maxWidth='100%'
      height={['19.25px', '22px', '24.75', '27.5px']}
      offsetY={8.5}
      isLoaded={inView && !isLoading}
    >
      <Text
        ref={handleIsTruncated}
        align='left'
        fontSize={['sm', 'md', 'lg', 'xl']}
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
