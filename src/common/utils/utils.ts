import store from '../../store';
import { Genre } from '../types/types';

export default {
  /**
   * This method will return the genres names from the genre ids
   *
   * @param genres - Genres ids
   * @returns - string of genres seperated by a ","
   */
  handleReturnGenresByID: (genres: number[], type: 'movie' | 'tv'): string => {
    const getGenres: Genre[] = store
      .getState()
      .options.data.data.genres[type].filter((genre: Genre) => genres.includes(genre.id));
    return getGenres.map((genre) => genre.name).join(', ');
  },
  /**
   * This method will return the section of the date depending on the "type"
   *
   * @param date - Full Date
   * @param type - Which section of date to return
   * @returns - The section of the dat
   */
  handleReturnDate: (date: string, type: 'year' | 'month' | 'day'): string => {
    return date.split('-')[type === 'year' ? 0 : type === 'month' ? 1 : 2];
  },
  /**
   *
   * @param type - Type of image
   * @param breakpoint - Size of user's device
   * @returns - The appropriate size for image poster
   */
  // Set type of breakpoint from theme
  handleReturnImageSize: (type: 'poster' | 'backdrop', breakpoint: 'xs' | 'sm'): string => {
    switch (type) {
      case 'poster': {
        switch (breakpoint) {
          default:
            return '185';
        }
      }
      default:
        return '';
    }
  }
};
