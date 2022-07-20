import { FC, memo } from 'react';

import { Style } from '@davidscicluna/component-library';

import { useBoolean, Center, Image as CUIImage, ImageProps as CUIImageProps, Fade } from '@chakra-ui/react';

import * as fallback from '../../common/assets/fallback';
import { useUserTheme } from '../../common/hooks';

import { ImageProps } from './types';

const p: CUIImageProps = {
	align: 'center',
	fallbackStrategy: 'onError',
	loading: 'lazy'
};

const Image: FC<ImageProps> = (props) => {
	const { colorMode } = useUserTheme();

	const { alt, borderRadius = 'base', fit = 'cover', onError, onLoad, src, ...rest } = props;

	const [isFullLoaded, setIsFullLoaded] = useBoolean();
	const [isFullError, setIsFullError] = useBoolean();

	const [isThumbnailError, setIsThumbnailError] = useBoolean();

	const sx: Style = { width: '100%', height: '100%', position: 'absolute', borderRadius };

	return (
		<Center position='relative' sx={{ ...sx }}>
			{/* Fallback & Boring image */}
			<Center as={Fade} in={isFullError && isThumbnailError} unmountOnExit sx={{ ...sx }}>
				<CUIImage
					{...rest}
					{...p}
					alt={`${alt} fallback image`}
					objectFit={fit}
					src={src.boring}
					fallbackSrc={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
					sx={{ ...sx }}
				/>
			</Center>

			{/* Thumbnail image */}
			<Center as={Fade} in={!(isThumbnailError || isFullLoaded)} unmountOnExit sx={{ ...sx }}>
				<CUIImage
					{...rest}
					{...p}
					alt={`${alt} thumbnail image`}
					objectFit={fit}
					onError={(error) => {
						// setIsThumbnailLoaded.off();
						setIsThumbnailError.on();

						if (onError) {
							onError(error);
						}
					}}
					onLoad={(event) => {
						// setIsThumbnailLoaded.on();
						setIsThumbnailError.off();

						setIsFullError.off();

						if (onLoad) {
							onLoad(event);
						}
					}}
					src={src.fallback}
					sx={{ ...sx }}
				/>
			</Center>

			{/* Full size image */}
			<Center as={Fade} in={!isFullError} unmountOnExit sx={{ ...sx }}>
				<CUIImage
					{...rest}
					{...p}
					alt={alt}
					objectFit={fit}
					onError={(error) => {
						setIsFullLoaded.off();
						setIsFullError.on();

						if (onError) {
							onError(error);
						}
					}}
					onLoad={(event) => {
						setIsFullLoaded.on();
						setIsFullError.off();

						if (onLoad) {
							onLoad(event);
						}
					}}
					src={src.full}
					sx={{ ...sx }}
				/>
			</Center>
		</Center>
	);
};

export default memo(Image);
