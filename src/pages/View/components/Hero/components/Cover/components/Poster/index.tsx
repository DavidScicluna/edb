import { ReactElement } from 'react';

import { Icon } from '@davidscicluna/component-library';
import { useBoolean } from '@chakra-ui/react';

import { handleReturnBoringTypeByMediaType } from '../../../../../../../../common/utils';
import ClickableImage from '../../../../../../../../components/Clickable/Image';
import Image from '../../../../../../../../components/Image';
import Skeleton from '../../../../../../../../components/Skeleton';

import { PosterProps } from './types';

const Poster = (props: PosterProps): ReactElement => {
	const { alt, path, mediaType, isLoading = false, isError = false, onClick } = props;

	const [isImageError, setIsImageError] = useBoolean();

	return (
		<ClickableImage
			width='100%'
			borderRadius='lg'
			isDisabled={isLoading || isError || isImageError}
			renderIcon={({ color, fontSize }) => (
				<Icon icon='search' category='outlined' color={color} fontSize={fontSize} />
			)}
			onClick={path ? () => onClick(path) : undefined}
		>
			<Skeleton borderRadius='lg' isLoaded={!isLoading}>
				<Image
					alt={`${alt ? `"${alt}"` : ''} ${mediaType} poster`}
					borderRadius='lg'
					boringType={handleReturnBoringTypeByMediaType(mediaType === 'movie' ? 'movie' : 'tv')}
					onError={() => setIsImageError.on()}
					onLoad={() => setIsImageError.off()}
					thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/w92${path}`}
					fullSrc={`${process.env.REACT_APP_IMAGE_URL}/original${path}`}
				/>
			</Skeleton>
		</ClickableImage>
	);
};

export default Poster;
