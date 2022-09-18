import { FC, useContext } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { merge } from 'lodash';

import { QueryEmptyContext } from '../..';
import { color as defaultColor, colorMode as defaultColorMode } from '../../common/data/defaultPropValues';
import { QueryEmptyContext as QueryEmptyContextType } from '../../types';

import { variant as defaultVariant } from './common/data/defaultPropValues';
import useStyles from './common/styles';
import { QueryEmptyIconProps } from './types';

const QueryEmptyIcon: FC<QueryEmptyIconProps> = (props) => {
	const theme = useTheme();

	const { color = defaultColor, colorMode = defaultColorMode } = useContext<QueryEmptyContextType>(QueryEmptyContext);

	const { renderIcon, variant = defaultVariant, sx, ...rest } = props;

	const style = useStyles({ theme, color, colorMode, variant });

	return (
		<Center {...rest} sx={merge(style.icon, sx)}>
			{renderIcon({ colorMode })}
		</Center>
	);
};

export default QueryEmptyIcon;
