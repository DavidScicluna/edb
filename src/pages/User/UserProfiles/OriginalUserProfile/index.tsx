import { FC, lazy } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../containers/Layout/common/hooks';
import Page from '../../../../containers/Page';
import PageBody from '../../../../containers/Page/components/PageBody';
import { Suspense } from '../../../../components';

import UserProfileDummyHeader from './components/UserProfileDummyHeader';

const UserProfileHeader = lazy(() => import('./components/UserProfileHeader'));
const UserProfileTabs = lazy(() => import('./components/UserProfileTabs'));

const UserProfile: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<Page>
			<PageBody>
				<VStack width='100%' spacing={0} p={spacing}>
					<Suspense fallback={<UserProfileDummyHeader />}>
						<UserProfileHeader />
					</Suspense>

					<Suspense>
						<UserProfileTabs />
					</Suspense>
				</VStack>
			</PageBody>
		</Page>
	);
};

export default UserProfile;
