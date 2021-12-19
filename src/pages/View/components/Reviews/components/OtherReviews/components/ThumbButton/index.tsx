import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';
import { ThumbsUp as ThumbsUpIcon, ThumbsDown as ThumbsDown } from 'react-feather';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../../../../common/hooks';
import { handleReturnColor } from '../../../../../../../../common/utils';
import IconButton from '../../../../../../../../components/Clickable/IconButton';
import Tooltip from '../../../../../../../../components/Tooltip';
import { setOtherReviews } from '../../../../../../../../store/slices/User';
import { ThumbButtonProps } from './types';

const ThumbButton = (props: ThumbButtonProps): ReactElement => {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.user.ui.theme.color);
  const otherReviews = useSelector((state) => state.user.data.reviews.other);

  const { review, state, label, isDisabled = false } = props;
  const { id } = review || {};

  const [isHovering, setIsHovering] = useBoolean();

  const isActive = otherReviews.some((review) => review.id === id && review?.state === state) || false;

  const handleReview = (): void => {
    if (review) {
      if (otherReviews.some((review) => review.id === id)) {
        dispatch(
          setOtherReviews(
            otherReviews.map((review) =>
              review.id === id ? { ...review, state: !isActive ? state : undefined } : review
            )
          )
        );
      } else {
        dispatch(setOtherReviews([...otherReviews, { ...review, state }]));
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
        // icon={
        //   state === 'isLiked'
        //     ? isActive
        //       ? ThumbUpIcon
        //       : ThumbUpOutlinedIcon
        //     : isActive
        //     ? ThumbDownIcon
        //     : ThumbDownOutlinedIcon
        // }
        icon={state === 'isLiked' ? ThumbsUpIcon : ThumbsDown}
        isDisabled={isDisabled}
        onClick={() => handleReview()}
        onMouseEnter={() => setIsHovering.on()}
        onMouseLeave={() => setIsHovering.off()}
        variant='icon'
      />
    </Tooltip>
  );
};

export default ThumbButton;
