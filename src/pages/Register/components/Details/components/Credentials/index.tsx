import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import { isEmpty, isNil } from 'lodash';

import Password from './components/Password';
import Username from './components/Username';

import { detailsDefaultValues as defaultValues } from '../../../..';
import Button from '../../../../../../components/Clickable/Button';
import Panel from '../../../../../../components/Panel';
import { DetailsProps as CredentialsProps } from '../../types';

const Credentials = ({ form }: CredentialsProps): ReactElement => {
	const username = form.watch('username');
	const password = form.watch('password');

	const handleClear = (): void => {
		form.setValue('username', defaultValues.username, { shouldDirty: false });
		form.setValue('password', defaultValues.password, { shouldDirty: false });
	};

	return (
		<Panel isFullWidth variant='outlined'>
			{{
				header: {
					title: 'Credentials',
					actions: (
						<Button
							// color={color}
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
						<Username form={form} />
						<Password form={form} />
					</VStack>
				)
			}}
		</Panel>
	);
};

export default Credentials;
