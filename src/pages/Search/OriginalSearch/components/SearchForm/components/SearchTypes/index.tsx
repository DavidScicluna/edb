import { FC } from 'react';

import {
	useTheme,
	Card,
	CardHeader,
	CardBody,
	HorizontalScroll,
	Button,
	Icon,
	utils
} from '@davidscicluna/component-library';

import { HStack, Box, Text } from '@chakra-ui/react';

import { includes } from 'lodash';
import { Controller } from 'react-hook-form';

import { useUserTheme } from '../../../../../../../common/hooks';
import { getMediaTypeIcon } from '../../../../../../../common/utils';
import allSearchTypes from '../../common/data/searchTypes';
import { MediaType } from '../../../../../../../common/types';

import { SearchTypesProps } from './types';

const { getColor } = utils;

const SearchTypes: FC<SearchTypesProps> = ({ form }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { control, setValue } = form;

	return (
		<Controller
			control={control}
			name='searchTypes'
			render={({ field: { onBlur, value: searchTypes = [], name } }) => (
				<Card colorMode={colorMode} isFullWidth isDivisible={false} onBlur={onBlur} variant='transparent'>
					<CardHeader
						renderTitle={(props) => (
							<Text
								{...props}
								color={getColor({ theme, colorMode, type: 'text.secondary' })}
								fontSize='sm'
								textTransform='uppercase'
							>
								{"I'm looking for..."}
							</Text>
						)}
						actions={
							<HStack>
								<Button
									color={color}
									colorMode={colorMode}
									isDisabled={
										searchTypes.length === 0 || searchTypes.length === allSearchTypes.length
									}
									onClick={() => setValue(name, [], { shouldDirty: true })}
									size='xs'
									variant='text'
								>
									Clear
								</Button>

								<Button
									color={color}
									colorMode={colorMode}
									onClick={() =>
										setValue(
											name,
											searchTypes.length !== allSearchTypes.length
												? allSearchTypes.map(({ value }) => value)
												: [],
											{ shouldDirty: true }
										)
									}
									size='xs'
									variant='text'
								>
									{`${searchTypes.length === allSearchTypes.length ? 'Remove' : 'Select'} All`}
								</Button>
							</HStack>
						}
					/>
					<CardBody>
						<HorizontalScroll colorMode={colorMode} renderDivider={() => <Box p={1} />}>
							{allSearchTypes.map(({ color, value, label }) => {
								const isActive = includes(searchTypes, value);

								return (
									<Button
										key={value}
										color={isActive ? color : 'gray'}
										colorMode={colorMode}
										renderLeft={({ color, colorMode, height }) => (
											<Icon
												width={`${height}px`}
												height={`${height}px`}
												fontSize={`${height}px`}
												colorMode={colorMode}
												icon={getMediaTypeIcon({ mediaType: value as MediaType })}
												category={isActive ? 'filled' : 'outlined'}
												skeletonColor={color}
											/>
										)}
										renderRight={
											isActive
												? ({ color, colorMode, height }) => (
														<Icon
															width={`${height}px`}
															height={`${height}px`}
															fontSize={`${height}px`}
															colorMode={colorMode}
															icon='check'
															skeletonColor={color}
														/>
												  )
												: undefined
										}
										onClick={() =>
											setValue(
												name,
												searchTypes.some((searchType) => searchType === value)
													? searchTypes.filter((searchType) => searchType !== value)
													: [...searchTypes, value],
												{ shouldDirty: true }
											)
										}
										variant='outlined'
									>
										{label}
									</Button>
								);
							})}
						</HorizontalScroll>
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default SearchTypes;
