import _ from 'lodash';
import queryString from 'query-string';

import { ButtonProps } from '../../components/Clickable/Button/types';
import store from '../../store';
import theme from '../../theme';
import { months } from '../data/date';
import { Department } from '../data/departments';
import { Genre, MediaType, SortBy } from '../types/types';

export const handleReturnNumberFromString = (number: string, string: string): number => {
  return parseInt(_.replace(number, string));
};

export const handleFormatMoney = (money: number): string => {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * This method will take a block of string and will format it into paragraphs
 *
 * @param content String - The content block to format into paragraphs
 * @returns Array of paragraphs
 */
export const handleFormatIntoParagraphs = (paragraph: string): string[] => {
  return paragraph.split('\n'[0]).filter((paragraph) => paragraph !== '\r');
};

/**
 * This method will return the genres names from the genre ids
 *
 * @param genres - Genres ids
 * @param mediaType - Type of genres
 * @returns - string of genres seperated by a ","
 */
export const handleReturnGenresByID = (genres: number[], mediaType: 'movie' | 'tv'): string => {
  const getGenres: Genre[] = store
    .getState()
    .options.data.data.genres[mediaType].filter((genre: Genre) => genres.includes(genre.id));
  return getGenres
    .map((genre) => genre.name)
    .filter((genre) => genre)
    .join(', ');
};

export const handleIsTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

/**
 * This method will return the section of the date depending on the "type"
 *
 * @param date - Full Date
 * @param section - Which section of date to return
 * @returns - The section of the dat
 */
export const handleReturnDate = (date: string, section: 'year' | 'month' | 'day' | 'full'): string => {
  if (section === 'full') {
    const split = date.split('-');
    const month = months.find((month) => month.value === split[1]);

    return `${split[2]} ${month?.label} ${split[0]}`;
  } else {
    return date.split('-')[section === 'year' ? 0 : section === 'month' ? 1 : 2];
  }
};

/**
 * This method will take the minutes number passed and will format it to hours and minutes
 *
 * @param runtime - The runtime in minutes
 * @returns - The runtime minutes into a more readable format
 */
export const handleReturnRuntime = (runtime: number): string => {
  const hours = runtime / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  const time = [rhours > 0 ? `${rhours}hr` : undefined, rminutes > 0 ? `${rminutes}m` : undefined];

  return time.filter((date) => date).join(' ');
};

export const handleParseDurationForFramer = (time: number): number => {
  return time / 1000;
};

export const handleCheckHasFilters = (sortBy?: SortBy, genres?: Genre[], departments?: Department[]): boolean => {
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
};

/**
 * This method will return the proper typed button color depending on the color passed
 *
 * @param color - Current user selected color from display modal
 * @returns - Proper typed color to be used in IconButton/Button
 */
export const handleReturnColor = (color: unknown): ButtonProps['color'] => {
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
};

/**
 * This method will return a url that will fetch an img from boringavatars
 * boringavatars - https://boringavatars.com/
 *
 * @param mediaType - Poster mediaType (Movie, TV or Person)
 * @param size - Size of poster
 * @param alt - Image alt
 * @returns - boringavatars URL
 */
export const handleReturnFallbackSrc = (mediaType: MediaType, size: string, alt: string): string => {
  const name = `${alt}-${(Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1)}`.replace(/ /g, '');
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
};

/**
 * This method will check if the element passed has a bigger width than its parent
 *
 * @param element - Ref element
 * @returns - Boolean value of if element is overflowing
 */
export const handleIsOverflowing = (element: HTMLElement): boolean => {
  const overflow = element.style.overflow;

  if (!overflow || overflow === 'visible') element.style.overflow = 'hidden';

  const isOverflowing = element.clientWidth < element.scrollWidth || element.clientHeight < element.scrollHeight;

  element.style.overflow = overflow;

  return isOverflowing;
};

/**
 * This method will return an array of numbers from 25 to the range passed
 *
 * @param range - Total range of numbers to use
 * @param amount - Amount of numbers to return
 * @returns - Array of numbers from 25 to range
 */
export const handleReturnDummyWidths = (range: number, amount: number): number[] => {
  return _.range(25, range, amount);
};
