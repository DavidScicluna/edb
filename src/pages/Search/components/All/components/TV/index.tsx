import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, Text } from '@chakra-ui/react';
import queryString from 'query-string';

import { useSelector } from '../../../../../../common/hooks';
import utils from '../../../../../../common/utils/utils';
import Button from '../../../../../../components/Clickable/Button';
import Link from '../../../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../../../components/Grid/Horizontal';
import HorizontalTV from '../../../../../../components/TV/Grid/Horizontal';
import { TVProps } from './types';

const TV = (props: TVProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 480px)');

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
          textTransform='capitalize'>
          {`Found ${total_results || 0} TV show${
            total_results ? (total_results === 0 || total_results > 1 ? 's' : '') : ''
          } with "${query}"`}
        </Text>
      }
      footer={
        (total_results || 0) > 20 ? (
          <Link
            to={{ pathname: '/search', search: queryString.stringify({ query, page: 1, mediaType: 'tv' }) }}
            isFullWidth
            isDisabled={isFetching || isLoading}>
            <Button
              color={utils.handleReturnColor(color)}
              isFullWidth
              isDisabled={isFetching || isLoading}
              onClick={() => refetch()}
              size={isSm ? 'sm' : 'md'}
              variant='text'>
              {`View all ${total_results || 0} TV show${
                total_results ? (total_results === 0 || total_results > 1 ? 's' : '') : ''
              } with "${query}"`}
            </Button>
          </Link>
        ) : undefined
      }
      isLoading={isFetching || isLoading}>
      <HorizontalTV isError={isError} isSuccess={isSuccess} tv={results || []} />
    </HorizontalGrid>
  );
};

export default TV;
