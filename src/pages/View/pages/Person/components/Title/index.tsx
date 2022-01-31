import React, { ReactElement } from 'react';

import { useColorMode, useBreakpointValue, VStack, Text } from '@chakra-ui/react';

import SkeletonText from '../../../../../../components/Skeleton/Text';
import { FontSizes } from '../../../../../../theme/types';
import Date from './components/Date';
import Departments from './components/Departments';
import { TitleProps } from './types';

const Title = ({ person, departments = [], isLoading = true, isQuickView = false }: TitleProps): ReactElement => {
  const { colorMode } = useColorMode();
  const fontSize = useBreakpointValue<keyof FontSizes>({
    'base': '2xl',
    'sm': '2xl',
    'md': '3xl',
    'lg': '3xl',
    'xl': '3xl',
    '2xl': '3xl'
  });

  return (
    <VStack width='100%' alignItems='flex-start' spacing={0}>
      <SkeletonText fontSize={fontSize} isLoaded={!isLoading}>
        <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize={fontSize} fontWeight='bold'>
          {person?.name || 'Person Name'}
        </Text>
      </SkeletonText>
      <Departments departments={departments} isLoading={isLoading} isQuickView={isQuickView} />
      <Date
        birthday={person?.birthday}
        place_of_birth={person?.place_of_birth}
        deathday={person?.deathday}
        isLoading={isLoading}
        isQuickView={isQuickView}
      />
    </VStack>
  );
};

export default Title;
