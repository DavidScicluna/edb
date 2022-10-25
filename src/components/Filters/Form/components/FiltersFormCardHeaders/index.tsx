import { FC, createContext } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { color as defaultColor, colorMode as defaultColorMode } from '../../../../../common/data/defaultPropValues';
import { useUserTheme } from '../../../../../common/hooks';

import FiltersFormCardHeaderSm from './components/FiltersFormCardHeaderSm';
import FiltersFormCardHeaderXl from './components/FiltersFormCardHeaderXl';
import {
	FiltersFormCardHeadersContext as FiltersFormCardHeadersContextType,
	CommonFiltersFormCardHeadersProps as FiltersFormCardHeadersProps
} from './common/types';

const { getColor } = utils;

export const FiltersFormCardHeadersContext = createContext<FiltersFormCardHeadersContextType>({
	renderMessageProps: {
		color: defaultColor,
		fontSize: 'sm',
		fontWeight: 'semibold'
	},
	renderButtonProps: {
		color: defaultColor,
		colorMode: defaultColorMode,
		size: 'xs',
		variant: 'text'
	}
});

const FiltersFormCardHeaders: FC<FiltersFormCardHeadersProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	return (
		<FiltersFormCardHeadersContext.Provider
			value={{
				renderMessageProps: {
					color: getColor({ theme, colorMode, type: 'text.primary' }),
					fontSize: 'sm',
					fontWeight: 'semibold',
					whiteSpace: 'nowrap'
				},
				renderButtonProps: {
					color,
					colorMode,
					size: 'xs',
					variant: 'text'
				}
			}}
		>
			{isSm ? <FiltersFormCardHeaderSm {...props} /> : <FiltersFormCardHeaderXl {...props} />}
		</FiltersFormCardHeadersContext.Provider>
	);
};

export default FiltersFormCardHeaders;
