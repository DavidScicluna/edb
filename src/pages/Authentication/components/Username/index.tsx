import React, { ReactElement } from 'react';

import { Input, Icon } from '@davidscicluna/component-library';

import { isBoolean } from 'lodash';

import { UsernameProps } from './types';

const Username = ({ field, fieldState, colorMode }: UsernameProps): ReactElement => {
	const { name, onBlur, onChange, value } = field;
	const { error } = fieldState;

	return (
		<Input
			// color={color}
			color='blue'
			colorMode={colorMode}
			label='Username'
			name={name}
			helper={error ? error.message : undefined}
			placeholder='johnsmith'
			onBlur={onBlur}
			onChange={onChange}
			isError={isBoolean(error)}
			isFullWidth
			isRequired
			renderLeftPanel={() => <Icon icon='alternate_email' category='outlined' />}
			value={value}
		/>
	);
};

export default Username;
