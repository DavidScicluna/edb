import { FC, useCallback } from 'react';

import { useLocation } from 'react-router-dom';

import {
	Modal,
	ModalStack,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	IconButton,
	IconButtonIcon,
	Icon,
	Fade
} from '@davidscicluna/component-library';

import { useDisclosure, HStack, VStack, Text } from '@chakra-ui/react';

import { useForm, useFormState } from 'react-hook-form';
import { isEqual } from 'lodash';

import { useUserTheme } from '../../common/hooks';
import { formatMediaTypeLabel } from '../../common/utils';
import { useLayoutContext } from '../../containers/Layout/common/hooks';

import { movieSortBy, tvSortBy } from './common/data';
import { SortByProps, SortByForm } from './types';
import SortBySort from './components/SortBySort';
import SortByDirection from './components/SortByDirection';
import { getSortByForm } from './common/utils';
import defaultValues from './common/data/defaults';

const SortBy: FC<SortByProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const { isOpen: isSortByOpen, onOpen: onSortByOpen, onClose: onSortByClose } = useDisclosure();

	const location = useLocation();

	const { spacing } = useLayoutContext();

	const { mediaType, renderButton, onSort } = props;

	const form = useForm<SortByForm>({ defaultValues });

	const { control, getValues, setValue, reset, handleSubmit } = form;

	const { isDirty } = useFormState({ control });

	const handleOpen = useCallback((): void => {
		reset({ ...getSortByForm({ location, mediaType }) });

		onSortByOpen();
	}, [location, mediaType, getSortByForm]);

	const handleReset = (): void => {
		setValue('sortBy', defaultValues.sortBy, { shouldDirty: true });
		setValue('direction', defaultValues.direction, { shouldDirty: true });
	};

	const handleClose = (): void => {
		reset({ ...defaultValues });

		onSortByClose();
	};

	const handleSubmitForm = useCallback((values: SortByForm): void => {
		onSort({ ...values });
		onSortByClose();

		setTimeout(() => reset({ ...values }), 500);
	}, []);

	return (
		<>
			{renderButton({
				color: isSortByOpen ? color : 'gray',
				colorMode,
				icon: (
					<Icon colorMode={colorMode} icon='import_export' category={isSortByOpen ? 'filled' : 'outlined'} />
				),
				onClick: () => handleOpen()
			})}

			<Modal colorMode={colorMode} isOpen={isSortByOpen} onClose={handleClose} size='4xl' spacing={spacing}>
				<ModalStack p={2}>
					<ModalHeader
						renderTitle={(props) => (
							<Text {...props}>{`Sorting ${formatMediaTypeLabel({ type: 'multiple', mediaType })}`}</Text>
						)}
						renderSubtitle={(props) => (
							<Text {...props}>
								{`Sort ${formatMediaTypeLabel({
									type: 'multiple',
									mediaType
								})} by ${[...(mediaType === 'movie' ? movieSortBy : tvSortBy)]
									.map(({ label }) => label)
									.join(', ')} & by either in Ascending or Descending order.`}
							</Text>
						)}
						renderCancel={({ icon, category, ...rest }) => (
							<IconButton {...rest}>
								<IconButtonIcon icon={icon} category={category} />
							</IconButton>
						)}
					/>
					<ModalBody>
						<VStack width='100%' spacing={spacing}>
							<SortBySort form={form} sortBy={mediaType === 'movie' ? [...movieSortBy] : [...tvSortBy]} />
							<SortByDirection form={form} />
						</VStack>
					</ModalBody>
					<ModalFooter
						renderCancel={(props) => (
							<Button {...props} onClick={handleClose}>
								Cancel
							</Button>
						)}
						renderAction={(props) => (
							<HStack spacing={spacing}>
								<Fade in={isDirty || !isEqual(defaultValues, getValues())}>
									<Button {...props} color={color} onClick={handleReset} variant='text'>
										Reset
									</Button>
								</Fade>
								<Button
									{...props}
									color={color}
									isDisabled={!isDirty}
									onClick={handleSubmit(handleSubmitForm)}
								>
									Sort
								</Button>
							</HStack>
						)}
					/>
				</ModalStack>
			</Modal>
		</>
	);
};

export default SortBy;
