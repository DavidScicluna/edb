import React, { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';
import {
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  FavoriteOutlined as FavoriteOutlinedIcon
} from '@material-ui/icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useSelector from '../../common/hooks/useSelectorTyped';
import { setLiked } from '../../store/slices/User';
import Button from '../Clickable/Button';
import IconButton from '../Clickable/IconButton';
import Tooltip from '../Tooltip';
import { LikeProps } from './types';

const Like = (props: LikeProps): ReactElement => {
  const dispatch = useDispatch();
  const liked = useSelector((state) => state.user.data.liked);

  const { buttonType = 'iconButton', isDisabled = false, title, mediaType, mediaItem, size = 'sm' } = props;

  const [isHoveringIconButton, setIsHoveringIconButton] = useBoolean();

  const isLiked: boolean =
    liked && mediaItem
      ? mediaType === 'movie'
        ? liked.movies.some((movie) => movie.id === mediaItem.id)
        : mediaType === 'tv'
        ? liked.tv.some((show) => show.id === mediaItem.id)
        : liked.people.some((person) => person.id === mediaItem.id)
      : false;

  const handleRemoveLike = (): void => {
    const updatedLiked = { ...liked };

    switch (mediaType) {
      case 'movie':
        updatedLiked.movies = updatedLiked.movies.filter((movie) => movie.id !== mediaItem?.id);
        break;
      case 'tv':
        updatedLiked.tv = updatedLiked.tv.filter((show) => show.id !== mediaItem?.id);
        break;
      case 'person':
        updatedLiked.people = updatedLiked.people.filter((person) => person.id !== mediaItem?.id);
        break;
      default:
        break;
    }

    dispatch(setLiked({ ...updatedLiked }));
  };

  const handleLike = (): void => {
    const updatedLiked = { ...liked };

    switch (mediaType) {
      case 'movie': {
        const movieMediaItem: any = { ...mediaItem, dateAdded: moment(new Date()).toISOString() };

        updatedLiked.movies = [...updatedLiked.movies, movieMediaItem];
        break;
      }
      case 'tv': {
        const showMediaItem: any = { ...mediaItem, dateAdded: moment(new Date()).toISOString() };

        updatedLiked.tv = [...updatedLiked.tv, showMediaItem];
        break;
      }
      case 'person': {
        const personMediaItem: any = { ...mediaItem, dateAdded: moment(new Date()).toISOString() };

        updatedLiked.people = [...updatedLiked.people, personMediaItem];
        break;
      }
      default:
        break;
    }

    dispatch(setLiked({ ...updatedLiked }));
  };

  return buttonType === 'iconButton' ? (
    <Tooltip
      aria-label={isLiked ? `Dislike "${title}" ${mediaType} (tooltip)` : `Like "${title}" ${mediaType} (tooltip)`}
      label={isLiked ? `Dislike "${title}"` : `Like "${title}"`}
      placement='top'
      isOpen={isHoveringIconButton}
      isDisabled={isDisabled || !mediaItem}
      gutter={8}>
      <IconButton
        aria-label={isLiked ? `Dislike "${title}" ${mediaType}` : `Like "${title}" ${mediaType}`}
        color={isLiked ? 'red' : 'gray'}
        isDisabled={isDisabled || !mediaItem}
        icon={isLiked ? FavoriteOutlinedIcon : FavoriteBorderOutlinedIcon}
        onClick={isLiked ? () => handleRemoveLike() : () => handleLike()}
        onMouseEnter={() => setIsHoveringIconButton.on()}
        onMouseLeave={() => setIsHoveringIconButton.off()}
        size={size}
        variant='icon'
      />
    </Tooltip>
  ) : (
    <Button
      color={isLiked ? 'red' : 'gray'}
      isDisabled={isDisabled || !mediaItem}
      leftIcon={isLiked ? FavoriteOutlinedIcon : FavoriteBorderOutlinedIcon}
      onClick={isLiked ? () => handleRemoveLike() : () => handleLike()}
      size={size}
      variant='outlined'>
      Like
    </Button>
  );
};

export default Like;
