import React, { ReactElement, useContext } from 'react';

import { VStack, Text } from '@chakra-ui/react';

import { StepDescriptionProps } from './types';

import { StepperContext } from '../..';
import { StepperContext as StepperContextType } from '../../types';

const StepDescription = (props: StepDescriptionProps): ReactElement => {
	const { color, colorMode } = useContext<StepperContextType>(StepperContext);

	const { index, total, title, subtitle } = props;

	return (
		<VStack width='100%' alignItems='flex-start' spacing={0.5}>
			<Text
				width='100%'
				align='left'
				color={`${color}.${colorMode === 'light' ? 500 : 400}`}
				fontSize='md'
				lineHeight='normal'
				isTruncated
				overflow='hidden'
				whiteSpace='nowrap'
			>
				{`Step ${index + 1} of ${total}`}
			</Text>
			<Text
				width='100%'
				align='left'
				color={`gray.${colorMode === 'light' ? 900 : 50}`}
				fontSize='4xl'
				fontWeight='bold'
				lineHeight='normal'
				isTruncated
				overflow='hidden'
				whiteSpace='nowrap'
			>
				{title}
			</Text>
			{subtitle ? (
				<Text
					width='100%'
					align='left'
					color={`gray.${colorMode === 'light' ? 400 : 500}`}
					fontSize='md'
					lineHeight='normal'
					isTruncated
					overflow='hidden'
					whiteSpace='nowrap'
				>
					{subtitle}
				</Text>
			) : null}
		</VStack>
	);
};

export default StepDescription;
