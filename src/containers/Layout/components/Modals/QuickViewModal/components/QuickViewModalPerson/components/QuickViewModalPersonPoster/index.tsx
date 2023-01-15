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

import { QuickViewModalPersonPosterProps } from './types';

const { getHue } = utils;

const thumbnail = getImageSize({ type: 'profile', mode: 'thumbnail' });
const full = getImageSize({ type: 'profile', mode: 'full' });

const QuickViewModalPersonPoster: FC<QuickViewModalPersonPosterProps> = ({ person, onClick, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { id, name, profile_path } = person;

	const alt = useConst<string>(
		name
			? `${name} ${formatMediaTypeLabel({ type: 'single', mediaType: 'person' })} avatar`
			: `${formatMediaTypeLabel({ type: 'single', mediaType: 'person' })} avatar`
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
					variant: getBoringAvatarVariantByMediaType({ mediaType: 'person' })
				}),
				thumbnail: `${import.meta.env.VITE_IMAGE_URL}/${thumbnail}${profile_path}`,
				full: `${import.meta.env.VITE_IMAGE_URL}/${full}${profile_path}`
			}}
		/>
	);
};

export default QuickViewModalPersonPoster;
