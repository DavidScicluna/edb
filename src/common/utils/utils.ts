import _ from 'lodash';
import queryString from 'query-string';

import { ButtonProps } from '../../components/Clickable/Button/types';
import store from '../../store';
import theme from '../../theme';
import { months } from '../data/date';
import { Department } from '../data/departments';
import { Genre, MediaType, SortBy } from '../types/types';

export default {
  handleReturnNumberFromString: (number: string, string: string): number => {
    return parseInt(_.replace(number, string));
  },

  /**
   * This method will return the genres names from the genre ids
   *
   * @param genres - Genres ids
   * @param mediaType - Type of genres
   * @returns - string of genres seperated by a ","
   */
  handleReturnGenresByID: (genres: number[], mediaType: 'movie' | 'tv'): string => {
    const getGenres: Genre[] = store
      .getState()
      .options.data.data.genres[mediaType].filter((genre: Genre) => genres.includes(genre.id));
    return getGenres.map((genre) => genre.name).join(', ');
  },

  handleIsTouchDevice: (): boolean => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  },

  /**
   * This method will return the section of the date depending on the "type"
   *
   * @param date - Full Date
   * @param section - Which section of date to return
   * @returns - The section of the dat
   */
  handleReturnDate: (date: string, section: 'year' | 'month' | 'day' | 'full'): string => {
    if (section === 'full') {
      const split = date.split('-');
      const month = months.find((month) => month.value === split[1]);

      return `${split[2]} ${month?.label} ${split[0]}`;
    } else {
      return date.split('-')[section === 'year' ? 0 : section === 'month' ? 1 : 2];
    }
  },

  handleReturnDOB: (date: string): string => {
    console.log(date);

    return 'abc';
  },

  handleParseDurationForFramer: (time: number): number => {
    return time / 1000;
  },

  handleCheckHasFilters: (sortBy?: SortBy, genres?: Genre[], departments?: Department[]): boolean => {
    let hasFilters = false;

    if (!hasFilters && sortBy && sortBy.isActive) {
      hasFilters = true;
    }

    if (!hasFilters && !_.isEmpty(genres)) {
      hasFilters = true;
    }

    if (!hasFilters && !_.isEmpty(departments)) {
      hasFilters = true;
    }

    return hasFilters;
  },

  /**
   * This method will return the proper typed button color depending on the color passed
   *
   * @param color - Current user selected color from display modal
   * @returns - Proper typed color to be used in IconButton/Button
   */
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

  /**
   * This method will return a url that will fetch an img from boringavatars
   * boringavatars - https://boringavatars.com/
   *
   * @param mediaType - Poster mediaType (Movie, TV or Person)
   * @param size - Size of poster
   * @param alt - Image alt
   * @returns - boringavatars URL
   */
  handleReturnFallbackSrc: (mediaType: MediaType, size: string, alt: string): string => {
    const name = `${alt}-${(Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1)}`;
    const colors: string = [
      theme.colors.red[400],
      theme.colors.orange[400],
      theme.colors.yellow[400],
      theme.colors.green[400],
      theme.colors.teal[400],
      theme.colors.blue[400],
      theme.colors.cyan[400],
      theme.colors.purple[400],
      theme.colors.pink[400]
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
            return '342';
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
