import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import { isEmpty, isNil } from 'lodash';

import Bio from './components/Bio';
import Name from './components/Name';

import { detailsDefaultValues as defaultValues } from '../../../..';
import Button from '../../../../../../components/Clickable/Button';
import Panel from '../../../../../../components/Panel';
import { DetailsProps as InfoProps } from '../../types';

const Info = ({ form }: InfoProps): ReactElement => {
	const firstName = form.watch('firstName');
	const lastName = form.watch('lastName');
	const bio = form.watch('bio');

	const handleClear = (): void => {
		form.setValue('firstName', defaultValues.firstName, { shouldDirty: false });
		form.setValue('lastName', defaultValues.lastName, { shouldDirty: false });
		form.setValue('bio', defaultValues.bio, { shouldDirty: false });
	};

	return (
		<Panel isFullWidth variant='outlined'>
			{{
				header: {
					title: 'Information',
					actions: (
						<Button
							// color={color}
							isDisabled={
								(isNil(firstName) || isEmpty(firstName)) &&
								(isNil(lastName) || isEmpty(lastName)) &&
								(isNil(bio) || isEmpty(bio))
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
						<Name form={form} />
						<Bio form={form} />
					</VStack>
				)
			}}
		</Panel>
	);
};

export default Info;
