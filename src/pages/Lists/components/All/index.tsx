import React, { ReactElement, useEffect } from 'react';

import { VStack, Fade, Collapse } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import utils from '../../../../common/utils/utils';
import Button from '../../../../components/Clickable/Button';
import Link from '../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import VerticalMoviePoster from '../../../../components/Movies/Poster/Vertical';
import VerticalShowPoster from '../../../../components/TV/Poster/Vertical';
import { toggleDisplayMode } from '../../../../store/slices/App';
import { AllProps } from './types';

const All = ({ list, movies = [], tv = [] }: AllProps): ReactElement => {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.user.ui.theme.color);

  useEffect(() => {
    dispatch(toggleDisplayMode('grid'));
  }, []);

  return (
    <Fade in={(movies && movies.length > 0) || (tv && tv.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
      <VStack width='100%' spacing={6}>
        {/* Movies */}
        <Collapse in={(movies && movies.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
          <HorizontalGrid
            title={`${movies.length || 0} movie${movies && (movies.length === 0 || movies.length > 1) ? 's' : ''}`}
            footer={
              <Link to={{ pathname: `/lists/${list.id}/movie` }}>
                <Button color={utils.handleReturnColor(color)} isFullWidth variant='text'>
                  {`View all ${movies.length || 0} movie${
                    movies && (movies.length === 0 || movies.length > 1 ? 's' : '')
                  }`}
                </Button>
              </Link>
            }
            isLoading={false}>
            <>
              {movies.map((movie) => (
                <VerticalMoviePoster key={movie.id} isLoading={false} movie={movie} />
              ))}
            </>
          </HorizontalGrid>
        </Collapse>

        {/* TV */}
        <Collapse in={(tv && tv.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
          <HorizontalGrid
            title={`${tv.length || 0} TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')}`}
            footer={
              <Link to={{ pathname: `/lists/${list.id}/tv` }}>
                <Button color={utils.handleReturnColor(color)} isFullWidth variant='text'>
                  {`View all ${tv?.length || 0} TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')}`}
                </Button>
              </Link>
            }
            isLoading={false}>
            <>
              {tv.map((show) => (
                <VerticalShowPoster key={show.id} isLoading={false} show={show} />
              ))}
            </>
          </HorizontalGrid>
        </Collapse>
      </VStack>
    </Fade>
  );
};

export default All;
