import { FC, useContext } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { QueryEmptyContext } from '../..';
import { colorMode as defaultColorMode } from '../../common/data/defaultPropValues';
import { QueryEmptyContext as QueryEmptyContextType } from '../../types';

import { QueryEmptySubtitleProps } from './types';

const { getColor } = utils;

const QueryEmptySubtitle: FC<QueryEmptySubtitleProps> = ({ children, ...rest }) => {
	const theme = useTheme();

	const { colorMode = defaultColorMode } = useContext<QueryEmptyContextType>(QueryEmptyContext);

	return (
		<Text
			align='center'
			color={getColor({ theme, colorMode, type: 'text.secondary' })}
			fontSize={['xs', 'sm']}
			lineHeight='base'
			noOfLines={0}
			{...rest}
		>
			{children}
		</Text>
	);
};

export default QueryEmptySubtitle;
