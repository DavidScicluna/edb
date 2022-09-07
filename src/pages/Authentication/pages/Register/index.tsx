import { FC, ReactElement, useState, useCallback, useEffect } from 'react';

import { useNavigate, useOutletContext } from 'react-router';

import {
	StepperOnChangeProps,
	useTheme,
	Step,
	Stepper,
	StepPanels,
	StepPanel,
	StepList,
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
	Icon,
	utils,
	Undefinable
} from '@davidscicluna/component-library';

import { useDisclosure } from '@chakra-ui/react';

import { sort } from 'fast-sort';
import { useDispatch } from 'react-redux';
import { useForm, useWatch, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import sha256 from 'crypto-js/sha256';
import dayjs from 'dayjs';
import { isEmpty, isNil } from 'lodash';
import { v4 as uuid } from 'uuid';

import { useSelector, useUserTheme } from '../../../../common/hooks';
import { defaultUser, setUserInfo, setUserTheme, setUsers, setUser } from '../../../../store/slices/Users';
import { User, Info, Credentials } from '../../../../store/slices/Users/types';
import { toggleSpinnerModal } from '../../../../store/slices/Modals';
import { getBoringAvatarSrc } from '../../../../common/utils';
import { colorMode as defaultColorMode } from '../../../../common/data/defaultPropValues';
import { AuthenticationOutletContext } from '../../types';

import { detailsSchema } from './validation';
import { DetailsForm, GenresForm, CustomizationForm, ProfileForm } from './types';
import {
	detailsDefaultValues,
	genresDefaultValues,
	customizationDefaultValues,
	profileDefaultValues
} from './defaults';
import ProfileStep from './components/ProfileStep';
import GenresStep from './components/GenresStep';
import DetailsStep from './components/DetailsStep';
import CustomizationStep from './components/CustomizationStep';

const id = uuid();

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

const { getHue, getColorMode } = utils;

const Register: FC = () => {
	const theme = useTheme();
	const userTheme = useUserTheme();

	const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

	const navigate = useNavigate();
	const { colorMode = defaultColorMode, setColorMode } = useOutletContext<AuthenticationOutletContext>();

	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.data.users || []);

	const [steps, setSteps] = useState<Step[]>([...defaultSteps]);
	const [activeStep, setActiveStep] = useState<number>(0);

	const detailsForm = useForm<DetailsForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: detailsDefaultValues,
		resolver: yupResolver(detailsSchema)
	});

	const { control: controlDetailsForm, getValues: getDetailsFormValues } = detailsForm;

	const watchFirstName = useWatch({ control: controlDetailsForm, name: 'firstName' });
	const watchLastName = useWatch({ control: controlDetailsForm, name: 'lastName' });
	const watchUsername = useWatch({ control: controlDetailsForm, name: 'username' });

	const {
		isValid: isDetailsFormValid,
		errors: detailsFormErrors,
		isDirty: isDetailsFormDirty
	} = useFormState({ control: controlDetailsForm });

	const genresForm = useForm<GenresForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: genresDefaultValues
	});

	const { control: controlGenresForm, getValues: getGenresFormValues } = genresForm;

	const { isValid: isGenresFormValid, isDirty: isGenresFormDirty } = useFormState({ control: controlGenresForm });

	const customizationForm = useForm<CustomizationForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: { ...customizationDefaultValues, ...userTheme }
	});

	const { control: controlCustomizationForm, getValues: getCustomizationFormValues } = customizationForm;

	const watchColor = useWatch({ control: controlCustomizationForm, name: 'color' });
	const watchColorMode = useWatch({ control: controlCustomizationForm, name: 'colorMode' });

	const { isValid: isCustomizationFormValid, isDirty: isCustomizationFormDirty } = useFormState({
		control: controlCustomizationForm
	});

	const profileForm = useForm<ProfileForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: {
			...profileDefaultValues,
			avatar_path: getBoringAvatarSrc({
				id,
				colors: theme.colors,
				hue: getHue({ colorMode, type: 'color' }),
				size: 500,
				variant: 'beam'
			}),
			background_path: getBoringAvatarSrc({
				id,
				colors: theme.colors,
				hue: getHue({ colorMode, type: 'color' }),
				size: 500,
				variant: 'sunset'
			})
		}
	});

	const { control: controlProfileForm, getValues: getProfileFormValues } = profileForm;

	const { isValid: isProfileFormValid, isDirty: isProfileFormDirty } = useFormState({ control: controlProfileForm });

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

					if (isProfileFormValid) {
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
			isProfileFormValid
		]
	);

	const handleReturnElement = useCallback(
		(index: number): Undefinable<ReactElement> => {
			switch (index) {
				case 0:
					return <DetailsStep form={detailsForm} color={watchColor} colorMode={colorMode} />;
				case 1:
					return <GenresStep form={genresForm} color={watchColor} colorMode={colorMode} />;
				case 2:
					return <CustomizationStep form={customizationForm} color={watchColor} colorMode={colorMode} />;
				case 3:
					return (
						<ProfileStep
							form={profileForm}
							firstName={watchFirstName}
							lastName={watchLastName}
							username={watchUsername}
							color={watchColor}
							colorMode={colorMode}
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

	const handleClose = (): void => {
		navigate('/authentication/signin');
	};

	const handleCloseConfirm = (): void => {
		onConfirmClose();
		handleClose();
	};

	const handleCheckCancel = (): void => {
		if (!(isDetailsFormDirty || isGenresFormDirty || isCustomizationFormDirty || isProfileFormDirty)) {
			handleClose();
		} else {
			onConfirmOpen();
		}
	};

	const handleSubmit = (): void => {
		dispatch(toggleSpinnerModal(true));

		// TODO: Implement global toast system and add success alert

		const details = getDetailsFormValues();
		const genres = getGenresFormValues();
		const customization = getCustomizationFormValues();
		const profile = getProfileFormValues();

		const info: Info = {
			name: `${details.firstName} ${details.lastName}`,
			bio: details.bio,
			avatar_path: profile.avatar_path,
			background_path: profile.background_path,
			prefers: { ...genres }
		};

		const credentials: Credentials = {
			username: details.username,
			password: sha256(details.password).toString(),
			rememberMe: false
		};

		const updatedUser: User = {
			...defaultUser,
			data: {
				...defaultUser.data,
				id,
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
		dispatch(setUserInfo({ id, data: { ...info } }));
		dispatch(setUserTheme({ id, data: { ...customization } }));
		dispatch(setUsers([...updatedUsers]));

		setTimeout(() => navigate('/'), 500);

		setTimeout(() => dispatch(toggleSpinnerModal(false)), 2500);
	};

	useEffect(() => setColorMode(watchColorMode === 'system' ? getColorMode() : watchColorMode), [watchColorMode]);

	return (
		<>
			<Stepper
				activeStep={activeStep}
				color={watchColor}
				colorMode={colorMode}
				onChange={handleChange}
				onCancel={handleCheckCancel}
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
								width={theme.fontSizes['4xl']}
								height={theme.fontSizes['4xl']}
								fontSize={theme.fontSizes['4xl']}
								icon='help_outline'
							/>
						)}
						color={watchColor}
						p={3}
					/>

					<ConfirmModalBody>
						<ConfirmModalTitle>Cancel User Creation?</ConfirmModalTitle>
						<ConfirmModalSubtitle>
							Are you sure you want to cancel creating a new user? Once you close the page you will not be
							able to retrieve the data!
						</ConfirmModalSubtitle>
					</ConfirmModalBody>
					<ConfirmModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={(props) => (
							<Button {...props} color={watchColor} onClick={handleCloseConfirm}>
								Go Back
							</Button>
						)}
					/>
				</ConfirmModalStack>
			</ConfirmModal>
		</>
	);
};

export default Register;
