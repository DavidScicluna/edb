import React, { ReactElement } from 'react';

import { useDisclosure, HStack } from '@chakra-ui/react';

import { useSelector } from '../../../../../../common/hooks';
import { handleReturnColor } from '../../../../../../common/utils';
import Button from '../../../../../../components/Clickable/Button';
import Empty from '../../../../../../components/Empty';
import Panel from '../Panel';
import Review from '../Review';
import CreateReview from './components/CreateReview';
import DeleteReview from './components/DeleteReview';
import EditReview from './components/EditReview';
import { UserReviewProps } from './types';

const UserReview = ({ isLoading = true }: UserReviewProps): ReactElement => {
  const { isOpen: isCreateOpen, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();

  const userReviews = useSelector((state) => state.user.data.reviews.user);
  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <>
      <Panel title='My Review' total={0}>
        {userReviews.length > 0 ? (
          <>
            {userReviews.map((review) => (
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
            button={
              <Button color={handleReturnColor(color)} onClick={() => onOpenCreate()} size='sm'>
                Create a new review
              </Button>
            }
            label='You currently have not written any reviews'
            description='Enter a review and leave your taughts about the movie to help others make up their mind.'
            variant='outlined'
            size='lg'
          />
        )}
      </Panel>

      <CreateReview isOpen={isCreateOpen} onClose={onCloseCreate} />
    </>
  );
};

export default UserReview;
