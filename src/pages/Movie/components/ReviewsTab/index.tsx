import { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import OtherReviews from './components/OtherReviews';
import UserReview from './components/UserReview';
import { ReviewsTabProps } from './types';

// TODO: Implement Create Review Modal & Button
// TODO: Split reviews in 2 (My Reviews) & (Other Reviews) hide my reviews if user has made no reviews and set Other Reviews to Reviews
// TODO: Implement Edit Review Modal & Button
// TODO: Implement Delete Confirm Modal & Button

const ReviewsTab = ({ isLoading = true, ...rest }: ReviewsTabProps): ReactElement => {
  return (
    <VStack width='100%' spacing={6}>
      <UserReview isLoading={isLoading} />

      <OtherReviews {...rest} isLoading={isLoading} />
    </VStack>
  );
};

export default ReviewsTab;
