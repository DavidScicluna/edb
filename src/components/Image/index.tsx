import { ReactElement, memo } from 'react';

import { Style, useTheme } from '@davidscicluna/component-library';

import { ColorMode, useColorMode, useBoolean, useConst, Center, Image as CUIImage, Fade } from '@chakra-ui/react';

import { v4 as uuid } from 'uuid';

import * as fallback from '../../common/assets/fallback';
import { handleReturnBoringSrc } from '../../common/utils';

import { ImageProps } from './types';

const Image = (props: ImageProps): ReactElement => {
	const theme = useTheme();
	const { colorMode: colorModeHook } = useColorMode();

	const {
		alt,
		thumbnailSrc,
		fullSrc,
		boringType,
		borderRadius = 'base',
		objectFit,
		colorMode: colorModeProp,
		onError,
		onLoad,
		...rest
	} = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	const [isFullLoaded, setIsFullLoaded] = useBoolean();
	const [isFullError, setIsFullError] = useBoolean(true);

	const [isThumbnailLoaded, setIsThumbnailLoaded] = useBoolean();
	const [isThumbnailError, setIsThumbnailError] = useBoolean();

	const [isBoringLoaded, setIsBoringLoaded] = useBoolean();
	const [isBoringError, setIsBoringError] = useBoolean();

	const fallbackID = useConst<string>(uuid());
	const fallbackSrc = useConst<string>(
		handleReturnBoringSrc(theme, boringType, colorMode === 'light' ? 500 : 400, fallbackID)
	);

	const sx: Style = {
		width: '100%',
		height: '100%',
		borderRadius,
		position: 'absolute'
	};

	return (
		<Center position='relative' sx={{ ...sx }}>
			{/* Fallback image */}
			<Center as={Fade} in={!(isFullLoaded || isThumbnailLoaded || isBoringLoaded)} unmountOnExit sx={{ ...sx }}>
				<CUIImage
					{...rest}
					alt={`${alt} fallback image`}
					objectFit={objectFit || 'cover'}
					src={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
					sx={{ ...sx }}
				/>
			</Center>

			{/* Boring image */}
			<Center as={Fade} in={!isBoringError && isFullError && isThumbnailError} unmountOnExit sx={{ ...sx }}>
				<CUIImage
					{...rest}
					alt={`${alt} boring image`}
					objectFit={objectFit || 'cover'}
					onError={() => {
						setIsBoringLoaded.off();
						setIsBoringError.on();
					}}
					onLoad={() => {
						setIsBoringLoaded.on();
						setIsBoringError.off();
					}}
					src={fallbackSrc}
					sx={{ ...sx }}
				/>
			</Center>

			{/* Thumbnail image */}
			<Center as={Fade} in={!isThumbnailError} unmountOnExit sx={{ ...sx }}>
				<CUIImage
					{...rest}
					alt={`${alt} thumbnail`}
					objectFit={objectFit || 'cover'}
					onError={(error) => {
						setIsThumbnailLoaded.off();
						setIsThumbnailError.on();

						if (onError) {
							onError(error);
						}
					}}
					onLoad={(event) => {
						setIsThumbnailLoaded.on();
						setIsThumbnailError.off();

						setIsFullError.off();

						if (onLoad) {
							onLoad(event);
						}
					}}
					src={thumbnailSrc}
					sx={{ ...sx }}
				/>
			</Center>

			{/* Full size image */}
			<Center as={Fade} in={!isFullError && isThumbnailLoaded} unmountOnExit sx={{ ...sx }}>
				<CUIImage
					{...rest}
					alt={alt}
					objectFit={objectFit || 'cover'}
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
					src={fullSrc}
					sx={{ ...sx }}
				/>
			</Center>
		</Center>
	);
};

export default memo(Image);
