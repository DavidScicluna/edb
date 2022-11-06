import { FC, lazy } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../containers/Layout/common/hooks';
import Page from '../../../../containers/Page';
import PageBody from '../../../../containers/Page/components/PageBody';
import { Suspense } from '../../../../components';
import DummyUserProfileHeader from '../DummyUserProfile/components/DummyUserProfileHeader';
import DummyUserProfileTabs from '../DummyUserProfile/components/DummyUserProfileTabs';

const UserProfileHeader = lazy(() => import('./components/UserProfileHeader'));
const UserProfileTabs = lazy(() => import('./components/UserProfileTabs'));

const UserProfile: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<Page>
			<PageBody>
				<VStack width='100%' spacing={0} p={spacing}>
					<Suspense fallback={<DummyUserProfileHeader />}>
						<UserProfileHeader />
					</Suspense>

					<Suspense fallback={<DummyUserProfileTabs />}>
						<UserProfileTabs />
					</Suspense>
				</VStack>
			</PageBody>
		</Page>
	);
};

export default UserProfile;
