import React, { ReactElement } from 'react';

import { Controller } from 'react-hook-form';


import { useSelector } from '../../../../../../../../../common/hooks';
import Input from '../../../../../../../../../components/Forms/Input';
import Icon from '../../../../../../../../../components/Icon';
import { defaultUser, getUser } from '../../../../../../../../../store/slices/Users';

import { UsernameProps } from './types';

const Username = ({ form }: UsernameProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<Controller
			control={form.control}
			name='username'
			render={({ field: { onChange, value, name }, fieldState: { error } }) => (
				<Input
					color={color}
					label='Username'
					error={error}
					name={name}
					placeholder='johnsmith'
					onChange={onChange}
					isFullWidth
					isRequired
					renderInputLeftPanel={({ height }) => (
						<Icon icon='alternate_email' type='outlined' fontSize={height} />
					)}
					value={value}
				/>
			)}
		/>
	);
};

export default Username;
