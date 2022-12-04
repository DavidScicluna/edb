import { FC } from 'react';

import { Colors, useTheme, Icon, utils } from '@davidscicluna/component-library';

import { useBoolean, useConst } from '@chakra-ui/react';

import { useInView } from 'react-cool-inview';
import { omit, range, sample, shuffle } from 'lodash';
import { v4 as uuid } from 'uuid';

import { ClickableMedia, Image } from '../../../../../../../../../components';
import {
	getBoringAvatarSrc,
	getBoringAvatarVariantByMediaType,
	getImageSize,
	getRatio
} from '../../../../../../../../../common/utils';
import { useUserTheme } from '../../../../../../../../../common/hooks';

import { PhotosTabPhotoProps } from './types';

const { getHue } = utils;

const thumbnail = getImageSize({ type: 'profile', mode: 'thumbnail' });
const full = getImageSize({ type: 'profile', mode: 'full' });

const PhotosTabPhoto: FC<PhotosTabPhotoProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { observe: photorRef, inView = true } = useInView<HTMLDivElement>({
		// threshold: [0.2, 0.4, 0.6, 0.8, 1],
		unobserveOnEnter: true
	});

	const { index, name, file_path } = props;

	const [isImageError, setIsImageError] = useBoolean();

	const randomID = useConst<string>(uuid());

	const heights = useConst<number[]>(shuffle(range(250, 550, 25)));
	const height = useConst<number>(sample(heights) || 400);

	return (
		<ClickableMedia
			ref={photorRef}
			colorMode={colorMode}
			width='100%'
			height={`${height}px`}
			overflow='hidden'
			borderRadius='lg'
			renderIcon={(props) => (
				<Icon
					{...props}
					width={theme.fontSizes['4xl']}
					height={theme.fontSizes['4xl']}
					fontSize={theme.fontSizes['4xl']}
					icon='search'
					category='outlined'
				/>
			)}
			isDisabled={isImageError}
			ratio={getRatio({ orientation: 'portrait' })}
			// onClick={onClick}
		>
			<Image
				alt={`${name || 'Person'} Photo ${index + 1}`}
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
								variant: getBoringAvatarVariantByMediaType({ mediaType: 'person' })
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
