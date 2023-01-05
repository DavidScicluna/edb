import { FC } from 'react';

import { Colors, useTheme, Icon, utils } from '@davidscicluna/component-library';

import { useBoolean, useConst } from '@chakra-ui/react';

import { useInView } from 'react-cool-inview';
import { omit } from 'lodash';
import { v4 as uuid } from 'uuid';

import { ClickableMedia, Image } from '../../../../../../../components';
import {
	formatMediaTypeLabel,
	getBoringAvatarSrc,
	getBoringAvatarVariantByMediaType,
	getImageSize,
	getRatio
} from '../../../../../../../common/utils';
import { useUserTheme } from '../../../../../../../common/hooks';

import { PhotosTabPhotoProps } from './types';

const { convertREMToPixels, convertStringToNumber, getHue } = utils;

const PhotosTabPhoto: FC<PhotosTabPhotoProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { observe: photorRef, inView } = useInView<HTMLDivElement>({
		unobserveOnEnter: true,
		rootMargin: `${convertREMToPixels(convertStringToNumber(theme.space[4], 'rem'))}px`
	});

	const { index, data } = props;
	const { height, mediaType, name, image, orientation } = data;
	const { file_path } = image;

	const [isImageError, setIsImageError] = useBoolean();

	const alt = useConst<string>(
		name
			? `${name} ${formatMediaTypeLabel({ type: 'single', mediaType })} photo ${index + 1}`
			: `${formatMediaTypeLabel({ type: 'single', mediaType })} photo ${index + 1}`
	);

	const thumbnail = useConst<string>(getImageSize({ type: 'profile', mode: 'thumbnail' }));
	const full = useConst<string>(getImageSize({ type: 'profile', mode: 'full' }));

	const randomID = useConst<string>(uuid());

	return (
		<ClickableMedia
			ref={photorRef}
			colorMode={colorMode}
			width='100%'
			height={`${height}px`}
			overflow='hidden'
			borderRadius='lg'
			ratio={getRatio({ orientation })}
			renderIcon={(props) => <Icon {...props} icon='search' category='outlined' />}
			isDisabled={isImageError}
			// onClick={onClick}
		>
			<Image
				alt={alt}
				width='inherit'
				height='inherit'
				borderRadius='base'
				onError={() => setIsImageError.on()}
				onLoad={() => setIsImageError.off()}
				src={{
					boring: inView
						? getBoringAvatarSrc({
								id: randomID,
								colors: omit({ ...theme.colors }, ['transparent', 'black', 'white']) as Colors,
								hue: getHue({ colorMode, type: 'color' }),
								size: 500,
								variant: getBoringAvatarVariantByMediaType({ mediaType })
						  })
						: undefined,
					thumbnail: inView ? `${import.meta.env.VITE_IMAGE_URL}/${thumbnail}${file_path}` : undefined,
					full: inView ? `${import.meta.env.VITE_IMAGE_URL}/${full}${file_path}` : undefined
				}}
			/>
		</ClickableMedia>
	);
};

export default PhotosTabPhoto;
