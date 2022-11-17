import { FC } from 'react';

import { Space, Card, CardBody, Divider, Input } from '@davidscicluna/component-library';

import { useBoolean, VStack } from '@chakra-ui/react';

import { Controller, useWatch } from 'react-hook-form';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../common/data/defaultPropValues';
import PasswordIcon from '../../../../../components/PasswordIcon';
import EditUserStructure from '../EditUserStructure';

import { PasswordTabProps } from './types';

const spacing: Space = 2;

const PasswordTab: FC<PasswordTabProps> = (props) => {
	const { form, color = defaultColor, colorMode = defaultColorMode, onSubmit } = props;
	const { control, handleSubmit } = form;

	const watchPassword = useWatch({ control, name: 'password' });
	const watchNewPassword = useWatch({ control, name: 'newPassword' });
	const watchConfirmNewPassword = useWatch({ control, name: 'confirmNewPassword' });

	// Current Password
	const [isCurrentPassVisible, setIsCurrentPassVisible] = useBoolean();
	const [isHoveringCurrentPass, setIsHoveringCurrentPass] = useBoolean();

	// New Password
	const [isNewPassVisible, setIsNewPassVisible] = useBoolean();
	const [isHoveringNewPass, setIsHoveringNewPass] = useBoolean();

	// Confirm Password
	const [isConfirmPassVisible, setIsConfirmPassVisible] = useBoolean();
	const [isHoveringConfirmPass, setIsHoveringConfirmPass] = useBoolean();

	return (
		<EditUserStructure
			color={color}
			colorMode={colorMode}
			title='Password'
			subtitle='Update your password'
			isSubmitDisabled={!watchPassword || !watchNewPassword || !watchConfirmNewPassword}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Card colorMode={colorMode} isFullWidth variant='outlined' p={spacing}>
				<CardBody>
					<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing * 2}>
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
								render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
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
										isDisabled={!watchPassword}
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
										isDisabled={!watchPassword}
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
		</EditUserStructure>
	);
};

export default PasswordTab;
