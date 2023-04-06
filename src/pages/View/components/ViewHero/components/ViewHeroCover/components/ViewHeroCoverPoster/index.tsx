import { FC } from 'react';

import { useTheme, Image, Icon, utils } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';
import { ClickableMedia } from '../../../../../../../../components';
import { getRatio } from '../../../../../../../../common/utils/ratio';

import { ViewHeroCoverPosterProps } from './types';

const { getColor } = utils;

const ViewHeroCoverPoster: FC<ViewHeroCoverPosterProps> = ({ onClick, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isImageError, setIsImageError] = useBoolean();

	return (
		<ClickableMedia
			colorMode={colorMode}
			width={['100%', '100%', '250px', '300px']}
			borderRadius='base'
			overflowX='hidden'
			overflowY='hidden'
			ratio={getRatio({ orientation: 'portrait' })}
			renderIcon={(props) => <Icon {...props} icon='search' category='outlined' />}
			isDisabled={isImageError}
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
