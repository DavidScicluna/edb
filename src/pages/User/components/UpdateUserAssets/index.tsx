import { FC, useState } from 'react';

import { useUpdateEffect } from 'usehooks-ts';

import { UserProfileStructure } from '../../../../components';
import { color as defaultColor, colorMode as defaultColorMode } from '../../../../common/data/defaultPropValues';

import UserAvatar from './components/UserAvatar';
import UserBackground from './components/UserBackground';
import UserDetails from './components/UserDetails';
import { UpdateUserAssetsProps } from './types';

const UpdateUserAssets: FC<UpdateUserAssetsProps> = (props) => {
	const { color = defaultColor, colorMode = defaultColorMode, form, firstName, lastName, username } = props;

	const [alt, setAlt] = useState<string>(`${firstName} ${lastName} (@${username})`);

	useUpdateEffect(() => setAlt(`${firstName} ${lastName} (@${username})`), [firstName, lastName, username]);

	return (
		<UserProfileStructure
			color={color}
			colorMode={colorMode}
			renderUserAvatar={({ color = defaultColor, colorMode = defaultColorMode }) => (
				<UserAvatar color={color} colorMode={colorMode} form={form} alt={alt} />
			)}
			renderUserBackground={({ color = defaultColor, colorMode = defaultColorMode }) => (
				<UserBackground color={color} colorMode={colorMode} form={form} alt={alt} />
			)}
			renderUserDetails={({ color = defaultColor, colorMode = defaultColorMode }) => (
				<UserDetails
					color={color}
					colorMode={colorMode}
					firstName={firstName}
					lastName={lastName}
					username={username}
				/>
			)}
		/>
	);
};

export default UpdateUserAssets;