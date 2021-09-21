import { ReactElement, useRef, useState, useCallback, useEffect } from 'react';

import { HStack } from '@chakra-ui/react';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';

import { useWindowSize } from '../../../common/hooks';
import { handleIsTouchDevice } from '../../../common/utils';
import Card from '../../Card';
import Arrow from './components/Arrow';
import Grid from './components/Grid';
import { HorizontalGridProps, ScrollButtonsState, Direction } from './types';

const defaultScrollButtonsState = {
  left: true,
  right: false
};

const HorizontalGrid = (props: HorizontalGridProps): ReactElement => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  const { width } = useWindowSize();

  const location = useLocation();

  const { children, title, footer, isLoading = true, hasDivider = false, variant = 'transparent' } = props;

  const [scrollButtons, setScrollButtons] = useState<ScrollButtonsState>(defaultScrollButtonsState);
  const [resetScrollButtons, setResetScrollButtons] = useState<boolean>(false);

  const handleGridRef = useCallback(
    _.debounce((ref: HTMLDivElement | null) => {
      if (ref) {
        const maxScroll = ref.scrollLeft + ref.offsetWidth;

        const isLeftDisabled = ref.scrollLeft === 0;
        const isRightDisabled =
          ref.scrollLeft === 0 ? ref.scrollWidth <= ref.offsetWidth : maxScroll >= ref.scrollWidth;

        setScrollButtons({
          left: isLeftDisabled,
          right: isRightDisabled
        });

        setResetScrollButtons(isLeftDisabled || isRightDisabled ? true : false);
      } else {
        handleGridRef(gridRef.current);
      }
    }, 50),
    [gridRef]
  );

  /**
   * This method will either scroll left or right depending on the direction passed as a param
   *
   * @param direction - The direction to scroll to
   */
  const handleScrollClick = useCallback(
    (direction: Direction) => {
      if (gridRef && gridRef.current) {
        if (direction === 'left') {
          gridRef.current.scrollLeft = gridRef.current.scrollLeft - 10;
        } else {
          gridRef.current.scrollLeft = gridRef.current.scrollLeft + 10;
        }
      }
    },
    [gridRef]
  );

  useEffect(() => {
    setResetScrollButtons(true);
  }, [location]);

  useEffect(() => {
    handleGridRef(gridRef.current);
  }, [width]);

  return (
    <Card
      box={{
        header: { px: variant === 'transparent' ? 2 : 0, py: 1.5 },
        footer: { px: variant === 'transparent' ? 2 : 0, py: 1 }
      }}
      isFullWidth
      hasDivider={hasDivider}
      variant={variant}
      px={variant === 'outlined' ? 2 : 0}>
      {{
        header: {
          title,
          actions: !handleIsTouchDevice() ? (
            <HStack spacing={1}>
              <Arrow
                direction='left'
                isDisabled={scrollButtons.left}
                isLoading={isLoading}
                reset={resetScrollButtons}
                onScrollClick={handleScrollClick}
                variant={variant}
              />
              <Arrow
                direction='right'
                isDisabled={scrollButtons.right}
                isLoading={isLoading}
                reset={resetScrollButtons}
                onScrollClick={handleScrollClick}
                variant={variant}
              />
            </HStack>
          ) : undefined
        },
        body: (
          <Grid
            gridRef={gridRef}
            hasDivider={hasDivider}
            handleScrollChange={() => handleGridRef(gridRef.current)}
            variant={variant}>
            {children}
          </Grid>
        ),
        footer
      }}
    </Card>
  );
};

export default HorizontalGrid;
