
import { ReactElement, forwardRef } from 'react';
import CountUp from 'react-countup';

import { useColorMode, useConst, Stat as CUIStat, VStack, StatLabel, StatNumber } from '@chakra-ui/react';

import _ from 'lodash';

import { StatRef, StatProps } from './types';

import SkeletonText from '../../../../../../../../../../../components/Skeleton/Text';

const dummies = _.range(50, 150, 20);

const Stat = forwardRef<StatRef, StatProps>(function Stat(props, ref): ReactElement {
  const { colorMode } = useColorMode();

  const { label = '', number = 0, isLoading = true } = props;

  const dummy = useConst<number>(_.sample(dummies) || 100);

  return (
    <CUIStat ref={ref} justifyContent='center'>
      <VStack spacing={0}>
        <SkeletonText fontSize='3xl' isLoaded={!isLoading}>
          <StatNumber
            color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
            fontSize='3xl'
            lineHeight='normal'
            whiteSpace='nowrap'
          >
            {!isLoading ? <CountUp duration={1} end={number || 0} /> : dummy}
          </StatNumber>
        </SkeletonText>
        <StatLabel
          color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
          fontSize='xs'
          whiteSpace='nowrap'
          textTransform='uppercase'
        >
          {label}
        </StatLabel>
      </VStack>
    </CUIStat>
  );
});

export default Stat;
