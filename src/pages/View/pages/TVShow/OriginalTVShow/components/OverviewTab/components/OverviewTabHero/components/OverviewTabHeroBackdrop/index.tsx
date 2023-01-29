import { FC } from 'react';

import { Colors, useTheme, utils } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';

import { v4 as uuid } from 'uuid';
import { lowerCase, omit } from 'lodash';

import {
	formatMediaTypeLabel,
	getBoringAvatarSrc,
	getBoringAvatarVariantByMediaType,
	getImageSize
} from '../../../../../../../../../../../common/utils';
import { useUserTheme } from '../../../../../../../../../../../common/hooks';
import ViewHeroCoverBackdrop from '../../../../../../../../../components/ViewHero/components/ViewHeroCover/components/ViewHeroCoverBackdrop';
import { useTVShowContext } from '../../../../../../common/hooks';

import { OverviewTabHeroBackdropProps } from './types';

const { getHue } = utils;

const thumbnail = getImageSize({ type: 'backdrop', mode: 'thumbnail' });
const full = getImageSize({ type: 'backdrop', mode: 'full' });

const OverviewTabHeroBackdrop: FC<OverviewTabHeroBackdropProps> = ({ show }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { videosQuery } = useTVShowContext();

	const { data: videos } = videosQuery || {};
	const { results = [] } = videos || {};

	const { id, name, backdrop_path } = show || {};

	const alt = useConst<string>(
		name
			? `${name} ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} backdrop`
			: `${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} backdrop`
	);

	const randomID = useConst<string>(uuid());

	return (
		<ViewHeroCoverBackdrop
			alt={alt}
			// onClick={onClick}
			hasVideo={results.length > 0}
			type={
				results.find(({ type }) => lowerCase(type) === 'trailer')
					? 'Trailer'
					: results.find(({ type }) => lowerCase(type) === 'teaser')
					? 'Teaser'
					: results.find(({ type }) => lowerCase(type) === 'featurette')
					? 'Featurette'
					: undefined
			}
			src={{
				boring: getBoringAvatarSrc({
					id: id ? String(id) : randomID,
					colors: omit({ ...theme.colors }, ['transparent', 'black', 'white']) as Colors,
					hue: getHue({ colorMode, type: 'color' }),
					size: 500,
					variant: getBoringAvatarVariantByMediaType({ mediaType: 'tv' })
				}),
				thumbnail: `${import.meta.env.VITE_IMAGE_URL}/${thumbnail}${backdrop_path}`,
				full: `${import.meta.env.VITE_IMAGE_URL}/${full}${backdrop_path}`
			}}
		/>
	);
};

export default OverviewTabHeroBackdrop;
