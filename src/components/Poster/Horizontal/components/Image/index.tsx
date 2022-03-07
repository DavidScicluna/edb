import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { AspectRatio, Fade } from '@chakra-ui/react';

import { PosterImageProps } from './types';

import { MediaType } from '../../../../../common/types';
import { handleReturnBoringTypeByMediaType, handleReturnRatio } from '../../../../../common/utils';
import Skeleton from '../../../../../components/Skeleton';
import Image from '../../../../Image';

const width = ['100px', '116px', '152px', '188px', '188px', '224px'];

const PosterImage = <MT extends MediaType>(props: PosterImageProps<MT>): ReactElement => {
	const { mediaType, image, isLoading = true, inView = false } = props;

	return (
		<AspectRatio as={Fade} in={inView} width={width} borderRadius='base' ratio={handleReturnRatio('portrait')}>
			<Skeleton borderRadius='base' isLoaded={!isLoading && inView}>
				<Image
					alt={image?.alt || ''}
					borderRadius='base'
					boringType={handleReturnBoringTypeByMediaType(mediaType)}
					thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${image?.size.thumbnail || ''}${
						image?.src || ''
					}`}
					fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${image?.size.full || ''}${image?.src || ''}`}
				/>
			</Skeleton>
		</AspectRatio>
	);
};

export default PosterImage;
