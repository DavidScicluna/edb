import { ReactElement } from 'react';

import { useColorMode, StatGroup, Stat, StatLabel, StatNumber, HStack, VStack, Box } from '@chakra-ui/react';

import { StatsProps, Stat as StatType } from './types';

const Stats = (props: StatsProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { totalMovies, totalTvs } = props;

  const stats: StatType[] = [
    {
      label: 'Total',
      number: totalMovies + totalTvs
    },
    {
      label: 'Movies',
      number: totalMovies
    },
    {
      label: 'TV Shows',
      number: totalTvs
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
        divider={<Box width='2px' height='44px' backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />}
        spacing={1}>
        {stats.map((stat: StatType, index: number) => (
          <Stat key={index} justifyContent='center'>
            <VStack spacing={0}>
              <StatNumber color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='2xl' lineHeight='normal'>
                {stat.number}
              </StatNumber>
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
