import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { color } from '../../../..';
import Input from '../../../../../../../../components/Forms/Input';
import { FormProps as PasswordProps } from '../../types';

const Password = ({ form }: Omit<PasswordProps, 'onSubmit'>): ReactElement => {
	return (
		<Controller
			control={form.control}
			name='password'
			render={({ field: { onChange, value, name }, fieldState: { error } }) => (
				<Input
					color={color}
					label='Password'
					error={error}
					name={name}
					onChange={onChange}
					isFullWidth
					isRequired
					type='password'
					value={value}
				/>
			)}
		/>
	);
};

export default Password;
