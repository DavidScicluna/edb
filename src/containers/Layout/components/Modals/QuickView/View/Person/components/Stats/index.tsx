import { ReactElement } from 'react';

import { useColorMode, StatGroup, HStack } from '@chakra-ui/react';
import { useElementSize } from 'usehooks-ts';

import Divider from '../../../../../../../../../components/Divider';

import Stat from './components/Stat';
import { StatsProps, Stat as StatType } from './types';


const Stats = (props: StatsProps): ReactElement => {
	const { colorMode } = useColorMode();

	const { totalMovieCredits, totalTvCredits, totalCrewCredits, isLoading = false } = props;

	const [ref, { height }] = useElementSize();

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
			borderColor={`gray.${colorMode === 'light' ? 200 : 700}`}
			borderRadius='base'
			p={1}
		>
			<HStack
				width='100%'
				justifyContent='space-between'
				wrap='wrap'
				divider={<Divider orientation='vertical' height={`${height}px`} />}
				spacing={1}
			>
				{stats.map((stat: StatType, index: number) => (
					<Stat key={index} ref={ref} {...stat} isLoading={isLoading} />
				))}
			</HStack>
		</StatGroup>
	);
};

export default Stats;
