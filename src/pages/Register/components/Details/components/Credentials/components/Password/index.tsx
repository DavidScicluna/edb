import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { useBoolean } from '@chakra-ui/react';

// import { color } from '../../../..';
import IconButton from '../../../../../../../../components/Clickable/IconButton';
import Input from '../../../../../../../../components/Forms/Input';
import Icon from '../../../../../../../../components/Icon';
import Tooltip from '../../../../../../../../components/Tooltip';
import { DetailsProps as PasswordProps } from '../../../../types';

const Password = ({ form, color, colorMode }: PasswordProps): ReactElement => {
	const [isPasswordVisible, setIsPasswordVisible] = useBoolean();
	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Controller
			control={form.control}
			name='password'
			render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
				<Input
					color={color}
					colorMode={colorMode}
					label='Password'
					error={error}
					name={name}
					placeholder={isPasswordVisible ? 'password' : '••••••••'}
					onBlur={onBlur}
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
