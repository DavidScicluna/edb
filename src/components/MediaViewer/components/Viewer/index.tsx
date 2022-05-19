import { ReactElement, useCallback } from 'react';

import { useTheme, Center, SlideFade } from '@chakra-ui/react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Swiper as SwiperType } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { useEventListener } from 'usehooks-ts';


import {
	handleIsTouchDevice,
	handleParseDurationForFramer,
	handleConvertStringToNumber
} from '../../../../common/utils';
import { Theme } from '../../../../theme/types';

import { ViewerProps, SwiperDirection, ViewerEvent } from './types';

const isTouchDevice: boolean = handleIsTouchDevice();

const Viewer = (props: ViewerProps): ReactElement => {
	const theme = useTheme<Theme>();

	const {
		activeIndex = 0,
		mediaItems = [],
		isDisabled = false,
		renderSlide,
		onSwiper,
		onSlideChange,
		onNavigation,
		onSwipeVertical
	} = props;

	/**
	 * This method will either navigate to the left/right depending on the key pressed
	 */
	const handleKeyPress = useCallback(
		(event: ViewerEvent): void => {
			if (!isDisabled && event && event?.key) {
				switch (event.key) {
					case 'ArrowLeft':
						onNavigation('prev');
						break;
					case 'ArrowRight':
						onNavigation('next');
						break;
					default:
						break;
				}
			}
		},
		[isDisabled, onNavigation]
	);

	/**
	 * This method will close the modal if user is on touch device
	 * And user swipes either up/down
	 *
	 * @param Swiper - Swiper data object
	 */
	const handleSwipe = (swiper: SwiperDirection): void => {
		if (isTouchDevice && swiper.swipeDirection === undefined) {
			onSwipeVertical();
		}
	};

	useEventListener('keydown', handleKeyPress);

	return (
		<Swiper
			allowSlideNext={activeIndex <= mediaItems.length}
			allowSlidePrev={activeIndex >= 1}
			spaceBetween={96}
			slidesPerView={1}
			onUpdate={(swiper) => onSwiper(swiper)}
			onSwiper={(swiper) => onSwiper(swiper)}
			onSlideChange={(swiper) => onSlideChange(swiper)}
			onTouchEnd={(swiper: SwiperType) => handleSwipe(swiper)}
		>
			{mediaItems.map((slide, index) => (
				<SwiperSlide key={index}>
					<Center
						as={SlideFade}
						width='100%'
						height='100vh'
						in={activeIndex === index}
						offsetY='15vh'
						delay={handleParseDurationForFramer(
							handleConvertStringToNumber(theme.transition.duration.slow, 'ms')
						)}
						unmountOnExit
					>
						{renderSlide(slide)}
					</Center>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default Viewer;
