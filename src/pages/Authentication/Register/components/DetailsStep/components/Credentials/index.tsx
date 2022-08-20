import { FC } from 'react';

import { Card, CardHeader, CardBody, Button, Input, Icon } from '@davidscicluna/component-library';

import { useBoolean, VStack, Text } from '@chakra-ui/react';

import { useWatch, Controller } from 'react-hook-form';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../common/data/defaultPropValues';
import { detailsDefaultValues as defaultValues } from '../../../../defaults';
import { PasswordIcon } from '../../../../../components';

import { CredentialsProps } from './types';

const Credentials: FC<CredentialsProps> = (props) => {
	const { form, color = defaultColor, colorMode = defaultColorMode, placeholder } = props;
	const { control, getValues, reset } = form;

	const watchUsername = useWatch({ control, name: 'username' });
	const watchPassword = useWatch({ control, name: 'password' });

	const [isPassVisible, setIsPassVisible] = useBoolean();
	const [isHoveringPass, setIsHoveringPass] = useBoolean();

	const handleClear = (): void => {
		reset(
			{ ...getValues(), username: defaultValues.username, password: defaultValues.password },
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

	return (
		<Card colorMode={colorMode} isFullWidth variant='outlined' p={2}>
			<CardHeader
				renderTitle={(props) => <Text {...props}>Credentials</Text>}
				actions={
					<Button
						color={color}
						colorMode={colorMode}
						isDisabled={!watchUsername && !watchPassword}
						onClick={() => handleClear()}
						size='xs'
						variant='text'
					>
						Clear
					</Button>
				}
			/>
			<CardBody>
				<VStack width='100%' spacing={2}>
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
									<Icon {...rest} icon='alternate_email' category='outlined' skeletonColor={color} />
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
				</VStack>
			</CardBody>
		</Card>
	);
};

export default Credentials;
