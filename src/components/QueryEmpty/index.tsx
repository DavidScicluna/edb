import { FC, createContext } from 'react';

import { useColorMode, VStack } from '@chakra-ui/react';

import {
	color as defaultColor,
	colorMode as defaultColorMode,
	padding as defaultPadding,
	spacing as defaultSpacing
} from './common/data/defaultPropValues';
import { QueryEmptyContext as QueryEmptyContextType, QueryEmptyProps } from './types';

export const QueryEmptyContext = createContext<QueryEmptyContextType>({
	color: defaultColor,
	colorMode: defaultColorMode
});

const QueryEmpty: FC<QueryEmptyProps> = (props) => {
	const { colorMode: colorModeHook = defaultColorMode } = useColorMode();

	const { children, color, colorMode = colorModeHook, p = defaultPadding, spacing = defaultSpacing, ...rest } = props;

	return (
		<QueryEmptyContext.Provider value={{ color, colorMode }}>
			<VStack width='100%' p={p} spacing={spacing} {...rest}>
				{children}
			</VStack>
		</QueryEmptyContext.Provider>
	);
};

export default QueryEmpty;
