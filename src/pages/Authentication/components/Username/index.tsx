import { ReactElement } from 'react';

import { Input, Icon } from '@davidscicluna/component-library';

import { isBoolean } from 'lodash';

import { useUserTheme } from '../../../../common/hooks';

import { UsernameProps } from './types';

const Username = ({ field, fieldState }: UsernameProps): ReactElement => {
	const { color, colorMode } = useUserTheme();

	const { onChange, onBlur, value, name } = field;
	const { error } = fieldState;

	return (
		<Input
			color={color}
			colorMode={colorMode}
			label='Username'
			id={name}
			name={name}
			helper={error ? error.message : undefined}
			placeholder='johnsmith'
			onBlur={onBlur}
			onChange={onChange}
			isError={isBoolean(error)}
			isFullWidth
			isRequired
			renderLeftPanel={(props) => <Icon {...props} icon='alternate_email' category='outlined' />}
			value={value}
		/>
	);
};

export default Username;
