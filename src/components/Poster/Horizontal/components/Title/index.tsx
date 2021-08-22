import React, { ReactElement, useCallback, useState } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import utils from '../../../../../common/utils/utils';
import SkeletonText from '../../../../Skeleton/Text';
import { TitleProps } from './types';

const dummyTextWidths = utils.handleReturnDummyWidths(100, 10);

const Title = (props: TitleProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { title, isLoading = false } = props;

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
      offsetY={31.25}
      isLoaded={!isLoading}>
      <Text
        ref={handleIsTruncated}
        align='left'
        fontSize={['lg', 'xl', '2xl', '3xl']}
        fontWeight='semibold'
        color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
        isTruncated
        overflow='hidden'
        whiteSpace='nowrap'>
        {!isLoading ? title : 'Lorem ipsum'}
      </Text>
    </SkeletonText>
  );
};

export default Title;
