import { ReactElement } from 'react';

import { useMediaQuery, AspectRatio } from '@chakra-ui/react';

import { useWindowSize } from 'usehooks-ts';

import { ImageViewerProps } from './types';

import { handleReturnImageOrientation } from '../../../../common/utils';
import Image from '../../../Image';

const ImageViewer = (props: ImageViewerProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');
	const [isLg] = useMediaQuery('(min-width: 1280px)');

	const { height: windowHeight } = useWindowSize();

	const { alt = '', width, height, aspect_ratio, file_path, boringType, srcSize } = props;

	const orientation = handleReturnImageOrientation(width || 0, height || 0);

	return (
		<AspectRatio
			width={orientation === 'landscape' && isLg ? `${(windowHeight * 100) / 75}px` : '100%'}
			height={!isSm ? (orientation === 'landscape' ? 'auto' : '100%') : 'auto'}
			ratio={aspect_ratio}
		>
			<Image
				alt={alt}
				borderRadius={orientation === 'landscape' && isLg ? 'xl' : 'none'}
				boringType={boringType}
				objectFit='contain'
				thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[0]}${file_path}`}
				fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[1]}${file_path}`}
			/>
		</AspectRatio>
	);
};

export default ImageViewer;
