import { ReactElement, useState } from 'react';

import { useMediaQuery, HStack, VStack, ScaleFade } from '@chakra-ui/react';
import CountUp from 'react-countup';

import { useSelector } from '../../../../../../common/hooks';
import Badge from '../../../../../../components/Badge';
import Button from '../../../../../../components/Clickable/Button';
import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Panel from '../../../../../../components/Panel';
import { UserReview as UserReviewType } from '../../../../../../store/slices/User/types';
import Review from '../Review';
import CreateReview from './components/CreateReview';
import DeleteReview from './components/DeleteReview';
import EditReview from './components/EditReview';
import { UserReviewsProps } from './types';

const incrementBy = 5;

const UserReviews = ({ alt, mediaItem, mediaType, isLoading = true }: UserReviewsProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const userReviews: UserReviewType[] = useSelector((state) => state.user.data.reviews.user);
  const mediaItemUserReviews: UserReviewType[] = userReviews.filter((review) => review.mediaItem.id === mediaItem?.id);

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  return (
    <Panel isFullWidth>
      {{
        header: {
          title: `My Review${mediaItemUserReviews.length === 0 || mediaItemUserReviews.length > 1 ? 's' : ''}`,
          actions:
            (mediaItemUserReviews.length || 0) > 0 ? (
              <Badge size='lg'>
                <CountUp duration={1} end={mediaItemUserReviews.length || 0} />
              </Badge>
            ) : undefined
        },
        body:
          mediaItemUserReviews.length > 0 ? (
            <VStack width='100%' spacing={4}>
              <VStack width='100%' spacing={2}>
                {mediaItemUserReviews
                  .filter((_review, index) => index < totalVisible)
                  .map((review) => (
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
              </VStack>

              <ScaleFade
                in={mediaItemUserReviews.length > 0 && mediaItemUserReviews.length > incrementBy}
                unmountOnExit
                style={{ width: isSm ? '100%' : 'auto' }}
              >
                <LoadMore
                  amount={totalVisible}
                  total={mediaItemUserReviews.length}
                  label={alt ? `"${alt}" reviews` : 'Reviews'}
                  onClick={() => setTotalVisible(totalVisible + incrementBy)}
                />
              </ScaleFade>
            </VStack>
          ) : (
            <Empty
              hasIllustration={false}
              button={
                <CreateReview
                  renderAction={({ color, label, onClick }) => (
                    <Button color={color} onClick={() => onClick()}>
                      {label}
                    </Button>
                  )}
                  mediaItem={mediaItem}
                  mediaType={mediaType}
                />
              }
              label={
                isSm ? 'Write a review' : `You currently have not written any reviews ${alt ? `for "${alt}"` : ''}`
              }
              description={
                isSm
                  ? 'You currently have not written any reviews!'
                  : `Write a review and leave your taughts about ${
                      alt ? `"${alt}"` : ''
                    } to help others make up their mind.`
              }
              variant='outlined'
              size='lg'
            />
          ),
        footer:
          mediaItemUserReviews.length > 0 ? (
            <CreateReview
              renderAction={({ color, label, onClick }) => (
                <Button color={color} isFullWidth onClick={() => onClick()} variant='text'>
                  {label}
                </Button>
              )}
              mediaItem={mediaItem}
              mediaType={mediaType}
            />
          ) : undefined
      }}
    </Panel>
  );
};

export default UserReviews;
