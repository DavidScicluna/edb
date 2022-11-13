import { FC } from 'react';

import { useTheme, DummyCard, DummyCardHeader, CardBody, Skeleton, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, Stack } from '@chakra-ui/react';

import { range } from 'lodash';

import { useUserTheme } from '../../../../../../common/hooks';

const DummyColorMode: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isXs] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	return (
		<DummyCard colorMode={colorMode} isFullWidth p={2}>
			<DummyCardHeader hasTitle />
			<CardBody>
				<Stack width='100%' direction={isXs ? 'column' : 'row'} spacing={2}>
					{range(1, 3).map((_dummy, index) => (
						<DummyCard key={index} colorMode={colorMode} isFullWidth p={2}>
							<DummyCardHeader hasTitle />
							<CardBody>
								<Skeleton colorMode={colorMode} isLoaded={false} variant='circle'>
									<Icon
										width={theme.fontSizes['8xl']}
										height={theme.fontSizes['8xl']}
										fontSize={theme.fontSizes['8xl']}
										icon={index === 0 ? 'light_mode' : index === 1 ? 'dark_mode' : 'contrast'}
									/>
								</Skeleton>
							</CardBody>
						</DummyCard>
					))}
				</Stack>
			</CardBody>
		</DummyCard>
	);
};

export default DummyColorMode;
