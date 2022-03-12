import { ReactElement, createContext, forwardRef } from 'react';

import { Tabs as CUITabs } from '@chakra-ui/react';

import { TabsContext as TabsContextType, TabsRef, TabsProps } from './types';

export const TabsContext = createContext<TabsContextType>({ activeTab: -1 });

const Tabs = forwardRef<TabsRef, TabsProps>(function Tabs(props, ref): ReactElement {
	const { children, activeTab = -1, ...rest } = props;

	return (
		<CUITabs {...rest} ref={ref} width='100%' maxWidth='100%' isLazy lazyBehavior='unmount' variant='unstyled'>
			<TabsContext.Provider value={{ activeTab }}>{children}</TabsContext.Provider>
		</CUITabs>
	);
});

export default Tabs;
