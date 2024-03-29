import { FC } from 'react';

import { useTheme, Skeleton, DummyButton } from '@davidscicluna/component-library';

import { useMediaQuery, HStack, Text } from '@chakra-ui/react';

import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import Page from '../../../containers/Page';
import PageBody from '../../../containers/Page/components/PageBody';
import PageHeader from '../../../containers/Page/components/PageHeader';
import { formatMediaTypeLabel } from '../../../common/utils';
import { DummyDisplayMode } from '../../../components';
import VerticalDummyMovies from '../components/VerticalDummyMovies';
import { useUserTheme } from '../../../common/hooks';

const DummyMovies: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isLg] = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

	const { spacing } = useLayoutContext();

	return (
		<Page>
			<PageHeader
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>{formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })}</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>
							{`A list containing all the ${formatMediaTypeLabel({
								type: 'multiple',
								mediaType: 'movie'
							})} that have been released or will be in the coming months.`}
						</Text>
					</Skeleton>
				)}
				actions={
					<HStack width={isLg ? '100%' : 'auto'} spacing={2}>
						<DummyButton colorMode={colorMode} isFullWidth={isLg} variant='outlined'>
							Filter
						</DummyButton>
						<DummyButton colorMode={colorMode} isFullWidth={isLg} variant='outlined'>
							Sort By
						</DummyButton>
						<DummyDisplayMode />
					</HStack>
				}
				direction={isLg ? 'column' : 'row'}
				spacing={spacing}
				px={spacing}
				py={spacing * 2}
			/>
			<PageBody p={spacing}>
				<VerticalDummyMovies />
			</PageBody>
		</Page>
	);
};

export default DummyMovies;
