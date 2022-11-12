import { FC, useRef, useState, useCallback, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { TabsOnChangeProps, Tabs, TabList, TabPanels, utils } from '@davidscicluna/component-library';

import { ColorMode, useColorMode, useConst, VStack, Text } from '@chakra-ui/react';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { useForm, useFormState, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useWillUnmount } from 'rooks';
import { SHA256 } from 'crypto-js';
import { sort } from 'fast-sort';

import { useDebounce, useSelector } from '../../../../common/hooks';
import Page from '../../../../containers/Page';
import PageBody from '../../../../containers/Page/components/PageBody';
import { useLayoutContext } from '../../../../containers/Layout/common/hooks';
import { User, UserInfo, UserTheme } from '../../../../store/slices/Users/types';
import { Suspense } from '../../../../components';
import PageHeader from '../../../../containers/Page/components/PageHeader';
import { setUser, setUserInfo, setUsers, setUserTheme } from '../../../../store/slices/Users';
import { updateFavicon } from '../../../../common/utils';

import GenresTab from './components/GenresTab';
import DetailsTab from './components/DetailsTab';
import PasswordTab from './components/PasswordTab';
import CustomizationTab from './components/CustomizationTab';
import AssetsTab from './components/AssetsTab';
import {
	EditUserTabs,
	EditUserDetailsForm,
	EditUserPasswordForm,
	EditUserGenresForm,
	EditUserCustomizationForm,
	EditUserAssetsForm
} from './types';
import {
	detailsDefaultValues,
	passwordDefaultValues,
	genresDefaultValues,
	customizationDefaultValues,
	assetsDefaultValues
} from './defaults';
import { detailsSchema, passwordSchema } from './validation';

const { getColorMode } = utils;

const tabs: EditUserTabs = [
	{
		path: { hash: 'details' },
		label: 'Details'
	},
	{
		path: { hash: 'password' },
		label: 'Password'
	},
	{
		path: { hash: 'genres' },
		label: 'Favored Genres'
	},
	{
		path: { hash: 'customization' },
		label: 'Customization'
	},
	{
		path: { hash: 'assets' },
		label: 'Avatar & Background'
	}
];

const EditUser: FC = () => {
	const { setColorMode: setCUIColorMode } = useColorMode();

	const location = useLocation();
	const navigate = useNavigate();

	const { spacing } = useLayoutContext();

	const dispatch = useDispatch();
	const activeUser = useSelector((state) => state.users.data.activeUser);
	const users = useSelector((state) => state.users.data.users || []);

	const isCustomizationFormDirtyRef = useRef<boolean>();

	const [colorMode, setColorMode] = useState<ColorMode>(
		activeUser.ui.theme.colorMode === 'system' ? getColorMode() : activeUser.ui.theme.colorMode
	);

	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const defaultUserTheme = useConst<UserTheme>(activeUser.ui.theme);

	const detailsForm = useForm<EditUserDetailsForm>({
		defaultValues: detailsDefaultValues,
		resolver: yupResolver(detailsSchema)
	});

	const { control: controlDetailsForm, reset: resetDetailsForm } = detailsForm;

	const watchFirstName = useWatch({ control: controlDetailsForm, name: 'firstName' });
	const watchLastName = useWatch({ control: controlDetailsForm, name: 'lastName' });

	const passwordForm = useForm<EditUserPasswordForm>({
		defaultValues: passwordDefaultValues,
		resolver: yupResolver(passwordSchema)
	});

	const { reset: resetPasswordForm } = passwordForm;

	const genresForm = useForm<EditUserGenresForm>({
		defaultValues: genresDefaultValues
	});

	const { reset: resetGenresForm } = genresForm;

	const customizationForm = useForm<EditUserCustomizationForm>({
		defaultValues: customizationDefaultValues
	});

	const { control: controlCustomizationForm, reset: resetCustomizationForm } = customizationForm;

	const watchColor = useWatch({ control: controlCustomizationForm, name: 'color' });
	const watchColorMode = useWatch({ control: controlCustomizationForm, name: 'colorMode' });

	const { isDirty: isCustomizationFormDirty } = useFormState({ control: controlCustomizationForm });

	const assetsForm = useForm<EditUserAssetsForm>({
		defaultValues: { ...assetsDefaultValues }
	});

	const { reset: resetAssetsForm } = assetsForm;

	const handleTabChange = ({ index }: TabsOnChangeProps): void => {
		const tab = tabs.find((_tab, i) => index === i);

		if (tab && tab.path) {
			navigate({ ...location, ...tab.path });
		}
	};

	const handleSubmitDetailsForm = (values: EditUserDetailsForm): void => {
		// TODO: Add toast

		const { firstName, lastName, bio } = values;

		const info: UserInfo = {
			...activeUser.data.info,
			name: `${firstName} ${lastName}`,
			bio
		};
		const updatedUser: User = {
			...activeUser,
			data: {
				...activeUser.data,
				info: { ...activeUser.data.info, ...info }
			}
		};

		const updatedUsers: User[] = sort([
			...users.filter((u) => u.data.id !== updatedUser.data.id),
			updatedUser
		]).desc((u) => u.data.updatedAt);

		dispatch(setUser({ ...updatedUser }));
		dispatch(setUsers([...updatedUsers]));
		dispatch(setUserInfo({ id: activeUser.data.id, data: { ...info } }));

		resetDetailsForm({ ...values });
	};

	const handleSubmitPasswordForm = ({ password, newPassword, confirmNewPassword }: EditUserPasswordForm): void => {
		if (SHA256(password).toString() === activeUser.data.credentials.password) {
			// TODO: Implement global toast system and add success alert

			const updatedUser: User = {
				...activeUser,
				data: {
					...activeUser.data,
					credentials: { ...activeUser.data.credentials, password: SHA256(newPassword).toString() }
				}
			};
			const updatedUsers: User[] = sort([
				...users.filter((u) => u.data.id !== updatedUser.data.id),
				updatedUser
			]).desc((u) => u.data.updatedAt);

			dispatch(setUser({ ...updatedUser }));
			dispatch(setUsers([...updatedUsers]));

			resetPasswordForm({ password, newPassword, confirmNewPassword });
		} else {
			// TODO: Implement global toast system and add error alert
		}
	};

	const handleSubmitGenresForm = (values: EditUserGenresForm): void => {
		// TODO: Add toast

		const { movie, tv } = values;

		const info: UserInfo = {
			...activeUser.data.info,
			prefers: { movie, tv }
		};

		const updatedUser: User = {
			...activeUser,
			data: {
				...activeUser.data,
				info: { ...activeUser.data.info, ...info }
			}
		};
		const updatedUsers: User[] = sort([
			...users.filter((u) => u.data.id !== updatedUser.data.id),
			updatedUser
		]).desc((u) => u.data.updatedAt);

		dispatch(setUser({ ...updatedUser }));
		dispatch(setUsers([...updatedUsers]));
		dispatch(setUserInfo({ id: activeUser.data.id, data: { ...info } }));

		resetGenresForm({ ...values });
	};

	const handleSubmitCustomizationForm = (values: EditUserCustomizationForm): void => {
		// TODO: Add toast

		const { color, colorMode } = values;

		resetCustomizationForm({ ...values });

		const updatedUser: User = {
			...activeUser,
			ui: {
				...activeUser.ui,
				theme: { ...activeUser.ui.theme, ...values }
			}
		};
		const updatedUsers: User[] = sort([
			...users.filter((u) => u.data.id !== updatedUser.data.id),
			updatedUser
		]).desc((u) => u.data.updatedAt);

		dispatch(setUser({ ...updatedUser }));
		dispatch(setUsers([...updatedUsers]));
		dispatch(setUserTheme({ id: activeUser.data.id, data: { ...values } }));

		updateFavicon({ color: color, colorMode: colorMode === 'system' ? getColorMode() : colorMode });
	};

	const handleSubmitAssetsForm = (values: EditUserAssetsForm): void => {
		// TODO: Add toast

		const info: UserInfo = { ...activeUser.data.info, ...values };

		const updatedUser: User = {
			...activeUser,
			data: {
				...activeUser.data,
				info: { ...activeUser.data.info, ...info }
			}
		};
		const updatedUsers: User[] = sort([
			...users.filter((u) => u.data.id !== updatedUser.data.id),
			updatedUser
		]).desc((u) => u.data.updatedAt);

		dispatch(setUser({ ...updatedUser }));
		dispatch(setUsers([...updatedUsers]));
		dispatch(setUserInfo({ id: activeUser.data.id, data: { ...info } }));

		resetAssetsForm({ ...values });
	};

	const handleResetForms = () => {
		const {
			data: {
				info: { name, bio, prefers, avatar_path, background_path }
			},
			ui: { theme }
		} = activeUser;

		const splitName = name.split(' ');
		const firstName = splitName && splitName[0] ? splitName[0] : '';
		const lastName = splitName && splitName[1] ? splitName[1] : '';

		resetDetailsForm({ firstName, lastName, bio });

		resetGenresForm({ ...prefers });

		resetCustomizationForm({ ...theme });

		resetAssetsForm({ avatar_path, background_path });
	};

	const handleSetActiveTab = (): void => {
		const hash = location.hash.replaceAll('#', '');
		const index = tabs.findIndex((tab) => tab.path.hash === hash);

		setActiveTab(index >= 0 ? index : 0);
	};

	const handleSetUserTheme = ({ color, colorMode }: UserTheme): void => {
		dispatch(setUserTheme({ id: activeUser.data.id, data: { color, colorMode } }));

		updateFavicon({ color, colorMode: colorMode === 'system' ? getColorMode() : colorMode });

		setCUIColorMode(colorMode === 'system' ? getColorMode() : colorMode);
		setColorMode(colorMode === 'system' ? getColorMode() : colorMode);
	};

	const handleResetUserTheme = useCallback((): void => {
		if (isCustomizationFormDirtyRef.current) {
			handleSetUserTheme({ ...defaultUserTheme });
		}
	}, [isCustomizationFormDirtyRef, defaultUserTheme]);

	useEffect(() => {
		isCustomizationFormDirtyRef.current = isCustomizationFormDirty;
	}, [isCustomizationFormDirty]);

	useEffectOnce(() => handleResetForms());

	useEffectOnce(() => (location.hash.length > 0 ? handleSetActiveTab() : undefined));

	useUpdateEffect(() => handleSetActiveTab(), [location.hash]);

	useUpdateEffect(() => {
		handleSetUserTheme({ color: watchColor, colorMode: watchColorMode });
	}, [watchColor, watchColorMode]);

	useWillUnmount(() => handleResetUserTheme());

	return (
		<Page>
			<PageHeader
				renderTitle={(props) => <Text {...props}>Edit Profile</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`Edit your ${tabs
							.filter((_tab, index) => index < tabs.length - 1)
							.map((tab) => tab.label)
							.join(', ')} & ${tabs[tabs.length - 1].label}`}
					</Text>
				)}
				direction='row'
				spacing={spacing}
				px={spacing}
				py={spacing * 2}
			/>
			<PageBody px={spacing} pb={spacing}>
				<Tabs
					width='100%'
					color={watchColor}
					colorMode={colorMode}
					activeTab={activeTabDebounced}
					onChange={handleTabChange}
					size='lg'
				>
					<VStack width='100%' spacing={spacing}>
						<TabList tabs={tabs} />

						<TabPanels>
							<Suspense>
								<DetailsTab
									form={detailsForm}
									color={watchColor}
									colorMode={colorMode}
									onSubmit={handleSubmitDetailsForm}
								/>
							</Suspense>

							<Suspense>
								<PasswordTab
									form={passwordForm}
									color={watchColor}
									colorMode={colorMode}
									onSubmit={handleSubmitPasswordForm}
								/>
							</Suspense>

							<Suspense>
								<GenresTab
									form={genresForm}
									color={watchColor}
									colorMode={colorMode}
									onSubmit={handleSubmitGenresForm}
								/>
							</Suspense>

							<Suspense>
								<CustomizationTab
									defaultUserTheme={defaultUserTheme}
									form={customizationForm}
									color={watchColor}
									colorMode={colorMode}
									onSubmit={handleSubmitCustomizationForm}
								/>
							</Suspense>

							<Suspense>
								<AssetsTab
									form={assetsForm}
									color={watchColor}
									colorMode={colorMode}
									firstName={watchFirstName}
									lastName={watchLastName}
									onSubmit={handleSubmitAssetsForm}
								/>
							</Suspense>
						</TabPanels>
					</VStack>
				</Tabs>
			</PageBody>
		</Page>
	);
};

export default EditUser;
