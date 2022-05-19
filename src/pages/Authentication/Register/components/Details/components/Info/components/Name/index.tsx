import React, { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';


import Input from '../../../../../../../../../components/Forms/Input';
import { DetailsProps as NameProps } from '../../../../types';

const Name = ({ form, color, colorMode }: NameProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	return (
		<SimpleGrid width='100%' columns={isSm ? 1 : 2} spacing={2}>
			<Controller
				control={form.control}
				name='firstName'
				render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
					<Input
						color={color}
						colorMode={colorMode}
						label='First name'
						error={error}
						name={name}
						placeholder='John'
						onBlur={onBlur}
						onChange={onChange}
						isFullWidth
						isRequired
						value={value}
					/>
				)}
			/>
			<Controller
				control={form.control}
				name='lastName'
				render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
					<Input
						color={color}
						colorMode={colorMode}
						label='Last name'
						error={error}
						name={name}
						placeholder='Smith'
						onBlur={onBlur}
						onChange={onChange}
						isFullWidth
						isRequired
						value={value}
					/>
				)}
			/>
		</SimpleGrid>
	);
};

export default Name;
