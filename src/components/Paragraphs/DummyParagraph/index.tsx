import { FC } from 'react';

import {
	FontSize,
	LineHeight,
	useTheme,
	DummyCard,
	DummyCardHeader,
	CardBody,
	CardFooter,
	Skeleton,
	DummyButton
} from '@davidscicluna/component-library';

import { useConst, VStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import { useUserTheme } from '../../../common/hooks';
import { getFontSizeHeight } from '../../../common/utils';

import { DummyParagraphProps } from './types';

const lines = 5;

const DummyParagraph: FC<DummyParagraphProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const fontSize = useConst<FontSize>('md');
	const lineHeight = useConst<LineHeight>('shorter');

	return (
		<DummyCard {...props} colorMode={colorMode} isFullWidth p={2}>
			<DummyCardHeader />

			<CardBody>
				<VStack
					width='100%'
					alignItems='stretch'
					justifyContent='stretch'
					spacing={`${getFontSizeHeight({ theme, fontSize, lineHeight }) / 2}px`}
				>
					{range(lines).map((_dummy, index) => (
						<Skeleton key={index} width='100%' colorMode={colorMode} isLoaded={false} variant='text'>
							<Text align='left' fontSize={fontSize} fontWeight='normal' lineHeight={lineHeight}>
								Paragraph
							</Text>
						</Skeleton>
					))}
				</VStack>
			</CardBody>

			<CardFooter>
				<DummyButton color={color} colorMode={colorMode} isFullWidth size='xs' variant='text'>
					Read More
				</DummyButton>
			</CardFooter>
		</DummyCard>
	);
};

export default DummyParagraph;
