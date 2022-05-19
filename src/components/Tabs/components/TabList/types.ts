import { Color } from '../../../../theme/types';

import { Tab, Size } from './components/Tab/types';


export type TabListProps = {
	children: Tab[];
	color?: keyof Color;
	isActiveForced?: boolean;
	size?: Size;
};
