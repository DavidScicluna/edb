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
import { isBoolean, sample } from 'lodash';
import { sort } from 'fast-sort';

import { useSelector, useUserTheme } from '../../../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../../../containers/Layout/common/hooks';
import { UserList } from '../../../../../../../../../../../store/slices/Users/types';
import { setUserLists } from '../../../../../../../../../../../store/slices/Users';
import placeholders from '../../common/data/placeholders';

import { schema } from './validation';
import { EditListProps, EditListForm } from './types';

const placeholder = sample(placeholders);

const defaultValues: EditListForm = { label: '', description: '' };

const EditList: FC<EditListProps> = ({ list, isOpen, onClose }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

	const dispatch = useDispatch();
	const { id, lists = [] } = useSelector((state) => state.users.data.activeUser.data);

	const { control, reset, handleSubmit } = useForm<EditListForm>({
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

	const handleSubmitForm = ({ label, description }: EditListForm): void => {
		const updatedlist = {
			...list,
			label,
			description,
			updatedAt: dayjs(new Date()).toISOString()
		};
		const filteredList: UserList[] = lists.filter(({ id }) => id !== list.id);
		const updatedLists: UserList[] = [...filteredList, updatedlist];

		dispatch(setUserLists({ id, data: sort([...updatedLists]).desc(({ createdAt }) => createdAt) }));

		onClose();
	};

	const handleResetModal = (): void => {
		reset({ ...defaultValues, label: list.label, description: list.description });
	};

	useEffect(() => handleResetModal(), [isOpen]);

	return (
		<>
			<Modal colorMode={colorMode} isOpen={isOpen} onClose={handleCheckModal} size='lg'>
				<ModalStack as={Form} onSubmit={handleSubmit(handleSubmitForm)}>
					<ModalHeader
						renderTitle={(props) => <Text {...props}>Edit List</Text>}
						renderSubtitle={(props) => (
							<Text {...props}>{`Edit the existing "${list.label}" list label & description`}</Text>
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
								Update List
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

export default EditList;
