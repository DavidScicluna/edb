import { ReactElement } from 'react';

import { Card, CardHeader, CardBody, Button } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';
import { isEmpty, isNil } from 'lodash';

import Password from '../../../../../components/Password';
import Username from '../../../../../components/Username';
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
		<Card colorMode={colorMode} isFullWidth variant='outlined'>
			<CardHeader
				renderTitle={(props) => <Text {...props}>Credentials</Text>}
				actions={
					<Button
						color={color}
						colorMode={colorMode}
						isDisabled={(isNil(username) || isEmpty(username)) && (isNil(password) || isEmpty(password))}
						onClick={() => handleClear()}
						size='sm'
						variant='text'
					>
						Clear
					</Button>
				}
			/>
			<CardBody>
				<VStack width='100%' spacing={2}>
					<Controller
						control={form.control}
						name='username'
						render={({ field, fieldState }) => (
							<Username field={field} fieldState={fieldState} color={color} colorMode={colorMode} />
						)}
					/>
					<Controller
						control={form.control}
						name='password'
						render={({ field, fieldState }) => (
							<Password field={field} fieldState={fieldState} color={color} colorMode={colorMode} />
						)}
					/>
				</VStack>
			</CardBody>
		</Card>
	);
};

export default Credentials;
