import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';

import { YouTube as YouTubeIcon, SearchOutlined as SearchOutlinedIcon } from '@material-ui/icons';

import { BackdropProps } from './types';

import { handleReturnBoringTypeByMediaType } from '../../../../../../../../common/utils';
import ClickableImage from '../../../../../../../../components/Clickable/Image';
import Image from '../../../../../../../../components/Image';
import Skeleton from '../../../../../../../../components/Skeleton';

const Backdrop = (props: BackdropProps): ReactElement => {
	const { alt, path, mediaType, video = true, isLoading = false, isError = false, onClick } = props;

	const [isImageError, setIsImageError] = useBoolean();

	return (
		<ClickableImage
			width='100%'
			borderRadius='lg'
			ratio={6 / 3}
			isDisabled={isLoading || isError || isImageError}
			renderIcon={({ color, fontSize }) =>
				video ? <YouTubeIcon style={{ color, fontSize }} /> : <SearchOutlinedIcon style={{ color, fontSize }} />
			}
			onClick={path ? () => onClick(path, video) : undefined}
		>
			<Skeleton width='100%' position='absolute' top={0} borderRadius='lg' isLoaded={!isLoading}>
				<Image
					width='100%'
					alt={`${alt ? `"${alt}"` : ''} ${mediaType} backdrop`}
					borderRadius='lg'
					boringType={handleReturnBoringTypeByMediaType(mediaType === 'movie' ? 'movie' : 'tv')}
					onError={() => setIsImageError.on()}
					onLoad={() => setIsImageError.off()}
					thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/w300${path}`}
					fullSrc={`${process.env.REACT_APP_IMAGE_URL}/original${path}`}
				/>
			</Skeleton>
		</ClickableImage>
	);
};

export default Backdrop;
