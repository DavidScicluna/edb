import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { color } from '../../../..';
import Input from '../../../../../../../../../components/Forms/Input';
import Icon from '../../../../../../../../../components/Icon';
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
