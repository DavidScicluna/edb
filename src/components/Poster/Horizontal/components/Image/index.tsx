import { ReactElement } from 'react';

import { useColorMode, AspectRatio, Center, Image as CUIImage, Fade } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';


import * as fallback from '../../../../../common/assets/fallback';
import { MediaType } from '../../../../../common/types';
import { handleReturnBoringTypeByMediaType, handleReturnRatio } from '../../../../../common/utils';
import Skeleton from '../../../../../components/Skeleton';
import Image from '../../../../Image';

import { PosterImageProps } from './types';

const commonStyleProps = {
	width: 'inherit',
	height: 'inherit',
	borderRadius: 'inherit'
};

const width = ['100px', '116px', '152px', '188px', '188px', '224px'];

const PosterImage = <MT extends MediaType>(props: PosterImageProps<MT>): ReactElement => {
	const { colorMode } = useColorMode();

	const { mediaType, image, isLoading = true, inView = false } = props;

	return (
		<AspectRatio width={width} borderRadius='base' ratio={handleReturnRatio('portrait')}>
			<AnimatePresence exitBeforeEnter initial={false}>
				{inView ? (
					<Center {...commonStyleProps} as={Fade} key='image' in unmountOnExit>
						<Skeleton {...commonStyleProps} isLoaded={!isLoading}>
							<Image
								{...commonStyleProps}
								alt={image?.alt || ''}
								boringType={handleReturnBoringTypeByMediaType(mediaType)}
								thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${image?.size.thumbnail || ''}${
									image?.src || ''
								}`}
								fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${image?.size.full || ''}${
									image?.src || ''
								}`}
							/>
						</Skeleton>
					</Center>
				) : (
					<Center {...commonStyleProps} as={Fade} key='dummy-image' width='100%' in unmountOnExit>
						<CUIImage
							{...commonStyleProps}
							alt='dummy-clickable-image'
							width='auto'
							maxWidth='none'
							src={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
						/>
					</Center>
				)}
			</AnimatePresence>
		</AspectRatio>
	);
};

export default PosterImage;
