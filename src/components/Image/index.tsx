import { ReactElement, memo } from 'react';

import {
	ColorMode,
	useTheme,
	useColorMode,
	useBoolean,
	useConst,
	Center,
	Image as CUIImage,
	Fade
} from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';
import { v4 as uuid } from 'uuid';

import { ImageProps } from './types';

import * as fallback from '../../common/assets/fallback';
import { Style } from '../../common/types';
import { handleReturnBoringSrc } from '../../common/utils';
import { Theme } from '../../theme/types';

const Image = (props: ImageProps): ReactElement => {
	const theme = useTheme<Theme>();
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
	const [isBoringError, setIsBoringError] = useBoolean(true);

	const fallbackID = useConst<string>(uuid());
	const fallbackSrc = useConst<string>(
		handleReturnBoringSrc(theme, boringType, colorMode === 'light' ? 500 : 400, fallbackID)
	);

	const commonProps: Style = {
		width: '100%',
		height: '100%',
		borderRadius,
		position: 'absolute'
	};

	useUpdateEffect(() => {
		if (isThumbnailLoaded) {
			setIsFullError.off();
			setIsBoringError.off();
		}
	}, [isThumbnailLoaded]);

	return (
		<Center position='relative' sx={{ ...commonProps }}>
			{/* Fallback image */}
			<Center
				as={Fade}
				in={!(isFullLoaded || isThumbnailLoaded || isBoringLoaded)}
				unmountOnExit
				sx={{ ...commonProps }}
			>
				<CUIImage
					{...rest}
					alt={`${alt} fallback image`}
					objectFit={objectFit || 'cover'}
					src={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
					sx={{ ...commonProps }}
				/>
			</Center>

			{/* Boring image */}
			<Center
				as={Fade}
				in={!isBoringError && !isThumbnailLoaded && !isFullLoaded}
				unmountOnExit
				sx={{ ...commonProps }}
			>
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
					sx={{ ...commonProps }}
				/>
			</Center>

			{/* Thumbnail image */}
			<Center as={Fade} in={!isThumbnailError && !isFullLoaded} unmountOnExit sx={{ ...commonProps }}>
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

						if (onLoad) {
							onLoad(event);
						}
					}}
					src={thumbnailSrc}
					sx={{ ...commonProps }}
				/>
			</Center>

			{/* Full size image */}
			<Center as={Fade} in={!isFullError && isThumbnailLoaded} unmountOnExit sx={{ ...commonProps }}>
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
					sx={{ ...commonProps }}
				/>
			</Center>
		</Center>
	);
};

export default memo(Image);
