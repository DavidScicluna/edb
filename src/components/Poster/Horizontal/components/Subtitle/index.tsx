import React, { ReactElement, useCallback, useState } from 'react';

import { useTheme, useColorMode, Text } from '@chakra-ui/react';

import utils from '../../../../../common/utils/utils';
import { Theme } from '../../../../../theme/types';
import SkeletonText from '../../../../Skeleton/Text';
import Tooltip from '../../../../Tooltip';
import { SubtitleProps } from './types';

const dummyTextWidths = utils.handleReturnDummyWidths(100, 10);

const Subtitle = (props: SubtitleProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { subtitle, isLoaded = false } = props;

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
      isLoaded={isLoaded}>
      <Tooltip
        aria-label='Showing full sub-title text'
        label={subtitle}
        placement='top'
        isOpen={isTruncated ? isHovering : false}
        gutter={6}>
        <Text
          ref={handleIsTruncated}
          cursor={isTruncated && !isHovering ? 'pointer' : 'text'}
          align='left'
          fontSize={['sm', 'md', 'lg', 'xl']}
          color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
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
          {subtitle}
        </Text>
      </Tooltip>
    </SkeletonText>
  );
};

export default Subtitle;
