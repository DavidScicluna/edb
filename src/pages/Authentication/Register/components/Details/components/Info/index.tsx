import React, { ReactElement } from 'react';

import { Button } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { isEmpty, isNil } from 'lodash';


import Panel from '../../../../../../../components/Panel';
import { detailsDefaultValues as defaultValues } from '../../../../defaults';
import { DetailsProps as InfoProps } from '../../types';

import Name from './components/Name';
import Bio from './components/Bio';

const Info = ({ form, color, colorMode }: InfoProps): ReactElement => {
	const firstName = form.watch('firstName');
	const lastName = form.watch('lastName');
	const bio = form.watch('bio');

	const handleClear = (): void => {
		form.setValue('firstName', defaultValues.firstName, { shouldDirty: false });
		form.setValue('lastName', defaultValues.lastName, { shouldDirty: false });
		form.setValue('bio', defaultValues.bio, { shouldDirty: false });
	};

	return (
		<Panel colorMode={colorMode} isFullWidth variant='outlined'>
			{{
				header: {
					title: 'Information',
					actions: (
						<Button
							color={color}
							colorMode={colorMode}
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
						<Name form={form} color={color} colorMode={colorMode} />
						<Bio form={form} color={color} colorMode={colorMode} />
					</VStack>
				)
			}}
		</Panel>
	);
};

export default Info;
