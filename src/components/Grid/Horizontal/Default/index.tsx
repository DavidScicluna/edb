import { ReactElement, useRef, useState, useCallback, useEffect } from 'react';

import '../common/styles/styles.css';
import { useBoolean } from '@chakra-ui/react';

import _ from 'lodash';

import { HorizontalGridDefaultProps } from './types';

import Panel from '../../../Panel';
import Actions from '../components/Actions';
import Scroll from '../components/Scroll';
import Title from '../components/Title';
import { ScrollMenu } from '../types';

const HorizontalGridDefault = (props: HorizontalGridDefaultProps): ReactElement => {
  const ref = useRef<ScrollMenu>({} as ScrollMenu);
  const { scrollPrev, scrollNext } = ref.current || {};

  const { children, title, footer, isDisabled = false, ...rest } = props;

  const [api, setApi] = useState<ScrollMenu>({} as ScrollMenu);
  const {
    initComplete = false,
    isFirstItemVisible = false,
    isLastItemVisible = false,
    visibleItemsWithoutSeparators = []
  } = api || {};

  const [isLeftDisabled, setIsLeftDisabled] = useBoolean(!initComplete || (initComplete && isFirstItemVisible));
  const [isRightDisabled, setIsRightDisabled] = useBoolean(!visibleItemsWithoutSeparators.length && isLastItemVisible);

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
          title: title ? typeof title === 'string' ? <Title>{title}</Title> : title : undefined,
          actions: (
            <Actions
              isLeftDisabled={isDisabled || isLeftDisabled}
              isRightDisabled={isDisabled || isRightDisabled}
              onLeftClick={scrollPrev}
              onRightClick={scrollNext}
            />
          )
        },
        body: Array.isArray(children) ? (
          <Scroll apiRef={ref} onInit={handleUpdateApi} onUpdate={handleUpdateApi}>
            {children}
          </Scroll>
        ) : (
          children
        ),
        footer
      }}
    </Panel>
  );
};

export default HorizontalGridDefault;
