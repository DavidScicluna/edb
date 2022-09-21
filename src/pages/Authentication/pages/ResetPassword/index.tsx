import { FC } from 'react';

import { useLocation, useNavigate, useOutletContext } from 'react-router';

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
	IconButtonIcon,
	Icon
} from '@davidscicluna/component-library';

import { useMediaQuery, useDisclosure, HStack, Center } from '@chakra-ui/react';

import qs from 'query-string';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useElementSize, useDebounce, useWindowSize } from 'usehooks-ts';
import { useDispatch } from 'react-redux';
import sha256 from 'crypto-js/sha256';
import { sort } from 'fast-sort';

import { color as defaultColor, colorMode as defaultColorMode } from '../../../../common/data/defaultPropValues';
import Illustration from '../../components/Illustration';
import { useSelector } from '../../../../common/hooks';
import { User } from '../../../../store/slices/Users/types';
import { setUsers } from '../../../../store/slices/Users';
import { AuthenticationOutletContext } from '../../types';

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
	const [isXl] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);

	const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

	const location = useLocation();
	const navigate = useNavigate();
	const { color = defaultColor, colorMode = defaultColorMode } = useOutletContext<AuthenticationOutletContext>();

	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.data.users);

	const { width: windowWidth } = useWindowSize();

	const [containerRef, { width: containerWidth = 0 }] = useElementSize();
	const debouncedContainerWidth = useDebounce<number>(containerWidth, 0);

	const form = useForm<FormType>({
		defaultValues: { ...defaultValues, ...qs.parse(location.search) },
		resolver: yupResolver(schema)
	});

	const { control } = form;

	const { isDirty } = useFormState({ control });

	const handleClose = (): void => {
		navigate('/authentication/signin');
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
			<HStack
				ref={containerRef}
				width='100%'
				minHeight='100vh'
				position='relative'
				alignItems='center'
				justifyContent='flex-start'
				spacing={0}
			>
				<Center
					width={isLg ? `${debouncedContainerWidth / 2}px` : '100%'}
					minHeight='100vh'
					px={[2, 2, 3, 3]}
					py={[3, 3, 4, 4]}
				>
					<Form form={form} onSubmit={handleChangePassword} onBack={handleCheckBack} />
				</Center>

				{isLg && (
					<Illustration
						width={`${debouncedContainerWidth / 2}px`}
						height='100vh'
						position='fixed'
						right={`${isXl ? (windowWidth - containerWidth) / 2 : 0}px`}
						colorMode={colorMode}
					/>
				)}
			</HStack>

			{/* TODO: Extract ConfirmModal to Prompt */}
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
				<ConfirmModalStack spacing={4} p={4}>
					<ConfirmModalIcon
						renderIcon={(props) => (
							<Icon
								{...props}
								width={theme.fontSizes['6xl']}
								height={theme.fontSizes['6xl']}
								fontSize={theme.fontSizes['6xl']}
								icon='help_outline'
							/>
						)}
						color={color}
						p={2}
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
