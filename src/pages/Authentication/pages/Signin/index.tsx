import { FC, useState, useCallback } from 'react';

import { useNavigate, useOutletContext } from 'react-router';

import { Colors, useTheme, useDebounce, utils } from '@davidscicluna/component-library';

import { useMediaQuery, HStack, VStack } from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useElementSize, useUpdateEffect, useWindowSize } from 'usehooks-ts';
import { debounce, omit } from 'lodash';
import sha256 from 'crypto-js/sha256';
import { sort } from 'fast-sort';
import dayjs from 'dayjs';

import Illustration from '../../components/Illustration';
import { useSelector, useUserTheme } from '../../../../common/hooks';
import { User } from '../../../../store/slices/Users/types';
import { guest, setUser, setUsers } from '../../../../store/slices/Users';
import { toggleSpinnerModal } from '../../../../store/slices/Modals';
import { color as defaultColor, colorMode as defaultColorMode } from '../../../../common/data/defaultPropValues';
import { getBoringAvatarSrc, updateFavicon } from '../../../../common/utils';
import { AuthenticationOutletContext } from '../../types';

import Form from './components/Form';
import Header from './components/Header';
import { Form as FormType } from './types';
import { schema } from './validation';
import Footer from './components/Footer';
import Users from './components/Users';

const { getHue, getColorMode } = utils;

export const defaultValues: FormType = {
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
	const {
		color = defaultColor,
		colorMode = defaultColorMode,
		setColor,
		setColorMode
	} = useOutletContext<AuthenticationOutletContext>();

	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.data.users);

	const { width: windowWidth } = useWindowSize();

	const [containerRef, { width: containerWidth = 0 }] = useElementSize();
	const debouncedContainerWidth = useDebounce<number>(containerWidth);

	const [selectedUserID, setSelectedUserID] = useState<string>('');

	const form = useForm<FormType>({
		defaultValues,
		resolver: yupResolver(schema)
	});
	const { control, setValue, getValues } = form;

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

		// TODO: Check if avatar is re generated
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

	const handleSubmitForm = (credentials: FormType): void => {
		const user = users.find((user) => user.data.id === selectedUserID);

		// TODO: Implement global toast system and add success alert

		if (user && sha256(credentials.password).toString() === user.data.credentials.password) {
			dispatch(toggleSpinnerModal(true));

			const { rememberMe } = getValues();

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

			setTimeout(() => navigate('/'), 500);

			setTimeout(() => dispatch(toggleSpinnerModal(false)), 2500);
		} else {
			// TODO: Implement global toast system and add error alert
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
					width={`${debouncedContainerWidth / 2}px`}
					height='100vh'
					position='fixed'
					top={0}
					left={`${isXl ? (windowWidth - containerWidth) / 2 : 0}px`}
					colorMode={colorMode}
				/>
			)}

			<VStack
				width={isLg ? `${debouncedContainerWidth / 2}px` : '100%'}
				minHeight='100vh'
				alignItems='stretch'
				justifyContent='space-between'
				spacing={[3, 3, 4, 4]}
				px={[2, 2, 3, 3]}
				py={[3, 3, 4, 4]}
			>
				<Header colorMode={colorMode} />

				{users.length > 0 && (
					<Users
						color={color}
						colorMode={colorMode}
						selectedUserID={selectedUserID}
						onUserClick={handleUserClick}
					/>
				)}

				<Form
					color={color}
					colorMode={colorMode}
					form={form}
					onSubmitAsGuest={handleSubmitAsGuest}
					onSubmit={handleSubmitForm}
				/>

				<Footer color={color} colorMode={colorMode} />
			</VStack>
		</HStack>
	);
};

export default SignIn;
