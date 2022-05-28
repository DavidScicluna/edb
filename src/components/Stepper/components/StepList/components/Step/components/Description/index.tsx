import { ReactElement } from 'react';

import { VStack, Text } from '@chakra-ui/react';

import { DescriptionProps } from './types';

const Description = ({ colorMode, index, title, subtitle }: DescriptionProps): ReactElement => {
	return (
		<VStack width='100%' alignItems='inherit' spacing={0.5}>
			<Text
				width='100%'
				align='left'
				color={`gray.${colorMode === 'light' ? 900 : 50}`}
				fontSize='2xl'
				fontWeight='bold'
				lineHeight='normal'
				isTruncated
				overflow='hidden'
				whiteSpace='nowrap'
			>
				{`${index + 1}. ${title}`}
			</Text>
			{subtitle ? (
				<Text
					width='100%'
					align='left'
					color={`gray.${colorMode === 'light' ? 400 : 500}`}
					fontSize='sm'
					lineHeight='normal'
					noOfLines={1}
				>
					{subtitle}
				</Text>
			) : null}
		</VStack>
	);
};

export default Description;
