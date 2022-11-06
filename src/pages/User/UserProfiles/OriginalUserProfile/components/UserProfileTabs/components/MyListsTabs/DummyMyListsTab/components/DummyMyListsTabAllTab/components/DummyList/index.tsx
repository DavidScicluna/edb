import { FC } from 'react';

import { useTheme, DummyCard, CardBody, Radio, Skeleton } from '@davidscicluna/component-library';

import { VStack, Center, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../../../../../../../../common/hooks';

const DummyList: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [cardRef, { width: cardWidth }] = useElementSize();

	return (
		<DummyCard ref={cardRef} color='gray' colorMode={colorMode} isFullWidth>
			<CardBody>
				<VStack
					position='relative'
					width='100%'
					height={`${cardWidth}px`}
					alignItems='center'
					justifyContent='center'
					spacing={0.5}
				>
					<Center position='absolute' top={theme.space[1]} left={theme.space[1]}>
						{/* TODO: Replace with DummyRadio */}
						<Radio
							aria-label='Select list'
							color={color}
							colorMode={colorMode}
							isDisabled
							size='xs'
							variant='transparent'
						/>
					</Center>

					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text align='center' fontSize='xl' fontWeight='semibold' lineHeight='shorter' noOfLines={1}>
							List Label
						</Text>
					</Skeleton>
				</VStack>
			</CardBody>
		</DummyCard>
	);
};

export default DummyList;
