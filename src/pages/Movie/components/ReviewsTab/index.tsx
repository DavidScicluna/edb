import { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import OtherReviews from './components/OtherReviews';
import UserReview from './components/UserReview';
import { ReviewsTabProps } from './types';

const ReviewsTab = ({ isLoading = true, ...rest }: ReviewsTabProps): ReactElement => {
  return (
    <VStack width='100%' spacing={6}>
      <UserReview isLoading={isLoading} />

      <OtherReviews {...rest} isLoading={isLoading} />
    </VStack>
  );
};

export default ReviewsTab;
