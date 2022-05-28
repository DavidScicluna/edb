import { ReactElement, useState, useCallback, useEffect } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { useColorMode, useDisclosure, useBoolean, Modal, ModalContent, ModalBody } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';
import { Swiper } from 'swiper';

import { handleConvertStringToNumber } from '../../common/utils';

import Backdrop from './components/Backdrop';
import Gallery from './components/Gallery';
import ImageViewer from './components/ImageViewer';
import Toolkit from './components/Toolkit';
import Actions from './components/Toolkit/components/Actions';
import Navigation from './components/Toolkit/components/Navigation';
import VideoViewer from './components/VideoViewer';
import Viewer from './components/Viewer';
import { MediaViewerProps, Asset, MediaItem, NavigationDirection } from './types';

const handleFlattenAssets = (assets: Asset[]): MediaItem[] => {
	let mediaItems: MediaItem[] = [];

	assets.forEach((asset) => {
		if (asset.mediaItems.length > 0) {
			mediaItems = uniq([...mediaItems, ...asset.mediaItems]);
		}
	});

	return mediaItems;
};

const MediaViewer = (props: MediaViewerProps): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const { isOpen: isGalleryOpen, onOpen: onGalleryOpen, onClose: onGalleryClose } = useDisclosure();

	const { alt, assets, selectedPath, isOpen = false, onClose } = props;

	const [swiper, setSwiper] = useState<Swiper>();

	const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [activeMediaItem, setActiveMediaItem] = useState<MediaItem>();

	const [isHoveringBackdrop, setIsHoveringBackdrop] = useBoolean();

	const handleOnToolkitHover = useCallback(
		debounce((bool: boolean): void => {
			if (bool) {
				setIsHoveringBackdrop.on();
			} else {
				setIsHoveringBackdrop.off();
			}
		}, 250),
		[setIsHoveringBackdrop]
	);

	/**
	 * This method will slide to the image with the index passed
	 *
	 * @param index Number - The index of the image in the list
	 */
	const handleSlideTo = useCallback(
		(index: number) => {
			swiper?.slideTo(index, 0);
		},
		[swiper]
	);

	/**
	 * This method will either slide to the previous slide or to the next slide depending on the direction passed
	 *
	 * @param direction - Either 'prev' or 'next'
	 */
	const handleNavigation = useCallback(
		(direction: NavigationDirection): void => {
			const speed: number = handleConvertStringToNumber(theme.transition.duration.slow, 'ms');

			switch (direction) {
				case 'prev': {
					if (swiper?.allowSlidePrev || false) {
						swiper.slidePrev(speed);
					}
					break;
				}
				case 'next': {
					if (swiper?.allowSlideNext || false) {
						swiper.slideNext(speed);
					}
					break;
				}
				default:
					break;
			}
		},
		[swiper]
	);

	/**
	 * This method will set the active mediaItem on every change
	 */
	const handleSlideChange = useCallback(
		(swiper: Swiper) => {
			const mediaItem = mediaItems.find((_mediaItem, index) => index === swiper.activeIndex);
			const index = mediaItems.findIndex((_mediaItem, index) => index === swiper.activeIndex) || 0;

			setActiveIndex(index);
			setActiveMediaItem(mediaItem);
		},
		[mediaItems, swiper, setActiveMediaItem]
	);

	/**
	 * This method will close the gallery and display the mediaItem image
	 *
	 * @param path - The mediaItem selected
	 */
	const handleGalleryClick = (mediaItem: MediaItem): void => {
		const path = mediaItem.data.file_path || mediaItem.data.key;
		const index = mediaItems.findIndex(({ data: { file_path, key } }) => file_path === path || key === path) || 0;

		setActiveIndex(index);
		setActiveMediaItem(mediaItem);

		handleSlideTo(index);

		onGalleryClose();
	};

	const handleClose = (): void => {
		setIsHoveringBackdrop.off();

		onGalleryClose();
		onClose();
	};

	const handleGalleryClose = (): void => {
		setIsHoveringBackdrop.off();

		onGalleryClose();
	};

	useEffect(() => {
		if (swiper && !isEmpty(mediaItems) && !isEmpty(selectedPath)) {
			const mediaItem = mediaItems.find(
				({ data: { file_path, key } }) => file_path === selectedPath || key === selectedPath
			);
			const index =
				mediaItems.findIndex(
					({ data: { file_path, key } }) => file_path === selectedPath || key === selectedPath
				) || 0;

			setActiveIndex(index);
			setActiveMediaItem(mediaItem);

			handleSlideTo(index);
		}
	}, [swiper, mediaItems, selectedPath]);

	useEffect(() => {
		if (isOpen && !isEmpty(assets) && !isEmpty(assets)) {
			setIsHoveringBackdrop.off();

			setMediaItems(handleFlattenAssets(assets));
		}
	}, [isOpen]);

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={handleClose}
				motionPreset='slideInBottom'
				scrollBehavior='inside'
				size='full'
			>
				<ModalContent backgroundColor={`gray.${colorMode === 'light' ? 900 : 50}`} borderRadius='none' m={0}>
					<ModalBody position='relative' p={0}>
						{isOpen ? (
							<>
								{/* Toolkit */}
								<Toolkit
									renderActions={() => (
										<Actions
											hasFullscreen={activeMediaItem?.type !== 'video'}
											onClose={onClose}
											onGalleryClick={() => onGalleryOpen()}
										/>
									)}
									renderNavigation={() => (
										<Navigation
											current={activeIndex}
											total={mediaItems.length}
											onNavigation={handleNavigation}
										/>
									)}
									onHover={handleOnToolkitHover}
								/>

								{/* Backdrop */}
								<Backdrop isHovering={isHoveringBackdrop} />

								{/* Image & Video Viewer */}
								<Viewer
									renderSlide={(slide) =>
										slide.type === 'image' ? (
											<ImageViewer
												{...slide.data}
												alt={alt}
												boringType={slide.boringType}
												srcSize={slide.srcSize}
											/>
										) : (
											<VideoViewer videoId={slide.data.key} />
										)
									}
									activeIndex={activeIndex}
									mediaItems={mediaItems}
									isDisabled={isGalleryOpen}
									onSwiper={(swiper) => setSwiper(swiper)}
									onSlideChange={handleSlideChange}
									onSwipeVertical={onClose}
									onNavigation={handleNavigation}
								/>
							</>
						) : null}
					</ModalBody>
				</ModalContent>
			</Modal>

			{/* Gallery */}
			{isOpen ? (
				<Gallery
					alt={alt}
					assets={assets}
					activeMediaItem={activeMediaItem}
					isOpen={isGalleryOpen}
					onClick={handleGalleryClick}
					onClose={handleGalleryClose}
				/>
			) : null}
		</>
	);
};

export default MediaViewer;
