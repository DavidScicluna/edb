import { FC, useContext, useCallback } from 'react';

import { Space, useTheme, Divider, utils } from '@davidscicluna/component-library';

import { VStack, HStack, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import {
	CommonFiltersFormCardHeadersProps as FiltersFormCardHeaderXlProps,
	FiltersFormCardHeadersContext as FiltersFormCardHeadersContextType
} from '../../common/types';
import { FiltersFormCardHeadersContext } from '../..';
import { useUserTheme } from '../../../../../../../common/hooks';

const { convertREMToPixels, convertStringToNumber, getColor } = utils;

const spacing: Space = 2;

const FiltersFormCardHeaderXl: FC<FiltersFormCardHeaderXlProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { renderButtonProps, renderMessageProps } =
		useContext<FiltersFormCardHeadersContextType>(FiltersFormCardHeadersContext);

	const [actionsRef, { width: actionsWidth }] = useElementSize();

	const { title, subtitle, renderButton, renderMessage } = props;

	const handleCalculateTextWidth = useCallback((): string => {
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return `calc(100% - ${actionsWidth + spacingWidth}px)`;
	}, [theme, spacing, actionsWidth]);

	return (
		<HStack width='100%' alignItems='center' justifyContent='space-between' spacing={2}>
			<VStack width={handleCalculateTextWidth()} alignItems='flex-start' spacing={0.5}>
				{/* Title */}
				<Text
					align='left'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					fontSize='xl'
					fontWeight='bold'
					lineHeight='normal'
					noOfLines={1}
				>
					{title}
				</Text>

				{/* Subtitle */}
				{subtitle && (
					<Text
						align='left'
						color={getColor({ theme, colorMode, type: 'text.secondary' })}
						fontSize='sm'
						lineHeight='normal'
						noOfLines={1}
					>
						{subtitle}
					</Text>
				)}
			</VStack>

			<HStack
				ref={actionsRef}
				alignItems='stretch'
				justifyContent='stretch'
				divider={<Divider colorMode={colorMode} orientation='vertical' />}
				spacing={2}
			>
				{renderMessage && renderMessage({ ...renderMessageProps })}
				{renderButton({ ...renderButtonProps })}
			</HStack>
		</HStack>
	);
};

export default FiltersFormCardHeaderXl;
