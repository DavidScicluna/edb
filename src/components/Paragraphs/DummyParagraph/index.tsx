import { FC } from 'react';

import {
	DummyCard,
	DummyCardHeader,
	CardBody,
	CardFooter,
	Skeleton,
	DummyButton
} from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import { useUserTheme } from '../../../common/hooks';

const lines = 5;

const DummyParagraph: FC = () => {
	const { color, colorMode } = useUserTheme();

	return (
		<DummyCard colorMode={colorMode} isFullWidth p={2}>
			<DummyCardHeader />

			<CardBody>
				<VStack width='100%' alignItems='flex-start' spacing={2}>
					{range(lines).map((_dummy, index) => (
						<Skeleton key={index} colorMode={colorMode} isLoaded={false} variant='text'>
							<Text width='100%' align='left' fontSize='md' fontWeight='normal' lineHeight='shorter'>
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
