import { FC, ReactElement, useState, useCallback } from 'react';

import { useNavigate, useOutletContext } from 'react-router';

import {
	Undefinable,
	Colors,
	StepperOnChangeProps,
	useTheme,
	Step,
	Stepper,
	StepPanels,
	StepPanel,
	StepList,
	Alert,
	utils
} from '@davidscicluna/component-library';

import { ColorMode, useToast } from '@chakra-ui/react';

import { sort } from 'fast-sort';
import { useDispatch } from 'react-redux';
import { useForm, useWatch, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import sha256 from 'crypto-js/sha256';
import dayjs from 'dayjs';
import { isEmpty, isNil, omit } from 'lodash';
import { v4 as uuid } from 'uuid';
import { useUpdateEffect } from 'usehooks-ts';

import { usePrompt, useSelector } from '../../../../../../common/hooks';
import { defaultUser, setUsers, setUser } from '../../../../../../store/slices/Users';
import { User, UserInfo, UserCredentials } from '../../../../../../store/slices/Users/types';
import { toggleSpinnerModal } from '../../../../../../store/slices/Modals';
import { getBoringAvatarSrc, updateFavicon } from '../../../../../../common/utils';
import { colorMode as defaultColorMode } from '../../../../../../common/data/defaultPropValues';
import { AuthenticationOutletContext } from '../../types';

import { detailsSchema } from './validation';
import { RegisterDetailsForm, RegisterGenresForm, RegisterCustomizationForm, RegisterAssetsForm } from './types';
import { detailsDefaultValues, genresDefaultValues, customizationDefaultValues, assetsDefaultValues } from './defaults';
import AssetsStep from './components/AssetsStep';
import GenresStep from './components/GenresStep';
import DetailsStep from './components/DetailsStep';
import CustomizationStep from './components/CustomizationStep';

const { convertDurationToMS, getHue, getColorMode } = utils;

const toastID = 'ds-edb-authentication-register-toast';
const defaultID = uuid();

const defaultSteps: Step[] = [
	{
		title: 'Details',
		subtitle: 'Enter your credentials and some basic information about you.',
		status: 'active'
	},
	{
		title: 'Favored Genres',
		subtitle: 'Select your most favorite Movie & TV Show genres.',
		status: 'idle'
	},
	{
		title: 'Customization',
		subtitle: 'Pick your favorite color and mode.',
		status: 'idle'
	},
	{
		title: 'Avatar & Background',
		subtitle: 'Upload an avatar & background of your choice!',
		status: 'idle'
	}
];

const Register: FC = () => {
	const theme = useTheme();

	const navigate = useNavigate();
	const { colorMode = defaultColorMode, setColor, setColorMode } = useOutletContext<AuthenticationOutletContext>();

	const dispatch = useDispatch();
	const guest = useSelector((state) => state.users.data.activeUser);
	const users = useSelector((state) => state.users.data.users || []);

	const toast = useToast();

	const [steps, setSteps] = useState<Step[]>([...defaultSteps]);
	const [activeStep, setActiveStep] = useState<number>(0);

	const detailsForm = useForm<RegisterDetailsForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: detailsDefaultValues,
		resolver: yupResolver(detailsSchema)
	});

	const { control: controlDetailsForm, getValues: getDetailsFormValues, reset: resetDetailsForm } = detailsForm;

	const watchFirstName = useWatch({ control: controlDetailsForm, name: 'firstName' });
	const watchLastName = useWatch({ control: controlDetailsForm, name: 'lastName' });
	const watchUsername = useWatch({ control: controlDetailsForm, name: 'username' });

	const {
		isValid: isDetailsFormValid,
		errors: detailsFormErrors,
		isDirty: isDetailsFormDirty
	} = useFormState({ control: controlDetailsForm });

	const genresForm = useForm<RegisterGenresForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: genresDefaultValues
	});

	const { control: controlGenresForm, getValues: getGenresFormValues, reset: resetGenresForm } = genresForm;

	const { isValid: isGenresFormValid, isDirty: isGenresFormDirty } = useFormState({ control: controlGenresForm });

	const customizationForm = useForm<RegisterCustomizationForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: { ...customizationDefaultValues, ...guest.ui.theme }
	});

	const {
		control: controlCustomizationForm,
		getValues: getCustomizationFormValues,
		reset: resetCustomizationForm
	} = customizationForm;

	const watchColor = useWatch({ control: controlCustomizationForm, name: 'color' });
	const watchColorMode = useWatch({ control: controlCustomizationForm, name: 'colorMode' });

	const { isValid: isCustomizationFormValid, isDirty: isCustomizationFormDirty } = useFormState({
		control: controlCustomizationForm
	});

	const assetsForm = useForm<RegisterAssetsForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: {
			...assetsDefaultValues,
			avatar_path: getBoringAvatarSrc({
				id: defaultID,
				colors: omit({ ...theme.colors }, ['transparent', 'black', 'white']) as Colors,
				hue: getHue({ colorMode, type: 'color' }),
				size: 500,
				variant: 'beam'
			}),
			background_path: getBoringAvatarSrc({
				id: defaultID,
				colors: omit({ ...theme.colors }, ['transparent', 'black', 'white']) as Colors,
				hue: getHue({ colorMode, type: 'color' }),
				size: 500,
				variant: 'sunset'
			})
		}
	});

	const { control: controlAssetsForm, getValues: getAssetsFormValues, reset: resetAssetsForm } = assetsForm;

	const { isValid: isAssetsFormValid, isDirty: isAssetsFormDirty } = useFormState({ control: controlAssetsForm });

	usePrompt({
		title: 'Unsubmitted Changes!',
		subtitle:
			'Are you sure you want to cancel registration? Once you close the page you will not be able to retrieve the changed data!',
		when: isDetailsFormDirty || isGenresFormDirty || isCustomizationFormDirty || isAssetsFormDirty
	});

	const handleStepStatus = useCallback(
		(index: number): Step['status'] => {
			switch (index) {
				case 0: {
					let status: Step['status'] = 'idle';

					if (isDetailsFormValid) {
						status = 'success';
					} else if (!(isNil(detailsFormErrors) || isEmpty(detailsFormErrors))) {
						status = 'error';
					} else if (isDetailsFormDirty) {
						status = 'warning';
					}

					return status;
				}
				case 1: {
					let status: Step['status'] = 'idle';

					if (isGenresFormValid) {
						status = 'success';
					}

					return status;
				}
				case 2: {
					let status: Step['status'] = 'idle';

					if (isCustomizationFormValid) {
						status = 'success';
					}

					return status;
				}
				case 3: {
					let status: Step['status'] = 'idle';

					if (isAssetsFormValid) {
						status = 'success';
					}

					return status;
				}
				default:
					return 'idle';
			}
		},
		[
			isDetailsFormValid,
			detailsFormErrors,
			isDetailsFormDirty,
			isGenresFormValid,
			isCustomizationFormValid,
			isAssetsFormValid
		]
	);

	const handleReturnElement = useCallback(
		(index: number): Undefinable<ReactElement> => {
			switch (index) {
				case 0:
					return <DetailsStep form={detailsForm} />;
				case 1:
					return <GenresStep form={genresForm} />;
				case 2:
					return <CustomizationStep form={customizationForm} />;
				case 3:
					return (
						<AssetsStep
							form={assetsForm}
							firstName={watchFirstName}
							lastName={watchLastName}
							username={watchUsername}
						/>
					);
			}
		},
		[detailsForm, genresForm, customizationForm, watchColor, colorMode]
	);

	const handleChange = useCallback(
		({ index }: StepperOnChangeProps): void => {
			setSteps(
				steps.map((step, index) =>
					index === activeStep ? { ...step, status: handleStepStatus(activeStep) } : step
				)
			);
			setActiveStep(index);
		},
		[steps, activeStep, handleStepStatus]
	);

	const handleSubmit = (): void => {
		dispatch(toggleSpinnerModal(true));

		if (!toast.isActive(toastID)) {
			toast({
				id: toastID,
				duration: convertDurationToMS({ duration: 15 }),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={15}
						description={`${details.firstName} ${details.lastName} was successfully created!`}
						status='success'
						onClose={() => toast.close(toastID)}
					/>
				)
			});
		}

		const details = getDetailsFormValues();
		const genres = getGenresFormValues();
		const customization = getCustomizationFormValues();
		const assets = getAssetsFormValues();

		const info: UserInfo = {
			name: `${details.firstName} ${details.lastName}`,
			bio: details.bio,
			avatar_path: assets.avatar_path,
			background_path: assets.background_path,
			prefers: { ...genres }
		};

		const credentials: UserCredentials = {
			username: details.username,
			password: sha256(details.newPassword).toString(),
			rememberMe: false
		};

		const updatedUser: User = {
			...defaultUser,
			data: {
				...defaultUser.data,
				id: defaultID,
				credentials: { ...defaultUser.data.credentials, ...credentials },
				info: { ...defaultUser.data.info, ...info },
				signedInAt: dayjs().toISOString(),
				updatedAt: dayjs().toISOString(),
				createdAt: dayjs().toISOString()
			},
			ui: {
				...defaultUser.ui,
				theme: { ...defaultUser.ui.theme, ...customization }
			}
		};
		const updatedUsers: User[] = sort([
			...users.filter((u) => u.data.id !== updatedUser.data.id),
			updatedUser
		]).desc((u) => u.data.signedInAt);

		dispatch(setUser({ ...updatedUser }));
		dispatch(setUsers([...updatedUsers]));

		updateFavicon({ color: updatedUser.ui.theme.color, colorMode });

		resetDetailsForm({ ...details });
		resetGenresForm({ ...genres });
		resetCustomizationForm({ ...customization });
		resetAssetsForm({ ...assets });

		setTimeout(() => navigate('/'), 500);

		setTimeout(() => dispatch(toggleSpinnerModal(false)), 2500);
	};

	const handleSetUserTheme = (): void => {
		const colorMode: ColorMode = watchColorMode === 'system' ? getColorMode() : watchColorMode;

		updateFavicon({ color: watchColor, colorMode });

		setColor(watchColor);
		setColorMode(colorMode);
	};

	useUpdateEffect(() => handleSetUserTheme(), [watchColor, watchColorMode]);

	return (
		<Stepper
			activeStep={activeStep}
			color={watchColor}
			colorMode={colorMode}
			onChange={handleChange}
			onCancel={() => navigate('/authentication/signin')}
			onSubmit={handleSubmit}
		>
			<StepList>{[...steps]}</StepList>
			<StepPanels>
				{steps.map((step, index) => (
					<StepPanel key={step.title} {...step} index={index} total={steps.length} p={3}>
						{handleReturnElement(index)}
					</StepPanel>
				))}
			</StepPanels>
		</Stepper>
	);
};

export default Register;
