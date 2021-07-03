import _ from 'lodash';
import queryString from 'query-string';

import { ButtonProps } from '../../components/Inputs/Button/types';
import store from '../../store';
import theme from '../../theme';
import { months } from '../data/date';
import { Genre, MediaType } from '../types/types';

export default {
  handleReturnNumberFromString: (number: string, string: string): number => {
    return parseInt(_.replace(number, string));
  },

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
  handleReturnDate: (date: string, type: 'year' | 'month' | 'day' | 'full'): string => {
    if (type === 'full') {
      const split = date.split('-');
      const month = months.find((month) => month.value === split[1]);

      return `${split[2]} ${month?.label} ${split[0]}`;
    } else {
      return date.split('-')[type === 'year' ? 0 : type === 'month' ? 1 : 2];
    }
  },

  handleReturnDOB: (date: string): string => {
    console.log(date);

    return 'abc';
  },

  handleReturnColor: (color: unknown): ButtonProps['color'] => {
    switch (color) {
      case 'orange':
        return 'orange';
      case 'yellow':
        return 'yellow';
      case 'green':
        return 'green';
      case 'teal':
        return 'teal';
      case 'cyan':
        return 'cyan';
      case 'purple':
        return 'purple';
      case 'pink':
        return 'pink';
      default:
        return 'blue';
    }
  },

  handleReturnFallbackSrc: (mediaType: MediaType, size: string, alt: string): string => {
    const name = `${alt}-${(Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1)}`;
    const colors: string = [
      theme.colors.red[mediaType === 'person' ? 400 : 200],
      theme.colors.orange[mediaType === 'person' ? 400 : 200],
      theme.colors.yellow[mediaType === 'person' ? 400 : 200],
      theme.colors.green[mediaType === 'person' ? 400 : 200],
      theme.colors.teal[mediaType === 'person' ? 400 : 200],
      theme.colors.blue[mediaType === 'person' ? 400 : 200],
      theme.colors.cyan[mediaType === 'person' ? 400 : 200],
      theme.colors.purple[mediaType === 'person' ? 400 : 200],
      theme.colors.pink[mediaType === 'person' ? 400 : 200]
    ].join(',');

    return queryString.stringifyUrl({
      url: `${process.env.REACT_APP_FALLBACK_IMAGE_URL}/${mediaType === 'person' ? 'beam' : 'marble'}/${size}/${name}`,
      query: {
        colors,
        square: true
      }
    });
  },

  /**
   *
   * @param type - Type of image
   * @param breakpoint - Size of user's device
   * @returns - The appropriate size for image poster
   */
  // Set type of breakpoint from theme
  handleReturnImageSize: (
    type: 'poster' | 'backdrop',
    // orientation: 'vertical' | 'horizontal',
    breakpoint: 'xs' | 'sm'
  ): string => {
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
  },

  /**
   * This method will check if the element passed has a bigger width than its parent
   *
   * @param element - Ref element
   * @returns - Boolean value of if element is overflowing
   */
  handleIsOverflowing: (element: HTMLElement): boolean => {
    const overflow = element.style.overflow;

    if (!overflow || overflow === 'visible') element.style.overflow = 'hidden';

    const isOverflowing = element.clientWidth < element.scrollWidth || element.clientHeight < element.scrollHeight;

    element.style.overflow = overflow;

    return isOverflowing;
  },

  /**
   * This method will return an array of numbers from 25 to the range passed
   *
   * @param range - Total range of numbers to use
   * @param amount - Amount of numbers to return
   * @returns - Array of numbers from the 25 to range
   */
  handleReturnDummyWidths: (range: number, amount: number): number[] => {
    return _.range(25, range, amount);
  }
};
