import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, Center, Text, Fade, Collapse } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import utils from '../../../../common/utils/utils';
import Badge from '../../../../components/Badge';
import Button from '../../../../components/Clickable/Button';
import Link from '../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import VerticalMoviePoster from '../../../../components/Movies/Poster/Vertical';
import VerticalShowPoster from '../../../../components/TV/Poster/Vertical';
import { AllProps } from './types';

const All = ({ list, movies = [], tv = [] }: AllProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 480px)');

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
        </Text>
        <Badge label={String(total)} color='gray' size='lg' ml={2} />
      </Center>
    );
  };

  return (
    <Fade in={(movies && movies.length > 0) || (tv && tv.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
      <VStack width='100%' spacing={6}>
        {/* Movies */}
        <Collapse in={(movies && movies.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
          <HorizontalGrid
            title={handleRenderTitle('Movies', movies.length)}
            footer={
              movies.length > 20 ? (
                <Link to={{ pathname: `/lists/${list.id}/movie` }} isFullWidth>
                  <Button color={utils.handleReturnColor(color)} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
                    {`View all ${movies.length || 0} movie${
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
                <Link to={{ pathname: `/lists/${list.id}/tv` }} isFullWidth>
                  <Button color={utils.handleReturnColor(color)} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
                    {`View all ${tv?.length || 0} TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')}`}
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
      </VStack>
    </Fade>
  );
};

export default All;
