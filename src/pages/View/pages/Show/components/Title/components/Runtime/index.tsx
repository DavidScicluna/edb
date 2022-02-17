import { ReactElement } from 'react';

import { useConst, Text } from '@chakra-ui/react';
import _ from 'lodash';

import { handleReturnRuntime } from '../../../../../../../../common/utils';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';
import { RuntimeProps } from './types';

const dummies = _.range(25, 75, 20);

const Runtime = (props: RuntimeProps): ReactElement => {
  const { runtime, color, fontSize, isLoading = true } = props;

  const dummy = useConst<number>(_.sample(dummies) || 50);

  return (
    <SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
      <Text align='left' color={color} fontSize={fontSize} whiteSpace='nowrap'>
        {handleReturnRuntime(runtime || 0) || 'TV Show Runtime'}
      </Text>
    </SkeletonText>
  );
};

export default Runtime;
