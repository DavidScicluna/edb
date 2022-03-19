import { ReactElement } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { ColorMode, useColorMode, useMediaQuery, Center } from '@chakra-ui/react';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { useSelector } from '../../../../../common/hooks';
import { handleCheckSystemColorMode } from '../../../../../common/utils';
import Button from '../../../../../components/Clickable/Button';
import Modal from '../../../../../components/Modal';
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
	const color = form.watch('color');
	const formColorMode = form.watch('colorMode');

	const colorMode: ColorMode = formColorMode === 'system' ? handleCheckSystemColorMode() : formColorMode;

	const { isDirty, dirtyFields } = useFormState({ control: form.control });

	const handleSubmit = (newTheme: Theme): void => {
		handleClose();

		dispatch(toggleSplashscreen());
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

		dispatch(toggleDisplay());
	};

	return (
		<Modal
			title='Edit Application Theme'
			renderActions={({ size }) => (
				<Button
					color={color}
					colorMode={colorMode}
					isDisabled={isNil(user) || isEmpty(user) || !isDirty}
					onClick={form.handleSubmit((values) => handleSubmit(values))}
					size={size}
				>
					Save
				</Button>
			)}
			colorMode={colorMode}
			isOpen={isDisplayModalOpen}
			onClose={handleClose}
			isCentered
			size={isSm ? 'full' : '3xl'}
		>
			<Center p={2}>
				<Customization form={form} />
			</Center>
		</Modal>
	);
};

export default Display;
