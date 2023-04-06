import { ReactElement } from 'react';

import { Colors, useTheme, Image, utils } from '@davidscicluna/component-library';

import { useConst, AspectRatio } from '@chakra-ui/react';

import { v4 as uuid } from 'uuid';
import { omit } from 'lodash';

import { useUserTheme } from '../../../../../common/hooks';
import { MediaType } from '../../../../../common/types';
import { getBoringAvatarSrc, getBoringAvatarVariantByMediaType } from '../../../../../common/utils';
import { getRatio } from '../../../../../common/utils/ratio';

import { HorizontalPosterImageProps } from './types';

const { getHue } = utils;

export const width = ['100px', '132px', '164px', '196px', '228px', '260px'];

const commonStyleProps = {
	width: 'inherit',
	height: 'inherit',
	borderRadius: 'inherit'
};

const HorizontalPosterImage = <MT extends MediaType>(props: HorizontalPosterImageProps<MT>): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { mediaItem, mediaType, image, inView } = props;

	const randomID = useConst<string>(uuid());

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
				alt={image.alt}
				src={{
					boring: inView
						? getBoringAvatarSrc({
								id: mediaItem.id ? String(mediaItem.id) : randomID,
								colors: omit({ ...theme.colors }, ['transparent', 'black', 'white']) as Colors,
								hue: getHue({ colorMode, type: 'color' }),
								size: 500,
								variant: getBoringAvatarVariantByMediaType({ mediaType })
						  })
						: undefined,
					thumbnail: inView
						? `${import.meta.env.VITE_IMAGE_URL}/${image.size.thumbnail}${image.src}`
						: undefined,
					full: inView ? `${import.meta.env.VITE_IMAGE_URL}/${image.size.full}${image.src}` : undefined
				}}
			/>
		</AspectRatio>
	);
};

export default HorizontalPosterImage;
