import React, { ReactElement, useState, useCallback } from 'react';

import { VStack } from '@chakra-ui/react';
import { Location } from 'history';
import { useHistory } from 'react-router-dom';

import Button from '../../Inputs/Button';
import Grid from './components/Grid';
import Header from './components/Header';

export type ScrollButtonsState = {
  left: boolean;
  right: boolean;
};

type HorizontalGridProps = {
  children: ReactElement;
  title: string;
  path: Partial<Location>;
};

const defaultScrollButtonsState = {
  left: true,
  right: false
};

const HorizontalGrid = (props: HorizontalGridProps): ReactElement => {
  const history = useHistory();

  const { children, title, path } = props;

  const [gridRef, setGridRef] = useState<HTMLDivElement | null>(null);

  const [scrollButtons, setScrollButtons] = useState<ScrollButtonsState>(defaultScrollButtonsState);
  const [resetScrollButtons, setResetScrollButtons] = useState<boolean>(false);

  const handleGridRef = useCallback((ref: HTMLDivElement | null) => {
    if (ref) {
      const maxScroll = ref.scrollLeft + ref.offsetWidth;

      const isLeftDisabled = ref.scrollLeft === 0;
      const isRightDisabled =
        ref.scrollLeft > ref.offsetWidth ? maxScroll >= ref.scrollWidth : maxScroll > ref.scrollWidth;

      setScrollButtons({
        left: isLeftDisabled,
        right: isRightDisabled
      });
      setGridRef(ref);
      setResetScrollButtons(isLeftDisabled || isRightDisabled ? true : false);
    }
  }, []);

  const handleScrollChange = (event: any) => {
    handleGridRef(event.target);
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
    <VStack width='100%' spacing={0} align='stretch'>
      {/* Header */}
      <Header
        title={title}
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
        <Button
          color='blue'
          isFullWidth
          onClick={() => history.push(path)}
          variant='text'>{`View all ${title}`}</Button>
      ) : null}
    </VStack>
  );
};

export default HorizontalGrid;
