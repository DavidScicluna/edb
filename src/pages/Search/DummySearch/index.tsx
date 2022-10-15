import { FC } from 'react';

import {
	useTheme,
	DummyCard,
	CardBody,
	Input,
	Skeleton,
	DummyIconButton,
	IconButtonIcon,
	Icon
} from '@davidscicluna/component-library';

import { HStack, Text } from '@chakra-ui/react';

import Page from '../../../containers/Page';
import PageBody from '../../../containers/Page/components/PageBody';
import PageHeader from '../../../containers/Page/components/PageHeader';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import { useUserTheme } from '../../../common/hooks';

const DummySearch: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		<Page>
			<PageHeader
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Search</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Search anything from Movies, TV Shows, People, Collections or Companies</Text>
					</Skeleton>
				)}
				direction='row'
				p={spacing}
			/>
			<PageBody p={spacing}>
				<DummyCard colorMode={colorMode} isFullWidth p={2}>
					<CardBody>
						<HStack
							width='100%'
							minHeight='30px' // Size of SearchTypes
							justifyContent='space-between'
							spacing={0}
						>
							<HStack flex={1} spacing={1}>
								<Skeleton colorMode={colorMode} isLoaded={false} variant='rectangle'>
									<Icon
										width={theme.fontSizes['3xl']}
										height={theme.fontSizes['3xl']}
										fontSize={theme.fontSizes['3xl']}
										colorMode={colorMode}
										icon='search'
									/>
								</Skeleton>

								{/* TODO: Replace with DummyInput */}
								<Input
									color={color}
									colorMode={colorMode}
									autoComplete='off'
									isDisabled
									variant='transparent'
									sx={{ group: { height: '100%', px: 0, py: 0 } }}
								/>
							</HStack>

							<DummyIconButton
								aria-label='Submit Search'
								color={color}
								colorMode={colorMode}
								size='sm'
								variant='icon'
							>
								<IconButtonIcon icon='send' category='outlined' />
							</DummyIconButton>
						</HStack>
					</CardBody>
				</DummyCard>
			</PageBody>
		</Page>
	);
};

export default DummySearch;
