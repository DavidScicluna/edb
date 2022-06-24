import { ReactElement } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { AspectRatio, Fade } from '@chakra-ui/react';

import {
	handleReturnBoringTypeByMediaType,
	handleReturnRatio
} from '../../../../../../../../../../../../../../common/utils';
import Image from '../../../../../../../../../../../../../../components/Image';

import { EpisodeImageProps } from './types';

const width = ['100px', '116px', '152px', '188px', '188px', '224px'];

const EpisodeImage = (props: EpisodeImageProps): ReactElement => {
	const { image, isLoading = true, inView = false } = props;

	return (
		<AspectRatio as={Fade} in={inView} width={width} borderRadius='base' ratio={handleReturnRatio('portrait')}>
			<Skeleton borderRadius='base' isLoaded={!isLoading && inView}>
				<Image
					alt={image?.alt || ''}
					borderRadius='base'
					boringType={handleReturnBoringTypeByMediaType('tv')}
					thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${image?.size.thumbnail || ''}${
						image?.src || ''
					}`}
					fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${image?.size.full || ''}${image?.src || ''}`}
				/>
			</Skeleton>
		</AspectRatio>
	);
};

export default EpisodeImage;
