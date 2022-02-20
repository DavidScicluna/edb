import { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { useMediaQuery, Stack } from '@chakra-ui/react';

import {
	ArrowUpwardOutlined as ArrowUpwardOutlinedIcon,
	ArrowDownwardOutlined as ArrowDownwardOutlinedIcon,
	CheckOutlined as CheckOutlinedIcon
} from '@material-ui/icons';

import { DirectionProps } from './types';

import { useSelector } from '../../../../common/hooks';
import Button from '../../../Clickable/Button';
import Panel from '../../../Panel';
import { SortDirection } from '../../types';

const Direction = ({ form }: DirectionProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector((state) => state.user.ui.theme.color);

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
								<span style={{ width: '100%' }}>
									<Button
										color={value === 'asc' ? color : 'gray'}
										renderLeftIcon={({ fontSize }) => (
											<ArrowUpwardOutlinedIcon style={{ fontSize }} />
										)}
										renderRightIcon={
											value === 'asc'
												? ({ fontSize }) => <CheckOutlinedIcon style={{ fontSize }} />
												: undefined
										}
										isFullWidth
										onClick={value !== 'asc' ? () => handleOnChange('asc') : undefined}
										size='lg'
										variant='outlined'
									>
										Ascending order
									</Button>
								</span>
								<span style={{ width: '100%' }}>
									<Button
										color={value === 'desc' ? color : 'gray'}
										renderLeftIcon={({ fontSize }) => (
											<ArrowDownwardOutlinedIcon style={{ fontSize }} />
										)}
										renderRightIcon={
											value === 'desc'
												? ({ fontSize }) => <CheckOutlinedIcon style={{ fontSize }} />
												: undefined
										}
										isFullWidth
										onClick={value !== 'desc' ? () => handleOnChange('desc') : undefined}
										size='lg'
										variant='outlined'
									>
										Descending order
									</Button>
								</span>
							</Stack>
						)
					}}
				</Panel>
			)}
		/>
	);
};

export default Direction;
