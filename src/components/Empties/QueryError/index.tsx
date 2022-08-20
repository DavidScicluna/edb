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

import { QueryErrorProps } from './types';

const { getColor } = utils;

const QueryError: FC<QueryErrorProps> = (props) => {
	const theme = useTheme();
	const { colorMode: colorModeHook = defaultColorMode } = useColorMode();

	const title = useConst<string>(sample(titles) || titles[0]);
	const emoji = useConst<string>(sample(emojis) || emojis[0]);

	const {
		colorMode = colorModeHook,
		renderTitle,
		renderDescription,
		renderBadge,
		renderAction,
		type,
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
						children: `Unfortunately, something went wrong when trying to fetch ${type} related data. Try again by pressing the "Try again" Button or please try again later!`,
						align: 'center',
						color: getColor({ theme, colorMode, type: 'text.secondary' }),
						fontSize: ['xs', 'sm'],
						lineHeight: 'base'
					})}
			</VStack>

			{renderBadge && renderBadge({ colorMode })}

			{renderAction({ children: 'Try again', colorMode, size: 'md', variant: 'contained' })}
		</VStack>
	);
};

export default QueryError;
