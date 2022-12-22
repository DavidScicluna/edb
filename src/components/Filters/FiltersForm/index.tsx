import { FC, useCallback } from 'react';

import { useLocation } from 'react-router-dom';

import {
	Modal,
	ModalHeader,
	ModalStack,
	ModalBody,
	ModalFooter,
	Button,
	IconButton,
	Icon
} from '@davidscicluna/component-library';

import { useDisclosure, VStack, HStack, Text, Fade } from '@chakra-ui/react';

import { useForm, useFormState, useWatch } from 'react-hook-form';
import { isEqual } from 'lodash';

import { useUserTheme } from '../../../common/hooks';
import { getFiltersForm } from '../common/utils';
import { FiltersForm as FiltersFormType } from '../types';
import { formatMediaTypeLabel } from '../../../common/utils';
import defaultValues from '../common/data/defaults';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';

import Certifications from './components/Certifications';
import CountRange from './components/CountRange';
import Dates from './components/Dates';
import Genres from './components/Genres';
import Keywords from './components/Keywords';
import RatingRange from './components/RatingRange';
import RuntimeRange from './components/RuntimeRange';
import { FiltersFormProps } from './types';

const FiltersForm: FC<FiltersFormProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { isOpen: isFiltersFormOpen, onOpen: onFiltersFormOpen, onClose: onFiltersFormClose } = useDisclosure();

	const location = useLocation();

	const { renderButton, mediaType, onFilter } = props;

	const form = useForm<FiltersFormType>({ defaultValues });

	const { control, setValue, reset, handleSubmit } = form;

	const watchValues = useWatch({ control });

	const { isDirty } = useFormState({ control });

	const handleOpen = useCallback((): void => {
		reset({ ...getFiltersForm({ location, mediaType }) });

		onFiltersFormOpen();
	}, [location, mediaType, getFiltersForm]);

	const handleReset = (): void => {
		setValue('dates', defaultValues.dates, { shouldDirty: true });
		setValue('genres', defaultValues.genres, { shouldDirty: true });
		setValue('certifications', defaultValues.certifications, { shouldDirty: true });
		setValue('rating', defaultValues.rating, { shouldDirty: true });
		setValue('count', defaultValues.count, { shouldDirty: true });
		setValue('runtime', defaultValues.runtime, { shouldDirty: true });
		setValue('keywords', defaultValues.keywords, { shouldDirty: true });
	};

	const handleClose = (): void => {
		reset({ ...defaultValues });

		onFiltersFormClose();
	};

	const handleSubmitForm = useCallback((values: FiltersFormType): void => {
		onFilter({ ...values });
		onFiltersFormClose();

		setTimeout(() => reset({ ...values }), 500);
	}, []);

	return (
		<>
			{renderButton({
				color: isFiltersFormOpen ? color : 'gray',
				colorMode,
				icon: (
					<Icon
						colorMode={colorMode}
						icon='visibility'
						category={isFiltersFormOpen ? 'filled' : 'outlined'}
					/>
				),
				onClick: () => handleOpen()
			})}

			<Modal colorMode={colorMode} isOpen={isFiltersFormOpen} onClose={handleClose} size='5xl'>
				<ModalStack>
					<ModalHeader
						renderTitle={(props) => (
							<Text {...props}>{`Filter ${formatMediaTypeLabel({ type: 'multiple', mediaType })}`}</Text>
						)}
						renderSubtitle={(props) => (
							<Text {...props}>
								{`Filter ${formatMediaTypeLabel({
									type: 'multiple',
									mediaType
								})} by Release Date, Genres, Certifications, Rating, Number of Ratings, Runtime & by Keywords.`}
							</Text>
						)}
						renderCancel={({ icon, category, ...rest }) => (
							<IconButton {...rest}>
								<Icon icon={icon} category={category} />
							</IconButton>
						)}
					/>
					<ModalBody>
						<VStack width='100%' spacing={spacing}>
							<Dates form={form} mediaType={mediaType} />
							<Genres form={form} mediaType={mediaType} />
							<Certifications form={form} mediaType={mediaType} />
							<RatingRange form={form} />
							<CountRange form={form} />
							<RuntimeRange form={form} />
							<Keywords form={form} />
						</VStack>
					</ModalBody>
					<ModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={(props) => (
							<HStack>
								<Fade in={isDirty || !isEqual(defaultValues, watchValues)}>
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
									Filter
								</Button>
							</HStack>
						)}
					/>
				</ModalStack>
			</Modal>
		</>
	);
};

export default FiltersForm;
