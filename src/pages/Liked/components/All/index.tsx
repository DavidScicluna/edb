import React, { ReactElement } from 'react';

import { VStack, Fade, Collapse } from '@chakra-ui/react';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import utils from '../../../../common/utils/utils';
import Button from '../../../../components/Clickable/Button';
import Link from '../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import VerticalMoviePoster from '../../../../components/Movies/Poster/Vertical';
import VerticalPersonPoster from '../../../../components/People/Poster/Vertical';
import VerticalShowPoster from '../../../../components/TV/Poster/Vertical';
import { AllProps } from './types';

const All = ({ movies = [], tv = [], people = [] }: AllProps): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <Fade
      in={(movies && movies.length > 0) || (tv && tv.length > 0) || (people && people.length > 0) || false}
      unmountOnExit
      style={{ width: '100%' }}>
      <VStack width='100%' spacing={6}>
        {/* Movies */}
        <Collapse in={(movies && movies.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
          <HorizontalGrid
            title={`${movies.length || 0} liked movie${
              movies && (movies.length === 0 || movies.length > 1) ? 's' : ''
            }`}
            footer={
              <Link to={{ pathname: '/liked/movie' }}>
                <Button color={utils.handleReturnColor(color)} isFullWidth variant='text'>
                  {`View all ${movies.length || 0} liked movie${
                    movies && (movies.length === 0 || movies.length > 1 ? 's' : '')
                  }`}
                </Button>
              </Link>
            }
            isLoading={false}>
            <>
              {movies.map((movie, index) =>
                index < 20 ? <VerticalMoviePoster key={movie.id} isLoading={false} movie={movie} /> : null
              )}
            </>
          </HorizontalGrid>
        </Collapse>

        {/* TV */}
        <Collapse in={(tv && tv.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
          <HorizontalGrid
            title={`${tv.length || 0} liked TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')}`}
            footer={
              <Link to={{ pathname: '/liked/tv' }}>
                <Button color={utils.handleReturnColor(color)} isFullWidth variant='text'>
                  {`View all ${tv?.length || 0} liked TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')}`}
                </Button>
              </Link>
            }
            isLoading={false}>
            <>
              {tv.map((show, index) =>
                index < 20 ? <VerticalShowPoster key={show.id} isLoading={false} show={show} /> : null
              )}
            </>
          </HorizontalGrid>
        </Collapse>

        {/* People */}
        <Collapse in={(people && people.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
          <HorizontalGrid
            title={`${people.length || 0} liked ${
              (people && people.length === 0) || people.length > 1 ? 'people' : 'person'
            }`}
            footer={
              <Link to={{ pathname: '/liked/person' }}>
                <Button color={utils.handleReturnColor(color)} isFullWidth variant='text'>
                  {`View all ${people.length || 0} liked ${
                    (people && people.length === 0) || people.length > 1 ? 'people' : 'person'
                  }`}
                </Button>
              </Link>
            }
            isLoading={false}>
            <>
              {people.map((person, index) =>
                index < 20 ? <VerticalPersonPoster key={person.id} isLoading={false} person={person} /> : null
              )}
            </>
          </HorizontalGrid>
        </Collapse>
      </VStack>
    </Fade>
  );
};

export default All;
