import { ReactElement, useContext } from 'react';

import { ColorMode, useColorMode, useMediaQuery, HStack, Text } from '@chakra-ui/react';

import { HeaderProps } from './types';

import { PanelContext } from '../../.';
import { handleReturnPadding } from '../../common/utils';
import { Context } from '../../types';

const Header = ({ title, actions, colorMode: colorModeProp }: HeaderProps): ReactElement => {
	const { colorMode: colorModeHook } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { size = 'md', variant = 'outlined' } = useContext<Context>(PanelContext);

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	return (
		<HStack width='100%' alignItems='center' justifyContent='space-between' pb={handleReturnPadding(size, variant)}>
			{title ? (
				typeof title === 'string' ? (
					<Text
						align='left'
						color={`gray.${colorMode === 'light' ? 400 : 500}`}
						fontSize={isSm ? 'md' : 'lg'}
						fontWeight='bold'
						isTruncated
						overflow='hidden'
						whiteSpace='nowrap'
					>
						{title}
					</Text>
				) : (
					title
				)
			) : null}

			{actions ? actions : null}
		</HStack>
	);
};

export default Header;
