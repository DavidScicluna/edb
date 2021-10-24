import { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import OtherReviews from './components/OtherReviews';
import UserReview from './components/UserReview';
import { ReviewsTabProps } from './types';

const Reviews = ({ mediaItem, mediaType, isLoading = true, ...rest }: ReviewsTabProps): ReactElement => {
  return (
    <VStack width='100%' spacing={6}>
      <UserReview mediaItem={mediaItem} mediaType={mediaType} isLoading={isLoading} />

      <OtherReviews {...rest} mediaItem={mediaItem} mediaType={mediaType} isLoading={isLoading} />
    </VStack>
  );
};

export default Reviews;
