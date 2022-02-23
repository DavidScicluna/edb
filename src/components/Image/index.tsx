import { ReactElement, useState } from 'react';

import { useColorMode, useBoolean, Center, Image as CUIImage, Fade } from '@chakra-ui/react';

import { ImageProps } from './types';

import * as fallback from '../../common/assets/fallback';
import { handleReturnBoringSrc } from '../../common/utils';

const Image = (props: ImageProps): ReactElement => {
	const { colorMode } = useColorMode();

	const {
		width,
		height,
		maxWidth,
		alt,
		thumbnailSrc,
		fullSrc,
		boringType,
		borderRadius = 'base',
		onError,
		onLoad,
		...rest
	} = props;

	const [fallbackSrc] = useState<string>(handleReturnBoringSrc(boringType, colorMode === 'light' ? 500 : 400));

	const [isThumbnailLoaded, setIsThumbnailLoaded] = useBoolean();
	const [isThumbnailError, setIsThumbnailError] = useBoolean();

	const [isFullLoaded, setIsFullLoaded] = useBoolean();
	const [isFullError, setIsFullError] = useBoolean();

	const centerProps = {
		width: '100%',
		height: '100%',
		borderRadius
	};

	return (
		<Center position='relative' {...centerProps}>
			{/* Fallback image */}
			<Center as={Fade} position='absolute' {...centerProps} in={isThumbnailError || isFullError} unmountOnExit>
				<CUIImage
					{...rest}
					width={width || 'auto'}
					height={height || width ? 'auto' : '100%'}
					maxWidth={maxWidth || 'none'}
					alt={`${alt} fallback image`}
					position='absolute'
					borderRadius={borderRadius}
					src={fallbackSrc}
					fallbackSrc={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
				/>
			</Center>

			{/* Thumbnail image */}
			<Center
				as={Fade}
				position='absolute'
				{...centerProps}
				in={!isThumbnailError && !isFullLoaded}
				unmountOnExit
			>
				<CUIImage
					{...rest}
					width={width || 'auto'}
					height={height || width ? 'auto' : '100%'}
					maxWidth={maxWidth || 'none'}
					position='absolute'
					alt={`${alt} thumbnail`}
					borderRadius={borderRadius}
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
					fallbackSrc={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
				/>
			</Center>

			{/* Full size image */}
			<Center as={Fade} position='absolute' {...centerProps} in={!isFullError && isThumbnailLoaded} unmountOnExit>
				<CUIImage
					{...rest}
					width={width || 'auto'}
					height={height || width ? 'auto' : '100%'}
					maxWidth={maxWidth || 'none'}
					position='absolute'
					alt={alt}
					borderRadius={borderRadius}
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
				/>
			</Center>
		</Center>
	);
};

export default Image;
