import { FC, useState } from 'react';

import {
	useTheme,
	Card,
	CardHeader,
	CardBody,
	Badge,
	BadgeLabel,
	Button,
	Icon
} from '@davidscicluna/component-library';

import { Wrap, WrapItem, Text } from '@chakra-ui/react';

import { useIsFetching } from '@tanstack/react-query';

import { Controller } from 'react-hook-form';
import { range } from 'lodash';

import { Genre as GenreType, QueryError as QueryErrorType } from '../../../../../../common/types';
import { useSelector } from '../../../../../../common/hooks';
import { userGenresDefaultValues as defaultValues } from '../../defaults';
import { useGenresQuery } from '../../../../../../common/queries';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions
} from '../../../../../../components';
import { color as defaultColor, colorMode as defaultColorMode } from '../../../../../../common/data/defaultPropValues';
import { UserGenresProps as UserMovieGenresProps } from '../../types';
import Genre from '../UserGenre';
import DummyGenre from '../DummyUserGenre';
import Actions from '../UserGenresActions';
import { genresQueryKey } from '../../../../../../common/queries/useGenresQuery';
import { formatMediaTypeLabel } from '../../../../../../common/utils';
import { getEmptySubtitle } from '../../../../../../components/QueryEmpty/common/utils';

const UserMovieGenres: FC<UserMovieGenresProps> = (props) => {
	const theme = useTheme();

	const { color = defaultColor, colorMode = defaultColorMode, form } = props;
	const { control, setValue } = form;

	const isFetchingMovieGenres = useIsFetching(genresQueryKey({ mediaType: 'movie' }));

	const stateGenres = useSelector((state) => state.options.data.genres.movie || []);

	const [allGenres, setAllGenres] = useState<GenreType[]>([...stateGenres]);

	const [error, setError] = useState<QueryErrorType>();

	const { isFetching, isLoading, isError, isSuccess, refetch } = useGenresQuery({
		props: { mediaType: 'movie' },
		options: {
			enabled: !isFetchingMovieGenres && allGenres.length === 0,
			onSuccess: ({ genres = [] }) => setAllGenres([...genres]),
			onError: (error) => setError(error.response?.data)
		}
	});

	return (
		<Controller
			control={control}
			name='movie'
			render={({ field: { value: genres = [], name } }) => (
				<Card colorMode={colorMode} isFullWidth p={2}>
					<CardHeader
						renderTitle={(props) => (
							<Text {...props}>
								{`${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })} Genres`}
							</Text>
						)}
						actions={
							<Actions
								color={color}
								colorMode={colorMode}
								allGenres={allGenres.length}
								genres={genres.length}
								onClear={() => setValue(name, defaultValues[name], { shouldDirty: true })}
								onToggle={() =>
									setValue(name, genres.length === allGenres.length ? [] : [...allGenres], {
										shouldDirty: true
									})
								}
							/>
						}
					/>
					<CardBody>
						{!(isFetching || isLoading) && isError ? (
							<QueryEmpty color={color} colorMode={colorMode}>
								<QueryEmptyStack>
									<QueryEmptyIcon
										renderIcon={(props) => (
											<Icon
												{...props}
												width={theme.fontSizes['6xl']}
												height={theme.fontSizes['6xl']}
												fontSize={theme.fontSizes['6xl']}
												icon='error_outline'
											/>
										)}
										p={2}
									/>
									<QueryEmptyBody>
										<QueryEmptyTitle />
										<QueryEmptySubtitle>
											{getEmptySubtitle({
												type: 'error',
												label: `${formatMediaTypeLabel({
													type: 'single',
													mediaType: 'movie'
												})} Genres`
											})}
										</QueryEmptySubtitle>
									</QueryEmptyBody>

									<Badge {...props} color={color}>
										<BadgeLabel>{`(${error?.status_code}) ${error?.status_message}`}</BadgeLabel>
									</Badge>

									<QueryEmptyActions
										renderActions={(props) => (
											<Button {...props} onClick={() => refetch()}>
												Try Again
											</Button>
										)}
									/>
								</QueryEmptyStack>
							</QueryEmpty>
						) : !(isFetching || isLoading) && isSuccess && allGenres && allGenres.length === 0 ? (
							<QueryEmpty color={color} colorMode={colorMode}>
								<QueryEmptyStack>
									<QueryEmptyBody>
										<QueryEmptyTitle />
										<QueryEmptySubtitle>
											{getEmptySubtitle({
												type: 'empty',
												label: `${formatMediaTypeLabel({
													type: 'single',
													mediaType: 'movie'
												})} Genres`
											})}
										</QueryEmptySubtitle>
									</QueryEmptyBody>

									<QueryEmptyActions
										renderActions={(props) => (
											<Button {...props} onClick={() => refetch()}>
												Try Again
											</Button>
										)}
									/>
								</QueryEmptyStack>
							</QueryEmpty>
						) : !(isFetching || isLoading) && isSuccess && allGenres && allGenres.length > 0 ? (
							<Wrap width='100%' spacing={1.5}>
								{allGenres.map(({ id, ...rest }) => (
									<WrapItem key={id}>
										<Genre
											{...rest}
											id={id}
											color={color}
											colorMode={colorMode}
											isActive={genres.some((g) => g.id === id)}
											onClick={() =>
												setValue(
													name,
													genres.some((g) => g.id === id)
														? genres.filter((g) => g.id !== id)
														: [...genres, { id, ...rest }],
													{ shouldDirty: true }
												)
											}
										/>
									</WrapItem>
								))}
							</Wrap>
						) : (
							<Wrap width='100%' spacing={1.5}>
								{range(15).map((_dummy, index) => (
									<WrapItem key={index}>
										<DummyGenre colorMode={colorMode} />
									</WrapItem>
								))}
							</Wrap>
						)}
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default UserMovieGenres;
