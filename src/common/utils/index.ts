import { Theme, ColorHues } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';

import dayjs from 'dayjs';
import qs from 'query-string';

import store from '../../store';
import { Genre, BoringAvatarType, MediaType } from '../types';
import { Image, Images } from '../types/images';

export const handleReturnMediaTypeLabel = (mediaType: MediaType): string => {
	switch (mediaType) {
		case 'company':
			return 'companies';
		case 'collection':
			return 'collections';
		case 'movie':
			return 'movies';
		case 'tv':
			return 'tvshows';
		case 'person':
			return 'people';
	}
};

export const handleFormatMoney = (money: number): string => {
	return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const handleConvertEasingsIntoNumbers = (easing: string): number[] => {
	return easing
		.replace('cubic-bezier', '')
		.replace('(', '')
		.replace(')', '')
		.replace(' ', '')
		.split(',')
		.map((number) => Number(number));
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
		.options.data.genres[mediaType].filter((genre: Genre) => genres.some((paramGenre) => paramGenre === genre.id));
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
 * @returns - The section of the date
 */
export const handleReturnDate = (date: string, section: 'year' | 'month' | 'day' | 'full'): string => {
	const newDate = dayjs(date);

	switch (section) {
		case 'year':
			return newDate.format('YYYY');
		case 'month':
			return newDate.format('MMMM');
		case 'day':
			return newDate.format('DD');
		default:
			return newDate.format('DD MMMM YYYY');
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

/**
 * This method will return a url that will fetch an img from boringavatars
 * boringavatars - https://boringavatars.com/
 *
 * @param theme - The CUI Theme object
 * @param type - Type of asset from BoringAvatars
 * @param size - Size of the color spectrum
 * @returns - boringavatars URL
 */
export const handleReturnBoringSrc = (theme: Theme, type: BoringAvatarType, size: ColorHues, id: string): string => {
	return qs.stringifyUrl({
		url: `${process.env.REACT_APP_FALLBACK_IMAGE_URL}/${type}/${size}/${id}`,
		query: {
			colors: [
				theme.colors.red[size],
				theme.colors.pink[size],
				theme.colors.purple[size],
				theme.colors.deep_purple[size],
				theme.colors.indigo[size],
				theme.colors.blue[size],
				theme.colors.light_blue[size],
				theme.colors.cyan[size],
				theme.colors.teal[size],
				theme.colors.green[size],
				theme.colors.light_green[size],
				theme.colors.lime[size],
				theme.colors.yellow[size],
				theme.colors.orange[size],
				theme.colors.deep_orange[size]
			].join(','),
			square: true
		}
	});
};

/**
 * This method will return the appropriate Boring Avatar Type depending on the mediaType passed
 *
 * @param mediaType MediaType - The type of mediaType - 'movie' | 'tv' | 'person' | 'company' | 'collection'
 * @returns BoringAvatarType - Boring Avatar Type
 */
export const handleReturnBoringTypeByMediaType = (mediaType: MediaType): BoringAvatarType => {
	switch (mediaType) {
		case 'collection':
			return 'pixel';
		case 'company':
			return 'bauhaus';
		case 'person':
			return 'beam';
		default:
			return 'marble';
	}
};

export const handleReturnImageSize = (image: Image, type: 'thumbnail' | 'full'): Images => {
	const width = window.innerWidth;

	switch (image) {
		case 'backdrop': {
			if (type === 'full') {
				if (width > 1280) {
					return 'original';
				} else if (width > 780) {
					return 'w1280';
				} else {
					return 'w780';
				}
			} else {
				return 'w300';
			}
		}
		case 'logo': {
			if (type === 'full') {
				if (width > 500) {
					return 'original';
				} else if (width > 300) {
					return 'w500';
				} else if (width > 185) {
					return 'w300';
				} else if (width > 154) {
					return 'w185';
				} else if (width > 92) {
					return 'w154';
				} else {
					return 'w92';
				}
			} else {
				return 'w45';
			}
		}
		case 'poster': {
			if (type === 'full') {
				if (width > 780) {
					return 'original';
				} else if (width > 500) {
					return 'w780';
				} else if (width > 342) {
					return 'w500';
				} else if (width > 185) {
					return 'w342';
				} else if (width > 154) {
					return 'w185';
				} else {
					return 'w154';
				}
			} else {
				return 'w92';
			}
		}
		case 'profile': {
			if (type === 'full') {
				if (width > 632) {
					return 'original';
				} else if (width > 185) {
					return 'h632';
				} else {
					return 'w185';
				}
			} else {
				return 'w45';
			}
		}
		case 'still': {
			if (type === 'full') {
				if (width > 300) {
					return 'original';
				} else if (width > 185) {
					return 'w300';
				} else {
					return 'w185';
				}
			} else {
				return 'w92';
			}
		}
	}
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

export const handleCheckSystemColorMode = (): ColorMode => {
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	} else {
		return 'light';
	}
};

export const handleReturnImageOrientation = (width = 0, height = 0): 'landscape' | 'portrait' | 'square' => {
	if (width > height) {
		return 'landscape';
	} else if (width < height) {
		return 'portrait';
	} else {
		return 'square';
	}
};

export const handleReturnRatio = (orientation: 'landscape' | 'portrait' | 'square'): number => {
	switch (orientation) {
		case 'landscape':
			return 1.77777777777778;
		case 'portrait':
			return 0.666666666666667;
		case 'square':
			return 1 / 1;
	}
};
