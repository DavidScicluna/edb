import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import Page from '../../../containers/Page';
import PageBody from '../../../containers/Page/components/PageBody';
import PageHeader from '../../../containers/Page/components/PageHeader';
import { DummyDisplayMode } from '../../../components';
import VerticalDummyPeople from '../components/VerticalDummyPeople';
import { useUserTheme } from '../../../common/hooks';

const DummyPeople: FC = () => {
	const { colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		<Page>
			<PageHeader
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>People</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>A list containing the most popular People at the moment.</Text>
					</Skeleton>
				)}
				actions={<DummyDisplayMode />}
				direction='row'
				p={spacing}
			/>
			<PageBody p={spacing}>
				<VerticalDummyPeople />
			</PageBody>
		</Page>
	);
};

export default DummyPeople;
