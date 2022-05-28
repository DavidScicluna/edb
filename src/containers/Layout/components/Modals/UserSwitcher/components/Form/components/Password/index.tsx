import { ReactElement } from 'react';

import { Input, IconButton, Icon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

// import { useSelector } from '../../../../../../../../../common/hooks';
// import { defaultUser, getUser } from '../../../../../../../../../store/slices/Users';
import { isBoolean } from 'lodash';

import Tooltip from '../../../../../../../../../components/Tooltip';

import { PasswordProps } from './types';

const Password = ({ form }: PasswordProps): ReactElement => {
	// const color = useSelector(
	// 	(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	// );

	const [isPasswordVisible, setIsPasswordVisible] = useBoolean();
	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Controller
			control={form.control}
			name='password'
			render={({ field: { onChange, value, name }, fieldState: { error } }) => (
				<Input
					// color={color}
					color='blue'
					label='Password'
					name={name}
					helper={error ? error.message : undefined}
					placeholder={isPasswordVisible ? 'password' : '••••••••'}
					onChange={onChange}
					isError={isBoolean(error)}
					isFullWidth
					isRequired
					renderRightPanel={() => (
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
								<Icon icon={isPasswordVisible ? 'visibility_off' : 'visibility'} category='outlined' />
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
