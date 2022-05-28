import { Color } from '@davidscicluna/component-library';

import { Tab, Size } from './components/Tab/types';

export type TabListProps = {
	children: Tab[];
	color?: Color;
	isActiveForced?: boolean;
	size?: Size;
};
