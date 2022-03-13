import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import { isEmpty, isNil } from 'lodash';

import Password from './components/Password';
import Username from './components/Username';

import Button from '../../../../../../components/Clickable/Button';
import Panel from '../../../../../../components/Panel';
import { detailsDefaultValues as defaultValues } from '../../../../defaults';
import { DetailsProps as CredentialsProps } from '../../types';

const Credentials = ({ form, color, colorMode }: CredentialsProps): ReactElement => {
	const username = form.watch('username');
	const password = form.watch('password');

	const handleClear = (): void => {
		form.setValue('username', defaultValues.username, { shouldDirty: false });
		form.setValue('password', defaultValues.password, { shouldDirty: false });
	};

	return (
		<Panel colorMode={colorMode} isFullWidth variant='outlined'>
			{{
				header: {
					title: 'Credentials',
					actions: (
						<Button
							color={color}
							colorMode={colorMode}
							isDisabled={
								(isNil(username) || isEmpty(username)) && (isNil(password) || isEmpty(password))
							}
							onClick={() => handleClear()}
							size='sm'
							variant='text'
						>
							Clear
						</Button>
					)
				},
				body: (
					<VStack width='100%' spacing={2}>
						<Username form={form} color={color} colorMode={colorMode} />
						<Password form={form} color={color} colorMode={colorMode} />
					</VStack>
				)
			}}
		</Panel>
	);
};

export default Credentials;
