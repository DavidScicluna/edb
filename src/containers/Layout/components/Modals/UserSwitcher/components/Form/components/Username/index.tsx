import React, { ReactElement } from 'react';

import { Input, Icon } from '@davidscicluna/component-library';

import { Controller } from 'react-hook-form';

// import { useSelector } from '../../../../../../../../../common/hooks';
// import { defaultUser, getUser } from '../../../../../../../../../store/slices/Users';

import { UsernameProps } from './types';
import { isBoolean } from 'lodash';

const Username = ({ form }: UsernameProps): ReactElement => {
	// const color = useSelector(
	// 	(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	// );

	return (
		<Controller
			control={form.control}
			name='username'
			render={({ field: { onChange, value, name }, fieldState: { error } }) => (
				<Input
					// color={color}
					color='blue'
					label='Username'
					name={name}
					helper={error ? error.message : undefined}
					placeholder='johnsmith'
					onChange={onChange}
					isError={isBoolean(error)}
					isFullWidth
					isRequired
					renderLeftPanel={() => <Icon icon='alternate_email' category='outlined' />}
					value={value}
				/>
			)}
		/>
	);
};

export default Username;
