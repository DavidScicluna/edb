import { FC, useContext, useCallback } from 'react';

import { Divider, Space, useTheme, ScaleFade, utils } from '@davidscicluna/component-library';

import { VStack, HStack, Center, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import {
	CommonFiltersFormCardHeadersProps as FiltersFormCardHeaderSmProps,
	FiltersFormCardHeadersContext as FiltersFormCardHeadersContextType
} from '../../common/types';
import { FiltersFormCardHeadersContext } from '../..';
import { useUserTheme } from '../../../../../../../common/hooks';

const { convertREMToPixels, convertStringToNumber, getColor } = utils;

const spacing: Space = 2;

const FiltersFormCardHeaderSm: FC<FiltersFormCardHeaderSmProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { renderButtonProps, renderMessageProps } =
		useContext<FiltersFormCardHeadersContextType>(FiltersFormCardHeadersContext);

	const [buttonRef, { width: buttonWidth }] = useElementSize();

	const { title, subtitle, renderButton, renderMessage, isMessageVisible = false } = props;

	const handleCalculateTextWidth = useCallback((): string => {
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return `calc(100% - ${buttonWidth + spacingWidth}px)`;
	}, [theme, spacing, buttonWidth]);

	return (
		<VStack
			width='100%'
			alignItems='flex-start'
			justifyContent='center'
			divider={isMessageVisible ? <Divider colorMode={colorMode} /> : undefined}
			spacing={spacing}
		>
			<HStack width='100%' alignItems='center' justifyContent='space-between' spacing={spacing}>
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

				<Center ref={buttonRef}>{renderButton({ ...renderButtonProps })}</Center>
			</HStack>

			<ScaleFade in={isMessageVisible}>
				<Center width='100%' height='100%'>
					{renderMessage({ ...renderMessageProps })}
				</Center>
			</ScaleFade>
		</VStack>
	);
};

export default FiltersFormCardHeaderSm;
