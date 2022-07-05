import { ReactElement } from 'react';

import { Card, CardHeader, CardBody, Skeleton, Button } from '@davidscicluna/component-library';

import { useColorMode, useBoolean, VStack, Text, ScaleFade, Collapse } from '@chakra-ui/react';

import range from 'lodash/range';
import { useElementSize } from 'usehooks-ts';

import { ParagraphProps } from './types';

const limit = 44;

const Paragraph = ({ title, paragraphs = '', isLoading = true }: ParagraphProps): ReactElement => {
	const { colorMode } = useColorMode();

	const [isExpanded, setIsExpanded] = useBoolean();

	const [ref, { height }] = useElementSize();

	/**
	 * This method will take a block of string and will format it into paragraphs
	 *
	 * @param content String - The content block to format into paragraphs
	 * @returns Array of paragraphs
	 */
	const handleFormatIntoParagraphs = (paragraph: string): string[] => {
		return paragraph.split('\n'[0]).filter((paragraph) => paragraph !== '\r');
	};

	return (
		<Card isFullWidth>
			<CardHeader
				renderTitle={(props) => <Text {...props}>{title}</Text>}
				actions={
					<ScaleFade in={isLoading || (height || 0) > limit} unmountOnExit>
						<Button isDisabled={isLoading} onClick={() => setIsExpanded.toggle()} size='sm' variant='text'>
							{`Read ${isExpanded ? 'Less' : 'More'}`}
						</Button>
					</ScaleFade>
				}
			/>
			<CardBody>
				{!isLoading ? (
					<Collapse in={isExpanded} startingHeight={(height || limit) >= limit ? limit : height || limit}>
						<VStack ref={ref} width='100%' alignItems='flex-start' spacing={2}>
							{handleFormatIntoParagraphs(paragraphs)
								.filter((paragraph) => paragraph)
								.map((paragraph, index) => (
									<Text
										key={index}
										align='left'
										color={`gray.${colorMode === 'light' ? 900 : 50}`}
										fontSize='md'
									>
										{paragraph}
									</Text>
								))}
						</VStack>
					</Collapse>
				) : (
					<VStack width='100%' spacing={1}>
						{range(0, 3).map((_dummy, index) => (
							<Skeleton key={index} width='100%' isLoaded={false} variant='text'>
								<Text align='left' fontSize='xs'>
									{`Paragraph ${index + 1}`}
								</Text>
							</Skeleton>
						))}
					</VStack>
				)}
			</CardBody>
		</Card>
	);
};

export default Paragraph;
