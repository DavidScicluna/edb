import { ReactElement, useCallback, useState } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import { handleReturnDummyWidths, handleIsOverflowing } from '../../../../../common/utils';
import SkeletonText from '../../../../Skeleton/Text';
import { TitleProps } from './types';

const dummyTextWidths = handleReturnDummyWidths(100, 10);

const Title = (props: TitleProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { title, isLoading = false, inView = true } = props;

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
      height={['24.75', '27.5px', '33px', '41.25px']}
      offsetY={11.5}
      isLoaded={inView && !isLoading}
    >
      <Text
        ref={handleIsTruncated}
        align='left'
        fontSize={['lg', 'xl', '2xl', '3xl']}
        fontWeight='semibold'
        color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
        isTruncated
        overflow='hidden'
        whiteSpace='nowrap'
      >
        {!isLoading ? title : 'Lorem ipsum'}
      </Text>
    </SkeletonText>
  );
};

export default Title;
