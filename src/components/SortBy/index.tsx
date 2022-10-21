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
import qs from 'query-string';
import { isEqual } from 'lodash';

import { useUserTheme } from '../../common/hooks';

import { movieSortBy, tvSortBy } from './common/data';
import { SortByProps, SortByForm, SortBy as SortByType } from './types';
import SortBySort from './components/SortBySort';
import SortByDirection from './components/SortByDirection';

export const sortByDefaultValues: SortByForm = {
	sortBy: { label: 'Popularity', value: 'popularity' },
	direction: 'desc'
};

const SortBy: FC<SortByProps> = ({ mediaType, renderButton, onSort }) => {
	const { color, colorMode } = useUserTheme();

	const { isOpen: isSortByOpen, onOpen: onSortByOpen, onClose: onSortByClose } = useDisclosure();

	const location = useLocation();

	const form = useForm<SortByForm>({ defaultValues: { ...sortByDefaultValues } });

	const { control, getValues, setValue, reset, handleSubmit } = form;

	const { isDirty } = useFormState({ control });

	const handleOpen = useCallback((): void => {
		const search = qs.parse(location.search);

		if (search && search['sort_by']) {
			const sortBy: SortByType = mediaType === 'movie' ? [...movieSortBy] : [...tvSortBy];
			const splitSort = String(search['sort_by']).split('.');
			const sort = sortBy.find(({ value }) => value === splitSort[0]);

			reset({
				sortBy: sort,
				direction: splitSort[1] === 'asc' ? 'asc' : 'desc'
			});
		}

		onSortByOpen();
	}, [location, movieSortBy, tvSortBy]);

	const handleReset = (): void => {
		setValue('sortBy', sortByDefaultValues.sortBy, { shouldDirty: true });
		setValue('direction', sortByDefaultValues.direction, { shouldDirty: true });
	};

	const handleClose = (): void => {
		reset({ ...sortByDefaultValues });

		onSortByClose();
	};

	const handleSubmitForm = (values: SortByForm): void => {
		onSort({ ...values });
		onSortByClose();

		setTimeout(() => reset({ ...values }), 500);
	};

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
					renderTitle={(props) => <Text {...props}>Sort By</Text>}
					renderCancel={({ icon, category, ...rest }) => (
						<IconButton {...rest}>
							<IconButtonIcon icon={icon} category={category} />
						</IconButton>
					)}
				/>
				<ModalBody>
					<VStack width='100%' spacing={2} p={2}>
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
							<Fade in={isDirty || !isEqual(sortByDefaultValues, getValues())}>
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
