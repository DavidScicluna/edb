import { ReactElement } from 'react';

import moment from 'moment';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../common/hooks';
import { setLiked } from '../../store/slices/User';
import { LikeProps } from './types';

const Like = (props: LikeProps): ReactElement => {
  const dispatch = useDispatch();
  const liked = useSelector((state) => state.user.data.liked);

  const { renderButton, mediaType, mediaItem } = props;

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

  return renderButton({
    isLiked,
    onClick: isLiked ? () => handleRemoveLike() : () => handleLike()
  });
};

export default Like;
