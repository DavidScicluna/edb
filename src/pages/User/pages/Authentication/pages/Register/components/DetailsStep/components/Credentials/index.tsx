import { FC, useCallback } from 'react';

import { useOutletContext } from 'react-router';

import { Space, Card, CardHeader, CardBody, Divider, Button, Input, Icon } from '@davidscicluna/component-library';

import { useBoolean, VStack, Text } from '@chakra-ui/react';

import { useWatch, Controller } from 'react-hook-form';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../../../common/data/defaultPropValues';
import { detailsDefaultValues as defaultValues } from '../../../../defaults';
import PasswordIcon from '../../../../../../../../components/PasswordIcon';
import { useSelector } from '../../../../../../../../../../common/hooks';
import { AuthenticationOutletContext } from '../../../../../../types';

import { CredentialsProps } from './types';

const spacing: Space = 2;

const Credentials: FC<CredentialsProps> = (props) => {
	const users = useSelector((state) => state.users.data.users || []);

	const { color = defaultColor, colorMode = defaultColorMode } = useOutletContext<AuthenticationOutletContext>();

	const { form, placeholder } = props;
	const { control, getValues, clearErrors, setValue, setError, reset } = form;

	const watchUsername = useWatch({ control, name: 'username' });
	const watchNewPassword = useWatch({ control, name: 'newPassword' });
	const watchConfirmNewPassword = useWatch({ control, name: 'confirmNewPassword' });

	// New Password
	const [isNewPassVisible, setIsNewPassVisible] = useBoolean();
	const [isHoveringNewPass, setIsHoveringNewPass] = useBoolean();

	// Confirm Password
	const [isConfirmPassVisible, setIsConfirmPassVisible] = useBoolean();
	const [isHoveringConfirmPass, setIsHoveringConfirmPass] = useBoolean();

	const handleClear = (): void => {
		reset(
			{
				...getValues(),
				username: defaultValues.username,
				newPassword: defaultValues.newPassword,
				confirmNewPassword: defaultValues.confirmNewPassword
			},
			{
				keepDirty: true,
				keepDirtyValues: true,
				keepErrors: true,
				keepIsSubmitted: true,
				keepIsValid: true,
				keepSubmitCount: true,
				keepTouched: true
			}
		);
	};

	const handleUsernameChange = useCallback(
		(value: string): void => {
			if (users.every((user) => user.data.credentials.username !== value.trim())) {
				clearErrors('username');
				setValue('username', value.trim(), { shouldDirty: true });
			} else {
				setValue('username', '', { shouldDirty: true });
				setError(
					'username',
					{ type: 'custom', message: 'The username must be unique! Please try another.' },
					{ shouldFocus: true }
				);
			}
		},
		[users]
	);

	return (
		<Card colorMode={colorMode} isFullWidth variant='outlined' p={spacing}>
			<CardHeader
				renderTitle={(props) => <Text {...props}>Credentials</Text>}
				actions={
					<Button
						color={color}
						colorMode={colorMode}
						isDisabled={!watchUsername && !watchNewPassword && !watchConfirmNewPassword}
						onClick={() => handleClear()}
						size='xs'
						variant='text'
					>
						Clear
					</Button>
				}
			/>
			<CardBody>
				<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
					<Controller
						control={control}
						name='username'
						render={({ field: { onBlur, value, name }, fieldState: { error } }) => (
							<Input
								color={color}
								colorMode={colorMode}
								autoComplete='off'
								label='Username'
								id={name}
								name={name}
								helper={error ? error.message : undefined}
								placeholder={placeholder}
								onBlur={onBlur}
								onChange={(event) => handleUsernameChange(event.target.value)}
								isError={!!error}
								isFullWidth
								isRequired
								renderLeftPanel={({ color, ...rest }) => (
									<Icon {...rest} icon='alternate_email' category='outlined' skeletonColor={color} />
								)}
								value={value}
							/>
						)}
					/>

					<VStack width='100%' spacing={spacing}>
						<Controller
							control={control}
							name='newPassword'
							render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
								<Input
									color={color}
									colorMode={colorMode}
									autoComplete='off'
									label='Password'
									name={name}
									helper={error ? error.message : undefined}
									placeholder={isNewPassVisible ? 'password' : '••••••••'}
									onBlur={onBlur}
									onChange={onChange}
									isError={!!error}
									isFullWidth
									isRequired
									renderRightPanel={({ color, ...rest }) => (
										<PasswordIcon
											{...rest}
											label='Password'
											isVisible={isNewPassVisible}
											isHovering={isHoveringNewPass}
											setIsVisible={setIsNewPassVisible}
											setIsHovering={setIsHoveringNewPass}
											iconProps={{ ...rest, skeletonColor: color }}
										/>
									)}
									type={isNewPassVisible ? 'text' : 'password'}
									value={value}
								/>
							)}
						/>

						<Controller
							control={control}
							name='confirmNewPassword'
							render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
								<Input
									color={color}
									colorMode={colorMode}
									autoComplete='off'
									label='Confirm Password'
									name={name}
									helper={error ? error.message : undefined}
									placeholder={isConfirmPassVisible ? 'password' : '••••••••'}
									onBlur={onBlur}
									onChange={onChange}
									isError={!!error}
									isFullWidth
									isRequired
									renderRightPanel={({ color, ...rest }) => (
										<PasswordIcon
											{...rest}
											label='Confirm Password'
											isVisible={isConfirmPassVisible}
											isHovering={isHoveringConfirmPass}
											setIsVisible={setIsConfirmPassVisible}
											setIsHovering={setIsHoveringConfirmPass}
											iconProps={{ ...rest, skeletonColor: color }}
										/>
									)}
									type={isConfirmPassVisible ? 'text' : 'password'}
									value={value}
								/>
							)}
						/>
					</VStack>
				</VStack>
			</CardBody>
		</Card>
	);
};

export default Credentials;
