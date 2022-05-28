import React, { ReactElement } from 'react';

import { useTheme, Textarea } from '@davidscicluna/component-library';

import { Controller } from 'react-hook-form';
import { isBoolean } from 'lodash';

import { DetailsProps as BioProps } from '../../../../types';

const Bio = ({ form, colorMode }: BioProps): ReactElement => {
	const theme = useTheme();

	return (
		<Controller
			control={form.control}
			name='bio'
			render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
				<Textarea
					// color={color}
					color='blue'
					colorMode={colorMode}
					label='Biography'
					name={name}
					helper={error ? error.message : undefined}
					placeholder='My name is John Smith ...'
					onBlur={onBlur}
					onChange={onChange}
					isError={isBoolean(error)}
					isFullWidth
					value={value}
					sx={{ textarea: { height: theme.space[12.5] } }}
				/>
			)}
		/>
	);
};

export default Bio;
