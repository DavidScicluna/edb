import { ReactElement } from 'react';

import { Card, CardHeader, CardBody, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, Stack, Center, Text } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { useSelector } from '../../../../common/hooks';
import { defaultUser, getUser } from '../../../../store/slices/Users';
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
				<Card isFullWidth>
					<CardHeader renderTitle={(props) => <Text {...props}>Direction</Text>} />
					<CardBody>
						<Stack width='100%' direction={isSm ? 'column' : 'row'} spacing={2}>
							<Center width='100%'>
								<Button
									color={value === 'asc' ? color : 'gray'}
									renderLeft={(props) => <Icon {...props} icon='arrow_upward' category='outlined' />}
									renderRight={
										value === 'asc'
											? (props) => <Icon {...props} icon='check' category='outlined' />
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
									renderLeft={(props) => (
										<Icon {...props} icon='arrow_downward' category='outlined' />
									)}
									renderRight={
										value === 'desc'
											? (props) => <Icon {...props} icon='check' category='outlined' />
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
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default Direction;
