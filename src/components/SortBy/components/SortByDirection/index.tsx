import { FC } from 'react';

import { useTheme, Card, CardHeader, CardBody, Button, Icon, Fade } from '@davidscicluna/component-library';

import { useMediaQuery, Stack, Text } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';

import { useUserTheme } from '../../../../common/hooks';

import { SortByDirections, SortByDirectionProps } from './types';

const directions: SortByDirections = [
	{
		label: 'Ascending order',
		value: 'asc',
		icon: 'arrow_upward'
	},
	{
		label: 'Descending order',
		value: 'desc',
		icon: 'arrow_downward'
	}
];

const SortByDirection: FC<SortByDirectionProps> = ({ form }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { control, setValue } = form;

	return (
		<Controller
			control={control}
			name='direction'
			render={({ field: { onBlur, value, name } }) => (
				<Card colorMode={colorMode} isFullWidth onBlur={onBlur} p={2}>
					<CardHeader
						renderTitle={(props) => <Text {...props}>Direction</Text>}
						renderSubtitle={(props) => (
							<Text {...props}>
								Select the direction of the sort, either in Ascending or Descending order
							</Text>
						)}
					/>
					<CardBody>
						<Stack width='100%' direction={isSm ? 'column' : 'row'} spacing={2}>
							{directions.map((direction) => (
								<Button
									key={direction.value}
									color={value === direction.value ? color : 'gray'}
									colorMode={colorMode}
									renderLeft={({ color, colorMode, height }) => (
										<Icon
											width={`${height}px`}
											height={`${height}px`}
											fontSize={`${height}px`}
											colorMode={colorMode}
											icon={direction.icon}
											category={value === direction.value ? 'filled' : 'outlined'}
											skeletonColor={color}
										/>
									)}
									renderRight={({ color, colorMode, height }) => (
										<Fade in={value === direction.value}>
											<Icon
												width={`${height}px`}
												height={`${height}px`}
												fontSize={`${height}px`}
												colorMode={colorMode}
												icon='check'
												category='outlined'
												skeletonColor={color}
											/>
										</Fade>
									)}
									isFullWidth
									onClick={
										value !== direction.value
											? () => setValue(name, direction.value, { shouldDirty: true })
											: undefined
									}
									size='lg'
									variant='outlined'
								>
									{direction.label}
								</Button>
							))}
						</Stack>
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default SortByDirection;
