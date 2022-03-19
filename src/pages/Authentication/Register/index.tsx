import React, { ReactElement, useState, useCallback } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { ColorMode, useTheme, useColorMode, useDisclosure, Center, Container } from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import sha256 from 'crypto-js/sha256';
import { isEmpty, isNil } from 'lodash';
import { v4 as uuid } from 'uuid';

import Customization from './components/Customization';
import Details from './components/Details';
import Genres from './components/Genres';
import Profile from './components/Profile';
import {
	detailsDefaultValues,
	genresDefaultValues,
	customizationDefaultValues,
	profileDefaultValues
} from './defaults';
import { DetailsForm, GenresForm, CustomizationForm, ProfileForm } from './types';
import { detailsSchema } from './validation';

import { useSelector } from '../../../common/hooks';
import { handleCheckSystemColorMode } from '../../../common/utils';
import Button from '../../../components/Clickable/Button';
import ConfirmModal from '../../../components/ConfirmModal';
import Stepper from '../../../components/Stepper';
import StepList from '../../../components/Stepper/components/StepList';
import { Step, Status } from '../../../components/Stepper/components/StepList/components/Step/types';
import StepPanel from '../../../components/Stepper/components/StepPanel';
import StepPanels from '../../../components/Stepper/components/StepPanels';
import { setUser } from '../../../store/slices/App';
import { toggleSplashscreen } from '../../../store/slices/Modals';
import { defaultUser, setUserInfo, setUserTheme, setUsers } from '../../../store/slices/Users';
import { User, Info } from '../../../store/slices/Users/types';
import { Theme } from '../../../theme/types';

const id = uuid();

const defaultSteps: Step[] = [
	{
		index: 0,
		title: 'Details',
		subtitle: 'Enter your credentials and some basic information about you.',
		status: 'active'
	},
	{
		index: 1,
		title: 'Favored Genres',
		subtitle: 'Select your most favorite Movie & TV Show genres.',
		status: 'idle'
	},
	{
		index: 2,
		title: 'Customization',
		subtitle: 'Pick your favorite color and mode.',
		status: 'idle'
	},
	{
		index: 3,
		title: 'Avatar & Background',
		subtitle: 'Upload an avatar & background of your choice!',
		status: 'idle'
	}
];

const Register = (): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode: colorModeHook } = useColorMode();

	const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.data.users);

	const [activeStep, setActiveStep] = useState<number>(0);
	const [steps, setSteps] = useState<Step[]>(defaultSteps);

	const detailsForm = useForm<DetailsForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: detailsDefaultValues,
		resolver: yupResolver(detailsSchema)
	});

	const {
		isValid: isDetailsFormValid,
		errors: detailsFormErrors,
		isDirty: isDetailsFormDirty
	} = useFormState({ control: detailsForm.control });

	const genresForm = useForm<GenresForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: genresDefaultValues
	});

	const { isValid: isGenresFormValid, isDirty: isGenresFormDirty } = useFormState({ control: genresForm.control });

	const customizationForm = useForm<CustomizationForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: { ...customizationDefaultValues, colorMode: colorModeHook }
	});

	const color = customizationForm.watch('color');
	const themeColorMode = customizationForm.watch('colorMode');
	const colorMode: ColorMode = themeColorMode === 'system' ? handleCheckSystemColorMode() : themeColorMode;

	const { isValid: isCustomizationFormValid, isDirty: isCustomizationFormDirty } = useFormState({
		control: customizationForm.control
	});

	const profileForm = useForm<ProfileForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: profileDefaultValues
	});

	const { isValid: isProfileFormValid, isDirty: isProfileFormDirty } = useFormState({ control: profileForm.control });

	const handleStepStatus = useCallback(
		(index: number): Status => {
			switch (index) {
				case 0: {
					let status: Status = 'idle';

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
					let status: Status = 'idle';

					if (isGenresFormValid) {
						status = 'success';
					}

					return status;
				}
				case 2: {
					let status: Status = 'idle';

					if (isCustomizationFormValid) {
						status = 'success';
					}

					return status;
				}
				case 3: {
					let status: Status = 'idle';

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

	const handleReturnElement = (index: number): ReactElement | null => {
		switch (index) {
			case 0:
				return <Details form={detailsForm} color={color} colorMode={colorMode} />;
			case 1:
				return <Genres form={genresForm} color={color} colorMode={colorMode} />;
			case 2:
				return <Customization form={customizationForm} />;
			case 3:
				return (
					<Profile
						id={id}
						form={profileForm}
						user={detailsForm.getValues()}
						color={color}
						colorMode={colorMode}
					/>
				);
			default:
				return null;
		}
	};

	const handleChange = (index: number): void => {
		setSteps(
			steps.map((step) => (step.index === activeStep ? { ...step, status: handleStepStatus(activeStep) } : step))
		);
		setActiveStep(index);
	};

	const handleClose = (): void => {
		navigate(-1);
	};

	const handleCloseConfirm = (): void => {
		onCloseConfirm();
		handleClose();
	};

	const handleCheckCancel = (): void => {
		if (!(isDetailsFormDirty || isGenresFormDirty || isCustomizationFormDirty || isProfileFormDirty)) {
			handleClose();
		} else {
			onOpenConfirm();
		}
	};

	const handleSubmit = (): void => {
		dispatch(toggleSplashscreen());

		const details = detailsForm.getValues();
		const genres = genresForm.getValues();
		const customization = customizationForm.getValues();
		const profile = profileForm.getValues();

		const info: Info = {
			name: `${details.firstName} ${details.lastName}`,
			bio: details.bio,
			avatar_path: profile.avatar_path,
			background_path: profile.background_path,
			prefers: { ...genres }
		};
		const user: User = {
			...defaultUser,
			data: {
				...defaultUser.data,
				id,
				credentials: {
					username: details.username,
					password: sha256(details.password).toString(),
					rememberMe: false
				},
				info: { ...info }
			},
			ui: {
				...defaultUser.ui,
				theme: { ...customization }
			}
		};

		dispatch(setUser(id));
		dispatch(setUsers([...users, user]));

		navigate('/');

		setTimeout(() => {
			dispatch(setUserInfo({ id, data: { ...info } }));
			dispatch(setUserTheme({ id, data: { ...customization } }));
		}, 250);
	};

	return (
		<>
			<Center
				backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}
				sx={{ transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}` }}
			>
				<Container maxWidth='8xl' minHeight='100vh' centerContent p={0}>
					<Stepper
						activeStep={activeStep}
						color={color}
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
				</Container>
			</Center>

			<ConfirmModal
				renderActions={({ size }) => (
					<Button color={color} colorMode={colorMode} onClick={() => handleCloseConfirm()} size={size}>
						Go Back
					</Button>
				)}
				title='Cancel User Creation?'
				description='Are you sure you want to cancel creating a new user? Once you close the page you will not be able to retrieve the data!'
				colorMode={colorMode}
				isOpen={isConfirmOpen}
				onClose={onCloseConfirm}
			/>
		</>
	);
};

export default Register;
