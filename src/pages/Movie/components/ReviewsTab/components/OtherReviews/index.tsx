import React, { ReactElement } from 'react';

import { VStack, ScaleFade, HStack } from '@chakra-ui/react';
import _ from 'lodash';

import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import Panel from '../Panel';
import Review from '../Review';
import ThumbButton from './components/ThumbButton';
import { OtherReviewsProps } from './types';

const OtherReviews = (props: OtherReviewsProps): ReactElement => {
  const { reviews, isError = false, isSuccess = false, isLoading = true, hasNextPage = false, onFetchNextPage } = props;

  return (
    <Panel title='Reviews' total={reviews?.results.length || 0}>
      {!isLoading && isError ? (
        <Error label='Oh no! Something went wrong' description='Failed to fetch movies list!' variant='outlined' />
      ) : !isLoading && isSuccess && reviews && reviews.results.length === 0 ? (
        <Empty label='Movies list is currently empty!' variant='outlined' />
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
      )}
    </Panel>
  );
};

export default OtherReviews;
