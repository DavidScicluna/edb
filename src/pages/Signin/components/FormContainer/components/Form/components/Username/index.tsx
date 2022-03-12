import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { color } from '../../../..';
import Input from '../../../../../../../../components/Forms/Input';
import { FormProps as UsernameProps } from '../../types';

const Username = ({ form }: Omit<UsernameProps, 'onSubmit'>): ReactElement => {
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
					onChange={onChange}
					isFullWidth
					isRequired
					value={value}
				/>
			)}
		/>
	);
};

export default Username;
