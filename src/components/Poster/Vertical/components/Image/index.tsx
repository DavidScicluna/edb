import { ReactElement } from 'react';

import { useTheme, Skeleton, Button } from '@davidscicluna/component-library';

import { useColorMode, AspectRatio, Center, Image as CUIImage, ScaleFade, Fade } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import * as fallback from '../../../../../common/assets/fallback';
import { useSelector } from '../../../../../common/hooks';
import { MediaType } from '../../../../../common/types';
import { handleIsTouchDevice, handleReturnBoringTypeByMediaType, handleReturnRatio } from '../../../../../common/utils';
import { setQuickView } from '../../../../../store/slices/Modals';
import { defaultUser, getUser } from '../../../../../store/slices/Users';
import Image from '../../../../Image';

import { PosterImageProps } from './types';

const commonStyleProps = {
	width: 'inherit',
	height: 'inherit',
	borderRadius: 'inherit'
};

const isTouchDevice: boolean = handleIsTouchDevice();

const PosterImage = <MT extends MediaType>(props: PosterImageProps<MT>): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const dispatch = useDispatch();
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const {
		mediaItem,
		mediaType,
		title,
		image,
		isFocused = false,
		isLoading = true,
		isHovering = false,
		inView = false,
		onMouseChange
	} = props;

	return (
		<AspectRatio width='100%' borderRadius='base' ratio={handleReturnRatio('portrait')}>
			<AnimatePresence exitBeforeEnter initial={false}>
				{inView ? (
					<Center {...commonStyleProps} as={Fade} key='image' position='relative' in unmountOnExit>
						<>
							<Skeleton {...commonStyleProps} isLoaded={!isLoading}>
								<Image
									{...commonStyleProps}
									alt={image?.alt || ''}
									borderRadius='base'
									boringType={handleReturnBoringTypeByMediaType(mediaType)}
									thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${image?.size.thumbnail || ''}${
										image?.src || ''
									}`}
									fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${image?.size.full || ''}${
										image?.src || ''
									}`}
								/>
							</Skeleton>

							{/* Quick View component */}
							{!(isNil(mediaItem) || isEmpty(mediaItem)) && !isTouchDevice && mediaType !== 'company' ? (
								<Center
									as={ScaleFade}
									position='absolute'
									bottom={theme.space[1]}
									width='100%'
									in={(isHovering || isFocused) && !isLoading}
									unmountOnExit
									onMouseEnter={() => onMouseChange(true)}
									onMouseLeave={() => onMouseChange(false)}
									px={1}
								>
									<Button
										color={color}
										isFullWidth
										onClick={(event) => {
											event.preventDefault();
											event.stopPropagation();

											dispatch(
												setQuickView({
													open: true,
													mediaType,
													mediaItem: { id: mediaItem?.id || -1, title }
												})
											);
										}}
										size='sm'
									>
										Quick view
									</Button>
								</Center>
							) : null}
						</>
					</Center>
				) : (
					<Center {...commonStyleProps} as={Fade} key='dummy-image' width='100%' in unmountOnExit>
						<CUIImage
							{...commonStyleProps}
							alt='dummy-clickable-image'
							width='auto'
							maxWidth='none'
							src={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
						/>
					</Center>
				)}
			</AnimatePresence>
		</AspectRatio>
	);
};

export default PosterImage;
