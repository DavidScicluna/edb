import { FC, useState, useEffect } from 'react';

import { useTheme, Badge, BadgeIcon, BadgeLabel, Icon, utils } from '@davidscicluna/component-library';

import { useBoolean, useConst, Center } from '@chakra-ui/react';

import { useInView } from 'react-cool-inview';

import { ClickableMedia, Image } from '../../../../../../components';
import { formatMediaTypeLabel, getRatio } from '../../../../../../common/utils';
import { useUserTheme } from '../../../../../../common/hooks';

import { ViewVideosVideoProps } from './types';

const { convertREMToPixels, convertStringToNumber } = utils;

const ViewVideosVideo: FC<ViewVideosVideoProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { observe: photorRef, inView } = useInView<HTMLDivElement>({
		unobserveOnEnter: true,
		rootMargin: `${convertREMToPixels(convertStringToNumber(theme.space[4], 'rem'))}px`
	});

	const { mediaType, index, video } = props;
	const { name, site, type, key } = video;

	const [thumbnail, setThumbnail] = useState<string>('');
	const [full, setFull] = useState<string>('');

	const [isImageError, setIsImageError] = useBoolean();

	const alt = useConst<string>(
		name
			? `${name} ${type || 'video'} ${index + 1}`
			: `${formatMediaTypeLabel({ type: 'single', mediaType })} ${type || 'video'} ${index + 1}`
	);

	// const handleGetDuration = (): void => {
	// 	const iframe = document.createElement('iframe');
	// 	iframe.src = `https://www.youtube.com/embed/${key}`;
	// };

	const handleGetThumbnail = (): void => {
		switch (site) {
			case 'YouTube': {
				// handleGetDuration();

				setThumbnail(`https://img.youtube.com/vi/${key}/sddefault.jpg`);
				setFull(`http://img.youtube.com/vi/${key}/hqdefault.jpg`);
				break;
			}
		}
	};

	useEffect(() => handleGetThumbnail(), [key]);

	return (
		<ClickableMedia
			ref={photorRef}
			colorMode={colorMode}
			width='100%'
			height='100%'
			overflow='hidden'
			borderRadius='lg'
			ratio={getRatio({ orientation: 'square' })}
			renderIcon={(props) => <Icon {...props} icon='play_arrow' category='outlined' />}
			isDisabled={isImageError}
			// onClick={onClick}
		>
			<Center width='inherit' height='inherit' position='relative'>
				<Center position='absolute' top={2} left={2} zIndex={1}>
					<Badge color={color} colorMode={colorMode} size='xs'>
						<BadgeIcon icon='play_arrow' />
						<BadgeLabel>{`Play ${type}`}</BadgeLabel>
					</Badge>
				</Center>

				{/* TODO: Once VideoPlayer is created find a way to get duration */}
				{/* <Center position='absolute' bottom={2} right={2} zIndex={1}>
					<Badge colorMode={colorMode} size='xs'>
						<BadgeLabel>00:12:43</BadgeLabel>
					</Badge>
				</Center> */}

				<Image
					alt={alt}
					width='inherit'
					height='inherit'
					borderRadius='base'
					onError={() => setIsImageError.on()}
					onLoad={() => setIsImageError.off()}
					src={{
						thumbnail: inView ? thumbnail : undefined,
						full: inView ? full : undefined
					}}
				/>
			</Center>
		</ClickableMedia>
	);
};

export default ViewVideosVideo;
