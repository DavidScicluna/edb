import { ReactElement } from 'react';

import { useMediaQuery, HStack, Fade } from '@chakra-ui/react';
import _ from 'lodash';
import CountUp from 'react-countup';

import { useSelector } from '../../../../../../../../common/hooks';
import { Review as ReviewType } from '../../../../../../../../common/types';
import { handleReturnDate } from '../../../../../../../../common/utils';
import Badge from '../../../../../../../../components/Badge';
import Button from '../../../../../../../../components/Clickable/Button';
import Empty from '../../../../../../../../components/Empty';
import Panel from '../../../../../../../../components/Panel';
import ThumbButton from '../../../../../../components/Reviews/components/OtherReviews/components/ThumbButton';
import Review from '../../../../../../components/Reviews/components/Review';
import CreateReview from '../../../../../../components/Reviews/components/UserReviews/components/CreateReview';
import DeleteReview from '../../../../../../components/Reviews/components/UserReviews/components/DeleteReview';
import EditReview from '../../../../../../components/Reviews/components/UserReviews/components/EditReview';
import { ReviewsProps } from './types';

const Reviews = ({ show, reviews = [], isLoading = true, onChangeTab }: ReviewsProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const allUserReviews = useSelector((state) => state.user.data.reviews.user);
  const tvShowUserReviews = allUserReviews.filter((review) => review.mediaItem.id === show?.id);

  const color = useSelector((state) => state.user.ui.theme.color);

  const handleSortReview = <R extends ReviewType>(reviews: R[]): R[] => {
    return reviews.sort(
      (a, b) =>
        Number(handleReturnDate(b.updated_at || b.created_at || '', 'year')) -
        Number(handleReturnDate(a.updated_at || a.created_at || '', 'year'))
    );
  };

  const otherReviews = handleSortReview(reviews);
  const userReviews = handleSortReview(tvShowUserReviews);

  return (
    <Panel isFullWidth>
      {{
        header: {
          title: reviews.length > 0 ? 'Latest Review' : tvShowUserReviews.length > 0 ? 'My Latest Review' : 'Reviews',
          actions:
            (reviews?.length || 0) + (tvShowUserReviews.length || 0) > 0 && !isSm ? (
              <Fade in unmountOnExit>
                <Badge size='sm'>
                  <CountUp
                    duration={1}
                    prefix='Total of '
                    end={(reviews?.length || 0) + (tvShowUserReviews.length || 0)}
                    suffix=' reviews'
                  />
                </Badge>
              </Fade>
            ) : undefined
        },
        body:
          !isLoading && !_.isNil(otherReviews[0]) && !_.isEmpty(otherReviews[0]) ? (
            <Review
              renderFooterActions={
                <HStack spacing={0}>
                  <ThumbButton review={otherReviews[0]} state='isLiked' label='Like' isDisabled={isLoading} />
                  <ThumbButton review={otherReviews[0]} state='isDisliked' label='Dislike' isDisabled={isLoading} />
                </HStack>
              }
              review={otherReviews[0]}
              isLoading={false}
            />
          ) : !isLoading && !_.isNil(userReviews[0]) && !_.isEmpty(userReviews[0]) ? (
            <Review
              renderFooterActions={
                <HStack>
                  <EditReview review={userReviews[0]} />
                  <DeleteReview id={userReviews[0].id} />
                </HStack>
              }
              review={userReviews[0]}
              isLoading={false}
            />
          ) : isLoading ? (
            <Review review={{}} isLoading={isLoading} />
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
                  mediaItem={show}
                  mediaType='tv'
                />
              }
              label={
                isSm
                  ? 'Write a review'
                  : `You currently have not written any reviews ${show?.name ? `for "${show.name}"` : ''}`
              }
              description={
                isSm
                  ? 'You currently have not written any reviews!'
                  : `Write a review and leave your taughts about ${
                      show?.name ? `for "${show.name}"` : ''
                    } to help others make up their mind.`
              }
              variant='transparent'
            />
          ),
        footer:
          (!_.isNil(otherReviews[0]) && !_.isEmpty(otherReviews[0])) ||
          (!_.isNil(userReviews[0]) && !_.isEmpty(userReviews[0])) ? (
            <Button
              color={color}
              isFullWidth
              isDisabled={isLoading}
              onClick={() => onChangeTab()}
              size={isSm ? 'sm' : 'md'}
              variant='text'
            >
              {`View all ${show?.name ? `"${show.name}"` : 'TV Show'} reviews`}
            </Button>
          ) : undefined
      }}
    </Panel>
  );
};

export default Reviews;
