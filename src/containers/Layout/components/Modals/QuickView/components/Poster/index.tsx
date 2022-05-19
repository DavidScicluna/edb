import { ReactElement } from 'react';

import { useMediaQuery, useBoolean } from '@chakra-ui/react';


import { handleReturnBoringTypeByMediaType, handleReturnRatio } from '../../../../../../../common/utils';
import ClickableImage from '../../../../../../../components/Clickable/Image';
import Icon from '../../../../../../../components/Icon';
import Image from '../../../../../../../components/Image';
import Skeleton from '../../../../../../../components/Skeleton';

import { PosterProps } from './types';

const Poster = (props: PosterProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { alt, path, mediaType, srcSize, isLoading = false, onClickPoster } = props;

	const [isImageError, setIsImageError] = useBoolean();

	return (
		<ClickableImage
			borderRadius='lg'
			ratio={handleReturnRatio(isSm ? 'square' : 'portrait')}
			isDisabled={isLoading || isImageError}
			renderIcon={({ color, fontSize }) => (
				<Icon icon='search' type='outlined' color={color} fontSize={fontSize} />
			)}
			onClick={path ? () => onClickPoster(path) : undefined}
		>
			<Skeleton isLoaded={!isLoading} borderRadius='lg'>
				<Image
					alt={`${alt ? `"${alt}"` : ''} ${mediaType === 'tv' ? 'tv show' : mediaType} poster`}
					height={isSm ? '100%' : undefined}
					maxWidth={isSm ? 'auto' : undefined}
					borderRadius='lg'
					boringType={handleReturnBoringTypeByMediaType(mediaType)}
					onError={() => setIsImageError.on()}
					onLoad={() => setIsImageError.off()}
					thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[0]}${path}`}
					fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[1]}${path}`}
				/>
			</Skeleton>
		</ClickableImage>
	);
};

export default Poster;
