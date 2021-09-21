import React, { ReactElement } from 'react';

import { TabList as CUITabList } from '@chakra-ui/react';

import Tab from './components/Tab';
import { TabListProps, Tab as TabType } from './types';

const TabList = (props: TabListProps): ReactElement => {
  const { activeTab, reviews, castCrew, isLoading } = props;

  const renderTabs: TabType[] = [
    {
      label: 'Overview'
    },
    {
      label: 'Cast & Crew',
      isDisabled: isLoading.credits,
      badge: castCrew ? String(castCrew) : undefined
    },
    {
      label: 'Reviews',
      isDisabled: isLoading.reviews || reviews === 0,
      badge: String(reviews)
    }
  ];

  return (
    <CUITabList mb={2}>
      {renderTabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          badge={tab.badge}
          isSelected={activeTab === index}
          isDisabled={tab.isDisabled || false}
        />
      ))}
    </CUITabList>
  );
};

export default TabList;
