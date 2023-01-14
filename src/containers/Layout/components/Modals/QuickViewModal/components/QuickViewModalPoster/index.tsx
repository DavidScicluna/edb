import { FC } from 'react';

import { Icon } from '@davidscicluna/component-library';

import { useBoolean, Center } from '@chakra-ui/react';

import { ClickableMedia, Image } from '../../../../../../../components';
import { getRatio } from '../../../../../../../common/utils/ratio';
import { useUserTheme } from '../../../../../../../common/hooks';

import { QuickViewModalPosterProps } from './types';

const QuickViewModalPoster: FC<QuickViewModalPosterProps> = (props) => {
	const { colorMode } = useUserTheme();

	const { alt, src, onClick, ...rest } = props;

	const [isImageError, setIsImageError] = useBoolean();

	return (
		<Center {...rest} width='100%' height='auto'>
			<ClickableMedia
				{...rest}
				colorMode={colorMode}
				width='100%'
				height='auto'
				borderRadius='base'
				ratio={getRatio({ orientation: 'portrait' })}
				renderIcon={(props) => <Icon {...props} icon='search' category='outlined' />}
				isDisabled={isImageError}
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

export default QuickViewModalPoster;
