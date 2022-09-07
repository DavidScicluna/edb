import { FC } from 'react';

import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Divider,
	Button,
	IconButton,
	IconButtonIcon
} from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { useForm, useFormState } from 'react-hook-form';

import { toggleInternationalizationModal, toggleSpinnerModal } from '../../../../../store/slices/Modals';
import { useSelector, useUserTheme } from '../../../../../common/hooks';
import { setUserLanguage } from '../../../../../store/slices/Users';

import Languages from './components/Languages';
import { Form } from './types';

const InternationalizationModal: FC = () => {
	const { color, colorMode } = useUserTheme();

	const dispatch = useDispatch();
	const activeUser = useSelector((state) => state.users.data.activeUser);
	const isInternationalizationModalOpen = useSelector((state) => state.modals.ui.isInternationalizationModalOpen);

	const form = useForm<Form>({ defaultValues: { language: { ...activeUser.ui.language } } });
	const { control, reset, handleSubmit } = form;

	const { isDirty } = useFormState({ control });

	const handleClose = (): void => {
		reset({ language: { ...activeUser.ui.language } });

		dispatch(toggleInternationalizationModal(false));
	};

	const handleSubmitForm = ({ language }: Form): void => {
		dispatch(toggleSpinnerModal(true));
		dispatch(setUserLanguage({ id: activeUser.data.id, data: { ...language } }));

		reset({ language });

		handleClose();

		setTimeout(() => dispatch(toggleSpinnerModal(false)), 2500);
	};

	return (
		<Modal colorMode={colorMode} isOpen={isInternationalizationModalOpen} onClose={handleClose} size='3xl'>
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
					renderTitle={(props) => <Text {...props}>Preferred Language</Text>}
					renderSubtitle={(props) => <Text {...props}>Change the preferred language of your choice!</Text>}
					renderCancel={({ icon, category, ...rest }) => (
						<IconButton {...rest}>
							<IconButtonIcon icon={icon} category={category} />
						</IconButton>
					)}
				/>

				<ModalBody>
					<Languages form={form} />
				</ModalBody>
				<ModalFooter
					renderCancel={(props) => (
						<Button {...props} onClick={handleClose}>
							Cancel
						</Button>
					)}
					renderAction={(props) => (
						<Button {...props} color={color} isDisabled={!isDirty} type='submit'>
							Save
						</Button>
					)}
				/>
			</VStack>
		</Modal>
	);
};

export default InternationalizationModal;
