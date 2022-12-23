import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';
import ViewHeroText from '../ViewHeroText';

import { ViewHeroLabelProps } from './types';

const { getColor } = utils;

const ViewHeroLabel: FC<ViewHeroLabelProps> = ({ children, label, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<VStack {...rest} alignItems='flex-start' justifyContent='center' spacing={0.5}>
			<ViewHeroText
				color={getColor({ theme, colorMode, type: 'text.secondary' })}
				fontWeight='semibold'
				textTransform='capitalize'
				noOfLines={1}
			>
				{label}
			</ViewHeroText>

			{children}
		</VStack>
	);
};

export default ViewHeroLabel;
