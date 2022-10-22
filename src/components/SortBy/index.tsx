import { FC, useCallback } from 'react';

import { useLocation } from 'react-router-dom';

import {
	Modal,
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

import { movieSortBy, tvSortBy } from './common/data';
import { SortByProps, SortByForm } from './types';
import SortBySort from './components/SortBySort';
import SortByDirection from './components/SortByDirection';
import { getSortByFormDefaultValues, getSortByForm } from './common/utils';

export const defaultValues: SortByForm = getSortByFormDefaultValues();

const SortBy: FC<SortByProps> = ({ mediaType, renderButton, onSort }) => {
	const { color, colorMode } = useUserTheme();

	const { isOpen: isSortByOpen, onOpen: onSortByOpen, onClose: onSortByClose } = useDisclosure();

	const location = useLocation();

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

			<Modal colorMode={colorMode} isOpen={isSortByOpen} onClose={handleClose} size='4xl'>
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
					<VStack width='100%' spacing={2}>
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
						<HStack spacing={2}>
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
			</Modal>
		</>
	);
};

export default SortBy;
