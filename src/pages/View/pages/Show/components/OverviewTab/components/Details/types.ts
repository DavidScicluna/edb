import { ReactElement } from 'react';

import { FullTV } from '../../../../../../../../common/types/tv';

export type ListItem = {
	label: string;
	children?: ReactElement;
};

export type DetailsProps = {
	show?: FullTV;
	isLoading?: boolean;
};
