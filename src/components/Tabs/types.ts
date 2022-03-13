import { ReactNode } from 'react';

import { TabsProps as CUITabsProps } from '@chakra-ui/react';

export type TabsContext = {
	activeTab?: number;
};

export type TabsRef = HTMLDivElement | null;

export type TabsProps = {
	children: ReactNode;
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
