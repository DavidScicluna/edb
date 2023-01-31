import { FC, useEffect } from 'react';

import { useOutletContext } from 'react-router';

import {
	Space,
	Form,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Input,
	Icon,
	Divider,
	Button
} from '@davidscicluna/component-library';

import { useBoolean, useConst, VStack, HStack, Text } from '@chakra-ui/react';

import { useWatch, useFormState, Controller } from 'react-hook-form';
import { sample } from 'lodash';

import { usernames as placeholders } from '../../../../../../../../common/data/placeholders/user';
import { useSelector } from '../../../../../../../../common/hooks';
import PasswordIcon from '../../../../../../components/PasswordIcon';
import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../common/data/defaultPropValues';
import { AuthenticationOutletContext } from '../../../../types';

import { ResetPasswordFormProps } from './types';

const spacing: Space = 2;

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ form, onSubmit, onBack }) => {
	const { color = defaultColor, colorMode = defaultColorMode } = useOutletContext<AuthenticationOutletContext>();

	const users = useSelector((state) => state.users.data.users || []);

	const { control, handleSubmit } = form;

	const watchUsername = useWatch({ control, name: 'username' });
	const watchPassword = useWatch({ control, name: 'password' });

	const { isDirty } = useFormState({ control });

	const [isUserChecked, setIsUserChecked] = useBoolean();

	// Current Password
	const [isCurrentPassVisible, setIsCurrentPassVisible] = useBoolean();
	const [isHoveringCurrentPass, setIsHoveringCurrentPass] = useBoolean();

	// New Password
	const [isNewPassVisible, setIsNewPassVisible] = useBoolean();
	const [isHoveringNewPass, setIsHoveringNewPass] = useBoolean();

	// Confirm Password
	const [isConfirmPassVisible, setIsConfirmPassVisible] = useBoolean();
	const [isHoveringConfirmPass, setIsHoveringConfirmPass] = useBoolean();

	const placeholder = useConst<string>(sample(placeholders) || 'johnsmith');

	useEffect(
		() =>
			setIsUserChecked[
				!!watchUsername && users.some((user) => user.data.credentials.username === watchUsername) ? 'on' : 'off'
			](),
		[watchUsername]
	);

	return (
		<Form width='100%' onSubmit={handleSubmit(onSubmit)}>
			<Card colorMode={colorMode} isFullWidth p={spacing} spacing={0}>
				<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
					<CardHeader
						renderTitle={(props) => (
							<Text {...props} fontSize='2xl'>
								Reset Password?
							</Text>
						)}
						renderSubtitle={(props) => (
							<Text {...props} noOfLines={0}>
								In order to reset password please enter the username, the current password and the new
								password!
							</Text>
						)}
					/>
					<CardBody>
						<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
							<Controller
								control={control}
								name='username'
								render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
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
										onChange={onChange}
										isError={!!error}
										isFullWidth
										isRequired
										renderLeftPanel={({ color, ...rest }) => (
											<Icon
												{...rest}
												icon='alternate_email'
												category='outlined'
												skeletonColor={color}
											/>
										)}
										renderRightPanel={
											value.length >= 5
												? ({ color, ...rest }) => (
														<Icon
															{...rest}
															icon={isUserChecked ? 'done' : 'close'}
															category='outlined'
															skeletonColor={color}
														/>
												  )
												: undefined
										}
										value={value}
									/>
								)}
							/>

							<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
								<Controller
									control={control}
									name='password'
									render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
										<Input
											color={color}
											colorMode={colorMode}
											autoComplete='off'
											label='Current Password'
											name={name}
											helper={error ? error.message : undefined}
											placeholder={isCurrentPassVisible ? 'password' : '••••••••'}
											onBlur={onBlur}
											onChange={onChange}
											isDisabled={!isUserChecked}
											isError={!!error}
											isFullWidth
											isRequired
											renderRightPanel={({ color, ...rest }) => (
												<PasswordIcon
													{...rest}
													label='Current Password'
													isVisible={isCurrentPassVisible}
													isHovering={isHoveringCurrentPass}
													setIsVisible={setIsCurrentPassVisible}
													setIsHovering={setIsHoveringCurrentPass}
													iconProps={{ ...rest, skeletonColor: color }}
												/>
											)}
											type={isCurrentPassVisible ? 'text' : 'password'}
											value={value}
										/>
									)}
								/>

								<VStack width='100%' spacing={spacing}>
									<Controller
										control={control}
										name='newPassword'
										render={({
											field: { onChange, onBlur, value, name },
											fieldState: { error }
										}) => (
											<Input
												color={color}
												colorMode={colorMode}
												autoComplete='off'
												label='New Password'
												name={name}
												helper={error ? error.message : undefined}
												placeholder={isNewPassVisible ? 'password' : '••••••••'}
												onBlur={onBlur}
												onChange={onChange}
												isDisabled={!isUserChecked || !watchPassword}
												isError={!!error}
												isFullWidth
												isRequired
												renderRightPanel={({ color, ...rest }) => (
													<PasswordIcon
														{...rest}
														label='New Password'
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
										render={({
											field: { onChange, onBlur, value, name },
											fieldState: { error }
										}) => (
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
												isDisabled={!isUserChecked || !watchPassword}
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
						</VStack>
					</CardBody>
					<CardFooter>
						<HStack width='100%' justifyContent='space-between' spacing={0}>
							<Button colorMode={colorMode} onClick={() => onBack()} variant='outlined'>
								Back
							</Button>

							<Button color={color} colorMode={colorMode} isDisabled={!isDirty} type='submit'>
								Change Password
							</Button>
						</HStack>
					</CardFooter>
				</VStack>
			</Card>
		</Form>
	);
};

export default ResetPasswordForm;
