import { FC } from 'react';

import { Colors, useTheme, utils } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';

import { v4 as uuid } from 'uuid';
import { omit } from 'lodash';

import ViewPoster from '../../../../../components/ViewPoster';
import { getBoringAvatarSrc, getBoringAvatarVariantByMediaType, getImageSize } from '../../../../../../../common/utils';
import { useUserTheme } from '../../../../../../../common/hooks';

import { EpisodePosterProps } from './types';

const { getHue } = utils;

const thumbnail = getImageSize({ type: 'still', mode: 'thumbnail' });
const full = getImageSize({ type: 'still', mode: 'full' });

const EpisodePoster: FC<EpisodePosterProps> = ({ episode, onClick, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { id, name, still_path } = episode || {};

	const randomID = useConst<string>(uuid());

	const alt = useConst<string>(name ? `${name} episode poster` : 'Episode poster');

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
				thumbnail: `${import.meta.env.VITE_IMAGE_URL}/${thumbnail}${still_path}`,
				full: `${import.meta.env.VITE_IMAGE_URL}/${full}${still_path}`
			}}
		/>
	);
};

export default EpisodePoster;
