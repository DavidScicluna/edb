import React, { ReactElement, useCallback, useState } from 'react';

import { useTheme, useColorMode, Text } from '@chakra-ui/react';

import utils from '../../../../../common/utils/utils';
import { Theme } from '../../../../../theme/types';
import SkeletonText from '../../../../Skeleton/Text';
import Tooltip from '../../../../Tooltip';
import { TitleProps } from './types';

const dummyTextWidths = utils.handleReturnDummyWidths(100, 10);

const Title = (props: TitleProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { title, isLoaded = false } = props;

  const [isHovering, setIsHovering] = useState<boolean>(false);
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
      <Tooltip
        aria-label='Showing full title text'
        label={title}
        placement='top'
        isOpen={isTruncated ? isHovering : false}>
        <Text
          ref={handleIsTruncated}
          cursor={isTruncated && !isHovering ? 'pointer' : 'text'}
          align='left'
          fontSize='sm'
          fontWeight='semibold'
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          isTruncated
          overflow='hidden'
          whiteSpace='nowrap'
          onClick={() =>
            setTimeout(() => {
              setIsHovering(true);
            }, utils.handleReturnNumberFromString(theme.transition.duration.fast, 'ms'))
          }
          onMouseLeave={() =>
            setTimeout(() => {
              setIsHovering(false);
            }, utils.handleReturnNumberFromString(theme.transition.duration.normal, 'ms'))
          }>
          {title}
        </Text>
      </Tooltip>
    </SkeletonText>
  );
};

export default Title;
