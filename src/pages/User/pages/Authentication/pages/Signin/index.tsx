import { FC, useState, useCallback } from 'react';

import { useNavigate, useOutletContext } from 'react-router';

import { Colors, Undefinable, useTheme, Alert, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useToast, Grid, GridItem, VStack } from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useUpdateEffect } from 'usehooks-ts';
import { debounce, omit } from 'lodash';
import sha256 from 'crypto-js/sha256';
import { sort } from 'fast-sort';
import dayjs from 'dayjs';

import Illustration from '../../components/Illustration';
import { useSelector, useUserTheme } from '../../../../../../common/hooks';
import { User } from '../../../../../../store/slices/Users/types';
import { guest, setUser, setUsers } from '../../../../../../store/slices/Users';
import { toggleSpinnerModal } from '../../../../../../store/slices/Modals';
import { colorMode as defaultColorMode } from '../../../../../../common/data/defaultPropValues';
import { getBoringAvatarSrc, updateFavicon } from '../../../../../../common/utils';
import { AuthenticationOutletContext } from '../../types';
import { signinIllustration } from '../..';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';

import SigninForm from './components/SigninForm';
import SigninHeader from './components/SigninHeader';
import { SigninForm as SigninFormType } from './types';
import { schema } from './validation';
import SigninFooter from './components/SigninFooter';
import SigninUsers from './components/SigninUsers';

const { convertDurationToMS, getHue, getColorMode } = utils;

const successToastID = 'ds-edb-authentication-sign-in-success-toast';
const errorToastID = 'ds-edb-authentication-sign-in-error-toast';

export const defaultValues: SigninFormType = {
	username: '',
	password: '',
	rememberMe: false
};

const SignIn: FC = () => {
	const theme = useTheme();

	const [isLg] = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

	const userTheme = useUserTheme();

	const { spacing } = useLayoutContext();

	const navigate = useNavigate();
	const { colorMode = defaultColorMode, setColor, setColorMode } = useOutletContext<AuthenticationOutletContext>();

	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.data.users);

	const toast = useToast();

	const [selectedUserID, setSelectedUserID] = useState<Undefinable<string>>();

	const form = useForm<SigninFormType>({
		defaultValues,
		resolver: yupResolver(schema)
	});
	const { control, setValue, reset } = form;

	const watchUsername = useWatch({ control, name: 'username' });
	const watchPassword = useWatch({ control, name: 'password' });

	const handleUserClick = (user?: User): void => {
		if (user) {
			const { color, colorMode } = user.ui.theme;

			setSelectedUserID(user.data.id);

			setColor(color);
			setColorMode(colorMode === 'system' ? getColorMode() : colorMode);

			setValue('username', user.data.credentials.username, { shouldDirty: true });
			setValue('rememberMe', user.data.credentials.rememberMe, { shouldDirty: true });
		} else {
			setSelectedUserID(undefined);

			setValue('username', '', { shouldDirty: true });
			setValue('rememberMe', false, { shouldDirty: true });
		}
	};

	const handleCheckForm = useCallback(
		debounce((): void => {
			const user = users.find((user) => user.data.id === selectedUserID);

			if (
				user &&
				user.data.credentials.username !== watchUsername &&
				user.data.credentials.password !== watchPassword
			) {
				setSelectedUserID('');

				setColor(userTheme.color);
				setColorMode(userTheme.colorMode);
			}
		}, 500),
		[users, selectedUserID, watchUsername, watchPassword, userTheme]
	);

	const handleSubmitAsGuest = (): void => {
		dispatch(toggleSpinnerModal(true));

		const updatedGuest: User = {
			...guest,
			data: {
				...guest.data,
				info: {
					...guest.data.info,
					avatar_path: getBoringAvatarSrc({
						id: guest.data.id,
						colors: omit({ ...theme.colors }, ['transparent', 'black', 'white']) as Colors,
						hue: getHue({ colorMode, type: 'color' }),
						size: 500,
						variant: 'beam'
					})
				}
			}
		};

		dispatch(setUser({ ...updatedGuest }));

		updateFavicon({ color: updatedGuest.ui.theme.color, colorMode });

		setTimeout(() => navigate('/'), 500);

		setTimeout(() => dispatch(toggleSpinnerModal(false)), 2500);
	};

	const handleSubmitForm = (values: SigninFormType): void => {
		const { password, rememberMe } = values;

		const user = users.find((user) => user.data.id === selectedUserID);

		if (user && sha256(password).toString() === user.data.credentials.password) {
			dispatch(toggleSpinnerModal(true));

			if (!toast.isActive(successToastID)) {
				toast.close(errorToastID);
				toast({
					id: successToastID,
					duration: convertDurationToMS({ duration: 15 }),
					position: 'bottom-left',
					render: () => (
						<Alert
							duration={15}
							description={`Successfully signed in as ${user.data.info.name}!`}
							status='success'
							onClose={() => toast.close(successToastID)}
						/>
					)
				});
			}

			const updatedUser: User = {
				...user,
				data: {
					...user.data,
					credentials: { ...user.data.credentials, rememberMe },
					signedInAt: dayjs().toISOString()
				}
			};
			const updatedUsers: User[] = sort([
				...users.filter((u) => u.data.id !== updatedUser.data.id),
				updatedUser
			]).desc((u) => u.data.signedInAt);

			dispatch(setUser({ ...updatedUser }));
			dispatch(setUsers([...updatedUsers]));

			updateFavicon({ color: updatedUser.ui.theme.color, colorMode });

			reset({ ...values });

			setTimeout(() => navigate('/'), 500);

			setTimeout(() => dispatch(toggleSpinnerModal(false)), 2500);
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

	useUpdateEffect(() => handleCheckForm(), [watchUsername, watchPassword]);

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
			{isLg && (
				<GridItem overflowX='hidden' overflowY='hidden'>
					<Illustration width='100%' height='100vh' illustration={signinIllustration} />
				</GridItem>
			)}
			<GridItem overflowX='hidden' overflowY='auto'>
				<VStack
					width='100%'
					minHeight='100vh'
					alignItems='stretch'
					justifyContent='space-between'
					spacing={spacing}
					p={spacing}
				>
					<SigninHeader />

					{users.length > 0 && <SigninUsers selectedUserID={selectedUserID} onUserClick={handleUserClick} />}

					<SigninForm form={form} onSubmitAsGuest={handleSubmitAsGuest} onSubmit={handleSubmitForm} />

					<SigninFooter />
				</VStack>
			</GridItem>
		</Grid>
	);
};

export default SignIn;
