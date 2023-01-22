import { FC } from 'react';

import { Colors, useTheme, Icon, utils } from '@davidscicluna/component-library';

import { useBoolean, useConst } from '@chakra-ui/react';

import { useInView } from 'react-cool-inview';
import { omit } from 'lodash';
import { v4 as uuid } from 'uuid';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import {
	formatMediaTypeLabel,
	getBoringAvatarSrc,
	getBoringAvatarVariantByMediaType,
	getImageSize
} from '../../../../../../../../../common/utils';
import { ClickableMedia, Image } from '../../../../../../../../../components';
import { getRatio } from '../../../../../../../../../common/utils/ratio';

import { PhotosTabPhotoProps } from './types';

const { convertREMToPixels, convertStringToNumber, getHue } = utils;

const thumbnail = getImageSize({ type: 'still', mode: 'thumbnail' });
const full = getImageSize({ type: 'still', mode: 'full' });

const PhotosTabPhoto: FC<PhotosTabPhotoProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { observe: photorRef, inView } = useInView<HTMLDivElement>({
		unobserveOnEnter: true,
		rootMargin: `-${convertREMToPixels(convertStringToNumber(theme.space[4], 'rem'))}px 0px`
	});

	const { index, data } = props;
	const { height, name, number, image, orientation } = data;
	const { file_path } = image;

	const [isImageError, setIsImageError] = useBoolean();

	const randomID = useConst<string>(uuid());

	const alt = useConst<string>(
		name
			? ['Episode', number, `"${name}"`, 'photo', index + 1].join(' ')
			: `${formatMediaTypeLabel({
					type: 'single',
					mediaType: 'tv'
			  })} Episode photo ${index + 1}`
	);

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
								variant: getBoringAvatarVariantByMediaType({ mediaType: 'tv' })
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
