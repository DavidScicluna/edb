import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, Text } from '@chakra-ui/react';
import queryString from 'query-string';

import { useSelector } from '../../../../../../common/hooks';
import { handleReturnColor } from '../../../../../../common/utils';
import Button from '../../../../../../components/Clickable/Button';
import Link from '../../../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../../../components/Grid/Horizontal';
import HorizontalMovies from '../../../../../Movies/components/HorizontalMovies';
import { MoviesProps } from './types';

const Movies = (props: MoviesProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const { query, results, total_results, isFetching, isLoading, isError, isSuccess, refetch } = props;

  return (
    <HorizontalGrid
      title={
        <Text
          align='left'
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontSize={['xl', 'xl', '2xl', '2xl', '2xl', '2xl']}
          fontWeight='semibold'
          textTransform='capitalize'
        >
          {`Found ${total_results || 0} movie${
            total_results ? (total_results === 0 || total_results > 1 ? 's' : '') : ''
          } with "${query}"`}
        </Text>
      }
      footer={
        (total_results || 0) > 20 ? (
          <Link
            to={{ pathname: '/search', search: queryString.stringify({ query, mediaType: 'movie' }) }}
            isFullWidth
            isDisabled={isFetching || isLoading}
          >
            <Button
              color={handleReturnColor(color)}
              isFullWidth
              isDisabled={isFetching || isLoading}
              onClick={() => refetch()}
              size={isSm ? 'sm' : 'md'}
              variant='text'
            >
              {`View all ${total_results || 0} movie${
                total_results ? (total_results === 0 || total_results > 1 ? 's' : '') : ''
              } with "${query}"`}
            </Button>
          </Link>
        ) : undefined
      }
      isLoading={isFetching || isLoading}
    >
      <HorizontalMovies
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isFetching || isLoading}
        movies={results || []}
      />
    </HorizontalGrid>
  );
};

export default Movies;
