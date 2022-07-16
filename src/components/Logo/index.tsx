import { FC } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import merge from 'lodash/merge';

import { useUserTheme } from '../../common/hooks';

import {
	isClickable as defaultIsClickable,
	isSquare as defaultIsSquare,
	size as defaultSize
} from './common/data/defaultPropValues';
import { LogoProps } from './types';
import useStyles from './common/styles';

const Logo: FC<LogoProps> = (props) => {
	const theme = useTheme();

	const { color, colorMode } = useUserTheme();

	const { isClickable = defaultIsClickable, isSquare = defaultIsSquare, size = defaultSize, sx } = props;

	const style = useStyles({ theme, color, colorMode, isClickable, isSquare, size });

	return <Center sx={merge(style.logo, sx)}>edb</Center>;
};

export default Logo;
