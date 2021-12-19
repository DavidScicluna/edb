import { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';
import _ from 'lodash';

import { handleReturnDummyWidths } from '../../../../../../common/utils';
import HorizontalScroll from '../../../../../../components/HorizontalScroll';
import SkeletonText from '../../../../../../components/Skeleton/Text';
import { DepartmentsProps } from './types';

const dummyTextWidths = handleReturnDummyWidths(200, 4);

const Departments = (props: DepartmentsProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { departments, isLoading = false } = props;

  return (
    <HorizontalScroll isLoading={isLoading}>
      <HStack
        width='100%'
        maxWidth='100%'
        divider={
          <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md' mx={0.75}>
            •
          </Text>
        }
      >
        {[...(!isLoading ? departments : _.range(0, 4))].map((department, index) => (
          <SkeletonText
            key={index}
            width={isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}px` : 'auto'}
            offsetY={9.5}
            isLoaded={!isLoading}
          >
            <Text
              align='left'
              color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
              fontSize='md'
              whiteSpace='nowrap'
            >
              {typeof department !== 'number' ? department : 'Lorem'}
            </Text>
          </SkeletonText>
        ))}
      </HStack>
    </HorizontalScroll>
  );
};

export default Departments;
