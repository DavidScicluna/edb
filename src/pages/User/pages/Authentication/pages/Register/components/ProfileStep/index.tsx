import { FC } from 'react';

import { useOutletContext } from 'react-router';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../common/data/defaultPropValues';
import UserProfileUpdateAssets from '../../../../../../components/UserProfileUpdateAssets';
import { AuthenticationOutletContext } from '../../../../types';

import { ProfileProps } from './types';

const Profile: FC<ProfileProps> = (props) => {
	const { color = defaultColor, colorMode = defaultColorMode } = useOutletContext<AuthenticationOutletContext>();

	const { form, firstName, lastName, username } = props;

	return (
		<UserProfileUpdateAssets
			color={color}
			colorMode={colorMode}
			form={form}
			firstName={firstName}
			lastName={lastName}
			username={username}
		/>
	);
};

export default Profile;
