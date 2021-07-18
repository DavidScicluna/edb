import React, { ReactElement, useCallback, useState } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import utils from '../../../../../common/utils/utils';
import { toggleDescription } from '../../../../../store/slices/Modals';
import SkeletonText from '../../../../Skeleton/Text';
import { DescriptionProps } from './types';

const dummyTextWidths = utils.handleReturnDummyWidths(100, 10);

const Description = (props: DescriptionProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { mediaType, mediaItem, isLoaded = false } = props;

  const dispatch = useDispatch();

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
      width={!isLoaded ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}%` : '100%'}
      isLoaded={isLoaded}
      mb={!isLoaded ? 0.5 : 0}>
      <Text
        ref={handleIsTruncated}
        cursor={isTruncated ? 'pointer' : 'text'}
        align='left'
        fontSize={['sm', 'md', 'lg', 'xl']}
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        isTruncated
        overflow='hidden'
        whiteSpace='nowrap'
        onClick={() =>
          dispatch(
            toggleDescription({
              open: true,
              mediaType,
              mediaItem
            })
          )
        }>
        {mediaItem.description}
      </Text>
    </SkeletonText>
  );
};

export default Description;
