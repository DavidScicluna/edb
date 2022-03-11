import { ReactElement, useEffect } from 'react';
import { useForm, useFormState, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useTheme, useMediaQuery, useDisclosure, VStack } from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import sample from 'lodash/sample';
import moment from 'moment';

import { EditListProps, Form } from './types';
import { defaultValues, schema } from './validation';

import { useSelector } from '../../../../../../common/hooks';
import Button from '../../../../../../components/Clickable/Button';
import ConfirmModal from '../../../../../../components/ConfirmModal';
import Input from '../../../../../../components/Forms/Input';
import Textarea from '../../../../../../components/Forms/Textarea';
import Modal from '../../../../../../components/Modal';
import { defaultUser, getUser, setUserLists } from '../../../../../../store/slices/Users';
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

const placeholder = sample(placeholders);

const EditList = ({ id, isOpen, onClose }: EditListProps): ReactElement => {
	const theme = useTheme<Theme>();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

	const dispatch = useDispatch();
	const user = useSelector((state) => state.app.data.user);
	const lists = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.data.lists || defaultUser.data.lists
	);
	const list = useSelector((state) =>
		getUser(state.users.data.users, state.app.data.user)?.data.lists.find((list) => list.id === id)
	);

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const form = useForm<Form>({
		defaultValues,
		reValidateMode: 'onSubmit',
		resolver: yupResolver(schema)
	});

	const { isDirty } = useFormState({ control: form.control });

	const handleSubmit = (values: Form): void => {
		if (list) {
			dispatch(
				setUserLists({
					id: user || '',
					data: lists.map((paramList) =>
						paramList.id === list.id
							? {
									...list,
									label: values.label,
									description: values?.description || '',
									date: moment(new Date()).toISOString(),
									results: {
										...list.results
									}
							  }
							: { ...paramList }
					)
				})
			);
		}

		onClose();
	};

	const handleCloseConfirm = (): void => {
		onCloseConfirm();
		onClose();
	};

	const handleCheckClose = (): void => {
		if (!isDirty) {
			onClose();
		} else {
			onOpenConfirm();
		}
	};

	useEffect(() => {
		if (isOpen && list) {
			form.reset({
				label: list.label,
				description: list.description
			});
		}
	}, [isOpen]);

	return (
		<>
			<Modal
				title={isSm ? 'Edit List' : `Edit ${list ? `"${list.label}"` : ''} List`}
				renderActions={({ color, colorMode, size }) => (
					<Button
						color={color}
						colorMode={colorMode}
						isDisabled={isNil(user) || isEmpty(user) || !isDirty}
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

export default EditList;
