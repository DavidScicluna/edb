import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, Center, Text, Collapse } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import utils from '../../../../common/utils/utils';
import Badge from '../../../../components/Badge';
import Button from '../../../../components/Clickable/Button';
import Link from '../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import VerticalMoviePoster from '../../../../components/Movies/Poster/Vertical';
import VerticalPersonPoster from '../../../../components/People/Poster/Vertical';
import VerticalShowPoster from '../../../../components/TV/Poster/Vertical';
import { AllProps } from './types';

const All = ({ movies = [], tv = [], people = [] }: AllProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const handleRenderTitle = (title: string, total: number): ReactElement => {
    return (
      <Center>
        <Text
          align='left'
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontSize={['xl', 'xl', '2xl', '2xl', '2xl', '2xl']}
          fontWeight='semibold'
          textTransform='capitalize'>
          {title}
          <Badge label={String(total)} color='gray' size='lg' ml={2} />
        </Text>
      </Center>
    );
  };

  return (
    <VStack width='100%' spacing={6}>
      {/* Movies */}
      <Collapse in={(movies && movies.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
        <HorizontalGrid
          title={handleRenderTitle('Movies', movies.length)}
          footer={
            movies.length > 20 ? (
              <Link to={{ pathname: '/liked/movie' }} isFullWidth>
                <Button color={utils.handleReturnColor(color)} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
                  {`View all ${movies.length || 0} liked movie${
                    movies && (movies.length === 0 || movies.length > 1 ? 's' : '')
                  }`}
                </Button>
              </Link>
            ) : undefined
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
          title={handleRenderTitle('TV shows', tv.length)}
          footer={
            tv.length > 20 ? (
              <Link to={{ pathname: '/liked/tv' }} isFullWidth>
                <Button color={utils.handleReturnColor(color)} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
                  {`View all ${tv?.length || 0} liked TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')}`}
                </Button>
              </Link>
            ) : undefined
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
          title={handleRenderTitle('People', people.length)}
          footer={
            people.length > 20 ? (
              <Link to={{ pathname: '/liked/person' }} isFullWidth>
                <Button color={utils.handleReturnColor(color)} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
                  {`View all ${people.length || 0} liked ${
                    (people && people.length === 0) || people.length > 1 ? 'people' : 'person'
                  }`}
                </Button>
              </Link>
            ) : undefined
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
  );
};

export default All;
