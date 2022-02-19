import { ReactElement, useContext } from 'react';

import { TabList as CUITabList } from '@chakra-ui/react';

import Tab from './components/Tab';
import { TabListProps } from './types';

import { TabsContext } from '../../.';
import HorizontalScroll from '../../../HorizontalScroll';
import { TabsContext as TabsContextType } from '../../types';

const TabList = (props: TabListProps): ReactElement => {
	const { activeTab } = useContext<TabsContextType>(TabsContext);

	const { children = [], color = 'gray', isActiveForced = false, size = 'md' } = props;

	return (
		<CUITabList width='100%' height='100%'>
			<HorizontalScroll>
				{children.map((tab, index) => (
					<Tab
						{...tab}
						key={index}
						color={color}
						isOnlyTab={!isActiveForced && children.length === 1}
						isSelected={activeTab === index}
						size={size}
					/>
				))}
			</HorizontalScroll>
		</CUITabList>
	);
};

export default TabList;
