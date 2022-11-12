import { FC } from 'react';

import { useConst } from '@chakra-ui/react';

import { useSelector, useUserTheme } from '../../../../../../../common/hooks';
import UserProfileStructure from '../../../../../../../components/User/UserProfileStructure';

import UserAvatar from './components/UserAvatar';
import UserBackground from './components/UserBackground';
import UserDetails from './components/UserDetails';

const UserProfileHeader: FC = () => {
	const { color, colorMode } = useUserTheme();

	const {
		info: { name },
		credentials: { username }
	} = useSelector((state) => state.users.data.activeUser.data);

	const alt = useConst<string>(`${name} (@${username})`);

	return (
		<UserProfileStructure
			color={color}
			colorMode={colorMode}
			renderUserAvatar={(props) => <UserAvatar {...props} alt={alt} />}
			renderUserBackground={(props) => <UserBackground {...props} alt={alt} />}
			renderUserDetails={(props) => <UserDetails {...props} />}
		/>
	);
};

export default UserProfileHeader;
