import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { useTheme, Checkbox } from '@chakra-ui/react';

import { color } from '../../../..';
import { Theme } from '../../../../../../../../theme/types';
import { FormProps as RememberMeProps } from '../../types';

const RememberMe = ({ form }: Omit<RememberMeProps, 'onSubmit'>): ReactElement => {
	const theme = useTheme<Theme>();

	return (
		<Controller
			control={form.control}
			name='rememberMe'
			render={({ field: { value, name } }) => (
				<Checkbox
					aria-label='Remember Me'
					name={name}
					isChecked={value}
					onChange={(event) => form.setValue('rememberMe', event.target.checked, { shouldDirty: false })}
					size='md'
					spacing={0.75}
					variant='unstyled'
					sx={{
						'WebkitTapHighlightColor': 'transparent',

						'& .chakra-checkbox__control': {
							width: theme.fontSizes['xl'],
							height: theme.fontSizes['xl'],

							color: 'gray.50',
							borderColor: value ? `${color}.500` : 'gray.200',
							background: value ? `${color}.500` : 'gray.50',
							backgroundColor: value ? `${color}.500` : 'gray.50'
						},

						'& .chakra-checkbox__label': {
							color: 'gray.400',
							fontSize: 'sm'
						},

						'& *': {
							boxShadow: 'none !important',

							transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
						},

						'&:hover': {
							'& .chakra-checkbox__control': {
								color: 'gray.50',
								borderColor: value ? `${color}.600` : 'gray.300',
								background: value ? `${color}.600` : 'gray.50',
								backgroundColor: value ? `${color}.600` : 'gray.50'
							}
						}
					}}
				>
					Remember Me
				</Checkbox>
			)}
		/>
	);
};

export default RememberMe;
