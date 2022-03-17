import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

// import { color } from '../../../..';
import Input from '../../../../../../../../../components/Forms/Input';
import Icon from '../../../../../../../../../components/Icon';
import { DetailsProps as UsernameProps } from '../../../../types';

const Username = ({ form, color, colorMode }: UsernameProps): ReactElement => {
	return (
		<Controller
			control={form.control}
			name='username'
			render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
				<Input
					color={color}
					colorMode={colorMode}
					label='Username'
					error={error}
					name={name}
					placeholder='johnsmith'
					onBlur={onBlur}
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
