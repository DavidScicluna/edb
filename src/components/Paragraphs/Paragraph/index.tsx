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
	Collapse,
	utils
} from '@davidscicluna/component-library';

import { useBoolean, useConst, VStack, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';
import { Transition } from 'framer-motion';
import { compact } from 'lodash';

import { useUserTheme } from '../../../common/hooks';
import { getFontSizeHeight } from '../../../common/utils';

import { ParagraphProps } from './types';
import { formatStringToParagraphs } from './common/utils';

const lines = 5;

const { getTransitionConfig, getTransitionDuration, getColor } = utils;

const Paragraph: FC<ParagraphProps> = ({ children, title, keepFooter = false }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [stackRef, { height: stackHeight }] = useElementSize();

	const [isExpanded, setIsExpanded] = useBoolean();

	const fontSize = useConst<FontSize>('md');
	const lineHeight = useConst<LineHeight>('shorter');

	const limit = useConst<number>(getFontSizeHeight({ theme, fontSize, lineHeight }) * lines);

	const duration = useConst<number>(getTransitionDuration({ theme, duration: 'slower' }));
	const config = useConst<Transition>({ ...getTransitionConfig({ theme }), duration });

	return (
		<Card colorMode={colorMode} isFullWidth p={2}>
			<CardHeader renderTitle={(props) => <Text {...props}>{title}</Text>} />
			<CardBody>
				<Collapse
					in={isExpanded}
					startingHeight={(stackHeight || limit) >= limit ? limit : stackHeight || limit}
					unmountOnExit={false}
					transition={{ enter: { ...config }, exit: { ...config } }}
				>
					<VStack
						ref={stackRef}
						width='100%'
						alignItems='flex-start'
						spacing={`${getFontSizeHeight({ theme, fontSize, lineHeight })}px`}
					>
						{compact(formatStringToParagraphs({ string: children })).map((paragraph, index) => (
							<Text
								key={index}
								align='left'
								color={getColor({ theme, colorMode, type: 'text.primary' })}
								fontSize={fontSize}
								fontWeight='normal'
								lineHeight={lineHeight}
							>
								{paragraph}
							</Text>
						))}
					</VStack>
				</Collapse>
			</CardBody>
			{(stackHeight || limit) > limit && (keepFooter || !isExpanded) && (
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
