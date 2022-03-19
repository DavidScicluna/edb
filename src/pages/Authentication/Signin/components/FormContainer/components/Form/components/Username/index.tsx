import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { UsernameProps } from './types';

import { color } from '../../../..';
import Input from '../../../../../../../../../components/Forms/Input';
import Icon from '../../../../../../../../../components/Icon';

const Username = ({ form, onChange }: UsernameProps): ReactElement => {
	return (
		<Controller
			control={form.control}
			name='username'
			render={({ field: { onChange: fieldOnChange, value, name }, fieldState: { error } }) => (
				<Input
					color={color}
					label='Username'
					error={error}
					name={name}
					placeholder='johnsmith'
					onChange={(event) => {
						fieldOnChange(event);
						onChange();
					}}
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
