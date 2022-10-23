import { FC, useEffect } from 'react';

import {
	Modal,
	ModalStack,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	Button,
	IconButton,
	IconButtonIcon
} from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useQueryClient } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';
import { useForm, useFormState } from 'react-hook-form';

import { toggleInternationalizationModal, toggleSpinnerModal } from '../../../../../store/slices/Modals';
import { useSelector, useUserTheme } from '../../../../../common/hooks';
import { setUserLanguage } from '../../../../../store/slices/Users';

import Languages from './components/Languages';
import { InternationalizationModalForm } from './types';

const InternationalizationModal: FC = () => {
	const { color, colorMode } = useUserTheme();

	const dispatch = useDispatch();
	const activeUser = useSelector((state) => state.users.data.activeUser);
	const isInternationalizationModalOpen = useSelector((state) => state.modals.ui.isInternationalizationModalOpen);

	const client = useQueryClient();

	const form = useForm<InternationalizationModalForm>({ defaultValues: { language: { ...activeUser.ui.language } } });
	const { control, reset, handleSubmit } = form;

	const { isDirty } = useFormState({ control });

	const handleClose = (): void => {
		dispatch(toggleInternationalizationModal(false));
	};

	const handleSubmitForm = ({ language }: InternationalizationModalForm): void => {
		dispatch(toggleSpinnerModal(true));
		dispatch(setUserLanguage({ id: activeUser.data.id, data: { ...language } }));

		reset({ language });

		handleClose();

		setTimeout(() => {
			client.removeQueries();
			client.invalidateQueries();
		}, 1000);

		setTimeout(() => dispatch(toggleSpinnerModal(false)), 2500);
	};

	useEffect(() => reset({ language: { ...activeUser.ui.language } }), [isInternationalizationModalOpen]);

	return (
		<Modal colorMode={colorMode} isOpen={isInternationalizationModalOpen} onClose={handleClose} size='3xl'>
			<ModalStack as={Form} onSubmit={handleSubmit(handleSubmitForm)}>
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
			</ModalStack>
		</Modal>
	);
};

export default InternationalizationModal;
