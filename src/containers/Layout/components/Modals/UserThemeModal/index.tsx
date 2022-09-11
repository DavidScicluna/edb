import { FC, useState, useEffect } from 'react';

import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Divider,
	Button,
	IconButton,
	IconButtonIcon,
	utils
} from '@davidscicluna/component-library';

import { ColorMode, useColorMode, VStack, Text } from '@chakra-ui/react';

import { useForm, useWatch, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import UserThemeCustomization from '../../../../../components/User/UserThemeCustomization';
import { useSelector, useUserTheme } from '../../../../../common/hooks';
import { toggleSpinnerModal, toggleUserThemeModal } from '../../../../../store/slices/Modals';
import { setUserTheme } from '../../../../../store/slices/Users';

import { Form } from './types';

const { getColorMode } = utils;

const UserThemeModal: FC = () => {
	const userTheme = useUserTheme();
	const { setColorMode: setCUIColorMode } = useColorMode();

	const dispatch = useDispatch();
	const id = useSelector((state) => state.users.data.activeUser.data.id);
	const isUserThemeModalOpen = useSelector((state) => state.modals.ui.isUserThemeModalOpen);

	const [colorMode, setColorMode] = useState<ColorMode>(userTheme.colorMode);

	const form = useForm<Form>({ defaultValues: { ...userTheme } });
	const { control, reset, handleSubmit } = form;

	const watchColor = useWatch({ control, name: 'color' });
	const watchColorMode = useWatch({ control, name: 'colorMode' });

	const { isDirty, dirtyFields } = useFormState({ control });

	const handleClose = (): void => {
		reset({ ...userTheme });

		dispatch(toggleUserThemeModal(false));
	};

	const handleSubmitForm = ({ color, colorMode }: Form): void => {
		dispatch(toggleSpinnerModal(true));
		dispatch(setUserTheme({ id, data: { color, colorMode } }));

		reset({ color, colorMode });

		if (dirtyFields.colorMode) {
			if (colorMode !== 'system') {
				setCUIColorMode(colorMode);
			} else {
				setCUIColorMode(getColorMode());
			}
		}

		handleClose();

		setTimeout(() => dispatch(toggleSpinnerModal(false)), 2500);
	};

	useEffect(() => setColorMode(watchColorMode === 'system' ? getColorMode() : watchColorMode), [watchColorMode]);

	return (
		<Modal colorMode={colorMode} isOpen={isUserThemeModalOpen} onClose={handleClose} size='3xl'>
			{/* TODO: Find a way to have form as parent in Modal to get form working properly */}
			<VStack
				as='form'
				width='100%'
				overflow='auto'
				divider={<Divider colorMode={colorMode} />}
				onSubmit={handleSubmit((theme) => handleSubmitForm({ ...theme }))}
				spacing={2}
			>
				<ModalHeader
					renderTitle={(props) => <Text {...props}>Edit Application Theme</Text>}
					renderCancel={({ icon, category, ...rest }) => (
						<IconButton {...rest}>
							<IconButtonIcon icon={icon} category={category} />
						</IconButton>
					)}
				/>

				<ModalBody>
					<UserThemeCustomization form={form} color={watchColor} colorMode={watchColorMode} />
				</ModalBody>
				<ModalFooter
					renderCancel={(props) => (
						<Button {...props} onClick={handleClose}>
							Cancel
						</Button>
					)}
					renderAction={(props) => (
						<Button {...props} color={watchColor} isDisabled={!isDirty} type='submit'>
							Save
						</Button>
					)}
				/>
			</VStack>
		</Modal>
	);
};

export default UserThemeModal;
