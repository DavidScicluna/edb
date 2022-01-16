import { ReactElement, useCallback, useState } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import { handleReturnDummyWidths, handleIsOverflowing } from '../../../../../common/utils';
import SkeletonText from '../../../../Skeleton/Text';
import { DescriptionProps } from './types';

const dummyTextWidths = handleReturnDummyWidths(100, 10);

const Description = (props: DescriptionProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { description, isLoading = false, inView = true } = props;

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
      height={['19.25px', '22px', '24.75', '27.5px']}
      offsetY={8.5}
      isLoaded={inView && !isLoading}
    >
      <Text
        ref={handleIsTruncated}
        cursor={isTruncated ? 'pointer' : 'text'}
        align='left'
        fontSize={['sm', 'md', 'lg', 'xl']}
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        isTruncated
        overflow='hidden'
        whiteSpace='nowrap'
      >
        {!isLoading
          ? description
          : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
      </Text>
    </SkeletonText>
  );
};

export default Description;
