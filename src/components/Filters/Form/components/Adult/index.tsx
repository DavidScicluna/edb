import { ReactElement } from 'react';
// import { Controller } from 'react-hook-form';

import { HStack } from '@chakra-ui/react';


// import { useSelector } from '../../../../../common/hooks';
import { Button } from '@chakra-ui/react';

// import Icon from '../../../../Icon';
import Panel from '../../../../Panel';

import { AdultProps } from './types';

const Adult = ({ mediaType }: AdultProps): ReactElement => {
	// const color = useSelector((state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color);

	return (
		// <Controller
		// 	control={form.control}
		// 	name='adult'
		// 	render={({ field: { value } }) => (

		// 		)}
		// 		/>
		<Panel isFullWidth>
			{{
				header: {
					title: mediaType === 'movie' ? 'Show Adult Movies' : 'Show Adult TV Shows'
				},
				body: (
					<HStack width='100%' spacing={2}>
						<Button
							// color={!value ? color : 'gray'}
							// renderLeftIcon={({ fontSize }) =>
							// 	!value ? (
							// 		<Icon icon='radio_button_checked' type='outlined' fontSize={fontSize} />
							// 	) : (
							// 		<Icon icon='radio_button_unchecked' type='outlined' fontSize={fontSize} />
							// 	)
							// }
							isFullWidth
							// onClick={
							// 	value ? () => form.setValue('adult', false, { shouldDirty: true }) : undefined
							// }
							variant='outlined'
						>
							No
						</Button>
						<Button
							// color={value ? color : 'gray'}
							// renderLeftIcon={({ fontSize }) =>
							// 	value ? (
							// 		<Icon icon='radio_button_checked' type='outlined' fontSize={fontSize} />
							// 	) : (
							// 		<Icon icon='radio_button_unchecked' type='outlined' fontSize={fontSize} />
							// 	)
							// }
							isFullWidth
							// onClick={
							// 	!value ? () => form.setValue('adult', true, { shouldDirty: true }) : undefined
							// }
							variant='outlined'
						>
							Yes
						</Button>
					</HStack>
				)
			}}
		</Panel>
	);
};

export default Adult;
