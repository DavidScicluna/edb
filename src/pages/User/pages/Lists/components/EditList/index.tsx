import { ReactElement, useEffect } from 'react';

import {
	useTheme,
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

import { useMediaQuery, useDisclosure, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useForm, useFormState, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import sample from 'lodash/sample';
import { isBoolean } from 'lodash';

import { useSelector } from '../../../../../../common/hooks';
import Modal from '../../../../../../components/Modal';
import { defaultUser, getUser, setUserLists } from '../../../../../../store/slices/Users';

import { schema } from './validation';
import { EditListProps, Form } from './types';

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

const EditList = ({ id, isOpen, onClose }: EditListProps): ReactElement => {
	const theme = useTheme();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

	const dispatch = useDispatch();
	const user = useSelector((state) => state.app.data.user);
	const lists = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.data.lists || defaultUser.data.lists || []
	);
	const list = useSelector((state) =>
		(getUser(state.users.data.users, state.app.data.user)?.data.lists || []).find((list) => list.id === id)
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
									date: dayjs(new Date()).toISOString(),
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

export default EditList;
