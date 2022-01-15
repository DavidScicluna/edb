import { ReactElement, useContext } from 'react';

import { TabList as CUITabList } from '@chakra-ui/react';

import { TabsContext } from '../../.';
import HorizontalScroll from '../../../HorizontalScroll';
import { TabsContext as TabsContextType } from '../../types';
import Tab from './components/Tab';
import { TabListProps } from './types';

const TabList = (props: TabListProps): ReactElement => {
  const { activeTab } = useContext<TabsContextType>(TabsContext);

  const { renderTabs, size = 'md' } = props;

  return (
    <CUITabList width='100%'>
      <HorizontalScroll>
        {renderTabs.map((tab, index) => (
          <Tab {...tab} key={index} isSelected={activeTab === index} size={size} />
        ))}
      </HorizontalScroll>
    </CUITabList>
  );
};

export default TabList;
