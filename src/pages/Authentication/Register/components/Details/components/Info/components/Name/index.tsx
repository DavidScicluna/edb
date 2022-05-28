import React, { ReactElement } from 'react';

import { Input } from '@davidscicluna/component-library';
import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';

import { DetailsProps as NameProps } from '../../../../types';
import { isBoolean } from 'lodash';

const Name = ({ form, colorMode }: NameProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	return (
		<SimpleGrid width='100%' columns={isSm ? 1 : 2} spacing={2}>
			<Controller
				control={form.control}
				name='firstName'
				render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
					<Input
						// color={color}
						color='blue'
						colorMode={colorMode}
						label='First name'
						name={name}
						helper={error ? error.message : undefined}
						placeholder='John'
						onBlur={onBlur}
						onChange={onChange}
						isError={isBoolean(error)}
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
						// color={color}
						color='blue'
						colorMode={colorMode}
						label='Last name'
						name={name}
						helper={error ? error.message : undefined}
						placeholder='Smith'
						onBlur={onBlur}
						onChange={onChange}
						isError={isBoolean(error)}
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
