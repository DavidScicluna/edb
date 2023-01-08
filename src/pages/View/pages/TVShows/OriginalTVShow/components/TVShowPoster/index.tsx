import { FC } from 'react';

import { Colors, useTheme, utils } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';

import { v4 as uuid } from 'uuid';
import { omit } from 'lodash';

import ViewPoster from '../../../../../components/ViewPoster';
import {
	formatMediaTypeLabel,
	getBoringAvatarSrc,
	getBoringAvatarVariantByMediaType,
	getImageSize
} from '../../../../../../../common/utils';
import { useUserTheme } from '../../../../../../../common/hooks';

import { TVShowPosterProps } from './types';

const { getHue } = utils;

const thumbnail = getImageSize({ type: 'poster', mode: 'thumbnail' });
const full = getImageSize({ type: 'poster', mode: 'full' });

const TVShowPoster: FC<TVShowPosterProps> = ({ show, onClick, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { id, name, poster_path } = show;

	const alt = useConst<string>(
		name
			? `${name} ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} poster`
			: `${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} poster`
	);

	const randomID = useConst<string>(uuid());

	return (
		<ViewPoster
			{...rest}
			alt={alt}
			onClick={onClick}
			src={{
				boring: getBoringAvatarSrc({
					id: id ? String(id) : randomID,
					colors: omit({ ...theme.colors }, ['transparent', 'black', 'white']) as Colors,
					hue: getHue({ colorMode, type: 'color' }),
					size: 500,
					variant: getBoringAvatarVariantByMediaType({ mediaType: 'tv' })
				}),
				thumbnail: `${import.meta.env.VITE_IMAGE_URL}/${thumbnail}${poster_path}`,
				full: `${import.meta.env.VITE_IMAGE_URL}/${full}${poster_path}`
			}}
		/>
	);
};

export default TVShowPoster;
