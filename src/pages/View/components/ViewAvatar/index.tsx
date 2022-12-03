import { FC } from 'react';

import { useTheme, Icon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { ClickableMedia, Image } from '../../../../components';
import { getRatio } from '../../../../common/utils';
import { useUserTheme } from '../../../../common/hooks';

import { ViewAvatarProps } from './types';

const ViewAvatar: FC<ViewAvatarProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { alt, onClick, src } = props;

	const [isImageError, setIsImageError] = useBoolean();

	return (
		<ClickableMedia
			colorMode={colorMode}
			width={theme.fontSizes['9xl']}
			borderRadius='base'
			renderIcon={(props) => (
				<Icon
					{...props}
					width={theme.fontSizes['4xl']}
					height={theme.fontSizes['4xl']}
					fontSize={theme.fontSizes['4xl']}
					icon='search'
					category='outlined'
				/>
			)}
			isDisabled={isImageError}
			ratio={getRatio({ orientation: 'portrait' })}
			onClick={onClick}
		>
			<Image
				alt={alt}
				width='inherit'
				height='inherit'
				borderRadius='base'
				onError={() => setIsImageError.on()}
				onLoad={() => setIsImageError.off()}
				src={src}
			/>
		</ClickableMedia>
	);
};

export default ViewAvatar;
