import { ReactElement } from 'react';

import { Icon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { handleReturnBoringTypeByMediaType } from '../../../../../../common/utils';
import ClickableImage from '../../../../../../components/Clickable/Image';
import Image from '../../../../../../components/Image';
import Skeleton from '../../../../../../components/Skeleton';

import { AssetImageProps } from './types';

const AssetImage = (props: AssetImageProps): ReactElement => {
	const { alt, aspect_ratio, file_path, srcSize, isLoading = true, onClickImage } = props;

	const [isError, setIsError] = useBoolean();

	return (
		<ClickableImage
			width='100%'
			ratio={aspect_ratio}
			borderRadius='lg'
			isDisabled={isLoading || isError || isNil(file_path) || isEmpty(file_path)} // TODO: Check if is working!
			renderIcon={({ color, fontSize }) => (
				<Icon icon='search' category='outlined' color={color} fontSize={fontSize} />
			)}
			onClick={onClickImage ? () => onClickImage(file_path || '') : undefined}
		>
			<Skeleton borderRadius='lg' isLoaded={!isLoading}>
				<Image
					alt={`${alt ? `"${alt}"` : ''} image`}
					borderRadius='lg'
					boringType={handleReturnBoringTypeByMediaType('collection')}
					onLoad={() => setIsError.off()}
					onError={() => setIsError.on()}
					thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[0]}${file_path || ''}`}
					fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[1]}${file_path || ''}`}
				/>
			</Skeleton>
		</ClickableImage>
	);
};

export default AssetImage;
