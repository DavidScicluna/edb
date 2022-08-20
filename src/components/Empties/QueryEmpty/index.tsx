import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useColorMode, useConst, VStack } from '@chakra-ui/react';

import { sample } from 'lodash';

import {
	colorMode as defaultColorMode,
	padding as defaultPadding,
	spacing as defaultSpacing
} from '../common/data/defaultPropValues';
import { titles, emojis } from '../common/data/strings';
import { CommonEmptyProps as QueryEmptyProps } from '../common/types';

const { getColor } = utils;

const QueryEmpty: FC<QueryEmptyProps> = (props) => {
	const theme = useTheme();
	const { colorMode: colorModeHook = defaultColorMode } = useColorMode();

	const title = useConst<string>(sample(titles) || titles[0]);
	const emoji = useConst<string>(sample(emojis) || emojis[0]);

	const {
		colorMode = colorModeHook,
		renderTitle,
		renderDescription,
		renderAction,
		p = defaultPadding,
		spacing = defaultSpacing,
		...rest
	} = props;

	return (
		<VStack width='100%' p={p} spacing={spacing} {...rest}>
			<VStack spacing={0}>
				{renderTitle({
					children: `${title} ${emoji}`,
					align: 'center',
					color: getColor({ theme, colorMode, type: 'text.primary' }),
					fontSize: ['xl', '2xl'],
					fontWeight: 'bold',
					lineHeight: 'base'
				})}

				{renderDescription &&
					renderDescription({
						align: 'center',
						color: getColor({ theme, colorMode, type: 'text.secondary' }),
						fontSize: ['xs', 'sm'],
						lineHeight: 'base'
					})}
			</VStack>

			{renderAction && renderAction({ colorMode })}
		</VStack>
	);
};

export default QueryEmpty;
