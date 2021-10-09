import { ReactElement } from 'react';

import { TabList as CUITabList } from '@chakra-ui/react';

import HorizontalScroll from '../../../HorizontalScroll';
import Tab from './components/Tab';
import { TabListProps } from './types';

const TabList = (props: TabListProps): ReactElement => {
  const { renderTabs, activeTab, size } = props;

  return (
    <CUITabList mb={2}>
      <HorizontalScroll>
        <>
          {renderTabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              badge={tab.badge}
              isSelected={activeTab === index}
              isDisabled={tab.isDisabled || false}
              size={size}
            />
          ))}
        </>
      </HorizontalScroll>
    </CUITabList>
  );
};

export default TabList;
