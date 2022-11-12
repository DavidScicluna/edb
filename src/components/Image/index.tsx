import { FC, useCallback, useEffect } from 'react';

import { useTheme, Style, Fade, assets } from '@davidscicluna/component-library';

import { useBoolean, Center, Image as CUIImage, ImageProps as CUIImageProps } from '@chakra-ui/react';

import { useUserTheme } from '../../common/hooks';

import { ImageProps } from './types';

const { fallback } = assets;

const p: CUIImageProps = {
	align: 'center',
	fallbackStrategy: 'onError',
	loading: 'lazy'
};

const Image: FC<ImageProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { alt, borderRadius = 'base', fit = 'cover', onError, onLoad, src, ...rest } = props;
	const { full, thumbnail, boring } = src;

	const [isFullVisible, setIsFullVisible] = useBoolean();
	const [isThumbnailVisible, setIsThumbnailVisible] = useBoolean();
	const [isBoringVisible, setIsBoringVisible] = useBoolean();

	const sx: Style = { width: '100%', height: '100%', position: 'absolute', borderRadius };

	const handleCheckModeVisibility = useCallback((): void => {
		if (thumbnail) {
			setIsThumbnailVisible.on();
		} else if (full) {
			setIsFullVisible.on();
		} else if (boring) {
			setIsBoringVisible.on();
		}
	}, [full, thumbnail, boring]);

	useEffect(() => handleCheckModeVisibility(), [full, thumbnail, boring]);

	return (
		<Center position='relative' sx={{ ...sx }}>
			{/* Fallback image */}
			<Center as={Fade} in={!isFullVisible && !isThumbnailVisible && !isBoringVisible} sx={{ ...sx }}>
				<CUIImage
					{...rest}
					{...p}
					alt={`${alt} fallback image`}
					objectFit={fit}
					src={colorMode === 'light' ? fallback.light : fallback.dark}
					sx={{ ...sx }}
				/>
			</Center>

			{/* Boring image */}
			{!!boring && (
				<Center as={Fade} in={isBoringVisible} sx={{ ...sx }}>
					<CUIImage
						{...rest}
						{...p}
						alt={`${alt} boring image`}
						objectFit={fit}
						onError={(error) => {
							setIsBoringVisible.off();

							if (onError) {
								onError(error);
							}
						}}
						onLoad={(event) => {
							setIsFullVisible.off();
							setIsThumbnailVisible.off();

							if (onLoad) {
								onLoad(event);
							}
						}}
						src={boring}
						sx={{ ...sx }}
					/>
				</Center>
			)}

			{/* Thumbnail image */}
			{!!thumbnail && (
				<Center as={Fade} in={isThumbnailVisible} sx={{ ...sx }}>
					<Center sx={{ ...sx, position: 'relative' }}>
						<Center
							sx={{
								...sx,
								zIndex: 1,
								backdropFilter: `blur(${theme.space[0.5]})`,
								WebkitBackdropFilter: `blur(${theme.space[0.5]})`
							}}
						/>
						<CUIImage
							{...rest}
							{...p}
							alt={`${alt} thumbnail image`}
							objectFit={fit}
							onError={(error) => {
								setIsBoringVisible.on();
								setIsThumbnailVisible.off();

								if (onError) {
									onError(error);
								}
							}}
							onLoad={(event) => {
								setIsFullVisible.on();

								if (onLoad) {
									onLoad(event);
								}
							}}
							src={thumbnail}
							sx={{ ...sx }}
						/>
					</Center>
				</Center>
			)}

			{/* Full image */}
			{!!full && (
				<Center as={Fade} in={isFullVisible} sx={{ ...sx }}>
					<CUIImage
						{...rest}
						{...p}
						alt={alt}
						objectFit={fit}
						onError={(error) => {
							setIsBoringVisible.on();
							setIsFullVisible.off();

							if (onError) {
								onError(error);
							}
						}}
						onLoad={(event) => {
							setIsThumbnailVisible.off();

							if (onLoad) {
								onLoad(event);
							}
						}}
						src={full}
						sx={{ ...sx }}
					/>
				</Center>
			)}
		</Center>
	);
};

export default Image;
