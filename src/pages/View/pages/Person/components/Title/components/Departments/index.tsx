import React, { ReactElement } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';
import _ from 'lodash';

import HorizontalScroll from '../../../../../../../../components/HorizontalScroll';
import Department from './components/Department';
import { DepartmentsProps } from './types';

const Departments = ({ departments, isLoading = true, isQuickView = false }: DepartmentsProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <HorizontalScroll
      divider={
        <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
          •
        </Text>
      }
      isDisabled={isLoading}
    >
      {!isLoading
        ? departments.map((department) => (
            <Department key={department} department={department} isQuickView={isQuickView} isLoading={false} />
          ))
        : _.range(0, 5).map((_dummy, index) => <Department key={index} isQuickView={isQuickView} isLoading />)}
    </HorizontalScroll>
  );
};

export default Departments;
