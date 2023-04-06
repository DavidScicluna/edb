import { ReactElement } from 'react';

import { Colors, ButtonMouseEvent, useTheme, Image, Button, ScaleFade, utils } from '@davidscicluna/component-library';

import { useConst, AspectRatio, Box } from '@chakra-ui/react';

import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { omit } from 'lodash';

import { useUserTheme } from '../../../../../common/hooks';
import { MediaType } from '../../../../../common/types';
import { getBoringAvatarSrc, getBoringAvatarVariantByMediaType } from '../../../../../common/utils';
import { getRatio } from '../../../../../common/utils/ratio';
import { isFocused as defaultIsFocused, isHovering as defaultIsHovering } from '../../../common/data/defaultPropValues';
import { setQuickViewModal } from '../../../../../store/slices/Modals';

import { VerticalPosterImageProps } from './types';

const { checkIsTouchDevice, getHue } = utils;

const isTouchDevice: boolean = checkIsTouchDevice();

const border = 2;

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
		title,
		mediaItem,
		mediaType,
		image,
		inView,
		isFocused = defaultIsFocused,
		isHovering = defaultIsHovering,
		onSetIsFixed
	} = props;

	const randomID = useConst<string>(uuid());

	return (
		<AspectRatio
			{...commonStyleProps}
			width='100%'
			ratio={getRatio({ orientation: 'portrait' })}
			overflow='hidden'
			borderRadius={`${theme.radii.lg} ${theme.radii.lg} ${theme.radii.none} ${theme.radii.none}`}
		>
			<Box
				{...commonStyleProps}
				position='relative'
				sx={{
					width: `calc(100% - ${border * 2}px) !important`,
					height: `calc(100% - ${border}px) !important`,

					top: `${border}px !important`,
					right: `${border}px !important`,
					left: `${border}px !important`,

					borderRadius: `${theme.space['1.75']} ${theme.space['1.75']} ${theme.radii.none} ${theme.radii.none}`
				}}
			>
				<Image
					{...commonStyleProps}
					alt={image.alt}
					src={{
						boring: inView
							? getBoringAvatarSrc({
									id: mediaItem.id ? String(mediaItem.id) : randomID,
									colors: omit({ ...theme.colors }, ['transparent', 'black', 'white']) as Colors,
									hue: getHue({ colorMode, type: 'color' }),
									size: 500,
									variant: getBoringAvatarVariantByMediaType({ mediaType })
							  })
							: undefined,
						thumbnail: inView
							? `${import.meta.env.VITE_IMAGE_URL}/${image.size.thumbnail}${image.src}`
							: undefined,
						full: inView ? `${import.meta.env.VITE_IMAGE_URL}/${image.size.full}${image.src}` : undefined
					}}
				/>

				{/* Quick View component */}
				{!!mediaItem && !isTouchDevice && mediaType !== 'company' && (
					<Box
						as={ScaleFade}
						width='100%'
						position='absolute'
						bottom={theme.space[1]}
						in={isHovering || isFocused}
						unmountOnExit={false}
						onMouseEnter={() => onSetIsFixed.on()}
						onMouseLeave={() => onSetIsFixed.off()}
						px={1}
					>
						<Button
							color={color}
							colorMode={colorMode}
							isFullWidth
							onClick={(event: ButtonMouseEvent) => {
								event.preventDefault();
								event.stopPropagation();

								dispatch(setQuickViewModal({ isOpen: true, mediaType, mediaItem, title }));
							}}
							size='xs'
						>
							Quick view
						</Button>
					</Box>
				)}
			</Box>
		</AspectRatio>
	);
};

export default VerticalPosterImage;
