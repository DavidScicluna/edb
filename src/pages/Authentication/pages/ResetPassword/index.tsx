import { FC } from 'react';

import { useLocation, useNavigate } from 'react-router';

import {
	useTheme,
	ConfirmModal,
	ConfirmModalStack,
	ConfirmModalIcon,
	ConfirmModalBody,
	ConfirmModalTitle,
	ConfirmModalSubtitle,
	ConfirmModalFooter,
	Button,
	IconButton,
	Icon
} from '@davidscicluna/component-library';

import { useMediaQuery, useDisclosure, Center, Container } from '@chakra-ui/react';

import qs from 'query-string';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useElementSize } from 'usehooks-ts';
import { useDispatch } from 'react-redux';
import sha256 from 'crypto-js/sha256';
import { sort } from 'fast-sort';

import Illustration from '../../components/Illustration';
import { useSelector, useUserTheme } from '../../../../common/hooks';
import { User } from '../../../../store/slices/Users/types';
import { setUsers } from '../../../../store/slices/Users';

import { Form as FormType } from './types';
import { schema } from './validation';
import Form from './components/Form';

export const defaultValues: FormType = {
	username: '',
	password: '',
	newPassword: '',
	confirmNewPassword: ''
};

const ForgotPassword: FC = () => {
	const theme = useTheme();
	const [isLg] = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

	const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

	const { color, colorMode } = useUserTheme();

	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.data.users);

	const [illustrationRef, { width: illustrationWidth }] = useElementSize();

	const form = useForm<FormType>({
		defaultValues: { ...defaultValues, ...qs.parse(location.search) },
		resolver: yupResolver(schema)
	});

	const { control } = form;

	const { isDirty } = useFormState({ control });

	const handleClose = (): void => {
		navigate('/signin');
	};

	const handleCloseConfirm = (): void => {
		onConfirmClose();
		handleClose();
	};

	const handleCheckBack = (): void => {
		if (!isDirty) {
			handleClose();
		} else {
			onConfirmOpen();
		}
	};

	const handleChangePassword = (values: FormType): void => {
		const { username, password, newPassword } = values;
		const user = users.find((user) => user.data.credentials.username === username);

		if (user && sha256(password).toString() === user.data.credentials.password) {
			// TODO: Implement global toast system and add success alert

			const updatedUser: User = {
				...user,
				data: {
					...user.data,
					credentials: { ...user.data.credentials, password: sha256(newPassword).toString() }
				}
			};

			const updatedUsers: User[] = sort([
				...users.filter((u) => u.data.id !== updatedUser.data.id),
				updatedUser
			]).desc((u) => u.data.updatedAt);

			dispatch(setUsers([...updatedUsers]));
		} else {
			// TODO: Implement global toast system and add error alert
		}
	};

	return (
		<>
			<Center width='100%' minHeight='100vh' position='relative' overflowX='hidden' overflowY='auto'>
				<Center
					width={isLg ? `calc(100% - ${illustrationWidth}px)` : '100%'}
					minHeight='100vh'
					position='absolute'
					top={0}
					left={0}
					alignItems='center'
					justifyContent='center'
				>
					<Container maxWidth='container.lg' centerContent px={[2, 2, 3, 3]} py={[3, 3, 4, 4]}>
						<Form form={form} onSubmit={handleChangePassword} onBack={handleCheckBack} />
					</Container>
				</Center>

				{isLg && (
					<Illustration ref={illustrationRef} colorMode={colorMode} position='fixed' top={0} right={0} />
				)}
			</Center>

			{/* TODO: Extract ConfirmModal to Prompt */}
			<ConfirmModal
				colorMode={colorMode}
				renderCancel={({ icon, category, ...rest }) => (
					<IconButton {...rest}>
						<Icon icon={icon} category={category} />
					</IconButton>
				)}
				isOpen={isConfirmOpen}
				onClose={onConfirmClose}
			>
				<ConfirmModalStack spacing={4} p={4}>
					<ConfirmModalIcon
						renderIcon={(props) => (
							<Icon
								{...props}
								width={theme.fontSizes['4xl']}
								height={theme.fontSizes['4xl']}
								fontSize={theme.fontSizes['4xl']}
								icon='help_outline'
							/>
						)}
						color={color}
						p={3}
					/>

					<ConfirmModalBody>
						<ConfirmModalTitle>Cancel Reset Password?</ConfirmModalTitle>
						<ConfirmModalSubtitle>
							Are you sure you want to cancel reseting the password? Once you close the page you will not
							be able to retrieve the data!
						</ConfirmModalSubtitle>
					</ConfirmModalBody>
					<ConfirmModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={(props) => (
							<Button {...props} color={color} onClick={handleCloseConfirm}>
								Go Back
							</Button>
						)}
					/>
				</ConfirmModalStack>
			</ConfirmModal>
		</>
	);
};

export default ForgotPassword;
