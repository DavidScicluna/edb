import { FC } from 'react';

import { Card, CardHeader, CardBody, Button, Icon, Fade } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';

import { useUserTheme } from '../../../../common/hooks';

import { SortBySortProps } from './types';

const SortBySort: FC<SortBySortProps> = ({ form, sortBy }) => {
	const { color, colorMode } = useUserTheme();

	const { control, setValue } = form;

	return (
		<Controller
			control={control}
			name='sortBy'
			render={({ field: { onBlur, value, name } }) => (
				<Card colorMode={colorMode} isFullWidth onBlur={onBlur} p={2}>
					<CardHeader
						renderTitle={(props) => <Text {...props}>Sort by</Text>}
						renderSubtitle={(props) => (
							<Text {...props}>Click on the button to select how the data will be sorted by</Text>
						)}
					/>
					<CardBody>
						<VStack width='100%' spacing={2}>
							{sortBy.map((sort) => (
								<Button
									key={sort.value}
									color={sort.value === value.value ? color : 'gray'}
									colorMode={colorMode}
									renderRight={({ color, colorMode, height }) => (
										<Fade in={sort.value === value.value}>
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
										sort.value !== value.value
											? () => setValue(name, sort, { shouldDirty: true })
											: undefined
									}
									size='lg'
									variant='outlined'
								>
									{sort.label}
								</Button>
							))}
						</VStack>
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default SortBySort;
