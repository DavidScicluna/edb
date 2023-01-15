import { FC } from 'react';

import StatGroup from '../components/StatGroup';

import { StatsProps } from './types';
import Stat from './components/Stat';

const Stats: FC<StatsProps> = ({ stats = [], ...rest }) => {
	return (
		<StatGroup {...rest}>
			{stats.map((stat, index) => (
				<Stat {...stat} key={index} />
			))}
		</StatGroup>
	);
};

export default Stats;
