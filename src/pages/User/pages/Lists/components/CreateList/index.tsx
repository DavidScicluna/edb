import { ReactElement } from 'react';

import {
	useTheme,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ConfirmModal,
	ConfirmModalBody,
	ConfirmModalTitle,
	ConfirmModalSubtitle,
	ConfirmModalFooter,
	Input,
	Textarea,
	Button,
	IconButton,
	Icon
} from '@davidscicluna/component-library';

import { useMediaQuery, useDisclosure, VStack, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useForm, useFormState, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import sample from 'lodash/sample';
import { v4 as uuid } from 'uuid';
import { isBoolean } from 'lodash';

import { useSelector } from '../../../../../../common/hooks';
import { defaultUser, getUser, setUserLists } from '../../../../../../store/slices/Users';

import { schema } from './validation';
import { CreateListProps, Form } from './types';

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

const defaultValues: Form = {
	label: '',
	description: ''
};

const CreateList = ({ isOpen, onSubmit, onClose }: CreateListProps): ReactElement => {
	const theme = useTheme();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

	const dispatch = useDispatch();
	const user = useSelector((state) => state.app.data.user);
	const lists = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.data.lists || defaultUser.data.lists || []
	);

	// const color = useSelector(
	// 	(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	// );

	const form = useForm<Form>({
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isDirty } = useFormState({ control: form.control });

	const handleSubmit = (values: Form): void => {
		const id = uuid();

		dispatch(
			setUserLists({
				id: user || '',
				data: [
					...lists,
					{
						id,
						label: values.label,
						description: values?.description || '',
						date: dayjs(new Date()).toISOString(),
						results: {
							movies: [],
							tv: []
						}
					}
				]
			})
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
			<Modal isOpen={isOpen} onClose={handleCheckClose} size='lg'>
				<ModalHeader
					renderTitle={(props) => <Text {...props}>{isSm ? 'Create List' : 'Create a new List'}</Text>}
					renderCancel={({ icon, category, ...rest }) => (
						<IconButton {...rest}>
							<Icon icon={icon} category={category} />
						</IconButton>
					)}
				/>
				<ModalBody>
					<VStack spacing={3} p={2}>
						<Controller
							control={form.control}
							name='label'
							render={({ field: { onChange, value, name }, fieldState: { error } }) => (
								<Input
									// color={color}
									color='blue'
									label='Label'
									name={name}
									helper={error ? error.message : undefined}
									placeholder={`Try "${placeholder}"`}
									onChange={onChange}
									isError={isBoolean(error)}
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
									// color={color}
									color='blue'
									label='Description'
									name={name}
									helper={error ? error.message : undefined}
									onChange={onChange}
									isError={isBoolean(error)}
									isFullWidth
									value={value}
									sx={{ textarea: { height: theme.space[12.5] } }}
								/>
							)}
						/>
					</VStack>
				</ModalBody>
				<ModalFooter
					renderCancel={(props) => (
						<Button {...props} onClick={handleCheckClose}>
							Cancel
						</Button>
					)}
					renderAction={(props) => (
						<Button
							{...props}
							// color={color}
							color='blue'
							isDisabled={isNil(user) || isEmpty(user) || !isDirty}
							onClick={form.handleSubmit((values) => handleSubmit(values))}
						>
							{isSm ? 'Save' : 'Save List'}
						</Button>
					)}
				/>
			</Modal>

			<ConfirmModal
				renderCancel={({ icon, category, ...rest }) => (
					<IconButton {...rest}>
						<Icon icon={icon} category={category} />
					</IconButton>
				)}
				isOpen={isConfirmOpen}
				onClose={onCloseConfirm}
			>
				<ConfirmModalBody>
					<ConfirmModalTitle>Unsaved data!</ConfirmModalTitle>
					<ConfirmModalSubtitle>
						Are you sure you want to close the modal, the data inserted will be lost unless you save it!
					</ConfirmModalSubtitle>
				</ConfirmModalBody>
				<ConfirmModalFooter
					renderCancel={(props) => (
						<Button {...props} onClick={onCloseConfirm}>
							Cancel
						</Button>
					)}
					renderAction={(props) => (
						<Button
							{...props}
							// color={color}
							color='blue'
							onClick={handleCloseConfirm}
						>
							Close
						</Button>
					)}
				/>
			</ConfirmModal>
		</>
	);
};

export default CreateList;
