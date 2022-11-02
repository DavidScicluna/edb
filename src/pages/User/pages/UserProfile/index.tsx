import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../containers/Layout/common/hooks';
import Page from '../../../../containers/Page';
import PageBody from '../../../../containers/Page/components/PageBody';

import UserProfileHeader from './components/UserProfileHeader';
import UserProfileTabs from './components/UserProfileTabs';

const UserProfile: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<Page>
			<PageBody>
				<VStack width='100%' spacing={0} p={spacing}>
					<UserProfileHeader />
					<UserProfileTabs />
				</VStack>
			</PageBody>
		</Page>
	);
};

export default UserProfile;
