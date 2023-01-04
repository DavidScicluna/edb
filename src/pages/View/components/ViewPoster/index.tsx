import { FC } from 'react';

import { useTheme, Icon } from '@davidscicluna/component-library';

import { useBoolean, Center } from '@chakra-ui/react';

import { ClickableMedia, Image } from '../../../../components';
import { getRatio } from '../../../../common/utils';
import { useUserTheme } from '../../../../common/hooks';

import { ViewPosterProps } from './types';

const ViewPoster: FC<ViewPosterProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { alt, src, isFullWidth = false, onClick, ...rest } = props;

	const [isImageError, setIsImageError] = useBoolean();

	return (
		<Center {...rest} width={isFullWidth ? '100%' : theme.fontSizes['9xl']} height='auto'>
			<ClickableMedia
				{...rest}
				colorMode={colorMode}
				width={isFullWidth ? '100%' : theme.fontSizes['9xl']}
				height='auto'
				borderRadius='base'
				renderIcon={(props) => <Icon {...props} icon='search' category='outlined' />}
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
		</Center>
	);
};

export default ViewPoster;
