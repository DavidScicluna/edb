import React, { ReactElement } from 'react';

import { TabList as CUITabList } from '@chakra-ui/react';

import Tab from './components/Tab';
import { TabListProps } from './types';

const TabList = ({ activeTab, isLoading }: TabListProps): ReactElement => {
  const renderTabs = [
    {
      label: 'Home'
    },
    {
      label: 'Cast & Crew',
      isDisabled: isLoading.credits
    },
    {
      label: 'Reviews',
      isDisabled: isLoading.reviews
    }
  ];

  return (
    <CUITabList mb={2}>
      {renderTabs.map((tab, index) => (
        <Tab key={index} label={tab.label} isSelected={activeTab === index} isDisabled={tab.isDisabled || false} />
      ))}
    </CUITabList>
  );
};

export default TabList;
