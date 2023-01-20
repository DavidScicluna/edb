import { FC } from 'react';

import { Colors, useTheme, utils } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';

import { v4 as uuid } from 'uuid';
import { omit } from 'lodash';

import QuickViewModalPoster from '../../../QuickViewModalPoster';
import {
	formatMediaTypeLabel,
	getBoringAvatarSrc,
	getBoringAvatarVariantByMediaType,
	getImageSize
} from '../../../../../../../../../common/utils';
import { useUserTheme } from '../../../../../../../../../common/hooks';

import { QuickViewModalCollectionPosterProps } from './types';

const { getHue } = utils;

const thumbnail = getImageSize({ type: 'poster', mode: 'thumbnail' });
const full = getImageSize({ type: 'poster', mode: 'full' });

const QuickViewModalCollectionPoster: FC<QuickViewModalCollectionPosterProps> = ({ collection, onClick, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { id, name, poster_path } = collection;

	const alt = useConst<string>(
		name
			? `${name} ${formatMediaTypeLabel({ type: 'single', mediaType: 'collection' })} poster`
			: `${formatMediaTypeLabel({ type: 'single', mediaType: 'collection' })} poster`
	);

	const randomID = useConst<string>(uuid());

	return (
		<QuickViewModalPoster
			{...rest}
			alt={alt}
			onClick={onClick}
			src={{
				boring: getBoringAvatarSrc({
					id: id ? String(id) : randomID,
					colors: omit({ ...theme.colors }, ['transparent', 'black', 'white']) as Colors,
					hue: getHue({ colorMode, type: 'color' }),
					size: 500,
					variant: getBoringAvatarVariantByMediaType({ mediaType: 'movie' })
				}),
				thumbnail: `${import.meta.env.VITE_IMAGE_URL}/${thumbnail}${poster_path}`,
				full: `${import.meta.env.VITE_IMAGE_URL}/${full}${poster_path}`
			}}
		/>
	);
};

export default QuickViewModalCollectionPoster;
