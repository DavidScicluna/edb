import { FC, useEffect } from 'react';

import {
	useTheme,
	Modal,
	ModalStack,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ConfirmModal,
	ConfirmModalStack,
	ConfirmModalIcon,
	ConfirmModalBody,
	ConfirmModalTitle,
	ConfirmModalSubtitle,
	ConfirmModalFooter,
	Form,
	Input,
	Textarea,
	Button,
	IconButton,
	IconButtonIcon,
	Icon
} from '@davidscicluna/component-library';

import { useDisclosure, VStack, Text } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { useForm, useFormState, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { isBoolean, sample } from 'lodash';
import { sort } from 'fast-sort';

import placeholders from '../../common/data/placeholders';
import { useSelector, useUserTheme } from '../../../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../../../containers/Layout/common/hooks';
import { setUserLists } from '../../../../../../../../../../../store/slices/Users';
import { UserList } from '../../../../../../../../../../../store/slices/Users/types';

import { CreateListProps, CreateListForm } from './types';
import { schema } from './validation';

const placeholder = sample(placeholders);

const defaultValues: CreateListForm = { label: '', description: '' };

const CreateList: FC<CreateListProps> = ({ isOpen, onClose, onSubmit }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

	const dispatch = useDispatch();
	const { id, lists = [] } = useSelector((state) => state.users.data.activeUser.data);

	const { control, reset, handleSubmit } = useForm<CreateListForm>({
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isDirty } = useFormState({ control });

	const handleCloseConfirm = (): void => {
		onConfirmClose();
		onClose();
	};

	const handleCheckModal = (): void => {
		if (!isDirty) {
			onClose();
		} else {
			onConfirmOpen();
		}
	};

	const handleSubmitForm = ({ label, description }: CreateListForm): void => {
		const listID = uuid();

		const list = {
			id: listID,
			label,
			description,
			createdAt: dayjs(new Date()).toISOString(),
			updatedAt: dayjs(new Date()).toISOString(),
			mediaItems: { movie: [], tv: [] }
		};
		const updatedLists: UserList[] = [...lists, list];

		dispatch(setUserLists({ id, data: sort([...updatedLists]).desc(({ createdAt }) => createdAt) }));

		if (onSubmit) {
			onSubmit({ id: listID });
		}

		onClose();
	};

	const handleResetModal = (): void => {
		reset({ ...defaultValues });
	};

	useEffect(() => handleResetModal(), [isOpen]);

	return (
		<>
			<Modal colorMode={colorMode} isOpen={isOpen} onClose={handleCheckModal} size='lg'>
				<ModalStack as={Form} onSubmit={handleSubmit(handleSubmitForm)}>
					<ModalHeader
						renderTitle={(props) => <Text {...props}>Create New List</Text>}
						renderSubtitle={(props) => (
							<Text {...props}>
								Create a new list by entering a label & optionally entering a description to describe
								what the list contains
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
							<Controller
								control={control}
								name='label'
								render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
									<Input
										color={color}
										colorMode={colorMode}
										label='Label'
										name={name}
										helper={error ? error.message : undefined}
										placeholder={`Try "${placeholder}"`}
										isError={isBoolean(error)}
										isFullWidth
										isRequired
										onBlur={onBlur}
										onChange={onChange}
										value={value}
									/>
								)}
							/>
							<Controller
								control={control}
								name='description'
								render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
									<Textarea
										color={color}
										colorMode={colorMode}
										label='Description'
										name={name}
										helper={error ? error.message : undefined}
										placeholder={`Try "A list containing ${placeholder} ..."`}
										isError={isBoolean(error)}
										isFullWidth
										onBlur={onBlur}
										onChange={onChange}
										value={value}
										sx={{ textarea: { height: theme.space[12.5] } }}
									/>
								)}
							/>
						</VStack>
					</ModalBody>
					<ModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={(props) => (
							<Button {...props} color={color} isDisabled={!id || !isDirty} type='submit'>
								Save List
							</Button>
						)}
					/>
				</ModalStack>
			</Modal>

			<ConfirmModal
				colorMode={colorMode}
				renderCancel={({ icon, category, ...rest }) => (
					<IconButton {...rest}>
						<IconButtonIcon icon={icon} category={category} />
					</IconButton>
				)}
				isOpen={isConfirmOpen}
				onClose={onConfirmClose}
			>
				<ConfirmModalStack spacing={spacing} p={spacing}>
					<ConfirmModalIcon
						renderIcon={(props) => (
							<Icon
								{...props}
								width={theme.fontSizes['6xl']}
								height={theme.fontSizes['6xl']}
								fontSize={theme.fontSizes['6xl']}
								icon='warning'
								category='outlined'
							/>
						)}
						color={color}
						p={2}
					/>

					<ConfirmModalBody>
						<ConfirmModalTitle>Unsaved data!</ConfirmModalTitle>
						<ConfirmModalSubtitle>
							Are you sure you want to close the modal? The data inserted will be lost unless you save it!
						</ConfirmModalSubtitle>
					</ConfirmModalBody>
					<ConfirmModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={(props) => (
							<Button {...props} color={color} onClick={handleCloseConfirm}>
								Close
							</Button>
						)}
					/>
				</ConfirmModalStack>
			</ConfirmModal>
		</>
	);
};

export default CreateList;
