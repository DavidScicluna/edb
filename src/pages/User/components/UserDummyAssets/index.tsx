import { FC } from 'react';

import { useUserTheme } from '../../../../common/hooks';
import UserAssetsStructure from '../UserAssetsStructure';

import DummyUserAvatar from './components/DummyUserAvatar';
import DummyUserBackground from './components/DummyUserBackground';
import DummyUserDetails from './components/DummyUserDetails';

const UserDummyAssets: FC = () => {
	const { color, colorMode } = useUserTheme();

	return (
		<UserAssetsStructure
			color={color}
			colorMode={colorMode}
			renderUserAvatar={(props) => <DummyUserAvatar {...props} colorMode={colorMode} />}
			renderUserBackground={(props) => <DummyUserBackground {...props} colorMode={colorMode} />}
			renderUserDetails={(props) => <DummyUserDetails {...props} color={color} colorMode={colorMode} />}
		/>
	);
};

export default UserDummyAssets;
