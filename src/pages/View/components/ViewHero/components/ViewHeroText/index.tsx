import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';

import { ViewHeroTextProps } from './types';

const { getColor } = utils;

const ViewHeroText: FC<ViewHeroTextProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const {
		children,
		color = getColor({ theme, colorMode, type: 'text.primary' }),
		whiteSpace = 'nowrap',
		...rest
	} = props;

	return (
		<Text {...rest} align='left' color={color} fontSize='md' lineHeight='shorter' whiteSpace={whiteSpace}>
			{children}
		</Text>
	);
};

export default ViewHeroText;
