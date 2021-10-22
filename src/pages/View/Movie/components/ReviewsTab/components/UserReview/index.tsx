import React, { ReactElement } from 'react';

import { useMediaQuery, HStack } from '@chakra-ui/react';

import { useSelector } from '../../../../../../../common/hooks';
import Empty from '../../../../../../../components/Empty';
import Panel from '../Panel';
import Review from '../Review';
import CreateReview from './components/CreateReview';
import DeleteReview from './components/DeleteReview';
import EditReview from './components/EditReview';
import { UserReviewProps } from './types';

const UserReview = ({ movie, isLoading = true }: UserReviewProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const userReviews = useSelector((state) => state.user.data.reviews.user);
  const movieUserReviews = userReviews.filter((review) => review.mediaItem.id === movie?.id);

  return (
    <>
      <Panel title='My Review' actions={movieUserReviews.length > 0 ? <CreateReview movie={movie} /> : undefined}>
        {movieUserReviews.length > 0 ? (
          <>
            {movieUserReviews.map((review) => (
              <Review
                key={review.id}
                renderFooterActions={
                  <HStack>
                    <EditReview review={review} />
                    <DeleteReview id={review.id} />
                  </HStack>
                }
                review={review}
                isLoading={isLoading}
              />
            ))}
          </>
        ) : (
          <Empty
            hasIllustration={false}
            button={<CreateReview movie={movie} />}
            label={
              isSm
                ? 'Write a review'
                : `You currently have not written any reviews ${
                    movie && movie.title ? `for "${movie.title}" movie` : ''
                  }`
            }
            description={
              isSm
                ? 'You currently have not written any reviews!'
                : `Write a review and leave your taughts about ${
                    movie && movie.title ? `"${movie.title}" movie` : ''
                  } to help others make up their mind.`
            }
            variant='outlined'
            size='lg'
          />
        )}
      </Panel>
    </>
  );
};

export default UserReview;
