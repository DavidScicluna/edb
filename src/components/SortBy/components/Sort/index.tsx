import { ReactElement } from 'react';

import { Card, CardHeader, CardBody, Button, Icon } from '@davidscicluna/component-library';

import { VStack, Center, Text } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { useSelector } from '../../../../common/hooks';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import { SortBy } from '../../types';

import { SortProps } from './types';

const Sort = ({ form, sortBy }: SortProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const handleOnChange = (sort: SortBy) => {
		form.setValue('sortBy', sort, { shouldDirty: true });
	};

	return (
		<Controller
			control={form.control}
			name='sortBy'
			render={({ field: { value } }) => (
				<Card isFullWidth>
					<CardHeader renderTitle={(props) => <Text {...props}>Sort by</Text>} />
					<CardBody>
						<VStack width='100%' spacing={2}>
							{sortBy.map((sort) => (
								<Center key={sort.value} width='100%'>
									<Button
										color={sort.value === value.value ? color : 'gray'}
										renderRight={
											sort.value === value.value
												? (props) => <Icon {...props} icon='check' category='outlined' />
												: undefined
										}
										isFullWidth
										onClick={sort.value !== value.value ? () => handleOnChange(sort) : undefined}
										size='lg'
										variant='outlined'
									>
										{sort.label}
									</Button>
								</Center>
							))}
						</VStack>
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default Sort;
