import { ReactElement } from 'react';

import { useLocation } from 'react-router-dom';

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, IconButton, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, useDisclosure, VStack, HStack, Text, Fade } from '@chakra-ui/react';
import { useForm, useFormState } from 'react-hook-form';
import isEqual from 'lodash/isEqual';

// import Adult from './components/Adult';
import { useSelector } from '../../../common/hooks';
import { defaultUser, getUser } from '../../../store/slices/Users';
import { handleReturnDefaultValues, handlePopulateFilters } from '../common/utils';
import { Filters } from '../types';

import Certifications from './components/Certifications';
import CountRange from './components/CountRange';
import Dates from './components/Dates';
import Genres from './components/Genres';
import RatingRange from './components/RatingRange';
import RuntimeRange from './components/RuntimeRange';
import { FiltersFormProps } from './types';

export const defaultValues: Filters = handleReturnDefaultValues();

const FiltersForm = (props: FiltersFormProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');
	const [isLg] = useMediaQuery('(min-width: 1280px)');

	const { isOpen, onOpen, onClose } = useDisclosure();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const location = useLocation();

	const { renderButton, mediaType, onFilter } = props;

	const form = useForm<Filters>({ defaultValues });

	const { isDirty } = useFormState({ control: form.control });

	const handleReset = (): void => {
		form.setValue('dates', defaultValues.dates, { shouldDirty: true });
		form.setValue('genres', defaultValues.genres, { shouldDirty: true });
		form.setValue('certifications', defaultValues.certifications, { shouldDirty: true });
		form.setValue('rating', defaultValues.rating, { shouldDirty: true });
		form.setValue('count', defaultValues.count, { shouldDirty: true });
		form.setValue('runtime', defaultValues.runtime, { shouldDirty: true });
	};

	const handleSubmit = (values: Filters): void => {
		onFilter({ ...values });

		onClose();

		setTimeout(() => form.reset({ ...values }), 500);
	};

	const handleOpen = (): void => {
		const filters: Filters = handlePopulateFilters(location.search, mediaType);

		form.reset({ ...filters });

		onOpen();
	};

	const handleClose = (): void => {
		form.reset({ ...defaultValues });

		onClose();
	};

	return (
		<>
			{renderButton({
				color: isOpen ? color : 'gray',
				icon: <Icon icon='visibility' category='outlined' />,
				onClick: () => handleOpen()
			})}

			<Modal isOpen={isOpen} onClose={handleClose} size={isLg ? 'full' : '5xl'}>
				<ModalHeader
					renderTitle={(props) => <Text {...props}>Filter</Text>}
					renderCancel={({ icon, category, ...rest }) => (
						<IconButton {...rest}>
							<Icon icon={icon} category={category} />
						</IconButton>
					)}
				/>
				<ModalBody>
					<VStack width='100%' spacing={2} p={2}>
						<Dates form={form} mediaType={mediaType} />
						<Genres form={form} mediaType={mediaType} />
						<Certifications form={form} mediaType={mediaType} />
						<RatingRange form={form} />
						<CountRange form={form} />
						<RuntimeRange form={form} />
						{/* {mediaType === 'movie' ? <Adult form={form} mediaType={mediaType} /> : null} */}
					</VStack>
				</ModalBody>
				<ModalFooter
					renderCancel={(props) => (
						<Button {...props} onClick={handleClose}>
							Cancel
						</Button>
					)}
					renderAction={(props) => (
						<HStack spacing={isSm ? 1 : 2}>
							<Fade in={!isEqual(defaultValues, form.getValues())} unmountOnExit>
								<Button
									{...props}
									// color={color}
									color='blue'
									onClick={handleReset}
									variant='text'
								>
									Reset
								</Button>
							</Fade>
							<Button
								{...props}
								// color={color}
								color='blue'
								isDisabled={!isDirty}
								onClick={form.handleSubmit((values) => handleSubmit(values))}
							>
								Search
							</Button>
						</HStack>
					)}
				/>
			</Modal>
		</>
	);
};

export default FiltersForm;
