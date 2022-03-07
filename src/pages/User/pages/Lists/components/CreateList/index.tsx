import { ReactElement } from 'react';
import { useForm, useFormState, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useTheme, useMediaQuery, useDisclosure, VStack } from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { CreateListProps, Form } from './types';
import { defaultValues, schema } from './validation';

import { useSelector } from '../../../../../../common/hooks';
import Button from '../../../../../../components/Clickable/Button';
import ConfirmModal from '../../../../../../components/ConfirmModal';
import Input from '../../../../../../components/Forms/Input';
import Textarea from '../../../../../../components/Forms/Textarea';
import Modal from '../../../../../../components/Modal';
import { setLists } from '../../../../../../store/slices/User';
import { List } from '../../../../../../store/slices/User/types';
import { Theme } from '../../../../../../theme/types';

const placeholders = [
	'Action Movies',
	'DC Movies',
	'Leonardo DiCaprio',
	'Classics',
	'Comedy',
	'Mafia Movies & TV Shows',
	'Jennifer Lawrence',
	'Johnny Depp',
	'Angelina Jolie'
];
const placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];

const CreateList = ({ isOpen, onSubmit, onClose }: CreateListProps): ReactElement => {
	const theme = useTheme<Theme>();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

	const dispatch = useDispatch();
	const lists = useSelector((state) => state.user.data.lists);
	const color = useSelector((state) => state.user.ui.theme.color);

	const form = useForm<Form>({
		defaultValues,
		reValidateMode: 'onSubmit',
		resolver: yupResolver(schema)
	});

	const { isDirty } = useFormState({ control: form.control });

	const handleSubmit = (values: Form): void => {
		const id = uuid();

		dispatch(
			setLists([
				...lists,
				{
					id,
					label: values.label,
					description: values?.description || '',
					date: moment(new Date()).toISOString(),
					results: {
						movies: [],
						tv: []
					}
				}
			])
		);

		if (onSubmit) {
			onSubmit(id);
		}

		handleClose();
	};

	const handleCloseConfirm = (): void => {
		onCloseConfirm();

		handleClose();
	};

	const handleClose = (): void => {
		form.reset({ ...defaultValues });

		onClose();
	};

	const handleCheckClose = (): void => {
		if (!isDirty) {
			handleClose();
		} else {
			onOpenConfirm();
		}
	};

	return (
		<>
			<Modal
				title={isSm ? 'Create List' : 'Create a new List'}
				renderActions={({ color, colorMode, size }) => (
					<Button
						color={color}
						colorMode={colorMode}
						isDisabled={!isDirty}
						onClick={form.handleSubmit((values) => handleSubmit(values))}
						size={size}
					>
						{isSm ? 'Save' : 'Save List'}
					</Button>
				)}
				isOpen={isOpen}
				onClose={handleCheckClose}
				isCentered
				size='lg'
			>
				<VStack spacing={3} p={2}>
					<Controller
						control={form.control}
						name='label'
						render={({ field: { onChange, value, name }, fieldState: { error } }) => (
							<Input
								color={color}
								label='Label'
								error={error}
								name={name}
								placeholder={`Try "${placeholder}"`}
								onChange={onChange}
								isFullWidth
								isRequired
								value={value}
							/>
						)}
					/>
					<Controller
						control={form.control}
						name='description'
						render={({ field: { onChange, value, name }, fieldState: { error } }) => (
							<Textarea
								color={color}
								label='Description'
								error={error}
								name={name}
								onChange={onChange}
								isFullWidth
								value={value}
								sx={{ textarea: { height: theme.space[12.5] } }}
							/>
						)}
					/>
				</VStack>
			</Modal>

			<ConfirmModal
				renderActions={({ color, colorMode, size }) => (
					<Button color={color} colorMode={colorMode} onClick={() => handleCloseConfirm()} size={size}>
						Close
					</Button>
				)}
				title='Unsaved data!'
				description='Are you sure you want to close the modal, the data inserted will be lost unless you save it!'
				isOpen={isConfirmOpen}
				onClose={onCloseConfirm}
			/>
		</>
	);
};

export default CreateList;
