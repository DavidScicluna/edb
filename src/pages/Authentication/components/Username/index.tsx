import React, { ReactElement } from 'react';

import { Icon } from '@davidscicluna/component-library';

import Input from '../../../../components/Forms/Input';

import { UsernameProps } from './types';

const Username = ({ field, fieldState, color, colorMode }: UsernameProps): ReactElement => {
	const { name, onBlur, onChange, value } = field;
	const { error } = fieldState;

	return (
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
			renderInputLeftPanel={({ height }) => <Icon icon='alternate_email' category='outlined' fontSize={height} />}
			value={value}
		/>
	);
};

export default Username;
