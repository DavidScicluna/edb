import { ReactElement } from 'react';

import { Input, IconButton, Icon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { isBoolean } from 'lodash';

import Tooltip from '../../../../components/Tooltip';

import { PasswordProps } from './types';

const Password = ({ field, fieldState, label, colorMode }: PasswordProps): ReactElement => {
	const [isPasswordVisible, setIsPasswordVisible] = useBoolean();
	const [isHovering, setIsHovering] = useBoolean();

	const { name, onBlur, onChange, value } = field;
	const { error } = fieldState;

	return (
		<Input
			// color={color}
			color='blue'
			colorMode={colorMode}
			label={label || 'Password'}
			name={name}
			helper={error ? error.message : undefined}
			placeholder={isPasswordVisible ? 'password' : '••••••••'}
			onBlur={onBlur}
			onChange={onChange}
			isError={isBoolean(error)}
			isFullWidth
			isRequired
			renderRightPanel={() => (
				<Tooltip
					aria-label={isPasswordVisible ? 'Hide password (tooltip)' : `Show ${label || 'Password'} (tooltip)`}
					label={isPasswordVisible ? 'Hide password' : `Show ${label || 'Password'}`}
					placement='top'
					isOpen={isHovering}
				>
					<IconButton
						aria-label={isPasswordVisible ? 'Hide password' : `Show ${label || 'Password'}`}
						onClick={() => setIsPasswordVisible.toggle()}
						onMouseEnter={() => setIsHovering.on()}
						onMouseLeave={() => setIsHovering.off()}
						size='sm'
						variant='icon'
					>
						<Icon icon={isPasswordVisible ? 'visibility_off' : 'visibility'} category='outlined' />
					</IconButton>
				</Tooltip>
			)}
			type={isPasswordVisible ? 'text' : 'password'}
			value={value}
		/>
	);
};

export default Password;
