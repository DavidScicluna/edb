import { ReactElement } from 'react';

import { useMediaQuery, VStack, HStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';

import Badge from '../../../../../../components/Badge';
import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import Panel from '../../../../../../components/Panel';
import { ReviewsTabProps as OtherReviewsProps } from '../../types';
import Review from '../Review';
import ThumbButton from './components/ThumbButton';

const OtherReviews = (props: OtherReviewsProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const {
    mediaItem,
    mediaType,
    reviews,
    isError = false,
    isSuccess = false,
    isLoading = true,
    hasNextPage = false,
    onFetchNextPage
  } = props;

  return (
    <Panel>
      {{
        header: {
          title: 'Reviews',
          actions:
            (reviews?.results.length || 0) > 0 ? (
              <Badge size={isSm ? 'sm' : 'md'}>{String(reviews?.results.length)}</Badge>
            ) : undefined
        },
        body:
          !isLoading && isError ? (
            <Error
              label='Oh no! Something went wrong'
              description={`Failed to fetch ${
                mediaItem && (mediaItem.title || mediaItem.name) ? `"${mediaItem.title || mediaItem.name}"` : ''
              } ${mediaType === 'tv' ? 'tv show' : 'movie'} reviews!`}
              variant='outlined'
              size='sm'
            />
          ) : !isLoading && isSuccess && reviews && reviews.results.length === 0 ? (
            <Empty
              label={`${
                mediaItem && (mediaItem.title || mediaItem.name) ? `"${mediaItem.title || mediaItem.name}"` : ''
              } ${mediaType === 'tv' ? 'tv show' : 'movie'} has no reviews!`}
              variant='outlined'
              size='sm'
            />
          ) : !isLoading && isSuccess && reviews && reviews.results.length > 0 ? (
            <>
              {reviews?.results.map((review) => (
                <Review
                  key={review.id}
                  renderFooterActions={
                    <HStack spacing={0}>
                      <ThumbButton review={review} state='isLiked' label='Like' isDisabled={isLoading} />
                      <ThumbButton review={review} state='isDisliked' label='Dislike' isDisabled={isLoading} />
                    </HStack>
                  }
                  review={review}
                  isLoading={isLoading}
                />
              ))}

              <ScaleFade in={!isError && hasNextPage} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
                <LoadMore
                  amount={reviews?.results.length || 0}
                  total={reviews?.total_results || 0}
                  label='Reviews'
                  isLoading={isLoading}
                  isButtonVisible={hasNextPage && !isError}
                  onClick={onFetchNextPage}
                />
              </ScaleFade>
            </>
          ) : (
            <VStack width='100%' spacing={4}>
              {_.range(0, 5).map((_dummy, index: number) => (
                <Review
                  key={index}
                  renderFooterActions={
                    <HStack spacing={0}>
                      <ThumbButton state='isLiked' label='Like' isDisabled={isLoading} />
                      <ThumbButton state='isDisliked' label='Dislike' isDisabled={isLoading} />
                    </HStack>
                  }
                  isLoading
                />
              ))}
            </VStack>
          )
      }}
    </Panel>
  );
};

export default OtherReviews;
