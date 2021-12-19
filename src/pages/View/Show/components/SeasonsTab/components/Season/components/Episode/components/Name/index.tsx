import { ReactElement, useCallback, useState } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import { handleReturnDummyWidths, handleIsOverflowing } from '../../../../../../../../../../../common/utils';
import SkeletonText from '../../../../../../../../../../../components/Skeleton/Text';
import { NameProps } from './types';

const dummyTextWidths = handleReturnDummyWidths(100, 10);

const Name = (props: NameProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { name, isLoading = false } = props;

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
      width={isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}%` : '100%'}
      offsetY={11.5}
      isLoaded={!isLoading}
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
        {!isLoading ? name : 'Lorem ipsum'}
      </Text>
    </SkeletonText>
  );
};

export default Name;
