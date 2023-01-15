import { CommonStatsProps } from '../common/types';

export type DummyStat = { label: string };
export type DummyStats = DummyStat[];

export type DummyStatsProps = CommonStatsProps & {
	dummyStats: DummyStats;
};
