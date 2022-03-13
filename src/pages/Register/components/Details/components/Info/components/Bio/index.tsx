import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { useTheme } from '@chakra-ui/react';

import Textarea from '../../../../../../../../components/Forms/Textarea';
import { Theme } from '../../../../../../../../theme/types';
import { DetailsProps as BioProps } from '../../../../types';

const Bio = ({ form, color, colorMode }: BioProps): ReactElement => {
	const theme = useTheme<Theme>();

	return (
		<Controller
			control={form.control}
			name='bio'
			render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
				<Textarea
					color={color}
					colorMode={colorMode}
					label='Biography'
					error={error}
					name={name}
					placeholder='My name is John Smith ...'
					onBlur={onBlur}
					onChange={onChange}
					isFullWidth
					value={value}
					sx={{ textarea: { height: theme.space[12.5] } }}
				/>
			)}
		/>
	);
};

export default Bio;
