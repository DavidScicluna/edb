import { FC } from 'react';

import { useTheme, DummyCard, DummyCardHeader, CardBody, Skeleton } from '@davidscicluna/component-library';

import { SimpleGrid, Center } from '@chakra-ui/react';

import { range } from 'lodash';

import { useUserTheme } from '../../../../../../common/hooks';

const DummyColor: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<DummyCard colorMode={colorMode} isFullWidth p={2}>
			<DummyCardHeader hasTitle />
			<CardBody>
				<SimpleGrid width='100%' columns={[1, 2, 3]} spacing={2}>
					{range(1, 12).map((_dummy, index) => (
						<DummyCard key={index} colorMode={colorMode} isFullWidth p={2}>
							<DummyCardHeader hasTitle />
							<CardBody>
								<Skeleton colorMode={colorMode} isLoaded={false} variant='rectangle'>
									<Center width='100%' height={theme.fontSizes['8xl']} borderRadius='base' />
								</Skeleton>
							</CardBody>
						</DummyCard>
					))}
				</SimpleGrid>
			</CardBody>
		</DummyCard>
	);
};

export default DummyColor;
