import React, { ReactElement } from 'react';

import { TabList as CUITabList } from '@chakra-ui/react';

import Tab from './components/Tab';
import { TabListProps, Tab as TabType } from './types';

const TabList = (props: TabListProps): ReactElement => {
  const { activeTab, reviews, castCrew, isDisabled } = props;

  const renderTabs: TabType[] = [
    {
      label: 'Overview'
    },
    {
      label: 'Cast & Crew',
      isDisabled: isDisabled.credits,
      badge: castCrew ? String(castCrew) : undefined
    },
    {
      label: 'Reviews',
      isDisabled: isDisabled.reviews || reviews === 0,
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
