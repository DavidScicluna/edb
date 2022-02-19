import { Tab, Size } from './components/Tab/types';

import { Color } from '../../../../theme/types';

export type TabListProps = {
	children: Tab[];
	color?: keyof Color;
	isActiveForced?: boolean;
	size?: Size;
};
