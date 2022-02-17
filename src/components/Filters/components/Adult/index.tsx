import { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { HStack } from '@chakra-ui/react';

import {
	RadioButtonUncheckedOutlined as RadioButtonUncheckedOutlinedIcon,
	RadioButtonCheckedOutlined as RadioButtonCheckedOutlinedIcon
} from '@material-ui/icons';

import { AdultProps } from './types';

import { useSelector } from '../../../../common/hooks';
import Button from '../../../Clickable/Button';
import Panel from '../../../Panel';

const Adult = ({ form, mediaType }: AdultProps): ReactElement => {
	const color = useSelector((state) => state.user.ui.theme.color);

	return (
		<Controller
			control={form.control}
			name='adult'
			render={({ field: { value } }) => (
				<Panel isFullWidth>
					{{
						header: {
							title: mediaType === 'movie' ? 'Show Adult Movies' : 'Show Adult TV Shows'
						},
						body: (
							<HStack width='100%' spacing={2}>
								<Button
									color={!value ? color : 'gray'}
									renderLeftIcon={({ fontSize }) =>
										!value ? (
											<RadioButtonCheckedOutlinedIcon style={{ fontSize }} />
										) : (
											<RadioButtonUncheckedOutlinedIcon style={{ fontSize }} />
										)
									}
									isFullWidth
									onClick={
										value ? () => form.setValue('adult', false, { shouldDirty: true }) : undefined
									}
									variant='outlined'
								>
									No
								</Button>
								<Button
									color={value ? color : 'gray'}
									renderLeftIcon={({ fontSize }) =>
										value ? (
											<RadioButtonCheckedOutlinedIcon style={{ fontSize }} />
										) : (
											<RadioButtonUncheckedOutlinedIcon style={{ fontSize }} />
										)
									}
									isFullWidth
									onClick={
										!value ? () => form.setValue('adult', true, { shouldDirty: true }) : undefined
									}
									variant='outlined'
								>
									Yes
								</Button>
							</HStack>
						)
					}}
				</Panel>
			)}
		/>
	);
};

export default Adult;
