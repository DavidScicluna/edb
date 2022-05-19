import { ReactElement } from 'react';


import { useMediaQuery, Stack, Center } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';


import { useSelector } from '../../../../common/hooks';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import Button from '../../../Clickable/Button';
import Icon from '../../../Icon';
import Panel from '../../../Panel';
import { SortDirection } from '../../types';

import { DirectionProps } from './types';

const Direction = ({ form }: DirectionProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const handleOnChange = (direction: SortDirection) => {
		form.setValue('direction', direction, { shouldDirty: true });
	};

	return (
		<Controller
			control={form.control}
			name='direction'
			render={({ field: { value } }) => (
				<Panel isFullWidth>
					{{
						header: {
							title: 'Direction'
						},
						body: (
							<Stack width='100%' direction={isSm ? 'column' : 'row'} spacing={2}>
								<Center width='100%'>
									<Button
										color={value === 'asc' ? color : 'gray'}
										renderLeft={({ fontSize }) => (
											<Icon icon='arrow_upward' type='outlined' fontSize={fontSize} />
										)}
										renderRight={
											value === 'asc'
												? ({ fontSize }) => (
														<Icon icon='check' type='outlined' fontSize={fontSize} />
												  )
												: undefined
										}
										isFullWidth
										onClick={value !== 'asc' ? () => handleOnChange('asc') : undefined}
										size='lg'
										variant='outlined'
									>
										Ascending order
									</Button>
								</Center>
								<Center width='100%'>
									<Button
										color={value === 'desc' ? color : 'gray'}
										renderLeft={({ fontSize }) => (
											<Icon icon='arrow_downward' type='outlined' fontSize={fontSize} />
										)}
										renderRight={
											value === 'desc'
												? ({ fontSize }) => (
														<Icon icon='check' type='outlined' fontSize={fontSize} />
												  )
												: undefined
										}
										isFullWidth
										onClick={value !== 'desc' ? () => handleOnChange('desc') : undefined}
										size='lg'
										variant='outlined'
									>
										Descending order
									</Button>
								</Center>
							</Stack>
						)
					}}
				</Panel>
			)}
		/>
	);
};

export default Direction;
