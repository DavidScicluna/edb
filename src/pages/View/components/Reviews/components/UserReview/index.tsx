import React, { ReactElement } from 'react';

import { useMediaQuery, HStack } from '@chakra-ui/react';

import { useSelector } from '../../../../../../common/hooks';
import Empty from '../../../../../../components/Empty';
import Panel from '../Panel';
import Review from '../Review';
import CreateReview from './components/CreateReview';
import DeleteReview from './components/DeleteReview';
import EditReview from './components/EditReview';
import { UserReviewProps } from './types';

const UserReview = ({ mediaItem, mediaType, isLoading = true }: UserReviewProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const userReviews = useSelector((state) => state.user.data.reviews.user);
  const mediaItemUserReviews = userReviews.filter((review) => review.mediaItem.id === mediaItem?.id);

  return (
    <>
      <Panel
        title='My Review'
        actions={
          mediaItemUserReviews.length > 0 ? <CreateReview mediaItem={mediaItem} mediaType={mediaType} /> : undefined
        }
      >
        {mediaItemUserReviews.length > 0 ? (
          <>
            {mediaItemUserReviews.map((review) => (
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
            button={<CreateReview mediaItem={mediaItem} mediaType={mediaType} />}
            label={
              isSm
                ? 'Write a review'
                : `You currently have not written any reviews ${
                    mediaItem && (mediaItem.title || mediaItem.name)
                      ? `for "${mediaItem.title || mediaItem.name}" ${mediaType === 'tv' ? 'tv show' : 'movie'}`
                      : ''
                  }`
            }
            description={
              isSm
                ? 'You currently have not written any reviews!'
                : `Write a review and leave your taughts about ${
                    mediaItem && (mediaItem.title || mediaItem.name)
                      ? `"${mediaItem.title || mediaItem.name}" ${mediaType === 'tv' ? 'tv show' : 'movie'}`
                      : ''
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
