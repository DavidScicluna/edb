import { ReactElement } from 'react';


import { VStack, Center } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';


import { useSelector } from '../../../../common/hooks';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import Button from '../../../Clickable/Button';
import Icon from '../../../Icon';
import Panel from '../../../Panel';
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
				<Panel isFullWidth>
					{{
						header: {
							title: 'Sort by'
						},
						body: (
							<VStack width='100%' spacing={2}>
								{sortBy.map((sort) => (
									<Center key={sort.value} width='100%'>
										<Button
											color={sort.value === value.value ? color : 'gray'}
											renderRight={
												sort.value === value.value
													? ({ fontSize }) => (
															<Icon icon='check' type='outlined' fontSize={fontSize} />
													  )
													: undefined
											}
											isFullWidth
											onClick={
												sort.value !== value.value ? () => handleOnChange(sort) : undefined
											}
											size='lg'
											variant='outlined'
										>
											{sort.label}
										</Button>
									</Center>
								))}
							</VStack>
						)
					}}
				</Panel>
			)}
		/>
	);
};

export default Sort;
