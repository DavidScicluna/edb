import _ from 'lodash';
import qs from 'query-string';
import { v4 as uuid } from 'uuid';

import store from '../../store';
import theme from '../../theme';
import { months } from '../data/date';
import { Department } from '../data/departments';
import { Genre, SortBy } from '../types';

type BoringType = 'marble' | 'beam' | 'pixel' | 'sunset' | 'bauhaus' | 'ring';

type ColorSize = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

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

/**
 * This method will convert a REM size to PX size
 *
 * @param rem - number: REM size
 * @returns - number: Converted PX size from REM size
 */
export const handleConvertREMToPixels = (rem: number): number => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

/**
 * This method will remove a portion of a string from the string passed and convert the string to a number
 *
 * @param string - string: String value to be cut & converted
 * @param cut - string: The string to cut from the string
 * @returns number: A number from the string passed
 */
export const handleConvertStringToNumber = (string: string, cut: string): number => {
  return Number(string.replace(cut, ''));
};

/**
 * This method will check whether the user's device is a touch device or not
 *
 * @returns boolean: Either its a touch device or not
 */
export const handleIsTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  // || navigator.msMaxTouchPoints > 0;
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
 * This method will return a url that will fetch an img from boringavatars
 * boringavatars - https://boringavatars.com/
 *
 * @param type - Type of asset from BoringAvatars
 * @param size - Size of the color spectrum
 * @param alt - Image alt
 * @returns - boringavatars URL
 */
export const handleReturnBoringSrc = (type: BoringType, size: ColorSize, alt: string): string => {
  return qs.stringifyUrl({
    url: `${process.env.REACT_APP_FALLBACK_IMAGE_URL}/${type}/${size}/${`${alt}-${uuid()}`.split(' ').join('')}`,
    query: {
      colors: [
        theme.colors.red[size],
        theme.colors.orange[size],
        theme.colors.yellow[size],
        theme.colors.green[size],
        theme.colors.teal[size],
        theme.colors.blue[size],
        theme.colors.cyan[size],
        theme.colors.purple[size],
        theme.colors.pink[size]
      ].join(','),
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
