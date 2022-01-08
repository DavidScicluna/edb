import React, { ReactElement, Fragment, useRef, useState, useCallback, useEffect } from 'react';

import '../common/styles/styles.css';
import { useBoolean, VStack } from '@chakra-ui/react';
import _ from 'lodash';

import Panel from '../../../Panel';
import Tabs from '../../../Tabs';
import TabList from '../../../Tabs/components/TabList';
import TabPanels from '../../../Tabs/components/TabPanels';
import Actions from '../components/Actions';
import Scroll from '../components/Scroll';
import Title from '../components/Title';
import { ScrollMenu } from '../types';
import { HorizontalGridTabbedProps } from './types';

const HorizontalGridTabbed = (props: HorizontalGridTabbedProps): ReactElement => {
  const ref = useRef<ScrollMenu>({} as ScrollMenu);
  const { scrollPrev, scrollNext } = ref.current || {};

  const { children, title, footer, isDisabled = false, activeTab, onChange, renderTabListProps, ...rest } = props;

  const [api, setApi] = useState<ScrollMenu>({} as ScrollMenu);
  const {
    initComplete = false,
    isFirstItemVisible = false,
    isLastItemVisible = false,
    visibleItemsWithoutSeparators = []
  } = api || {};

  const [isLeftDisabled, setIsLeftDisabled] = useBoolean(!initComplete || (initComplete && isFirstItemVisible));
  const [isRightDisabled, setIsRightDisabled] = useBoolean(!visibleItemsWithoutSeparators.length && isLastItemVisible);

  const handleResetScroll = (): void => {
    ref.current.scrollToItem(ref.current.getItemById(ref.current.items.toItems()[0]), 'auto', 'start');
  };

  const handleOnChange = (index: number): void => {
    handleResetScroll();
    onChange(index);
  };

  const handleUpdateApi = (api: ScrollMenu): void => {
    setApi(api);
  };

  const handleCheckIsDisabled = useCallback(
    _.debounce(() => {
      if (visibleItemsWithoutSeparators.length) {
        if (isFirstItemVisible) {
          setIsLeftDisabled.on();
        } else {
          setIsLeftDisabled.off();
        }

        if (isLastItemVisible) {
          setIsRightDisabled.on();
        } else {
          setIsRightDisabled.off();
        }
      }
    }, 0),
    [visibleItemsWithoutSeparators, isFirstItemVisible, isLastItemVisible, setIsLeftDisabled, setIsRightDisabled]
  );

  useEffect(() => handleCheckIsDisabled(), [isFirstItemVisible, isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Panel {...rest} isFullWidth>
      {{
        header: {
          title: typeof title === 'string' ? <Title>{title}</Title> : title,
          actions: (
            <Actions
              isLeftDisabled={isDisabled || isLeftDisabled}
              isRightDisabled={isDisabled || isRightDisabled}
              onLeftClick={scrollPrev}
              onRightClick={scrollNext}
            />
          )
        },
        body: (
          <Tabs activeTab={activeTab} onChange={handleOnChange}>
            <VStack width='100%' spacing={2}>
              <TabList {...renderTabListProps} activeTab={activeTab} />
              <TabPanels activeTab={activeTab}>
                {children.map((panel, index) => (
                  <Fragment key={index}>
                    {panel.props.children && panel.props.children.length > 0 ? (
                      <Scroll apiRef={ref} onInit={handleUpdateApi} onUpdate={handleUpdateApi}>
                        {panel.props.children}
                      </Scroll>
                    ) : (
                      panel
                    )}
                  </Fragment>
                ))}
              </TabPanels>
            </VStack>
          </Tabs>
        ),
        footer
      }}
    </Panel>
  );
};

export default HorizontalGridTabbed;
