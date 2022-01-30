import { ReactElement } from 'react';

import {
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  FavoriteOutlined as FavoriteOutlinedIcon
} from '@material-ui/icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../common/hooks';
import { Icon } from '../../../common/types';
import { setLiked } from '../../../store/slices/User';
import { LikeProps } from './types';

export const handleReturnIcon = (isLiked: boolean, fontSize?: string): Icon => {
  return isLiked ? <FavoriteOutlinedIcon style={{ fontSize }} /> : <FavoriteBorderOutlinedIcon style={{ fontSize }} />;
};

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
        : mediaType === 'person'
        ? liked.people.some((person) => person.id === mediaItem.id)
        : mediaType === 'company'
        ? liked.companies.some((company) => company.id === mediaItem.id)
        : liked.collections.some((collection) => collection.id === mediaItem.id)
      : false;

  /**
   * This method will remove the media-item from its respective media type array
   * Meaning the user has un-liked the media-item
   */
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
      case 'company':
        updatedLiked.companies = updatedLiked.companies.filter((company) => company.id !== mediaItem?.id);
        break;
      case 'collection':
        updatedLiked.collections = updatedLiked.collections.filter((collection) => collection.id !== mediaItem?.id);
        break;
      default:
        break;
    }

    dispatch(setLiked({ ...updatedLiked }));
  };

  /**
   * This method will save the media-item into its respective media type array
   * Meaning the user has liked the media-item
   */
  const handleLike = (): void => {
    const updatedLiked = { ...liked };

    switch (mediaType) {
      case 'movie': {
        const movieMediaItem = { ...mediaItem, dateAdded: moment(new Date()).toISOString() };

        updatedLiked.movies = [...updatedLiked.movies, movieMediaItem];
        break;
      }
      case 'tv': {
        const showMediaItem = { ...mediaItem, dateAdded: moment(new Date()).toISOString() };

        updatedLiked.tv = [...updatedLiked.tv, showMediaItem];
        break;
      }
      case 'person': {
        const personMediaItem = { ...mediaItem, dateAdded: moment(new Date()).toISOString() };

        updatedLiked.people = [...updatedLiked.people, personMediaItem];
        break;
      }
      case 'company': {
        const companyMediaItem = { ...mediaItem, dateAdded: moment(new Date()).toISOString() };

        updatedLiked.companies = [...updatedLiked.companies, companyMediaItem];
        break;
      }
      case 'collection': {
        const collectionMediaItem = { ...mediaItem, dateAdded: moment(new Date()).toISOString() };

        updatedLiked.collections = [...updatedLiked.collections, collectionMediaItem];
        break;
      }
      default:
        break;
    }

    dispatch(setLiked({ ...updatedLiked }));
  };

  return renderButton({ isLiked, onClick: isLiked ? () => handleRemoveLike() : () => handleLike() });
};

export default Like;
