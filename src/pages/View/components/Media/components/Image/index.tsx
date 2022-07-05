import { ReactElement } from 'react';

import { Skeleton, Icon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import ClickableImage from '../../../../../../components/Clickable/Image';
import Image from '../../../../../../components/Image';

import { MediaImageProps } from './types';

const posterWidth = ['185px', '205px', '230px'];
const backdropLogoWidth = ['330px', '355px', '380'];

const MediaImage = (props: MediaImageProps): ReactElement => {
	const { alt = '', path, ratio, type, boringType, isLoading = true, onClick } = props;

	const [isError, setIsError] = useBoolean();

	const handleReturnImageSize = (srcType: 'thumbnail' | 'full'): string => {
		switch (type) {
			case 'poster':
				return srcType === 'thumbnail' ? 'w92' : 'original';
			case 'backdrop':
				return srcType === 'thumbnail' ? 'w300' : 'original';
			default:
				return '';
		}
	};

	return (
		<ClickableImage
			width={type === 'poster' ? posterWidth : backdropLogoWidth}
			ratio={ratio}
			borderRadius='lg'
			isDisabled={isLoading || isError || isNil(path) || isEmpty(path)} // TODO: Check if is working!
			renderIcon={({ color, fontSize }) => (
				<Icon icon='search' category='outlined' color={color} fontSize={fontSize} />
			)}
			onClick={onClick}
		>
			<Skeleton borderRadius='lg' isLoaded={!isLoading}>
				<Image
					alt={alt}
					borderRadius='lg'
					boringType={boringType}
					onLoad={() => setIsError.off()}
					onError={() => setIsError.on()}
					thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${handleReturnImageSize('thumbnail')}${path}`}
					fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${handleReturnImageSize('full')}${path}`}
				/>
			</Skeleton>
		</ClickableImage>
	);
};

export default MediaImage;
