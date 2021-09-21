import { ReactElement } from 'react';

import { VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';

import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import LoadMore from '../../../../components/LoadMore';
import Review from './components/Review';
import { ReviewsTabProps } from './types';

// TODO: Implement Create Review Modal & Button
// TODO: Split reviews in 2 (My Reviews) & (Other Reviews) hide my reviews if user has made no reviews and set Other Reviews to Reviews
// TODO: Implement Edit Review Modal & Button
// TODO: Implement Delete Confirm Modal & Button

const ReviewsTab = (props: ReviewsTabProps): ReactElement => {
  const { reviews, isError = false, isSuccess = false, isLoading = true, hasNextPage = false, onFetchNextPage } = props;

  return (
    <VStack width='100%' spacing={4}>
      {!isLoading && isError ? (
        <Error label='Oh no! Something went wrong' description='Failed to fetch movies list!' variant='transparent' />
      ) : !isLoading && isSuccess && reviews && reviews.results.length === 0 ? (
        <Empty label='Movies list is currently empty!' variant='transparent' />
      ) : !isLoading && isSuccess && reviews && reviews.results.length > 0 ? (
        <>
          {reviews?.results.map((review) => (
            <Review key={review.id} {...review} isLoading={isLoading} />
          ))}
        </>
      ) : (
        <>
          {_.range(0, 5).map((_dummy, index: number) => (
            <Review key={index} isLoading />
          ))}
        </>
      )}

      <ScaleFade in={!isError && hasNextPage} unmountOnExit>
        <LoadMore
          amount={reviews?.results.length || 0}
          total={reviews?.total_results || 0}
          mediaType='reviews'
          isLoading={isLoading}
          isError={isError}
          hasNextPage={hasNextPage}
          onFetch={onFetchNextPage}
        />
      </ScaleFade>
    </VStack>
  );
};

export default ReviewsTab;
