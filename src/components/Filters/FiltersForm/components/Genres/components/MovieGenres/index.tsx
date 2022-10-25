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

import { Genre as GenreType, QueryError as QueryErrorType } from '../../../../../../../common/types';
import { useSelector, useUserTheme } from '../../../../../../../common/hooks';
import { useGenresQuery } from '../../../../../../../common/queries';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions
} from '../../../../../..';
import Genre from '../Genre';
import DummyGenre from '../DummyGenre';
import GenresCardActions from '../GenresCardActions';
import { genresQueryKey } from '../../../../../../../common/keys';
import { getEmptySubtitle } from '../../../../../../QueryEmpty/common/utils';
import defaultValues from '../../../../../common/data/defaults';

import { MovieGenresProps } from './types';

const MovieGenres: FC<MovieGenresProps> = ({ form }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

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
			name='genres'
			render={({ field: { onBlur, value: genres = [], name } }) => (
				<Card colorMode={colorMode} isFullWidth onBlur={onBlur} p={2}>
					<CardHeader
						renderTitle={(props) => <Text {...props}>Genres</Text>}
						actions={
							<GenresCardActions
								allGenres={allGenres.length}
								genres={genres.length}
								onClear={() => setValue(name, defaultValues.genres, { shouldDirty: true })}
								onToggle={() =>
									setValue(
										name,
										genres.length === allGenres.length ? [] : [...allGenres].map(({ id }) => id),
										{ shouldDirty: true }
									)
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
												label: 'Genres'
											})}
										</QueryEmptySubtitle>
									</QueryEmptyBody>

									{error && error.status_code && error.status_message && (
										<Badge color={color} colorMode={colorMode}>
											<BadgeLabel>{`(${error.status_code}) ${error.status_message}`}</BadgeLabel>
										</Badge>
									)}

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
												label: 'Genres'
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
											isActive={genres.some((genre) => genre === id)}
											onClick={() =>
												setValue(
													name,
													genres.some((genre) => genre === id)
														? genres.filter((genre) => genre !== id)
														: [...genres, id],
													{ shouldDirty: true }
												)
											}
										/>
									</WrapItem>
								))}
							</Wrap>
						) : (
							<Wrap width='100%' spacing={1.5}>
								{range(0, 15).map((_dummy, index) => (
									<WrapItem key={index}>
										<DummyGenre />
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

export default MovieGenres;
