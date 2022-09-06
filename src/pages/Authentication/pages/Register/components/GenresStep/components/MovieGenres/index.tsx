import { FC, useState } from 'react';

import { Card, CardHeader, CardBody, Badge, BadgeLabel, Button } from '@davidscicluna/component-library';

import { Wrap, WrapItem, Text } from '@chakra-ui/react';

import { useIsFetching } from '@tanstack/react-query';

import { Controller } from 'react-hook-form';
import { range } from 'lodash';

import QueryEmpty from '../../../../../../../../components/Empties/QueryEmpty';
import QueryError from '../../../../../../../../components/Empties/QueryError';
import { Genre as GenreType, QueryError as QueryErrorType } from '../../../../../../../../common/types';
import { useSelector } from '../../../../../../../../common/hooks';
import { genresDefaultValues as defaultValues } from '../../../../defaults';
import { useMovieGenresQuery } from '../../../../../../../../common/queries';
import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../common/data/defaultPropValues';
import { GenresStepProps as MovieGenresProps } from '../../types';
import Genre from '../Genre';
import DummyGenre from '../DummyGenre';
import Actions from '../Actions';
import { movieGenresQueryKey } from '../../../../../../../../common/keys';

const MovieGenres: FC<MovieGenresProps> = (props) => {
	const { color = defaultColor, colorMode = defaultColorMode, form } = props;
	const { control, setValue } = form;

	const isFetchingMovieGenres = useIsFetching(movieGenresQueryKey);

	const stateGenres = useSelector((state) => state.options.data.genres.movie || []);

	const [allGenres, setAllGenres] = useState<GenreType[]>([...stateGenres]);

	const [error, setError] = useState<QueryErrorType>();

	const { isFetching, isLoading, isError, isSuccess, refetch } = useMovieGenresQuery({
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
						renderTitle={(props) => <Text {...props}>Movie Genres</Text>}
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
						{isFetching || isLoading ? (
							<Wrap width='100%' spacing={1.5}>
								{range(0, 15).map((_dummy, index) => (
									<WrapItem key={index}>
										<DummyGenre colorMode={colorMode} />
									</WrapItem>
								))}
							</Wrap>
						) : isSuccess && allGenres.length > 0 ? (
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
						) : isError ? (
							<QueryError
								colorMode={colorMode}
								type='Movie Genres'
								renderTitle={({ children, ...rest }) => <Text {...rest}>{children}</Text>}
								renderDescription={({ children, ...rest }) => <Text {...rest}>{children}</Text>}
								renderBadge={
									error && error.status_code && error.status_message
										? (props) => (
												<Badge {...props} color={color}>
													<BadgeLabel>{`(${error.status_code}) ${error.status_message}`}</BadgeLabel>
												</Badge>
										  )
										: undefined
								}
								renderAction={({ children, ...rest }) => (
									<Button {...rest} color={color} onClick={() => refetch()}>
										{children}
									</Button>
								)}
							/>
						) : (
							<QueryEmpty
								colorMode={colorMode}
								renderTitle={({ children, ...rest }) => <Text {...rest}>{children}</Text>}
								renderDescription={(props) => (
									<Text {...props}>
										Unfortunately was unable to find any Movie Genres. Please try again later!
									</Text>
								)}
							/>
						)}
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default MovieGenres;
