import { FC } from 'react';

import { FontSize, useTheme, Icon, utils } from '@davidscicluna/component-library';

import { useBoolean, useConst } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';
import { ClickableMedia, Image } from '../../../../../../../../components';
import { getRatio } from '../../../../../../../../common/utils';

import { ViewHeroCoverPosterProps } from './types';

const { getColor } = utils;

const ViewHeroCoverPoster: FC<ViewHeroCoverPosterProps> = ({ onClick, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isImageError, setIsImageError] = useBoolean();

	const sizes = useConst<string[]>(['4xl', '4xl', '5xl', '5xl'].map((size) => theme.fontSizes[size as FontSize]));

	return (
		<ClickableMedia
			colorMode={colorMode}
			width={['100%', '100%', '250px', '300px']}
			borderRadius='base'
			overflowX='hidden'
			overflowY='hidden'
			renderIcon={(props) => (
				<Icon {...props} width={sizes} height={sizes} fontSize={sizes} icon='search' category='outlined' />
			)}
			isDisabled={isImageError}
			ratio={getRatio({ orientation: 'portrait' })}
			onClick={onClick}
		>
			<Image
				{...rest}
				width='inherit'
				height='inherit'
				borderWidth={['0px', '0px', '4px', '4px']}
				borderStyle='solid'
				borderColor={getColor({ theme, colorMode, type: 'divider' })}
				borderRadius='base'
				onError={() => setIsImageError.on()}
				onLoad={() => setIsImageError.off()}
			/>
		</ClickableMedia>
	);
};

export default ViewHeroCoverPoster;
