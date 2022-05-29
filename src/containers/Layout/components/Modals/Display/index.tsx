import { ReactElement } from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, IconButton, Icon } from '@davidscicluna/component-library';

import { ColorMode, useColorMode, useMediaQuery, Center, Text } from '@chakra-ui/react';
import { useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { useSelector } from '../../../../../common/hooks';
import { handleCheckSystemColorMode } from '../../../../../common/utils';
import Customization from '../../../../../pages/Authentication/Register/components/Customization';
import { toggleDisplay, toggleSplashscreen } from '../../../../../store/slices/Modals';
import { defaultUser, getUser, setUserTheme } from '../../../../../store/slices/Users';
import { Theme } from '../../../../../store/slices/Users/types';

const Display = (): ReactElement => {
	const { setColorMode } = useColorMode();

	const [isSm] = useMediaQuery('(max-width: 600px)');

	const dispatch = useDispatch();
	const user = useSelector((state) => state.app.data.user);
	const isDisplayModalOpen = useSelector((state) => state.modals.ui.isDisplayModalOpen);
	const theme = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme || defaultUser.ui.theme
	);

	const form = useForm<Theme>({ defaultValues: { ...theme } });
	// const color = form.watch('color');
	const formColorMode = form.watch('colorMode');

	const colorMode: ColorMode = formColorMode === 'system' ? handleCheckSystemColorMode() : formColorMode;

	const { isDirty, dirtyFields } = useFormState({ control: form.control });

	const handleSubmit = (newTheme: Theme): void => {
		handleClose();

		dispatch(toggleSplashscreen(true));
		dispatch(setUserTheme({ id: user || '', data: newTheme }));

		form.reset({ ...newTheme });

		if (dirtyFields.colorMode) {
			if (newTheme.colorMode !== 'system') {
				setColorMode(newTheme.colorMode);
			} else {
				setColorMode(handleCheckSystemColorMode());
			}
		}
	};

	const handleClose = (): void => {
		form.reset({ ...theme });

		dispatch(toggleDisplay(false));
	};

	return (
		<Modal colorMode={colorMode} isOpen={isDisplayModalOpen} onClose={handleClose} size={isSm ? 'full' : '3xl'}>
			<ModalHeader
				renderTitle={(props) => <Text {...props}>Edit Application Theme</Text>}
				renderCancel={({ icon, category, ...rest }) => (
					<IconButton {...rest}>
						<Icon icon={icon} category={category} />
					</IconButton>
				)}
			/>
			<ModalBody>
				<Center p={2}>
					<Customization form={form} />
				</Center>
			</ModalBody>
			<ModalFooter
				renderCancel={(props) => (
					<Button {...props} onClick={handleClose}>
						Cancel
					</Button>
				)}
				renderAction={(props) => (
					<Button
						{...props}
						isDisabled={isNil(user) || isEmpty(user) || !isDirty}
						onClick={form.handleSubmit((values) => handleSubmit(values))}
					>
						Save
					</Button>
				)}
			/>
		</Modal>
	);
};

export default Display;
