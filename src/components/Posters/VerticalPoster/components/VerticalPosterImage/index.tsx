import { ReactElement } from 'react';

import { Colors, useTheme, Skeleton, Button, utils } from '@davidscicluna/component-library';

import { useConst, AspectRatio, Center, ScaleFade } from '@chakra-ui/react';

import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { omit } from 'lodash';

import { useUserTheme } from '../../../../../common/hooks';
import { MediaType } from '../../../../../common/types';
import { getRatio, getBoringAvatarSrc, getBoringAvatarVariantByMediaType } from '../../../../../common/utils';
import Image from '../../../../Image';
import {
	inView as defaultInView,
	isFocused as defaultIsFocused,
	isHovering as defaultIsHovering
} from '../../../common/data/defaultPropValues';
import { setQuickViewModal } from '../../../../../store/slices/Modals';

import { VerticalPosterImageProps } from './types';

const { checkIsTouchDevice, getHue } = utils;

const isTouchDevice: boolean = checkIsTouchDevice();

const commonStyleProps = {
	width: 'inherit',
	height: 'inherit',
	borderRadius: 'inherit'
};

const VerticalPosterImage = <MT extends MediaType>(props: VerticalPosterImageProps<MT>): ReactElement => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const dispatch = useDispatch();

	const {
		mediaItem,
		mediaType,
		title,
		image,
		inView = defaultInView,
		isFocused = defaultIsFocused,
		isHovering = defaultIsHovering,
		onSetIsFixed
	} = props;

	const randomID = useConst<string>(uuid());

	return (
		<AspectRatio width='100%' borderRadius='base' ratio={getRatio({ orientation: 'portrait' })}>
			<Center {...commonStyleProps} position='relative'>
				<Skeleton {...commonStyleProps} colorMode={colorMode} isLoaded={inView}>
					<Image
						{...commonStyleProps}
						alt={image.alt}
						src={{
							boring: getBoringAvatarSrc({
								id: mediaItem.id ? String(mediaItem.id) : randomID,
								colors: omit({ ...theme.colors }, ['transparent', 'black', 'white']) as Colors,
								hue: getHue({ colorMode, type: 'color' }),
								size: 500,
								variant: getBoringAvatarVariantByMediaType({ mediaType })
							}),
							fallback: `${process.env.REACT_APP_IMAGE_URL}/${image.size.fallback}${image.src}`,
							full: `${process.env.REACT_APP_IMAGE_URL}/${image.size.full}${image.src}`
						}}
					/>
				</Skeleton>

				{/* Quick View component */}
				{!!mediaItem && !isTouchDevice && mediaType !== 'company' && (
					<Center
						as={ScaleFade}
						width='100%'
						position='absolute'
						bottom={theme.space[1]}
						in={isHovering || isFocused}
						onMouseEnter={() => onSetIsFixed.on()}
						onMouseLeave={() => onSetIsFixed.off()}
						px={1}
					>
						<Button
							color={color}
							colorMode={colorMode}
							isFullWidth
							onClick={(event) => {
								event.preventDefault();
								event.stopPropagation();

								dispatch(
									setQuickViewModal({
										isOpen: true,
										mediaType,
										mediaItem: mediaItem.id ? { id: mediaItem.id, title } : null
									})
								);
							}}
							size='sm'
						>
							Quick view
						</Button>
					</Center>
				)}
			</Center>
		</AspectRatio>
	);
};

export default VerticalPosterImage;
