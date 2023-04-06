import { FC } from 'react';

import { Colors, useTheme, Image, utils } from '@davidscicluna/component-library';

import { useConst, AspectRatio } from '@chakra-ui/react';

import { v4 as uuid } from 'uuid';
import { omit } from 'lodash';

import { useUserTheme } from '../../../../../../common/hooks';
import { getRatio } from '../../../../../../common/utils/ratio';
import { getBoringAvatarSrc, getBoringAvatarVariantByMediaType, getImageSize } from '../../../../../../common/utils';

import { ViewEpisodeImageProps } from './types';

const { getHue } = utils;

export const width = ['100px', '132px', '164px', '196px', '228px', '260px'];

const commonStyleProps = {
	width: 'inherit',
	height: 'inherit',
	borderRadius: 'inherit'
};

const thumbnail = getImageSize({ type: 'still', mode: 'thumbnail' });
const full = getImageSize({ type: 'still', mode: 'full' });

const ViewEpisodeImage: FC<ViewEpisodeImageProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { id, still_path, name, inView } = props;

	const randomID = useConst<string>(uuid());

	const alt = useConst<string>(name ? `${name} episode poster` : 'Episode poster');

	return (
		<AspectRatio
			{...commonStyleProps}
			width={width}
			ratio={getRatio({ orientation: 'portrait' })}
			overflow='hidden'
			borderRadius='base'
		>
			<Image
				{...commonStyleProps}
				alt={alt}
				src={{
					boring: inView
						? getBoringAvatarSrc({
								id: id ? String(id) : randomID,
								colors: omit({ ...theme.colors }, ['transparent', 'black', 'white']) as Colors,
								hue: getHue({ colorMode, type: 'color' }),
								size: 500,
								variant: getBoringAvatarVariantByMediaType({ mediaType: 'tv' })
						  })
						: undefined,
					thumbnail: inView ? `${import.meta.env.VITE_IMAGE_URL}/${thumbnail}${still_path}` : undefined,
					full: inView ? `${import.meta.env.VITE_IMAGE_URL}/${full}${still_path}` : undefined
				}}
			/>
		</AspectRatio>
	);
};

export default ViewEpisodeImage;
