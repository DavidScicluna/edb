import { Theme, ColorHues, Colors, FontSize, LineHeight, utils, IconType } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';

import dayjs from 'dayjs';
import { compact, memoize } from 'lodash';
import qs from 'query-string';

import { ImageSrcMode } from '../../components/Image/types';
import { UserThemeColor } from '../../store/slices/Users/types';
import { Genre, BoringAvatarVariant, MediaType } from '../types';
import { ImageType, ImageSizes } from '../types/images';
import { memoizeDebounce } from '../scripts';

const { convertREMToPixels, convertStringToNumber } = utils;

type SetFaviconProps = { color: UserThemeColor; colorMode: ColorMode };

export const updateFavicon = memoizeDebounce(({ color, colorMode }: SetFaviconProps) => {
	localStorage.setItem('user_theme_color', color);
	localStorage.setItem('user_theme_colorMode', colorMode);
	window.dispatchEvent(new Event('storage'));
}, 1000);

type GetMediaTypeIconProps = { mediaType: MediaType };

export const getMediaTypeIcon = memoize(({ mediaType }: GetMediaTypeIconProps): IconType => {
	switch (mediaType) {
		case 'company':
			return 'business';
		case 'collection':
			return 'library_books';
		case 'movie':
			return 'theaters';
		case 'tv':
			return 'live_tv';
		case 'person':
			return 'people_alt';
	}
});

type FormatMediaTypeLabelProps = { type: 'single' | 'multiple'; mediaType: MediaType };

export const formatMediaTypeLabel = memoize(({ type, mediaType }: FormatMediaTypeLabelProps): string => {
	switch (type) {
		case 'single': {
			switch (mediaType) {
				case 'company':
					return 'Company';
				case 'collection':
					return 'Collection';
				case 'movie':
					return 'Movie';
				case 'tv':
					return 'TV Show';
				case 'person':
					return 'Person';
			}
			break;
		}
		case 'multiple': {
			switch (mediaType) {
				case 'company':
					return 'Companies';
				case 'collection':
					return 'Collections';
				case 'movie':
					return 'Movies';
				case 'tv':
					return 'TV Shows';
				case 'person':
					return 'People';
			}
			break;
		}
	}
});

type FormatMediaTypeProps = { mediaType: MediaType };

export const formatMediaType = memoize(({ mediaType }: FormatMediaTypeProps): string => {
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
});

type GetGenreLabelsByIDsProps = { genres: Genre[]; ids: number[] };

export const getGenreLabelsByIDs = memoize(({ genres = [], ids = [] }: GetGenreLabelsByIDsProps): string => {
	return genres
		.filter((genre) => ids.some((id) => genre.id === id))
		.map(({ name }) => name)
		.join(', ');
});

type FormatDateProps = { date: string; section?: 'year' | 'month' | 'day' | 'full' };

export const formatDate = memoize(({ date, section = 'full' }: FormatDateProps): string => {
	const newDate = dayjs(date);

	switch (section) {
		case 'year':
			return newDate.format('YYYY');
		case 'month':
			return newDate.format('MMMM');
		case 'day':
			return newDate.format('DD');
		default:
			return newDate.format('ddd, MMMM DD, YYYY');
	}
});

type GetBoringAvatarSrcProps = {
	id: string;
	colors: Colors;
	hue: ColorHues;
	size: number;
	variant: BoringAvatarVariant;
};

/**
 * This method will return a url that will fetch an img from boringavatars
 * boringavatars - https://boringavatars.com/
 *
 * @param id - ID to generate a custom avatar
 * @param colors - The CUI Theme colors object
 * @param hue - Color Hue within the Theme colors object
 * @param size - Size of image in pixels
 * @param variant - Type of asset from BoringAvatars
 * @returns - boringavatars URL
 */
export const getBoringAvatarSrc = memoize((props: GetBoringAvatarSrcProps): string => {
	const { id, colors, hue, size, variant } = props;

	return qs.stringifyUrl({
		url: `${import.meta.env.VITE_FALLBACK_IMAGE_URL}/${variant}/${size}/${id}`,
		query: {
			colors: [
				colors.red[hue],
				colors.pink[hue],
				colors.purple[hue],
				colors.deep_purple[hue],
				colors.indigo[hue],
				colors.blue[hue],
				colors.light_blue[hue],
				colors.cyan[hue],
				colors.teal[hue],
				colors.green[hue],
				colors.light_green[hue],
				colors.lime[hue],
				colors.yellow[hue],
				colors.orange[hue],
				colors.deep_orange[hue]
			].join(','),
			square: true
		}
	});
});

type GetBoringAvatarVariantByMediaTypeProps = { mediaType: MediaType };

/**
 * This method will return the appropriate Boring Avatar Type depending on the mediaType passed
 *
 * @param mediaType MediaType - The type of mediaType - 'movie' | 'tv' | 'person' | 'company' | 'collection'
 * @returns BoringAvatarType - Boring Avatar Type
 */
export const getBoringAvatarVariantByMediaType = memoize(
	({ mediaType }: GetBoringAvatarVariantByMediaTypeProps): BoringAvatarVariant => {
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
	}
);

type GetImageSizeProps = { type: ImageType; mode: Exclude<ImageSrcMode, 'boring'> };

export const getImageSize = memoize(({ type, mode }: GetImageSizeProps): ImageSizes => {
	const width = window.innerWidth;

	switch (type) {
		case 'backdrop': {
			if (mode === 'full') {
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
			if (mode === 'full') {
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
			if (mode === 'full') {
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
			if (mode === 'full') {
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
			if (mode === 'full') {
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
});

type GetFontSizeHeightProps = { theme: Theme; fontSize?: FontSize; lineHeight?: LineHeight };

export const getFontSizeHeight = memoize((props: GetFontSizeHeightProps): number => {
	const { theme, fontSize = 'md', lineHeight = 'base' } = props;

	return (
		convertREMToPixels(convertStringToNumber(theme.fontSizes[fontSize], 'rem')) *
		Number(theme.lineHeights[lineHeight])
	);
});

type FormatRuntimeProps = { runtime: number; type?: 'partial' | 'full' };

export const formatRuntime = memoize(({ runtime, type = 'partial' }: FormatRuntimeProps) => {
	const hours = runtime / 60;
	const h = Math.floor(hours);
	const minutes = (hours - h) * 60;
	const m = Math.round(minutes);

	return compact([
		h > 0 ? `${h}${type === 'full' ? ` Hour${h === 1 ? '' : 's'}` : 'HR'}` : null,
		m > 0 ? `${m}${type === 'full' ? ` Minute${m === 1 ? '' : 's'}` : 'M'}` : null
	]).join(' ');
});
