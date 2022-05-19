import React, { ReactElement } from 'react';


import { useBoolean } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';


import { useSelector } from '../../../../../../../../../common/hooks';
import IconButton from '../../../../../../../../../components/Clickable/IconButton';
import Input from '../../../../../../../../../components/Forms/Input';
import Icon from '../../../../../../../../../components/Icon';
import Tooltip from '../../../../../../../../../components/Tooltip';
import { defaultUser, getUser } from '../../../../../../../../../store/slices/Users';

import { PasswordProps } from './types';

const Password = ({ form }: PasswordProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const [isPasswordVisible, setIsPasswordVisible] = useBoolean();
	const [isHovering, setIsHovering] = useBoolean();

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
					placeholder={isPasswordVisible ? 'password' : '••••••••'}
					onChange={onChange}
					isFullWidth
					isRequired
					renderInputRightPanel={() => (
						<Tooltip
							aria-label={isPasswordVisible ? 'Hide password (tooltip)' : 'Show Password (tooltip)'}
							label={isPasswordVisible ? 'Hide password' : 'Show Password'}
							placement='top'
							isOpen={isHovering}
						>
							<IconButton
								aria-label={isPasswordVisible ? 'Hide password' : 'Show Password'}
								onClick={() => setIsPasswordVisible.toggle()}
								onMouseEnter={() => setIsHovering.on()}
								onMouseLeave={() => setIsHovering.off()}
								size='sm'
								variant='icon'
							>
								<Icon icon={isPasswordVisible ? 'visibility_off' : 'visibility'} type='outlined' />
							</IconButton>
						</Tooltip>
					)}
					type={isPasswordVisible ? 'text' : 'password'}
					value={value}
				/>
			)}
		/>
	);
};

export default Password;
