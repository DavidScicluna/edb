import { FC, useContext } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useConst, Text } from '@chakra-ui/react';

import { sample } from 'lodash';

import { QueryEmptyContext } from '../..';
import { colorMode as defaultColorMode } from '../../common/data/defaultPropValues';
import { QueryEmptyContext as QueryEmptyContextType } from '../../types';
import { titles, emojis } from '../../common/data/strings';

import { QueryEmptyTitleProps } from './types';

const { getColor } = utils;

const QueryEmptyTitle: FC<QueryEmptyTitleProps> = (props) => {
	const theme = useTheme();

	const { colorMode = defaultColorMode } = useContext<QueryEmptyContextType>(QueryEmptyContext);

	const title = useConst<string>(sample(titles) || titles[0]);
	const emoji = useConst<string>(sample(emojis) || emojis[0]);

	const { children = `${title} Something went wrong. ${emoji} `, ...rest } = props;

	return (
		<Text
			align='center'
			color={getColor({ theme, colorMode, type: 'text.primary' })}
			fontSize={['xl', '2xl']}
			fontWeight='bold'
			lineHeight='base'
			noOfLines={1}
			{...rest}
		>
			{children}
		</Text>
	);
};

export default QueryEmptyTitle;
