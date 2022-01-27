import { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';
import qs from 'query-string';

import { useSelector } from '../../../../../../../common/hooks';
import { PartialMovie } from '../../../../../../../common/types/movie';
import Button from '../../../../../../../components/Clickable/Button';
import Link from '../../../../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../../../../components/Grid/Horizontal/Default';
import VerticalMoviePoster from '../../../../../../Movies/components/Poster/Vertical';
import { HorizontalSearchMoviesProps } from './types';

const HorizontalSearchMovies = ({ query, movies = [], total = 0 }: HorizontalSearchMoviesProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <HorizontalGrid
      title={`Found ${total} movie${total === 0 || total > 1 ? 's' : ''} with "${query}"`}
      footer={
        total > 20 ? (
          <Link to={{ pathname: '/search', search: qs.stringify({ query }), hash: 'movie' }} isFullWidth>
            <Button color={color} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
              {`View all ${total} movie${total === 0 || total > 1 ? 's' : ''} with "${query}"`}
            </Button>
          </Link>
        ) : undefined
      }
    >
      {movies.map((movie: PartialMovie) => (
        <VerticalMoviePoster key={movie.id} width={['185px', '205px', '230px']} movie={movie} isLoading={false} />
      ))}
    </HorizontalGrid>
  );
};

export default HorizontalSearchMovies;
