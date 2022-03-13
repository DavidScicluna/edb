import { ReactElement } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useMediaQuery, useDisclosure, VStack, HStack, Fade } from '@chakra-ui/react';

import isEqual from 'lodash/isEqual';

// import Adult from './components/Adult';
import Certifications from './components/Certifications';
import CountRange from './components/CountRange';
import Dates from './components/Dates';
import Genres from './components/Genres';
import RatingRange from './components/RatingRange';
import RuntimeRange from './components/RuntimeRange';
import { FiltersFormProps } from './types';

import { useSelector } from '../../../common/hooks';
import { defaultUser, getUser } from '../../../store/slices/Users';
import Button from '../../Clickable/Button';
import Icon from '../../Icon';
import Modal from '../../Modal';
import { handleReturnDefaultValues, handlePopulateFilters } from '../common/utils';
import { Filters } from '../types';

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
				icon: <Icon icon='visibility' type='outlined' />,
				onClick: () => handleOpen()
			})}

			<Modal
				title='Filter'
				renderActions={({ color, colorMode, size }) => (
					<HStack spacing={isSm ? 1 : 2}>
						<Fade in={!isEqual(defaultValues, form.getValues())} unmountOnExit>
							<Button
								color={color}
								colorMode={colorMode}
								onClick={() => handleReset()}
								size={size}
								variant='text'
							>
								Reset
							</Button>
						</Fade>
						<Button
							color={color}
							colorMode={colorMode}
							isDisabled={!isDirty}
							onClick={form.handleSubmit((values) => handleSubmit(values))}
							size={size}
						>
							Search
						</Button>
					</HStack>
				)}
				isOpen={isOpen}
				onClose={handleClose}
				isCentered
				size={isLg ? 'full' : '5xl'}
			>
				<VStack width='100%' spacing={2} p={2}>
					<Dates form={form} mediaType={mediaType} />
					<Genres form={form} mediaType={mediaType} />
					<Certifications form={form} mediaType={mediaType} />
					<RatingRange form={form} />
					<CountRange form={form} />
					<RuntimeRange form={form} />
					{/* {mediaType === 'movie' ? <Adult form={form} mediaType={mediaType} /> : null} */}
				</VStack>
			</Modal>
		</>
	);
};

export default FiltersForm;
