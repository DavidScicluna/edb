import { FC, useState, useCallback } from 'react';

import { useNavigate, useOutletContext } from 'react-router';

import { Colors, useTheme, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useToast, HStack, VStack } from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useElementSize, useUpdateEffect, useWindowSize } from 'usehooks-ts';
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
import { convertDurationToMS } from '../../../../../../components/Alert/common/utils';
import { Alert } from '../../../../../../components';

import SigninForm from './components/SigninForm';
import SigninHeader from './components/SigninHeader';
import { SigninForm as SigninFormType } from './types';
import { schema } from './validation';
import SigninFooter from './components/SigninFooter';
import SigninUsers from './components/SigninUsers';

const { getHue, getColorMode } = utils;

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
	const [isXl] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);

	const userTheme = useUserTheme();

	const navigate = useNavigate();
	const { colorMode = defaultColorMode, setColor, setColorMode } = useOutletContext<AuthenticationOutletContext>();

	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.data.users);

	const toast = useToast();

	const { width: windowWidth } = useWindowSize();

	const [containerRef, { width: containerWidth }] = useElementSize();

	const [selectedUserID, setSelectedUserID] = useState<string>('');

	const form = useForm<SigninFormType>({
		defaultValues,
		resolver: yupResolver(schema)
	});
	const { control, setValue, reset } = form;

	const watchUsername = useWatch({ control, name: 'username' });
	const watchPassword = useWatch({ control, name: 'password' });

	const handleUserClick = (user: User): void => {
		const { color, colorMode } = user.ui.theme;

		setSelectedUserID(user.data.id);

		setColor(color);
		setColorMode(colorMode === 'system' ? getColorMode() : colorMode);

		setValue('username', user.data.credentials.username, { shouldDirty: true });
		setValue('rememberMe', user.data.credentials.rememberMe, { shouldDirty: true });
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
		<HStack
			ref={containerRef}
			width='100%'
			minHeight='100vh'
			position='relative'
			alignItems='center'
			justifyContent='flex-end'
			spacing={0}
		>
			{isLg && (
				<Illustration
					width={`${containerWidth / 2}px`}
					height='100vh'
					position='fixed'
					top={0}
					left={`${isXl ? (windowWidth - containerWidth) / 2 : 0}px`}
				/>
			)}

			<VStack
				width={isLg ? `${containerWidth / 2}px` : '100%'}
				minHeight='100vh'
				alignItems='stretch'
				justifyContent='space-between'
				spacing={[3, 3, 4, 4]}
				px={[2, 2, 3, 3]}
				py={[3, 3, 4, 4]}
			>
				<SigninHeader />

				{users.length > 0 && <SigninUsers selectedUserID={selectedUserID} onUserClick={handleUserClick} />}

				<SigninForm form={form} onSubmitAsGuest={handleSubmitAsGuest} onSubmit={handleSubmitForm} />

				<SigninFooter />
			</VStack>
		</HStack>
	);
};

export default SignIn;
