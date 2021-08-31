import React, { ReactElement } from 'react';

import { useColorMode, StatGroup, Stat, StatLabel, StatNumber, HStack, VStack, Box } from '@chakra-ui/react';

import SkeletonText from '../../../../../../../../../components/Skeleton/Text';
import { StatsProps, Stat as StatType } from './types';

const Stats = (props: StatsProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { totalMovieCredits, totalTvCredits, totalCrewCredits, isLoading = false } = props;

  const stats: StatType[] = [
    {
      label: 'Total',
      number: totalMovieCredits + totalTvCredits + totalCrewCredits
    },
    {
      label: 'Movies',
      number: totalMovieCredits
    },
    {
      label: 'TV Shows',
      number: totalTvCredits
    },
    {
      label: 'Crew',
      number: totalCrewCredits
    }
  ];

  return (
    <StatGroup
      width='100%'
      border='solid2'
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      borderRadius='base'
      p={1}>
      <HStack
        width='100%'
        justifyContent='space-between'
        wrap='wrap'
        divider={<Box width='2px' height='44px' backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />}
        spacing={1}>
        {stats.map((stat: StatType, index: number) => (
          <Stat key={index} justifyContent='center'>
            <VStack spacing={0}>
              <SkeletonText offsetY='14px' isLoaded={!isLoading}>
                <StatNumber color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='3xl' lineHeight='normal'>
                  {!isLoading ? stat.number || 0 : '12'}
                </StatNumber>
              </SkeletonText>
              <StatLabel
                color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
                fontSize='xs'
                whiteSpace='nowrap'
                textTransform='uppercase'>
                {stat.label}
              </StatLabel>
            </VStack>
          </Stat>
        ))}
      </HStack>
    </StatGroup>
  );
};

export default Stats;
