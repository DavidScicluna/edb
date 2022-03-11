import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';

import { VerticalPosterProps } from './types';

import { handleReturnBoringTypeByMediaType, handleReturnRatio } from '../../../../common/utils';
import ClickableImage from '../../../../components/Clickable/Image';
import Icon from '../../../../components/Icon';
import Image from '../../../../components/Image';
import Skeleton from '../../../../components/Skeleton';

const VerticalPoster = (props: VerticalPosterProps): ReactElement => {
	const { height, alt, path, mediaType, srcSize, isLoading = false, onClickPoster } = props;

	const [isImageError, setIsImageError] = useBoolean();

	return (
		<ClickableImage
			width={`${height}px`}
			borderRadius='base'
			ratio={handleReturnRatio('portrait')}
			isDisabled={isLoading || isImageError}
			renderIcon={({ color }) => <Icon icon='search' type='outlined' color={color} fontSize='4xl' />}
			onClick={path ? () => onClickPoster(path) : undefined}
		>
			<Skeleton isLoaded={!isLoading} borderRadius='base'>
				<Image
					alt={`${alt ? `"${alt}"` : ''} ${mediaType === 'tv' ? 'tv show' : mediaType} poster`}
					borderRadius='base'
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

export default VerticalPoster;
