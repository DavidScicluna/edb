import { FC, useRef, useState, useCallback, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router';

import {
	TabsOnChangeProps,
	useTheme,
	useDebounce,
	Tabs,
	TabList,
	TabPanels,
	utils
} from '@davidscicluna/component-library';

import { ColorMode, useColorMode, useToast, useConst, VStack, Text } from '@chakra-ui/react';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { useForm, useFormState, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useWillUnmount } from 'rooks';
import sha256 from 'crypto-js/sha256';
import { lowerCase } from 'lodash';

import DummyPasswordTab from '../components/EditUsersDummyPasswordTab';
import DummyDetailsTab from '../components/EditUsersDummyDetailsTab';
import DummyGenresTab from '../components/EditUsersDummyGenresTab';
import DummyAssetsTab from '../components/EditUsersDummyAssetsTab';
import DummyCustomizationTab from '../components/EditUsersDummyCustomizationTab';
import { usePrompt, useSelector } from '../../../../../common/hooks';
import Page from '../../../../../containers/Page';
import PageBody from '../../../../../containers/Page/components/PageBody';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import { UserTheme } from '../../../../../store/slices/Users/types';
import { Alert, Suspense } from '../../../../../components';
import PageHeader from '../../../../../containers/Page/components/PageHeader';
import { setUserCredentials, setUserInfo, setUserTheme } from '../../../../../store/slices/Users';
import { updateFavicon } from '../../../../../common/utils';
import tabs from '../common/data/tabs';
import { convertDurationToMS } from '../../../../../components/Alert/common/utils';

import GenresTab from './components/GenresTab';
import DetailsTab from './components/DetailsTab';
import PasswordTab from './components/PasswordTab';
import CustomizationTab from './components/CustomizationTab';
import AssetsTab from './components/AssetsTab';
import {
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
import EditUserErrorTabIcon from './components/EditUserErrorTabIcon';

const { getColorMode } = utils;

const detailsFormToastID = 'ds-edb-edit-user-details-form-toast';

const successPasswordFormToastID = 'ds-edb-edit-user-password-form-success-toast';
const errorPasswordFormToastID = 'ds-edb-edit-user-password-form-error-toast';
const genresFormToastID = 'ds-edb-edit-user-genres-form-toast';
const customizationFormToastID = 'ds-edb-edit-user-customization-form-toast';
const assetsFormToastID = 'ds-edb-edit-user-assets-form-toast';

const EditUser: FC = () => {
	const theme = useTheme();
	const { setColorMode: setCUIColorMode } = useColorMode();

	const isCustomizationFormDirtyRef = useRef<boolean>();

	const location = useLocation();
	const navigate = useNavigate();

	const { spacing } = useLayoutContext();

	const dispatch = useDispatch();
	const {
		data: { id, info, credentials },
		ui: { theme: userTheme }
	} = useSelector((state) => state.users.data.activeUser);

	const toast = useToast();

	const [colorMode, setColorMode] = useState<ColorMode>(
		userTheme.colorMode === 'system' ? getColorMode() : userTheme.colorMode
	);

	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const defaultUserTheme = useConst<UserTheme>({ ...userTheme });

	const detailsForm = useForm<EditUserDetailsForm>({
		defaultValues: detailsDefaultValues,
		resolver: yupResolver(detailsSchema)
	});

	const { control: controlDetailsForm, reset: resetDetailsForm } = detailsForm;

	const watchFirstName = useWatch({ control: controlDetailsForm, name: 'firstName' });
	const watchLastName = useWatch({ control: controlDetailsForm, name: 'lastName' });

	const { isDirty: isDetailsFormDirty } = useFormState({ control: controlDetailsForm });

	const passwordForm = useForm<EditUserPasswordForm>({
		defaultValues: passwordDefaultValues,
		resolver: yupResolver(passwordSchema)
	});

	const { control: controlPasswordForm, reset: resetPasswordForm } = passwordForm;

	const { isDirty: isPasswordFormDirty } = useFormState({ control: controlPasswordForm });

	const genresForm = useForm<EditUserGenresForm>({
		defaultValues: genresDefaultValues
	});

	const { control: controlGenresForm, reset: resetGenresForm } = genresForm;

	const { isDirty: isGenresFormDirty } = useFormState({ control: controlGenresForm });

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

	const { control: controlAssetsForm, reset: resetAssetsForm } = assetsForm;

	const { isDirty: isAssetsFormDirty } = useFormState({ control: controlAssetsForm });

	usePrompt({
		title: 'Unsubmitted Changes!',
		subtitle:
			'Are you sure you want to cancel editing? Once you close the page you will not be able to retrieve the changed data!',
		when:
			isDetailsFormDirty ||
			isPasswordFormDirty ||
			isGenresFormDirty ||
			isCustomizationFormDirty ||
			isAssetsFormDirty
	});

	const handleTabChange = ({ index }: TabsOnChangeProps): void => {
		const tab = tabs.find((_tab, i) => index === i);

		if (tab && tab.path) {
			navigate({ pathname: '.', ...tab.path }, { relative: 'route' });
		}
	};

	const handleSubmitDetailsForm = (values: EditUserDetailsForm): void => {
		const { firstName, lastName, bio } = values;

		if (!toast.isActive(detailsFormToastID)) {
			toast({
				id: detailsFormToastID,
				duration: convertDurationToMS({ duration: 15 }),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={15}
						description={`Successfully updated ${firstName} ${lastName}'s ${lowerCase(tabs[0].label)}!`}
						status='success'
						onClose={() => toast.close(detailsFormToastID)}
					/>
				)
			});
		}

		dispatch(setUserInfo({ id: id, data: { ...info, name: `${firstName} ${lastName}`, bio } }));

		resetDetailsForm({ ...values });
	};

	const handleSubmitPasswordForm = (values: EditUserPasswordForm): void => {
		const { password, newPassword } = values;

		if (sha256(password).toString() === credentials.password) {
			if (!toast.isActive(successPasswordFormToastID)) {
				toast.close(errorPasswordFormToastID);
				toast({
					id: successPasswordFormToastID,
					duration: convertDurationToMS({ duration: 15 }),
					position: 'bottom-left',
					render: () => (
						<Alert
							duration={15}
							description={`Successfully updated ${info.name}'s ${lowerCase(tabs[1].label)}!`}
							status='success'
							onClose={() => toast.close(successPasswordFormToastID)}
						/>
					)
				});
			}

			dispatch(
				setUserCredentials({ id: id, data: { ...credentials, password: sha256(newPassword).toString() } })
			);

			resetPasswordForm({ ...values });
		} else if (!toast.isActive(errorPasswordFormToastID)) {
			toast.close(successPasswordFormToastID);
			toast({
				id: errorPasswordFormToastID,
				duration: convertDurationToMS({ duration: 15 }),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={15}
						description='Incorrect username or password! Please try again.'
						status='error'
						onClose={() => toast.close(errorPasswordFormToastID)}
					/>
				)
			});
		}
	};

	const handleSubmitGenresForm = (values: EditUserGenresForm): void => {
		const { movie, tv } = values;

		if (!toast.isActive(genresFormToastID)) {
			toast({
				id: genresFormToastID,
				duration: convertDurationToMS({ duration: 15 }),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={15}
						description={`Successfully updated ${info.name}'s ${lowerCase(tabs[2].label)}!`}
						status='success'
						onClose={() => toast.close(genresFormToastID)}
					/>
				)
			});
		}

		dispatch(setUserInfo({ id: id, data: { ...info, prefers: { movie, tv } } }));

		resetGenresForm({ ...values });
	};

	const handleSubmitCustomizationForm = (values: EditUserCustomizationForm): void => {
		const { color, colorMode } = values;

		if (!toast.isActive(customizationFormToastID)) {
			toast({
				id: customizationFormToastID,
				duration: convertDurationToMS({ duration: 15 }),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={15}
						description={`Successfully updated ${info.name}'s ${lowerCase(tabs[3].label)}!`}
						status='success'
						onClose={() => toast.close(customizationFormToastID)}
					/>
				)
			});
		}

		updateFavicon({ color: color, colorMode: colorMode === 'system' ? getColorMode() : colorMode });

		dispatch(setUserTheme({ id: id, data: { ...theme, ...values } }));

		resetCustomizationForm({ ...values });
	};

	const handleSubmitAssetsForm = (values: EditUserAssetsForm): void => {
		if (!toast.isActive(assetsFormToastID)) {
			toast({
				id: assetsFormToastID,
				duration: convertDurationToMS({ duration: 15 }),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={15}
						description={`Successfully updated ${info.name}'s ${lowerCase(tabs[4].label)}!`}
						status='success'
						onClose={() => toast.close(assetsFormToastID)}
					/>
				)
			});
		}

		dispatch(setUserInfo({ id: id, data: { ...info, ...values } }));

		resetAssetsForm({ ...values });
	};

	const handleResetForms = () => {
		const { name, bio, prefers, avatar_path, background_path } = info;

		const splitName = name.split(' ');
		const firstName = splitName && splitName[0] ? splitName[0] : '';
		const lastName = splitName && splitName[1] ? splitName[1] : '';

		resetDetailsForm({ firstName, lastName, bio });

		resetGenresForm({ ...prefers });

		resetCustomizationForm({ ...userTheme });

		resetAssetsForm({ avatar_path, background_path });
	};

	const handleSetActiveTab = (): void => {
		const hash = location.hash.replaceAll('#', '');
		const index = tabs.findIndex((tab) => tab.path.hash === hash);

		setActiveTab(index >= 0 ? index : 0);
	};

	const handleSetUserTheme = ({ color, colorMode }: UserTheme): void => {
		dispatch(setUserTheme({ id: id, data: { color, colorMode } }));

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
					size='xl'
				>
					<VStack width='100%' spacing={spacing}>
						<TabList
							tabs={tabs.map(({ label }, index) => {
								return {
									label,
									renderLeft:
										(index === 0 && isDetailsFormDirty) ||
										(index === 1 && isPasswordFormDirty) ||
										(index === 2 && isGenresFormDirty) ||
										(index === 3 && isCustomizationFormDirty) ||
										(index === 4 && isAssetsFormDirty)
											? (props) => <EditUserErrorTabIcon {...props} />
											: undefined
								};
							})}
						/>

						<TabPanels>
							<Suspense fallback={<DummyDetailsTab />}>
								<DetailsTab
									form={detailsForm}
									color={watchColor}
									colorMode={colorMode}
									onSubmit={handleSubmitDetailsForm}
								/>
							</Suspense>

							<Suspense fallback={<DummyPasswordTab />}>
								<PasswordTab
									form={passwordForm}
									color={watchColor}
									colorMode={colorMode}
									onSubmit={handleSubmitPasswordForm}
								/>
							</Suspense>

							<Suspense fallback={<DummyGenresTab />}>
								<GenresTab
									form={genresForm}
									color={watchColor}
									colorMode={colorMode}
									onSubmit={handleSubmitGenresForm}
								/>
							</Suspense>

							<Suspense fallback={<DummyCustomizationTab />}>
								<CustomizationTab
									defaultUserTheme={defaultUserTheme}
									form={customizationForm}
									color={watchColor}
									colorMode={colorMode}
									onSubmit={handleSubmitCustomizationForm}
								/>
							</Suspense>

							<Suspense fallback={<DummyAssetsTab />}>
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
