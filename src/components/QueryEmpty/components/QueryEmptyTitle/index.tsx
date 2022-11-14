import { FC, useContext } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useConst, Text } from '@chakra-ui/react';

import { sample } from 'lodash';

import { QueryEmptyContext } from '../..';
import { colorMode as defaultColorMode } from '../../common/data/defaultPropValues';
import { QueryEmptyContext as QueryEmptyContextType } from '../../types';
import { errorTitles, errorEmojis } from '../../../../common/data/strings';

import { QueryEmptyTitleProps } from './types';

const { getColor } = utils;

const QueryEmptyTitle: FC<QueryEmptyTitleProps> = (props) => {
	const theme = useTheme();

	const { colorMode = defaultColorMode } = useContext<QueryEmptyContextType>(QueryEmptyContext);

	const sampledTitle = useConst<string>(sample(errorTitles) || errorTitles[0]);
	const sampledEmoji = useConst<string>(sample(errorEmojis) || errorEmojis[0]);

	const defaultTitle = useConst<string>(`${sampledTitle}, something went wrong! ${sampledEmoji}`);

	const { children = defaultTitle, ...rest } = props;

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
