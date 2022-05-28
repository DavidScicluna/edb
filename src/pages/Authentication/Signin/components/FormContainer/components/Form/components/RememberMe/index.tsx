import React, { ReactElement } from 'react';

import { Checkbox, CheckboxTitle } from '@davidscicluna/component-library';
import { Controller } from 'react-hook-form';

// import { color } from '../../../..';

import { RememberMeProps } from './types';

const RememberMe = ({ form }: RememberMeProps): ReactElement => {
	return (
		<Controller
			control={form.control}
			name='rememberMe'
			render={({ field: { value, name } }) => (
				<Checkbox
					// aria-label='Remember Me'
					// color={color}
					color='blue'
					name={name}
					isChecked={value}
					onChange={(event) => form.setValue('rememberMe', event.target.checked, { shouldDirty: false })}
					renderRightPanel={() => <CheckboxTitle>Remember Me</CheckboxTitle>}
				/>
			)}
		/>
	);
};

export default RememberMe;
