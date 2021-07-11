import React, { ReactElement, useState, useCallback, UIEvent } from 'react';

import { useColorMode, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import useSelector from '../../../common/hooks/useSelectorTyped';
import utils from '../../../common/utils/utils';
import Button from '../../Clickable/Button';
import Grid from './components/Grid';
import Header from './components/Header';
import { HorizontalGridProps, ScrollButtonsState } from './types';

const defaultScrollButtonsState = {
  left: true,
  right: false
};

const HorizontalGrid = (props: HorizontalGridProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { children, title, footer, isLoading, path, onFooterClick } = props;

  const color = useSelector((state) => state.user.ui.theme.color);

  const [gridRef, setGridRef] = useState<HTMLDivElement | null>(null);

  const [scrollButtons, setScrollButtons] = useState<ScrollButtonsState>(defaultScrollButtonsState);
  const [resetScrollButtons, setResetScrollButtons] = useState<boolean>(false);

  const handleGridRef = useCallback((ref: HTMLDivElement | null) => {
    if (ref) {
      const maxScroll = ref.scrollLeft + ref.offsetWidth;

      const isLeftDisabled = ref.scrollLeft === 0;
      const isRightDisabled = ref.scrollLeft === 0 ? ref.scrollWidth <= ref.offsetWidth : maxScroll >= ref.scrollWidth;

      setScrollButtons({
        left: isLeftDisabled,
        right: isRightDisabled
      });
      setGridRef(ref);
      setResetScrollButtons(isLeftDisabled || isRightDisabled ? true : false);
    }
  }, []);

  const handleScrollChange = (event: UIEvent<HTMLDivElement, UIEvent>) => {
    handleGridRef(event.currentTarget);
  };

  /**
   * This method will either scroll left or right depending on the direction passed as a param
   *
   * @param direction - The direction to scroll to
   */
  const handleScrollClick = useCallback(
    (direction: 'left' | 'right') => {
      if (gridRef) {
        if (direction === 'left') {
          gridRef.scrollLeft = gridRef.scrollLeft - 10;
        } else {
          gridRef.scrollLeft = gridRef.scrollLeft + 10;
        }
      }
    },
    [gridRef]
  );

  return (
    <VStack width='100%' align='stretch' backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'} spacing={0}>
      {/* Header */}
      <Header
        title={title}
        isLoading={isLoading}
        reset={resetScrollButtons}
        scrollButtons={scrollButtons}
        handleScrollClick={handleScrollClick}
      />

      {/* Grid */}
      <Grid gridRef={handleGridRef} handleScrollChange={handleScrollChange}>
        {children}
      </Grid>

      {/* Footer */}
      {path ? (
        <Link to={!isLoading ? path : {}}>
          <Button
            color={utils.handleReturnColor(color)}
            isFullWidth
            isDisabled={isLoading}
            onClick={onFooterClick ? () => onFooterClick() : undefined}
            variant='text'>
            {footer || `View all ${title}`}
          </Button>
        </Link>
      ) : null}
    </VStack>
  );
};

export default HorizontalGrid;
