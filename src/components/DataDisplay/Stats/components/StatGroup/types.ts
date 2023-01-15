import { ReactNode } from 'react';

import { CommonStatsProps } from '../../common/types';

export type StatGroupProps = CommonStatsProps & {
	children: ReactNode;
};
