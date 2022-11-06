import { FC } from 'react';

import {
	FontSize,
	LineHeight,
	useTheme,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Button,
	utils
} from '@davidscicluna/component-library';

import { useBoolean, useConst, VStack, Text, Collapse } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../common/hooks';
import { getFontSizeHeight } from '../../../common/utils';

import { ParagraphProps } from './types';
import { formatStringToParagraphs } from './common/utils';

const lines = 5;

const { getColor } = utils;

const Paragraph: FC<ParagraphProps> = ({ children, title, keepFooter = false }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [stackRef, { height: stackHeight }] = useElementSize();

	const [isExpanded, setIsExpanded] = useBoolean();

	const fontSize = useConst<FontSize>('md');
	const lineHeight = useConst<LineHeight>('shorter');

	const limit = useConst<number>(getFontSizeHeight({ theme, fontSize, lineHeight }) * lines);

	return (
		<Card colorMode={colorMode} isFullWidth p={2}>
			<CardHeader renderTitle={(props) => <Text {...props}>{title}</Text>} />
			<CardBody>
				<Collapse
					in={isExpanded}
					startingHeight={(stackHeight || limit) >= limit ? limit : stackHeight || limit}
				>
					<VStack ref={stackRef} width='100%' alignItems='flex-start' spacing={2}>
						{formatStringToParagraphs({ string: children }).map((paragraph, index) => (
							<Text
								key={index}
								align='left'
								color={getColor({ theme, colorMode, type: 'text.primary' })}
								fontSize={fontSize}
								fontWeight='normal'
								lineHeight={lineHeight}
								// noOfLines={isExpanded ? 0 : lines}
							>
								{paragraph}
							</Text>
						))}
					</VStack>
				</Collapse>
			</CardBody>
			{(keepFooter || !isExpanded) && (
				<CardFooter>
					<Button
						color={color}
						colorMode={colorMode}
						isFullWidth
						onClick={() => setIsExpanded.toggle()}
						size='xs'
						variant='text'
					>
						{`Read ${isExpanded ? 'Less' : 'More'}`}
					</Button>
				</CardFooter>
			)}
		</Card>
	);
};

export default Paragraph;
