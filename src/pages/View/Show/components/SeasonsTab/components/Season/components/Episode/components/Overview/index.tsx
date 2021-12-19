import { ReactElement, useCallback, useState } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import { handleIsOverflowing } from '../../../../../../../../../../../common/utils';
import SkeletonText from '../../../../../../../../../../../components/Skeleton/Text';
import { OverviewProps } from './types';

const Overview = (props: OverviewProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { overview, isLoading = false } = props;

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
    <SkeletonText width='100%' offsetY={11.5} isLoaded={!isLoading}>
      <Text
        ref={handleIsTruncated}
        align='left'
        fontSize={['sm', 'md', 'lg', 'xl']}
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        isTruncated
        overflow='hidden'
        whiteSpace='nowrap'
      >
        {!isLoading ? overview : 'Lorem ipsum'}
      </Text>
    </SkeletonText>
  );
};

export default Overview;
