import { ReactElement } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { ColorMode, useColorMode, useMediaQuery, VStack } from '@chakra-ui/react';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import Background from './components/Background';
import Color from './components/Color';

import { useSelector } from '../../../../../common/hooks';
import { handleCheckSystemColorMode } from '../../../../../common/utils';
import Button from '../../../../../components/Clickable/Button';
import Modal from '../../../../../components/Modal';
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
	const background = form.watch('background');

	const colorMode: ColorMode = background === 'system' ? handleCheckSystemColorMode() : background;

	const { isDirty, dirtyFields } = useFormState({ control: form.control });

	const handleSubmit = (newTheme: Theme): void => {
		handleClose();

		dispatch(toggleSplashscreen(true));
		dispatch(setUserTheme({ id: user || '', data: newTheme }));

		form.reset({ ...newTheme });

		if (dirtyFields.background) {
			if (newTheme.background !== 'system') {
				setColorMode(newTheme.background);
			} else {
				setColorMode(handleCheckSystemColorMode());
			}
		}

		setTimeout(() => dispatch(toggleSplashscreen(false)), 5000);
	};

	const handleClose = (): void => {
		form.reset({ ...theme });

		dispatch(toggleDisplay(false));
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
			<VStack spacing={2} p={2}>
				<Color form={form} />
				<Background form={form} />
			</VStack>
		</Modal>
	);
};

export default Display;
