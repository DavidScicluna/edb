import { ReactElement } from 'react';

import { useColorMode, useBreakpointValue, useConst, Box, Text } from '@chakra-ui/react';

import _ from 'lodash';


import { DescriptionProps } from './types';

import { FontSizes } from '../../../../../theme/types';
import SkeletonText from '../../../../Skeleton/Text';

const dummies = _.range(25, 100, 10);
const height = ['16.5px', '19.25px', '22px', '24.75px', '27.5px', '33px'];

const Description = (props: DescriptionProps): ReactElement => {
  const { colorMode } = useColorMode();
  const fontSize = useBreakpointValue<keyof FontSizes>({
    'base': 'xs',
    'sm': 'sm',
    'md': 'md',
    'lg': 'lg',
    'xl': 'xl',
    '2xl': '2xl'
  });

  const { description, isLoading = false, inView = true } = props;

  const dummy = useConst<number>(_.sample(dummies) || 100);

  return (
    <Box
      width='100%'
      maxWidth='100%'
      height={height} // Size of typography height
    >
      {inView || isLoading ? (
        <SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
          <Text
            align='left'
            fontSize={fontSize}
            color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
            overflow='hidden'
            whiteSpace='nowrap'
          >
            {!isLoading ? description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          </Text>
        </SkeletonText>
      ) : null}
    </Box>
  );
};

export default Description;
