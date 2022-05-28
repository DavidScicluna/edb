import { ReactElement } from 'react';

import { Icon } from '@davidscicluna/component-library';
import { useBoolean } from '@chakra-ui/react';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import ClickableImage from '../../../../../Clickable/Image';
import Image from '../../../../../Image';

import { GalleryImageProps } from './types';

const GalleryImage = (props: GalleryImageProps): ReactElement => {
	const { alt = '', ratio, path, boringType, srcSize, colorMode, isActive = false, onClick } = props;

	const [isError, setIsError] = useBoolean();

	return (
		<ClickableImage
			width='100%'
			ratio={ratio}
			borderRadius='lg'
			colorMode={colorMode}
			isActive={isActive}
			isDisabled={isError || isNil(path) || isEmpty(path)} // TODO: Check if is working!
			renderIcon={({ color, fontSize }) => (
				<Icon icon='search' category='outlined' color={color} fontSize={fontSize} />
			)}
			onClick={onClick}
		>
			<Image
				alt={alt}
				borderRadius='lg'
				boringType={boringType}
				onLoad={() => setIsError.off()}
				onError={() => setIsError.on()}
				thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[0]}${path}`}
				fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[1]}${path}`}
			/>
		</ClickableImage>
	);
};

export default GalleryImage;
