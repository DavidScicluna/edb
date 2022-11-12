import { FC } from 'react';

import {
	useTheme,
	ConfirmModal,
	ConfirmModalStack,
	ConfirmModalBody,
	ConfirmModalIcon,
	ConfirmModalTitle,
	ConfirmModalSubtitle,
	ConfirmModalFooter,
	Form as DSUIForm,
	Card,
	CardBody,
	CardFooter,
	Input,
	Checkbox,
	CheckboxTitle,
	Divider,
	InternalLink,
	Button,
	IconButton,
	IconButtonIcon,
	Icon
} from '@davidscicluna/component-library';

import { useDisclosure, useBoolean, useConst, VStack, HStack } from '@chakra-ui/react';

import { useWatch, useFormState, Controller } from 'react-hook-form';
import qs from 'query-string';
import { omit, sample } from 'lodash';

import { usernames as placeholders } from '../../../../common/data/placeholders';
import { PasswordIcon } from '../../../../components';
import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../common/data/defaultPropValues';
import { useLayoutContext } from '../../../../../../../../containers/Layout/common/hooks';

import { FormProps } from './types';

const Form: FC<FormProps> = (props) => {
	const theme = useTheme();

	const { spacing } = useLayoutContext();

	const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

	const { color = defaultColor, colorMode = defaultColorMode, form, onSubmitAsGuest, onSubmit } = props;
	const { control, setValue, handleSubmit: handleSubmitForm } = form;

	const watchUsername = useWatch({ control, name: 'username' });

	const { isDirty } = useFormState({ control });

	const [isPassVisible, setIsPassVisible] = useBoolean();
	const [isHoveringPass, setIsHoveringPass] = useBoolean();

	const placeholder = useConst<string>(sample(placeholders) || 'johnsmith');

	const handleSubmitAsGuest = (): void => {
		onConfirmClose();
		onSubmitAsGuest();
	};

	return (
		<>
			<DSUIForm width='100%' onSubmit={handleSubmitForm((values) => onSubmit({ ...values }))}>
				<Card colorMode={colorMode} isFullWidth p={[2, 2, 3, 3]}>
					<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={[2, 2, 3, 3]}>
						<CardBody>
							<VStack width='100%' spacing={2}>
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
											value={value}
										/>
									)}
								/>

								<Controller
									control={control}
									name='password'
									render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
										<Input
											color={color}
											colorMode={colorMode}
											autoComplete='off'
											label='Password'
											name={name}
											helper={error ? error.message : undefined}
											placeholder={isPassVisible ? 'password' : '••••••••'}
											onBlur={onBlur}
											onChange={onChange}
											isError={!!error}
											isFullWidth
											isRequired
											renderRightPanel={({ color, ...rest }) => (
												<PasswordIcon
													{...rest}
													label='Password'
													isVisible={isPassVisible}
													isHovering={isHoveringPass}
													setIsVisible={setIsPassVisible}
													setIsHovering={setIsHoveringPass}
													iconProps={{ ...rest, skeletonColor: color }}
												/>
											)}
											type={isPassVisible ? 'text' : 'password'}
											value={value}
										/>
									)}
								/>

								<HStack width='100%' justifyContent='space-between' spacing={0}>
									<Controller
										control={control}
										name='rememberMe'
										render={({ field: { onBlur, value, name } }) => (
											<Checkbox
												aria-label='Remember Me'
												color={color}
												colorMode={colorMode}
												id={name}
												name={name}
												isChecked={value}
												onBlur={onBlur}
												onChange={({ isChecked }) =>
													setValue(name, isChecked, { shouldDirty: false })
												}
												renderRightPanel={(props) => (
													<CheckboxTitle
														{...omit(props, ['width', 'height', 'color'])}
														fontSize='xs'
														fontWeight='semibold'
														textTransform='uppercase'
														letterSpacing='.6px'
													>
														Remember Me
													</CheckboxTitle>
												)}
												size='xs'
												variant='transparent'
											/>
										)}
									/>

									<InternalLink
										to={{
											pathname: '/authentication/reset-password',
											search: watchUsername ? qs.stringify({ username: watchUsername }) : ''
										}}
									>
										<Button color={color} colorMode={colorMode} size='xs' variant='text'>
											Reset password?
										</Button>
									</InternalLink>
								</HStack>
							</VStack>
						</CardBody>
						<CardFooter>
							<VStack width='100%' spacing={1}>
								<Button
									color={color}
									colorMode={colorMode}
									isDisabled={!isDirty}
									isFullWidth
									type='submit'
								>
									Sign In
								</Button>

								<Button
									colorMode={colorMode}
									isFullWidth
									onClick={() => onConfirmOpen()}
									size='xs'
									variant='text'
								>
									Or continue as a guest
								</Button>
							</VStack>
						</CardFooter>
					</VStack>
				</Card>
			</DSUIForm>

			<ConfirmModal
				colorMode={colorMode}
				isOpen={isConfirmOpen}
				onClose={onConfirmClose}
				renderCancel={({ icon, category, ...rest }) => (
					<IconButton {...rest}>
						<IconButtonIcon icon={icon} category={category} />
					</IconButton>
				)}
			>
				<ConfirmModalStack spacing={spacing} p={spacing}>
					<ConfirmModalIcon
						renderIcon={(props) => (
							<Icon
								{...props}
								width={theme.fontSizes['6xl']}
								height={theme.fontSizes['6xl']}
								fontSize={theme.fontSizes['6xl']}
								icon='login'
							/>
						)}
						color={color}
						p={2}
					/>

					<ConfirmModalBody>
						<ConfirmModalTitle>Sign in as a Guest?</ConfirmModalTitle>
						<ConfirmModalSubtitle>
							Are you sure you want to sign in as a guest? You will not be able to like, create and add to
							lists!
						</ConfirmModalSubtitle>
					</ConfirmModalBody>

					<ConfirmModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={(props) => (
							<Button {...props} color={color} onClick={() => handleSubmitAsGuest()}>
								Sign in
							</Button>
						)}
					/>
				</ConfirmModalStack>
			</ConfirmModal>
		</>
	);
};

export default Form;
