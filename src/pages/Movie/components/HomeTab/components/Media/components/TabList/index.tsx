import React, { ReactElement } from 'react';

import { TabList as CUITabList } from '@chakra-ui/react';

import Tab from './components/Tab';
import { TabListProps } from './types';

const TabList = ({ activeIndex, isLoading }: TabListProps): ReactElement => {
  const renderTabs = [
    {
      label: 'photos',
      isDisabled: isLoading.images
    },
    {
      label: 'backdrops',
      isDisabled: isLoading.images
    },
    {
      label: 'videos',
      isDisabled: isLoading.videos
    }
  ];

  return (
    <CUITabList>
      {renderTabs.map((tab, index) => (
        <Tab key={index} label={tab.label} isSelected={activeIndex === index} isDisabled={tab.isDisabled} />
      ))}
    </CUITabList>
  );
};

export default TabList;
