import React, { ReactElement } from 'react';

import { useColorMode, StatGroup, Stat, StatLabel, StatNumber, HStack, VStack, Box } from '@chakra-ui/react';

import SkeletonText from '../../../../../../components/Skeleton/Text';

export type Stat = {
  label: string;
  number: number;
};

export type StatsProps = {
  totalMovieCredits: number;
  totalTvCredits: number;
  totalCrewCredits: number;
  isLoading?: boolean;
};

const Stats = (props: StatsProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { totalMovieCredits, totalTvCredits, totalCrewCredits, isLoading = false } = props;

  const stats: Stat[] = [
    {
      label: 'Total credits',
      number: totalMovieCredits + totalTvCredits + totalCrewCredits
    },
    {
      label: 'Movie credits',
      number: totalMovieCredits
    },
    {
      label: 'TV credits',
      number: totalTvCredits
    },
    {
      label: 'Crew credits',
      number: totalCrewCredits
    }
  ];

  return (
    <StatGroup backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.800'} borderRadius='lg' px={2} py={1}>
      <HStack
        spacing={3}
        divider={<Box width='2px' height='54px' backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />}>
        {stats.map((stat: Stat, index: number) => (
          <Stat key={index} justifyContent='center'>
            <VStack spacing={0}>
              <SkeletonText height='42px' isLoaded={!isLoading}>
                <StatNumber color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='4xl' lineHeight='normal'>
                  {stat.number}
                </StatNumber>
              </SkeletonText>
              <StatLabel color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md' whiteSpace='nowrap'>
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
