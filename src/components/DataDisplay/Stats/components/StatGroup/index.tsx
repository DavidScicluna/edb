import { FC } from 'react';

import { useTheme, Divider, utils } from '@davidscicluna/component-library';

import { StatGroup as CUIStatGroup, HStack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';

import { StatGroupProps } from './types';

const { getColor } = utils;

const StatGroup: FC<StatGroupProps> = ({ children, isFullWidth = false, spacing = 2, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<CUIStatGroup
			{...rest}
			width={isFullWidth ? '100%' : 'auto'}
			borderWidth='2px'
			borderStyle='solid'
			borderColor={getColor({ theme, colorMode, type: 'divider' })}
			borderRadius='base'
			p={spacing}
		>
			<HStack
				width='100%'
				alignItems='stretch'
				justifyContent='stretch'
				wrap='wrap'
				divider={<Divider colorMode={colorMode} orientation='vertical' />}
				spacing={spacing}
			>
				{children}
			</HStack>
		</CUIStatGroup>
	);
};

export default StatGroup;
