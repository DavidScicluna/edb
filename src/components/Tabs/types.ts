import { ReactElement } from 'react';

import { TabsProps as CUITabsProps } from '@chakra-ui/react';

export type TabsContext = {
	activeTab?: number;
};

export type TabsProps = {
	children: ReactElement | ReactElement[];
	activeTab?: number;
	onChange: (index: number) => void;
} & Omit<
	CUITabsProps,
	| 'colorScheme'
	| 'direction'
	| 'id'
	| 'index'
	| 'isFitted'
	| 'isLazy'
	| 'isManual'
	| 'lazyBehavior'
	| 'onChange'
	| 'size'
	| 'variant'
>;
