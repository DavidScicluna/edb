import { FC } from 'react';

import { useTheme, Card, CardHeader, CardBody, Button, Input, Textarea } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Text, SimpleGrid } from '@chakra-ui/react';

import { useWatch, Controller } from 'react-hook-form';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../common/data/defaultPropValues';
import { detailsDefaultValues as defaultValues } from '../../../../defaults';

import { InfoProps } from './types';

const Info: FC<InfoProps> = (props) => {
	const theme = useTheme();
	const [isSm] = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

	const { form, color = defaultColor, colorMode = defaultColorMode, placeholder } = props;
	const { control, getValues, reset } = form;

	const watchFirstName = useWatch({ control, name: 'firstName' });
	const watchLastName = useWatch({ control, name: 'lastName' });
	const watchBio = useWatch({ control, name: 'bio' });

	const handleClear = (): void => {
		reset(
			{
				...getValues(),
				firstName: defaultValues.firstName,
				lastName: defaultValues.lastName,
				bio: defaultValues.bio
			},
			{
				keepDirty: true,
				keepDirtyValues: true,
				keepErrors: true,
				keepIsSubmitted: true,
				keepIsValid: true,
				keepSubmitCount: true,
				keepTouched: true
			}
		);
	};

	return (
		<Card colorMode={colorMode} isFullWidth variant='outlined' p={2}>
			<CardHeader
				renderTitle={(props) => <Text {...props}>Information</Text>}
				actions={
					<Button
						color={color}
						colorMode={colorMode}
						isDisabled={!watchFirstName && !watchLastName && !watchBio}
						onClick={() => handleClear()}
						size='xs'
						variant='text'
					>
						Clear
					</Button>
				}
			/>
			<CardBody>
				<VStack width='100%' spacing={2}>
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
									placeholder={placeholder.firstName}
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
									placeholder={placeholder.lastName}
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
								placeholder={`My name is ${placeholder.firstName} ${placeholder.lastName} ...`}
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
	);
};

export default Info;
