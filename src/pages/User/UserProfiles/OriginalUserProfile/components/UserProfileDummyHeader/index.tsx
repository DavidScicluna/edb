import { FC } from 'react';

import { useUserTheme } from '../../../../../../common/hooks';
import UserProfileStructure from '../../../../../../components/User/UserProfileStructure';

import DummyUserAvatar from './components/DummyUserAvatar';
import DummyUserBackground from './components/DummyUserBackground';
import DummyUserDetails from './components/DummyUserDetails';

const UserProfileDummyHeader: FC = () => {
	const { color, colorMode } = useUserTheme();

	return (
		<UserProfileStructure
			color={color}
			colorMode={colorMode}
			renderUserAvatar={(props) => <DummyUserAvatar {...props} />}
			renderUserBackground={(props) => <DummyUserBackground {...props} />}
			renderUserDetails={(props) => <DummyUserDetails {...props} />}
		/>
	);
};

export default UserProfileDummyHeader;
