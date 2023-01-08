import { FC } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { useTheme } from '@davidscicluna/component-library';

import { useMediaQuery, useToast, Grid, GridItem, Center } from '@chakra-ui/react';

import qs from 'query-string';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import sha256 from 'crypto-js/sha256';

import Illustration from '../../components/Illustration';
import { usePrompt, useSelector } from '../../../../../../common/hooks';
import { UserCredentials } from '../../../../../../store/slices/Users/types';
import { setUserCredentials } from '../../../../../../store/slices/Users';
import { convertDurationToMS } from '../../../../../../components/Alert/common/utils';
import { Alert } from '../../../../../../components';
import { resetPasswordIllustration } from '../..';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';

import { ResetPasswordForm as ResetPasswordFormType } from './types';
import { schema } from './validation';
import ResetPasswordForm from './components/ResetPasswordForm';

const successToastID = 'ds-edb-authentication-reset-password-success-toast';
const errorToastID = 'ds-edb-authentication-reset-password-error-toast';

export const defaultValues: ResetPasswordFormType = {
	username: '',
	password: '',
	newPassword: '',
	confirmNewPassword: ''
};

const ForgotPassword: FC = () => {
	const theme = useTheme();

	const [isLg] = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

	const { spacing } = useLayoutContext();

	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.data.users);

	const toast = useToast();

	const form = useForm<ResetPasswordFormType>({
		defaultValues: { ...defaultValues, ...qs.parse(location.search) },
		resolver: yupResolver(schema)
	});

	const { control, reset } = form;

	const { isDirty } = useFormState({ control });

	usePrompt({
		title: 'Unsubmitted Changes!',
		subtitle:
			'Are you sure you want to cancel resetting the password? Once you close the page you will not be able to retrieve the changed data!',
		when: isDirty
	});

	const handleChangePassword = (values: ResetPasswordFormType): void => {
		const { username, password, newPassword } = values;
		const user = users.find((user) => user.data.credentials.username === username);

		if (user && sha256(password).toString() === user.data.credentials.password) {
			if (!toast.isActive(successToastID)) {
				toast.close(errorToastID);
				toast({
					id: successToastID,
					duration: convertDurationToMS({ duration: 15 }),
					position: 'bottom-left',
					render: () => (
						<Alert
							duration={15}
							description={`Successfully updated ${user.data.info.name}'s password!`}
							status='success'
							onClose={() => toast.close(successToastID)}
						/>
					)
				});
			}

			const credentials: UserCredentials = {
				...user.data.credentials,
				password: sha256(newPassword).toString()
			};

			dispatch(setUserCredentials({ id: user.data.id, data: { ...credentials } }));

			reset({ ...values });
		} else if (!toast.isActive(errorToastID)) {
			toast.close(successToastID);
			toast({
				id: errorToastID,
				duration: convertDurationToMS({ duration: 15 }),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={15}
						description='Incorrect username or password! Please try again.'
						status='error'
						onClose={() => toast.close(errorToastID)}
					/>
				)
			});
		}
	};

	return (
		<Grid
			width='100%'
			height='100vh'
			templateRows='repeat(1, 1fr)'
			templateColumns={`repeat(${isLg ? 2 : 1}, 1fr)`}
			overflowX='hidden'
			overflowY='hidden'
			gap={0}
		>
			<GridItem overflowX='hidden' overflowY='auto'>
				<Center width='100%' minHeight='100vh' p={spacing}>
					<ResetPasswordForm
						form={form}
						onSubmit={handleChangePassword}
						onBack={() => navigate('/authentication/signin')}
					/>
				</Center>
			</GridItem>
			{isLg && (
				<GridItem overflowX='hidden' overflowY='hidden'>
					<Illustration width='100%' height='100vh' illustration={resetPasswordIllustration} />
				</GridItem>
			)}
		</Grid>
	);
};

export default ForgotPassword;
