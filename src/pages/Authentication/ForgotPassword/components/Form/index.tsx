import { FC } from 'react';

import { useNavigate } from 'react-router';

import {
	useTheme,
	Form as DSUIForm,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Input,
	Icon,
	Divider,
	Button
} from '@davidscicluna/component-library';

import { useMediaQuery, useBoolean, useConst, Container, VStack, HStack, Text } from '@chakra-ui/react';

import { useFormState, Controller } from 'react-hook-form';
import { sample } from 'lodash';

import { usernames as placeholders } from '../../../common/data/placeholders';
import { useUserTheme } from '../../../../../common/hooks';
import { PasswordIcon } from '../../../components';

import { FormProps } from './types';

const Form: FC<FormProps> = ({ form, onSubmit }) => {
	const theme = useTheme();
	const [isSm] = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

	const { color, colorMode } = useUserTheme();

	const navigate = useNavigate();

	const { control, handleSubmit } = form;

	const { isDirty } = useFormState({ control });

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

	return (
		<Container maxWidth='container.lg' centerContent>
			<DSUIForm width='100%' onSubmit={handleSubmit((values) => onSubmit({ ...values }))}>
				<Card colorMode={colorMode} isFullWidth p={[2, 2, 3, 3]} spacing={0}>
					<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={[2, 2, 3, 3]}>
						<CardHeader
							renderTitle={(props) => (
								<Text {...props} fontSize='2xl'>
									Forgot Password?
								</Text>
							)}
							renderSubtitle={(props) => (
								<Text {...props} noOfLines={0}>
									In order to reset password please enter the username, the current password and the
									new password!
								</Text>
							)}
						/>
						<CardBody>
							<VStack width='100%' divider={<Divider />} spacing={[2, 2, 3, 3]}>
								<Controller
									control={control}
									name='username'
									render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
										<Input
											color={color}
											colorMode={colorMode}
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
											value={value}
										/>
									)}
								/>

								<VStack width='100%' spacing={2}>
									<Controller
										control={control}
										name='password'
										render={({
											field: { onChange, onBlur, value, name },
											fieldState: { error }
										}) => (
											<Input
												color={color}
												colorMode={colorMode}
												label='Current Password'
												name={name}
												helper={error ? error.message : undefined}
												placeholder={isCurrentPassVisible ? 'password' : '••••••••'}
												onBlur={onBlur}
												onChange={onChange}
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
												label='New Password'
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
						<CardFooter>
							<HStack width='100%' justifyContent='space-between' spacing={0}>
								<Button colorMode={colorMode} onClick={() => navigate(-1)} variant='outlined'>
									Back
								</Button>

								<Button color={color} colorMode={colorMode} isDisabled={!isDirty} type='submit'>
									{isSm ? 'Change Password' : 'Change'}
								</Button>
							</HStack>
						</CardFooter>
					</VStack>
				</Card>
			</DSUIForm>
		</Container>
	);
};

export default Form;
