import { ReactElement } from 'react';

import { useConst, Text } from '@chakra-ui/react';

import _ from 'lodash';


import { DateProps } from './types';

import { handleReturnDate } from '../../../../../../../../common/utils';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';

const dummies = _.range(25, 100, 20);

const Date = (props: DateProps): ReactElement => {
  const { air_date, color, fontSize, isLoading = true } = props;

  const dummy = useConst<number>(_.sample(dummies) || 50);

  return (
    <SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
      <Text align='left' color={color} fontSize={fontSize} whiteSpace='nowrap'>
        {air_date && !isLoading ? `Episode Aired on ${handleReturnDate(air_date, 'full')}` : 'TV Show Episode Date'}
      </Text>
    </SkeletonText>
  );
};

export default Date;
