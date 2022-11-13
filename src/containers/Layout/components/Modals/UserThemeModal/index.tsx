import { FC, useState } from 'react';

import {
	Modal,
	ModalStack,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	Button,
	IconButton,
	IconButtonIcon,
	utils
} from '@davidscicluna/component-library';

import { ColorMode, useColorMode, Text } from '@chakra-ui/react';

import { useForm, useWatch, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useUpdateEffect } from 'usehooks-ts';

import { useSelector } from '../../../../../common/hooks';
import { toggleSpinnerModal, toggleUserThemeModal } from '../../../../../store/slices/Modals';
import { setUserTheme } from '../../../../../store/slices/Users';
import { updateFavicon } from '../../../../../common/utils';
import UserThemeCustomization from '../../../../../pages/User/components/UserThemeCustomization';

import { UserThemeModalForm } from './types';

const { getColorMode } = utils;

const UserThemeModal: FC = () => {
	const { setColorMode: setCUIColorMode } = useColorMode();

	const dispatch = useDispatch();
	const {
		data: { id },
		ui: { theme: userTheme }
	} = useSelector((state) => state.users.data.activeUser);
	const isUserThemeModalOpen = useSelector((state) => state.modals.ui.isUserThemeModalOpen);

	const [colorMode, setColorMode] = useState<ColorMode>(
		userTheme.colorMode === 'system' ? getColorMode() : userTheme.colorMode
	);

	const form = useForm<UserThemeModalForm>({ defaultValues: { ...userTheme } });
	const { control, reset, handleSubmit } = form;

	const watchColor = useWatch({ control, name: 'color' });
	const watchColorMode = useWatch({ control, name: 'colorMode' });

	const { isDirty, dirtyFields } = useFormState({ control });

	const handleClose = (): void => {
		reset({ ...userTheme });

		dispatch(toggleUserThemeModal(false));
	};

	const handleSubmitForm = ({ color, colorMode }: UserThemeModalForm): void => {
		dispatch(toggleSpinnerModal(true));
		dispatch(setUserTheme({ id, data: { color, colorMode } }));

		reset({ color, colorMode });

		updateFavicon({ color, colorMode: colorMode !== 'system' ? colorMode : getColorMode() });

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

	useUpdateEffect(
		() => setColorMode(watchColorMode === 'system' ? getColorMode() : watchColorMode),
		[watchColorMode]
	);

	return (
		<Modal colorMode={colorMode} isOpen={isUserThemeModalOpen} onClose={handleClose} size='3xl'>
			<ModalStack as={Form} onSubmit={handleSubmit(handleSubmitForm)}>
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
					renderCancel={(props) => <Button {...props}>Cancel</Button>}
					renderAction={(props) => (
						<Button {...props} color={watchColor} isDisabled={!isDirty} type='submit'>
							Save
						</Button>
					)}
				/>
			</ModalStack>
		</Modal>
	);
};

export default UserThemeModal;
