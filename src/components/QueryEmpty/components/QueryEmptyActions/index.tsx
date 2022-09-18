import { FC, useContext } from 'react';

import { HStack } from '@chakra-ui/react';

import {
	color as defaultColor,
	colorMode as defaultColorMode,
	spacing as defaultSpacing
} from '../../common/data/defaultPropValues';
import { QueryEmptyContext } from '../..';
import { QueryEmptyContext as QueryEmptyContextType } from '../../types';

import { QueryEmptyActionsProps } from './types';

const QueryEmptyActions: FC<QueryEmptyActionsProps> = (props) => {
	const { color = defaultColor, colorMode = defaultColorMode } = useContext<QueryEmptyContextType>(QueryEmptyContext);

	const { renderActions, spacing = defaultSpacing, ...rest } = props;

	return (
		<HStack p={0} m={0} spacing={spacing} {...rest}>
			{renderActions({
				color,
				colorMode
			})}
		</HStack>
	);
};

export default QueryEmptyActions;
