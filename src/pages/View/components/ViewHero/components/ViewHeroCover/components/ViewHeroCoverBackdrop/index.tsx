import { FC } from 'react';

import { FontSize, useTheme, Badge, BadgeIcon, BadgeLabel, Icon } from '@davidscicluna/component-library';

import { useBoolean, useConst, Center } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';
import { ClickableMedia, Image } from '../../../../../../../../components';
import { getRatio } from '../../../../../../../../common/utils';

import { ViewHeroCoverBackdropProps } from './types';

const ViewHeroCoverBackdrop: FC<ViewHeroCoverBackdropProps> = ({ hasVideo = false, type, onClick, ...rest }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isImageError, setIsImageError] = useBoolean();

	const sizes = useConst<string[]>(['4xl', '4xl', '5xl', '5xl'].map((size) => theme.fontSizes[size as FontSize]));

	return (
		<ClickableMedia
			colorMode={colorMode}
			width='100%'
			height='100%'
			maxHeight='75vh'
			borderRadius='none'
			renderIcon={(props) => (
				<Icon
					{...props}
					width={sizes}
					height={sizes}
					fontSize={sizes}
					icon={hasVideo ? 'play_arrow' : 'search'}
					category='outlined'
				/>
			)}
			isDisabled={isImageError}
			ratio={getRatio({ orientation: 'landscape' })}
			onClick={onClick}
		>
			<Center width='inherit' height='inherit' position='relative'>
				{hasVideo && type && (
					<Center position='absolute' top={2} right={2} zIndex={1}>
						<Badge color={color} colorMode={colorMode} size='md'>
							<BadgeIcon icon='play_arrow' />
							<BadgeLabel>{`Play ${type}`}</BadgeLabel>
						</Badge>
					</Center>
				)}

				<Image
					{...rest}
					width='inherit'
					height='inherit'
					borderRadius='none'
					onError={() => setIsImageError.on()}
					onLoad={() => setIsImageError.off()}
				/>
			</Center>
		</ClickableMedia>
	);
};

export default ViewHeroCoverBackdrop;
