import { CommonStatsProps } from '../common/types';

export type Stat = { label: string; total: number };
export type Stats = Stat[];

export type StatsProps = CommonStatsProps & {
	stats: Stats;
};
