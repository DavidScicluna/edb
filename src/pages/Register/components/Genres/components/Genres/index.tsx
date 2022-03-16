import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { useMediaQuery, HStack, Wrap, WrapItem } from '@chakra-ui/react';

import { isEmpty, isNil, range } from 'lodash';
import { useElementSize } from 'usehooks-ts';

import Genre from './components/Genre';
import { GenresProps } from './types';

import { useSelector } from '../../../../../../common/hooks';
import { Genre as GenreType } from '../../../../../../common/types';
import Button from '../../../../../../components/Clickable/Button';
import Divider from '../../../../../../components/Divider';
import Empty from '../../../../../../components/Empty';
import Panel from '../../../../../../components/Panel';
import { genresDefaultValues as defaultValues } from '../../../../defaults';

const Genres = ({ color, colorMode, form, mediaType }: GenresProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const allGenres = useSelector(
		(state) => (mediaType === 'movie' ? state.options.data.genres.movie : state.options.data.genres.tv) || []
	);
	const genres = form.watch(mediaType === 'movie' ? 'movie' : 'tv') || [];

	const [ref, { height }] = useElementSize();

	const handleGenreClick = (genre: GenreType): void => {
		const type = mediaType === 'movie' ? 'movie' : 'tv';

		if (genres.some((activeGenre) => activeGenre.id === genre.id)) {
			form.setValue(
				type,
				genres.filter((activeGenre) => activeGenre.id !== genre.id),
				{ shouldDirty: true }
			);
		} else {
			form.setValue(type, [...genres, genre], { shouldDirty: true });
		}
	};

	const handleAllClick = (): void => {
		const type = mediaType === 'movie' ? 'movie' : 'tv';

		if (genres.length === allGenres.length) {
			form.setValue(type, [], { shouldDirty: true });
		} else {
			form.setValue(type, [...allGenres], {
				shouldDirty: true
			});
		}
	};

	const handleAllLabel = (): string => {
		return `${genres.length === allGenres.length ? 'Remove' : 'Select'} All`;
	};

	return (
		<Controller
			control={form.control}
			name={mediaType === 'movie' ? 'movie' : 'tv'}
			render={({ field: { value } }) => (
				<Panel colorMode={colorMode} isFullWidth>
					{{
						header: {
							title: mediaType === 'movie' ? 'Movie Genres' : 'TV Show Genres',
							actions: (
								<HStack
									ref={ref}
									divider={
										<Divider colorMode={colorMode} orientation='vertical' height={`${height}px`} />
									}
								>
									<Button
										color={color}
										colorMode={colorMode}
										isDisabled={
											isNil(allGenres) ||
											isEmpty(allGenres) ||
											value.length === 0 ||
											value.length === allGenres.length
										}
										onClick={() =>
											form.setValue(
												mediaType === 'movie' ? 'movie' : 'tv',
												defaultValues[mediaType === 'movie' ? 'movie' : 'tv'],
												{ shouldDirty: true }
											)
										}
										size='sm'
										variant='text'
									>
										Clear
									</Button>
									<Button
										color={color}
										colorMode={colorMode}
										isDisabled={isNil(allGenres) || isEmpty(allGenres)}
										onClick={() => handleAllClick()}
										size='sm'
										variant='text'
									>
										{handleAllLabel()}
									</Button>
								</HStack>
							)
						},
						body: (
							<Wrap width='100%' spacing={isSm ? 1 : 1.5}>
								{isNil(allGenres) || isEmpty(allGenres) ? (
									<WrapItem width='100%'>
										<Empty
											color={color}
											colorMode={colorMode}
											hasIllustration={false}
											label='Oh no!'
											description='Failed to find any genres!'
											size='sm'
											variant='transparent'
										/>
									</WrapItem>
								) : !(isNil(allGenres) || isEmpty(allGenres)) ? (
									allGenres.map((genre) => (
										<WrapItem key={genre.id}>
											<Genre
												{...genre}
												color={color}
												colorMode={colorMode}
												isActive={value.some((activeGenre) => activeGenre.id === genre.id)}
												isLoading={false}
												onClick={handleGenreClick}
											/>
										</WrapItem>
									))
								) : (
									range(0, 15).map((_dummy, index) => (
										<WrapItem key={index}>
											<Genre color={color} colorMode={colorMode} isLoading />
										</WrapItem>
									))
								)}
							</Wrap>
						)
					}}
				</Panel>
			)}
		/>
	);
};

export default Genres;