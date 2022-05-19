import React, { ReactElement } from 'react';

import { Controller } from 'react-hook-form';


import { color } from '../../../..';
import Checkbox from '../../../../../../../../../components/Forms/Checkbox';

import { RememberMeProps } from './types';

const RememberMe = ({ form }: RememberMeProps): ReactElement => {
	return (
		<Controller
			control={form.control}
			name='rememberMe'
			render={({ field: { value, name } }) => (
				<Checkbox
					aria-label='Remember Me'
					color={color}
					name={name}
					isChecked={value}
					onChange={(event) => form.setValue('rememberMe', event.target.checked, { shouldDirty: false })}
					spacing={0.75}
				>
					Remember Me
				</Checkbox>
			)}
		/>
	);
};

export default RememberMe;
