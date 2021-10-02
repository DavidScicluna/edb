import React, { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';
import {
  ThumbDownOutlined as ThumbDownOutlinedIcon,
  ThumbUpOutlined as ThumbUpOutlinedIcon,
  ThumbDown as ThumbDownIcon,
  ThumbUp as ThumbUpIcon
} from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../../../../../../common/hooks';
import { handleReturnColor } from '../../../../../../../../../../common/utils';
import IconButton from '../../../../../../../../../../components/Clickable/IconButton';
import Tooltip from '../../../../../../../../../../components/Tooltip';
import { setReviews } from '../../../../../../../../../../store/slices/User';
import { ReviewButtonProps } from './types';

const ReviewButton = (props: ReviewButtonProps): ReactElement => {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.user.ui.theme.color);
  const userReviews = useSelector((state) => state.user.data.reviews);

  const { review, state, label } = props;
  const { id } = review || {};

  const [isHovering, setIsHovering] = useBoolean();

  const isActive = review?.state === state || false;

  const handleReview = (): void => {
    if (review) {
      if (userReviews.some((review) => review.id === id)) {
        dispatch(
          setReviews(
            userReviews.map((review) =>
              review.id === id ? { ...review, state: !isActive ? state : undefined } : review
            )
          )
        );
      } else {
        dispatch(setReviews([...userReviews, { ...review, state }]));
      }
    }
  };

  return (
    <Tooltip
      aria-label={isActive ? `Un-${label} review` : `${label} review`}
      label={isActive ? `Un-${label} review` : `${label} review`}
      isOpen={isHovering}
      placement='top'
      gutter={4}>
      <IconButton
        aria-label={isActive ? `Un-${label} review` : `${label} review`}
        color={isActive ? handleReturnColor(color) : 'gray'}
        icon={
          state === 'isLiked'
            ? isActive
              ? ThumbUpIcon
              : ThumbUpOutlinedIcon
            : isActive
            ? ThumbDownIcon
            : ThumbDownOutlinedIcon
        }
        onClick={() => handleReview()}
        onMouseEnter={() => setIsHovering.on()}
        onMouseLeave={() => setIsHovering.off()}
        variant='icon'
      />
    </Tooltip>
  );
};

export default ReviewButton;
