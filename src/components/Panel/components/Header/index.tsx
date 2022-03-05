import { ReactElement, useContext } from 'react';

import { ColorMode, useColorMode, useMediaQuery, HStack, Center, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { HeaderProps } from './types';

import { PanelContext } from '../../.';
import { handleReturnPadding } from '../../common/utils';
import { Context } from '../../types';

const Header = ({ title, actions, colorMode: colorModeProp }: HeaderProps): ReactElement => {
	const { colorMode: colorModeHook } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { size = 'md', variant = 'outlined' } = useContext<Context>(PanelContext);

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	const [ref, { width }] = useElementSize();

	return (
		<HStack
			width='100%'
			alignItems='center'
			justifyContent='space-between'
			pb={handleReturnPadding(size, variant)}
			spacing={2}
		>
			{title ? (
				<Center width={`calc(100% - ${actions ? width + 16 : 0}px)`} justifyContent='flex-start'>
					{typeof title === 'string' ? (
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
					)}
				</Center>
			) : null}

			{actions ? (
				<Center ref={ref} justifyContent='flex-end'>
					{actions}
				</Center>
			) : null}
		</HStack>
	);
};

export default Header;
