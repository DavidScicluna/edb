import { FC } from 'react';

import StatGroup from '../components/StatGroup';

import { DummyStatsProps } from './types';
import DummyStat from './components/DummyStat';

const DummyStats: FC<DummyStatsProps> = ({ dummyStats = [], ...rest }) => {
	return (
		<StatGroup {...rest}>
			{dummyStats.map(({ label }, index) => (
				<DummyStat key={index} label={label} />
			))}
		</StatGroup>
	);
};

export default DummyStats;
