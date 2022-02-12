import { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import OtherReviews from './components/OtherReviews';
import UserReview from './components/UserReviews';
import { ReviewsTabProps } from './types';

const Reviews = ({ alt, mediaItem, mediaType, isLoading = true, ...rest }: ReviewsTabProps): ReactElement => {
  return (
    <VStack width='100%' spacing={4}>
      <UserReview alt={alt} mediaItem={mediaItem} mediaType={mediaType} isLoading={isLoading} />

      <OtherReviews {...rest} alt={alt} isLoading={isLoading} />
    </VStack>
  );
};

export default Reviews;
