import React, { FC } from 'react';

import { useTheme, Checkbox, CheckboxTitle, InternalLink, Button, utils } from '@davidscicluna/component-library';

import { VStack, HStack } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';

import { Username, Password } from '../../../../../components';
import { useUserTheme } from '../../../../../../../common/hooks';

import { BodyProps } from './types';

const { getColor } = utils;

const Body: FC<BodyProps> = ({ form }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { control } = form;

	return (
		<VStack width='100%' spacing={2}>
			<Controller
				control={control}
				name='username'
				render={({ field, fieldState }) => <Username field={{ ...field }} fieldState={{ ...fieldState }} />}
			/>
			<Controller
				control={control}
				name='password'
				render={({ field, fieldState }) => <Password field={{ ...field }} fieldState={fieldState} />}
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
							onChange={(event) => form.setValue(name, event.target.checked, { shouldDirty: false })}
							renderRightPanel={(props) => (
								<CheckboxTitle
									{...props}
									color={getColor({ theme, colorMode, type: 'text.secondary' })}
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

				<InternalLink to='/forgot-password'>
					<Button color={color} colorMode={colorMode} size='xs' variant='text'>
						Forgot password?
					</Button>
				</InternalLink>
			</HStack>
		</VStack>
	);
};

export default Body;
