import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import Page from '../../../../../containers/Page';
import PageBody from '../../../../../containers/Page/components/PageBody';

import DummyUserProfileHeader from './components/DummyUserProfileHeader';
import DummyUserProfileTabs from './components/DummyUserProfileTabs';

const DummyUserProfile: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<Page>
			<PageBody>
				<VStack width='100%' spacing={0} p={spacing}>
					<DummyUserProfileHeader />

					<DummyUserProfileTabs />
				</VStack>
			</PageBody>
		</Page>
	);
};

export default DummyUserProfile;
