import { FC } from 'react';

import { useTheme, Card, CardBody, Input, Textarea, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, useConst, VStack, SimpleGrid } from '@chakra-ui/react';

import { range, sample } from 'lodash';
import { Controller, useWatch, useFormState } from 'react-hook-form';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../common/data/defaultPropValues';
import {
	usernames as usernamePlaceholders,
	firstNames as firstNamePlaceholders,
	lastNames as lastNamePlaceholders
} from '../../../../../common/data/placeholders';
import { useSelector } from '../../../../../../../common/hooks';
import EditUserStructure from '../EditUserStructure';

import { DetailsTabProps } from './types';

const DetailsTab: FC<DetailsTabProps> = (props) => {
	const theme = useTheme();
	const [isSm] = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

	const {
		info: { name, bio },
		credentials: { username }
	} = useSelector((state) => state.users.data.activeUser.data);

	const { form, color = defaultColor, colorMode = defaultColorMode, onSubmit } = props;
	const { control, reset, handleSubmit } = form;

	const watchFirstName = useWatch({ control, name: 'firstName' });
	const watchLastName = useWatch({ control, name: 'lastName' });
	const watchBio = useWatch({ control, name: 'bio' });

	const { isDirty } = useFormState({ control });

	const placeholderIndex = useConst<number | undefined>(sample(range(usernamePlaceholders.length)));

	const usernamePlaceholder = useConst<string>(
		placeholderIndex ? usernamePlaceholders[placeholderIndex] : 'johnsmith'
	);

	const firstNamePlaceholder = useConst<string>(placeholderIndex ? firstNamePlaceholders[placeholderIndex] : 'John');
	const lastNamePlaceholder = useConst<string>(placeholderIndex ? lastNamePlaceholders[placeholderIndex] : 'Smith');

	const userName = name.split(' ');
	const userFirstName = userName && userName[0] ? userName[0] : '';
	const userLastName = userName && userName[1] ? userName[1] : '';

	// usePrompt({
	// 	title: 'Unsubmitted Changes!',
	// 	subtitle:
	// 		'Are you sure you want to cancel editing the Details? Once you close the page you will not be able to retrieve the changed data!',
	// 	when: isDirty
	// });

	const handleClear = (): void => {
		reset({ firstName: userFirstName, lastName: userLastName, bio });
	};

	return (
		<EditUserStructure
			color={color}
			colorMode={colorMode}
			title='Details'
			subtitle='Edit your basic information.'
			isSubmitDisabled={!isDirty}
			onReset={
				userFirstName !== watchFirstName || userLastName !== watchLastName || bio !== watchBio
					? handleClear
					: undefined
			}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Card colorMode={colorMode} isFullWidth variant='outlined' p={2}>
				<CardBody>
					<VStack width='100%' spacing={2}>
						<Input
							color={color}
							colorMode={colorMode}
							autoComplete='off'
							label='Username'
							placeholder={usernamePlaceholder}
							isFullWidth
							isRequired
							isReadOnly
							renderLeftPanel={({ color, ...rest }) => (
								<Icon {...rest} icon='alternate_email' category='outlined' skeletonColor={color} />
							)}
							value={username}
						/>

						<SimpleGrid width='100%' columns={isSm ? 2 : 1} spacing={2}>
							<Controller
								control={control}
								name='firstName'
								render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
									<Input
										color={color}
										colorMode={colorMode}
										autoComplete='off'
										label='First name'
										name={name}
										helper={error ? error.message : undefined}
										placeholder={firstNamePlaceholder}
										onBlur={onBlur}
										onChange={onChange}
										isError={!!error}
										isFullWidth
										isRequired
										value={value}
									/>
								)}
							/>

							<Controller
								control={control}
								name='lastName'
								render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
									<Input
										color={color}
										colorMode={colorMode}
										autoComplete='off'
										label='Last name'
										name={name}
										helper={error ? error.message : undefined}
										placeholder={lastNamePlaceholder}
										onBlur={onBlur}
										onChange={onChange}
										isError={!!error}
										isFullWidth
										isRequired
										value={value}
									/>
								)}
							/>
						</SimpleGrid>

						<Controller
							control={control}
							name='bio'
							render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
								<Textarea
									color={color}
									colorMode={colorMode}
									label='Biography'
									name={name}
									helper={error ? error.message : undefined}
									placeholder={`My name is ${firstNamePlaceholder} ${lastNamePlaceholder} ...`}
									onBlur={onBlur}
									onChange={onChange}
									isError={!!error}
									isFullWidth
									value={value}
									sx={{ textarea: { height: theme.space[12.5] } }}
								/>
							)}
						/>
					</VStack>
				</CardBody>
			</Card>
		</EditUserStructure>
	);
};

export default DetailsTab;
